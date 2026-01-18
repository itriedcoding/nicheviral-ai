import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

// Create video record
export const createVideoRecord = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    prompt: v.string(),
    nicheId: v.optional(v.id("niches")),
    aiModel: v.string(),
    voiceModel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("videos", {
      userId: args.userId,
      nicheId: args.nicheId,
      title: args.title,
      description: args.description,
      prompt: args.prompt,
      status: "queued",
      aiModel: args.aiModel,
      voiceModel: args.voiceModel,
    });
  },
});

// Update video status
export const updateVideoStatus = mutation({
  args: {
    videoId: v.id("videos"),
    status: v.union(
      v.literal("queued"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("failed")
    ),
    videoUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    duration: v.optional(v.number()),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { videoId, ...updates } = args;
    await ctx.db.patch(videoId, updates);
    return videoId;
  },
});

// Get user's videos
export const getUserVideos = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    const videos = await ctx.db
      .query("videos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);

    return videos;
  },
});

// Get video by ID
export const getVideo = query({
  args: { id: v.id("videos") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get videos by status
export const getVideosByStatus = query({
  args: {
    status: v.union(
      v.literal("queued"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("failed")
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    return await ctx.db
      .query("videos")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .take(limit);
  },
});

// Delete video
export const deleteVideo = mutation({
  args: { id: v.id("videos") },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) throw new Error("Not authenticated");

    const video = await ctx.db.get(args.id);
    if (!video) throw new Error("Video not found");

    // Check if user owns the video
    if (video.userId !== userId.subject) {
      throw new Error("Not authorized to delete this video");
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Initialize user credits
export const initializeUserCredits = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      return existing;
    }

    return await ctx.db.insert("userCredits", {
      userId: args.userId,
      credits: 100, // Free tier starts with 100 credits
      subscriptionTier: "free",
      subscriptionStatus: "active",
    });
  },
});

// Get user credits
export const getUserCredits = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const credits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!credits) {
      return null;
    }

    return credits;
  },
});

// Deduct credits
export const deductCredits = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
    videoId: v.id("videos"),
    generationType: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if admin (unlimited credits)
    const user = await ctx.db.get(args.userId);

    if (user?.role === "admin") {
      // Admin has unlimited credits - don't deduct, just record generation
      await ctx.db.insert("generations", {
        userId: args.userId,
        videoId: args.videoId,
        generationType: args.generationType,
        creditsUsed: 0, // No credits used for admin
      });

      return { success: true, remainingCredits: 999999999 };
    }

    // Regular user - deduct credits normally
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!userCredits) {
      throw new Error("User credits not found");
    }

    if (userCredits.credits < args.amount) {
      throw new Error("Insufficient credits");
    }

    // Deduct credits
    await ctx.db.patch(userCredits._id, {
      credits: userCredits.credits - args.amount,
    });

    // Record generation
    await ctx.db.insert("generations", {
      userId: args.userId,
      videoId: args.videoId,
      generationType: args.generationType,
      creditsUsed: args.amount,
    });

    return { success: true, remainingCredits: userCredits.credits - args.amount };
  },
});
