import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// DEPRECATED: This file contained mock data. 
// We now use src/convex/youtube.ts for real data.
// Keeping this file structure for now to avoid breaking any lingering references,
// but the data is no longer used by the cron.

export const saveTrendingNiches = internalMutation({
  args: {},
  handler: async (ctx) => {
    console.log("⚠️ Deprecated saveTrendingNiches called. Use internal.youtube.internalFetchTrendingVideos instead.");
    return { success: true, count: 0 };
  },
});

export const storeNicheInternal = internalMutation({
  args: {
    name: v.string(),
    description: v.string(),
    score: v.number(),
    category: v.string(),
    competition: v.string(),
    potential: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("niches")
      .filter(q => q.eq(q.field("name"), args.name))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("niches", {
        ...args,
        updatedAt: Date.now(),
      });
    }
  },
});