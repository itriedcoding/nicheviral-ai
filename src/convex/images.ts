import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// Internal mutation to save generated image
export const internalSaveImage = internalMutation({
  args: {
    userId: v.string(),
    prompt: v.string(),
    imageUrl: v.string(),
    model: v.string(),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("images", {
      userId: args.userId,
      prompt: args.prompt,
      imageUrl: args.imageUrl,
      model: args.model,
      status: "completed",
      aspectRatio: args.aspectRatio,
      createdAt: Date.now(),
    });
  },
});

// Public mutation to save image (if needed from client)
export const saveImage = mutation({
  args: {
    prompt: v.string(),
    imageUrl: v.string(),
    model: v.string(),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    await ctx.db.insert("images", {
      userId: identity.subject,
      prompt: args.prompt,
      imageUrl: args.imageUrl,
      model: args.model,
      status: "completed",
      aspectRatio: args.aspectRatio,
      createdAt: Date.now(),
    });
  },
});

// Get user's images
export const getUserImages = query({
  args: {
    userId: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const limit = args.limit || 50;
    
    let userId = args.userId;
    if (!userId) {
        if (!identity) return [];
        userId = identity.subject;
    }

    return await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", userId!))
      .order("desc")
      .take(limit);
  },
});

// Delete image
export const deleteImage = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const image = await ctx.db.get(args.id);
    if (!image) throw new Error("Image not found");

    if (image.userId !== identity.subject) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.id);
  },
});
