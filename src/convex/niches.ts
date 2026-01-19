import { v } from "convex/values";
import { query } from "./_generated/server";

// Get trending niches from the database
export const getTrendingNiches = query({
  args: {
    limit: v.optional(v.number()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;

    if (args.category && args.category !== "all") {
      return await ctx.db
        .query("niches")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
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