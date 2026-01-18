import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Admin email - stored securely in database, never exposed to frontend
const ADMIN_EMAIL = "admin@neuraai.cyou";

// Check if user is admin
export const isAdmin = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();

    if (!user) return false;

    return user.email === ADMIN_EMAIL && user.role === "admin";
  },
});

// Admin: Get all users
export const getAllUsers = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 100;

    return await ctx.db
      .query("users")
      .order("desc")
      .take(limit);
  },
});

// Admin: Get user with credits
export const getUserWithCredits = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();

    if (!user) return null;

    const credits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const videos = await ctx.db
      .query("videos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const purchases = await ctx.db
      .query("purchases")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return {
      user,
      credits,
      videoCount: videos.length,
      totalSpent: purchases
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.amount, 0),
    };
  },
});

// Admin: Update user credits
export const updateUserCredits = mutation({
  args: {
    adminUserId: v.string(),
    targetUserId: v.string(),
    credits: v.number(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.adminUserId))
      .first();

    if (!admin || admin.email !== ADMIN_EMAIL || admin.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    // Update user credits
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.targetUserId))
      .first();

    if (userCredits) {
      await ctx.db.patch(userCredits._id, {
        credits: args.credits,
      });
    } else {
      await ctx.db.insert("userCredits", {
        userId: args.targetUserId,
        credits: args.credits,
        subscriptionTier: "free",
        subscriptionStatus: "active",
      });
    }

    // Log the action
    await ctx.db.insert("adminActions", {
      adminUserId: args.adminUserId,
      action: "update_credits",
      targetUserId: args.targetUserId,
      metadata: {
        credits: args.credits,
        reason: args.reason,
      },
    });

    return { success: true, credits: args.credits };
  },
});

// Admin: Delete user
export const deleteUser = mutation({
  args: {
    adminUserId: v.string(),
    targetUserId: v.string(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.adminUserId))
      .first();

    if (!admin || admin.email !== ADMIN_EMAIL || admin.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    // Don't allow deleting admin
    if (args.targetUserId === args.adminUserId) {
      throw new Error("Cannot delete admin account");
    }

    // Delete user's credits
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.targetUserId))
      .first();

    if (userCredits) {
      await ctx.db.delete(userCredits._id);
    }

    // Delete user's videos
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_user", (q) => q.eq("userId", args.targetUserId))
      .collect();

    for (const video of videos) {
      await ctx.db.delete(video._id);
    }

    // Delete user's purchases
    const purchases = await ctx.db
      .query("purchases")
      .withIndex("by_user", (q) => q.eq("userId", args.targetUserId))
      .collect();

    for (const purchase of purchases) {
      await ctx.db.delete(purchase._id);
    }

    // Log the action
    await ctx.db.insert("adminActions", {
      adminUserId: args.adminUserId,
      action: "delete_user",
      targetUserId: args.targetUserId,
      metadata: {
        reason: args.reason,
      },
    });

    return { success: true };
  },
});

// Admin: Get dashboard stats
export const getDashboardStats = query({
  args: {
    adminUserId: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.adminUserId))
      .first();

    if (!admin || admin.email !== ADMIN_EMAIL || admin.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    // Get counts
    const allUsers = await ctx.db.query("users").collect();
    const allVideos = await ctx.db.query("videos").collect();
    const allPurchases = await ctx.db.query("purchases").collect();
    const allCredits = await ctx.db.query("userCredits").collect();

    const totalRevenue = allPurchases
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);

    const totalCreditsIssued = allCredits.reduce((sum, c) => sum + c.credits, 0);

    // Status breakdown for videos
    const videosByStatus = {
      queued: allVideos.filter((v) => v.status === "queued").length,
      generating: allVideos.filter((v) => v.status === "generating").length,
      completed: allVideos.filter((v) => v.status === "completed").length,
      failed: allVideos.filter((v) => v.status === "failed").length,
    };

    return {
      totalUsers: allUsers.length,
      totalVideos: allVideos.length,
      totalPurchases: allPurchases.length,
      totalRevenue,
      totalCreditsIssued,
      videosByStatus,
    };
  },
});

// Admin: Get recent actions
export const getAdminActions = query({
  args: {
    adminUserId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.adminUserId))
      .first();

    if (!admin || admin.email !== ADMIN_EMAIL || admin.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const limit = args.limit || 50;

    return await ctx.db
      .query("adminActions")
      .order("desc")
      .take(limit);
  },
});

// Admin: Ban user (disable their account)
export const banUser = mutation({
  args: {
    adminUserId: v.string(),
    targetUserId: v.string(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.adminUserId))
      .first();

    if (!admin || admin.email !== ADMIN_EMAIL || admin.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    // Set user credits to 0
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.targetUserId))
      .first();

    if (userCredits) {
      await ctx.db.patch(userCredits._id, {
        credits: 0,
        subscriptionStatus: "banned",
      });
    }

    // Log the action
    await ctx.db.insert("adminActions", {
      adminUserId: args.adminUserId,
      action: "ban_user",
      targetUserId: args.targetUserId,
      metadata: {
        reason: args.reason,
      },
    });

    return { success: true };
  },
});
