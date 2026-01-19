import { v } from "convex/values";
import { query, internalMutation } from "./_generated/server";

export const storeGames = internalMutation({
  args: {
    games: v.array(v.object({
      name: v.string(),
      description: v.string(),
      gameId: v.string(),
      creatorName: v.string(),
      playing: v.number(),
      visits: v.number(),
      upVotes: v.number(),
      downVotes: v.number(),
      thumbnailUrl: v.string(),
      updatedAt: v.number(),
      rawStats: v.any(),
    }))
  },
  handler: async (ctx, args) => {
    for (const game of args.games) {
      const existing = await ctx.db
        .query("robloxGames")
        .withIndex("by_gameId", (q) => q.eq("gameId", game.gameId))
        .first();
        
      if (existing) {
        await ctx.db.patch(existing._id, game);
      } else {
        await ctx.db.insert("robloxGames", game);
      }
    }
  }
});

export const getTrendingGames = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    return await ctx.db
      .query("robloxGames")
      .withIndex("by_playing")
      .order("desc")
      .take(limit);
  },
});