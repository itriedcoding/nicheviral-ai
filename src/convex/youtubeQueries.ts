import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

// Store a niche in the database (internal for AI to call)
export const storeNiche = internalMutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    trendScore: v.number(),
    searchVolume: v.number(),
    competitionLevel: v.string(),
    keywords: v.array(v.string()),
    thumbnailUrl: v.optional(v.string()),
    youtubeData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Check if niche already exists (by title)
    const existing = await ctx.db
      .query("niches")
      .filter((q) => q.eq(q.field("title"), args.title))
      .first();

    if (existing) {
      // Update existing niche
      await ctx.db.patch(existing._id, {
        description: args.description,
        category: args.category,
        trendScore: args.trendScore,
        searchVolume: args.searchVolume,
        competitionLevel: args.competitionLevel,
        keywords: args.keywords,
        thumbnailUrl: args.thumbnailUrl,
        youtubeData: args.youtubeData,
      });
      return existing._id;
    }

    // Create new niche
    return await ctx.db.insert("niches", args);
  },
});

// Get all niches sorted by trend score
export const getNiches = query({
  args: {
    limit: v.optional(v.number()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    if (args.category && args.category !== "all") {
      return await ctx.db
        .query("niches")
        .withIndex("by_category", (q) => q.eq("category", args.category as string))
        .order("desc")
        .take(limit);
    }

    return await ctx.db
      .query("niches")
      .withIndex("by_trend_score")
      .order("desc")
      .take(limit);
  },
});

// Get a single niche by ID
export const getNiche = query({
  args: { id: v.id("niches") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get trending categories with counts
export const getTrendingCategories = query({
  args: {},
  handler: async (ctx) => {
    const niches = await ctx.db.query("niches").take(100);

    const categoryMap = new Map<string, number>();

    niches.forEach((niche) => {
      const count = categoryMap.get(niche.category) || 0;
      categoryMap.set(niche.category, count + 1);
    });

    return Array.from(categoryMap.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  },
});

// Delete old niches (for cleanup)
export const deleteOldNiches = mutation({
  args: {
    olderThanDays: v.number(),
  },
  handler: async (ctx, args) => {
    const cutoffTime = Date.now() - args.olderThanDays * 24 * 60 * 60 * 1000;

    const oldNiches = await ctx.db
      .query("niches")
      .filter((q) => q.lt(q.field("_creationTime"), cutoffTime))
      .take(50);

    for (const niche of oldNiches) {
      await ctx.db.delete(niche._id);
    }

    return { deleted: oldNiches.length };
  },
});
