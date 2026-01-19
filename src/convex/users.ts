import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { auth } from "./auth";

/**
 * Get user by ID for custom authentication
 */
export const getUserById = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Try to get user by the custom userId from localStorage
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();

    return user;
  },
});

/**
 * Get the current signed in user. Returns null if the user is not signed in.
 * Usage: const signedInUser = await ctx.runQuery(api.users.currentUser);
 */
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    // For custom auth, we can't get userId from context
    // The frontend needs to pass userId explicitly
    // This query is deprecated - use getUserById instead
    return null;
  },
});

/**
 * Use this function internally to get the current user data. Remember to handle the null user case.
 * @param ctx
 * @returns
 */
export const getCurrentUser = async (ctx: QueryCtx) => {
  // For custom auth, return null
  // Frontend should use getUserById with userId from localStorage
  return null;
};

export const updateChannel = mutation({
  args: { 
    channelId: v.string(),
    userId: v.optional(v.string()) 
  },
  handler: async (ctx, args) => {
    let userId = args.userId;
    let user;

    if (userId) {
      user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), userId))
        .first();
    } else {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");
      
      user = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", identity.email))
        .first();
    }

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      youtubeChannelId: args.channelId,
    });

    return { success: true };
  },
});

export const getProfile = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), args.userId))
        .first();
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email))
      .first();
      
    return user;
  },
});

export const saveNiche = mutation({
  args: { 
    nicheId: v.id("niches"),
    userId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    let userId = args.userId;
    let user;

    if (userId) {
      user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), userId))
        .first();
    } else {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");
      
      user = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", identity.email))
        .first();
    }

    if (!user) throw new Error("User not found");

    // Check if already saved
    const existing = await ctx.db
      .query("savedNiches")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("nicheId"), args.nicheId))
      .first();

    if (existing) return { success: true, message: "Already saved" };

    await ctx.db.insert("savedNiches", {
      userId: user._id,
      nicheId: args.nicheId,
    });

    return { success: true };
  },
});

export const getSavedNiches = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let userId = args.userId;
    let user;

    if (userId) {
      user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), userId))
        .first();
    } else {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) return [];

      user = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", identity.email))
        .first();
    }

    if (!user) return [];

    const saved = await ctx.db
      .query("savedNiches")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const niches = await Promise.all(
      saved.map(async (s) => {
        const niche = await ctx.db.get(s.nicheId);
        return niche;
      })
    );

    return niches.filter(Boolean);
  },
});