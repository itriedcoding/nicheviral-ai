import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";

// Create video record
export const createVideoRecord = mutation({
  args: {
    userId: v.optional(v.string()), // Make optional to allow inference from auth
    title: v.string(),
    description: v.string(),
    prompt: v.string(),
    nicheId: v.optional(v.id("niches")),
    aiModel: v.string(),
    voiceModel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Determine userId: use provided arg or identity.subject
    // Note: In a real app, we should validate that if userId is provided, it matches the auth user or the user is admin.
    // For now, we'll prefer the identity.subject if not provided, or just use identity.subject to be safe.
    const userId = identity.subject;

    const videoId = await ctx.db.insert("videos", {
      userId: userId,
      nicheId: args.nicheId,
      title: args.title,
      description: args.description,
      prompt: args.prompt,
      status: "queued",
      aiModel: args.aiModel,
      voiceModel: args.voiceModel,
    });

    // Schedule the actual video generation
    await ctx.scheduler.runAfter(0, api.realVideoGeneration.processVideoGeneration, {
      videoId,
      prompt: args.prompt,
      aiModel: args.aiModel,
    });

    return videoId;
  },
});

// Internal mutation to update video status (safe for use by actions)
export const internalUpdateVideoStatus = internalMutation({
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
    metadata: v.optional(v.any()),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { videoId, ...updates } = args;
    await ctx.db.patch(videoId, updates);
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
    userId: v.optional(v.string()), // Make optional
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const limit = args.limit || 50;
    
    let userId = args.userId;
    if (!userId) {
        if (!identity) return []; // Or throw, but returning empty is safer for UI
        userId = identity.subject;
    }

    const videos = await ctx.db
      .query("videos")
      .withIndex("by_user", (q) => q.eq("userId", userId!))
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const video = await ctx.db.get(args.id);
    if (!video) throw new Error("Video not found");

    // Get user from database to check if admin or owner
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), video.userId))
      .first();

    // Check if user owns the video or is admin
    const isOwner = video.userId === identity.subject;
    const isAdmin = user?.role === "admin";

    if (!isOwner && !isAdmin) {
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
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    let userId = args.userId;
    if (!userId) {
        if (!identity) return null;
        userId = identity.subject;
    }

    const credits = await ctx.db
      .query("userCredits")
      .withIndex("by_user", (q) => q.eq("userId", userId!))
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

// Get video metadata for regeneration
export const getVideoForRegeneration = query({
  args: { id: v.id("videos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const video = await ctx.db.get(args.id);
    if (!video) throw new Error("Video not found");

    // Check ownership
    if (video.userId !== identity.subject) {
      throw new Error("Not authorized to regenerate this video");
    }

    return {
      prompt: video.prompt,
      title: video.title,
      description: video.description,
      aiModel: video.aiModel,
      voiceModel: video.voiceModel,
      duration: video.duration,
    };
  },
});