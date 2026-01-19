import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { auth } from "./auth";
import { Doc, Id } from "./_generated/dataModel";

/**
 * Get user by ID for custom authentication
 */
export const getUserById = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Try to get user by the custom userId from localStorage
    const userId = ctx.db.normalizeId("users", args.userId);
    if (!userId) return null;
    return await ctx.db.get(userId);
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

export const initializeCredits = mutation({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let userId = args.userId;
    if (!userId) {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) {
        userId = identity.subject;
      }
    }

    // If still no userId, we can't initialize
    if (!userId) return;

    const existing = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", userId!))
      .first();

    if (!existing) {
      await ctx.db.insert("userCredits", {
        userId: userId,
        credits: 200, // Start with 200 credits as requested
        subscriptionTier: "free",
        subscriptionStatus: "active",
      });
    }
  },
});

export const updateChannel = mutation({
  args: { 
    channelId: v.string(),
    userId: v.optional(v.string()) 
  },
  handler: async (ctx, args) => {
    let userId = args.userId;
    let user: Doc<"users"> | null = null;

    if (userId) {
      const id = ctx.db.normalizeId("users", userId);
      if (id) {
        user = await ctx.db.get(id);
      }
    } else {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");
      
      // Try to find by email if identity exists
      user = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", identity.email!))
        .first();
        
      // If not found by email, try subject as ID (though our schema uses custom IDs mostly)
      if (!user) {
         // Fallback logic if needed
      }
    }

    if (!user) throw new Error("User not found");

    // Validate channel ID format
    // YouTube Channel IDs usually start with UC and are 24 characters long
    if (args.channelId && !args.channelId.startsWith("UC")) {
       throw new Error("Invalid YouTube Channel ID. It must start with 'UC'.");
    }

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
      const id = ctx.db.normalizeId("users", args.userId);
      if (!id) return null;
      return await ctx.db.get(id);
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email!))
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
      const id = ctx.db.normalizeId("users", userId);
      if (id) {
        user = await ctx.db.get(id);
      }
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
      const id = ctx.db.normalizeId("users", userId);
      if (id) {
        user = await ctx.db.get(id);
      }
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
        if (!s.nicheId) return null;
        const niche = await ctx.db.get(s.nicheId);
        return niche;
      })
    );

    return niches.filter(Boolean);
  },
});