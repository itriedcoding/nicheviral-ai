"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

// Fetch trending games from Roblox API
export const fetchTrendingGames = internalAction({
  args: {},
  handler: async (ctx) => {
    try {
      // Roblox Games API - Sort 1 is usually "Popular" or "Recommended"
      const response = await fetch(
        "https://games.roblox.com/v1/games/list?sortToken=&maxRows=40&sortOrder=Desc&sortFilter=1",
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
        console.error("Roblox API Error:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      
      if (!data.games || !Array.isArray(data.games)) {
        console.error("Invalid Roblox API response format");
        return;
      }

      // Get thumbnails for these games
      const universeIds = data.games.map((g: any) => g.universeId || g.placeId).join(",");
      
      const thumbnailResponse = await fetch(
        `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds}&size=512x512&format=Png&isCircular=false`
      );
      
      let thumbnails: Record<string, string> = {};
      if (thumbnailResponse.ok) {
        const thumbData = await thumbnailResponse.json();
        if (thumbData.data) {
          thumbData.data.forEach((t: any) => {
            thumbnails[t.targetId] = t.imageUrl;
          });
        }
      }

      const games = data.games.map((game: any) => ({
        name: game.name,
        description: game.gameDescription || "No description available",
        gameId: String(game.placeId),
        creatorName: game.creatorName,
        playing: game.playerCount || 0,
        visits: game.totalUpVotes + game.totalDownVotes, 
        upVotes: game.totalUpVotes || 0,
        downVotes: game.totalDownVotes || 0,
        thumbnailUrl: thumbnails[game.universeId] || "https://t3.rbxcdn.com/c426ac2352c4d454910945d753b737d7",
        updatedAt: Date.now(),
        rawStats: game
      }));

      // Store in database
      await ctx.runMutation(internal.robloxData.storeGames, { games });
      
      console.log(`Updated ${games.length} Roblox games`);
    } catch (error) {
      console.error("Failed to fetch Roblox games:", error);
    }
  },
});