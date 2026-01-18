import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// Credit packages
export const CREDIT_PACKAGES = {
  starter: { credits: 500, price: 9.99, name: "Starter Pack" },
  pro: { credits: 1500, price: 24.99, name: "Pro Pack" },
  business: { credits: 5000, price: 79.99, name: "Business Pack" },
  enterprise: { credits: 15000, price: 199.99, name: "Enterprise Pack" },
};

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
