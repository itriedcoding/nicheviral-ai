import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// Credit packages / Plans
export const PLANS = {
  starter: { credits: 500, price: 9.99, name: "Starter Plan" },
  pro: { credits: 1500, price: 24.99, name: "Pro Plan" },
  business: { credits: 5000, price: 79.99, name: "Business Plan" },
  enterprise: { credits: 15000, price: 199.99, name: "Enterprise Plan" },
};

// Start a 7-day free trial
export const startSubscriptionTrial = mutation({
  args: {
    planId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const plan = PLANS[args.planId as keyof typeof PLANS];
    if (!plan) throw new Error("Invalid plan");

    // Check if user already has a subscription
    const existingSub = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingSub && existingSub.status === "active") {
      throw new Error("You already have an active subscription");
    }

    // Calculate trial dates
    const now = Date.now();
    const trialDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
    const trialEnd = now + trialDuration;

    // Create or update subscription
    if (existingSub) {
      await ctx.db.patch(existingSub._id, {
        planId: args.planId,
        status: "trialing",
        currentPeriodStart: now,
        currentPeriodEnd: trialEnd,
        trialStart: now,
        trialEnd: trialEnd,
        cancelAtPeriodEnd: false,
      });
    } else {
      await ctx.db.insert("subscriptions", {
        userId,
        planId: args.planId,
        status: "trialing",
        currentPeriodStart: now,
        currentPeriodEnd: trialEnd,
        trialStart: now,
        trialEnd: trialEnd,
        cancelAtPeriodEnd: false,
      });
    }

    // Update user credits and status
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (userCredits) {
      await ctx.db.patch(userCredits._id, {
        credits: userCredits.credits + plan.credits, // Give credits for the trial
        subscriptionTier: args.planId as any,
        subscriptionStatus: "trialing",
        trialEndsAt: trialEnd,
        renewalDate: trialEnd,
      });
    } else {
      await ctx.db.insert("userCredits", {
        userId,
        credits: plan.credits,
        subscriptionTier: args.planId as any,
        subscriptionStatus: "trialing",
        trialEndsAt: trialEnd,
        renewalDate: trialEnd,
      });
    }

    return { success: true, trialEndsAt: trialEnd };
  },
});

// Create a purchase order
export const createPurchase = mutation({
  args: {
    userId: v.string(),
    packageId: v.string(),
    amount: v.number(),
    credits: v.number(),
    paymentMethod: v.string(),
    paymentDetails: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const purchaseId = await ctx.db.insert("purchases", {
      userId: args.userId,
      packageId: args.packageId,
      amount: args.amount,
      credits: args.credits,
      status: "pending",
      paymentMethod: args.paymentMethod,
    });

    return { success: true, purchaseId };
  },
});

// Complete a purchase and add credits
export const completePurchase = mutation({
  args: {
    purchaseId: v.id("purchases"),
    transactionId: v.string(),
  },
  handler: async (ctx, args) => {
    const purchase = await ctx.db.get(args.purchaseId);

    if (!purchase) {
      throw new Error("Purchase not found");
    }

    if (purchase.status === "completed") {
      throw new Error("Purchase already completed");
    }

    // Update purchase status
    await ctx.db.patch(args.purchaseId, {
      status: "completed",
      transactionId: args.transactionId,
      completedAt: Date.now(),
    });

    // Add credits to user
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", purchase.userId))
      .first();

    if (userCredits) {
      await ctx.db.patch(userCredits._id, {
        credits: userCredits.credits + purchase.credits,
      });
    } else {
      await ctx.db.insert("userCredits", {
        userId: purchase.userId,
        credits: purchase.credits,
        subscriptionTier: "free",
        subscriptionStatus: "active",
      });
    }

    return { success: true, creditsAdded: purchase.credits };
  },
});

// Get user's purchase history
export const getUserPurchases = query({
  args: {
    userId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    return await ctx.db
      .query("purchases")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);
  },
});

// Admin: Get all purchases
export const getAllPurchases = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 100;

    return await ctx.db
      .query("purchases")
      .order("desc")
      .take(limit);
  },
});

// Admin: Get revenue stats
export const getRevenueStats = query({
  args: {},
  handler: async (ctx) => {
    const allPurchases = await ctx.db
      .query("purchases")
      .filter((q) => q.eq(q.field("status"), "completed"))
      .collect();

    const totalRevenue = allPurchases.reduce((sum, p) => sum + p.amount, 0);
    const totalCreditsIssued = allPurchases.reduce((sum, p) => sum + p.credits, 0);

    // Calculate revenue by package
    const revenueByPackage: Record<string, { count: number; revenue: number }> = {};

    allPurchases.forEach((purchase) => {
      if (!revenueByPackage[purchase.packageId]) {
        revenueByPackage[purchase.packageId] = { count: 0, revenue: 0 };
      }
      revenueByPackage[purchase.packageId].count++;
      revenueByPackage[purchase.packageId].revenue += purchase.amount;
    });

    return {
      totalRevenue,
      totalCreditsIssued,
      totalPurchases: allPurchases.length,
      revenueByPackage,
    };
  },
});

// Internal mutation to add credits (called from payment processor after successful payment)
export const addCreditsInternal = internalMutation({
  args: {
    userId: v.string(),
    credits: v.number(),
    purchaseId: v.id("purchases"),
  },
  handler: async (ctx, args) => {
    // Add credits to user
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (userCredits) {
      await ctx.db.patch(userCredits._id, {
        credits: userCredits.credits + args.credits,
      });
    } else {
      await ctx.db.insert("userCredits", {
        userId: args.userId,
        credits: args.credits,
        subscriptionTier: "free",
        subscriptionStatus: "active",
      });
    }

    // Mark purchase as completed
    await ctx.db.patch(args.purchaseId, {
      status: "completed",
      completedAt: Date.now(),
    });

    return { success: true, creditsAdded: args.credits };
  },
});