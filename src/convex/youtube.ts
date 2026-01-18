"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// YouTube API integration for fetching trending niches
export const fetchTrendingVideos = action({
  args: {
    category: v.optional(v.string()),
    maxResults: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error("YouTube API key not configured. Please add YOUTUBE_API_KEY to environment variables.");
    }

    try {
      const maxResults = args.maxResults || 50;
      const regionCode = "US";

      // Fetch trending videos
      const trendingUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}&key=${apiKey}${args.category ? `&videoCategoryId=${args.category}` : ""}`;

      const response = await fetch(trendingUrl);

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Process and store niches
      const niches = data.items.map((item: any) => {
        const snippet = item.snippet;
        const statistics = item.statistics;

        // Calculate trend score based on views, likes, and comments
        const views = parseInt(statistics.viewCount || "0");
        const likes = parseInt(statistics.likeCount || "0");
        const comments = parseInt(statistics.commentCount || "0");

        const engagementRate = views > 0 ? ((likes + comments) / views) * 100 : 0;
        const trendScore = Math.min(100, Math.round((Math.log10(views + 1) * 10) + (engagementRate * 2)));

        // Extract keywords from title and description
        const text = `${snippet.title} ${snippet.description}`.toLowerCase();
        const keywords = text
          .split(/\W+/)
          .filter((word: string) => word.length > 4)
          .slice(0, 10);

        return {
          title: snippet.title,
          description: snippet.description || "",
          category: snippet.categoryId || "unknown",
          trendScore,
          searchVolume: views,
          competitionLevel: trendScore > 70 ? "high" : trendScore > 40 ? "medium" : "low",
          keywords: Array.from(new Set(keywords)),
          thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
          youtubeData: {
            videoId: item.id,
            channelId: snippet.channelId,
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            statistics,
          },
        };
      });

      // Store niches in database
      for (const niche of niches) {
        await ctx.runMutation(api.youtubeQueries.storeNiche, niche);
      }

      return {
        success: true,
        count: niches.length,
        niches: niches.slice(0, 10), // Return first 10 for preview
      };
    } catch (error: any) {
      console.error("YouTube API error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});

// Search YouTube for specific niches
export const searchNiches = action({
  args: {
    query: v.string(),
    maxResults: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error("YouTube API key not configured");
    }

    try {
      const maxResults = args.maxResults || 25;
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(args.query)}&maxResults=${maxResults}&type=video&order=viewCount&key=${apiKey}`;

      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Get detailed statistics for each video
      const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
      const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`;

      const statsResponse = await fetch(statsUrl);
      const statsData = await statsResponse.json();

      const statsMap = new Map();
      statsData.items.forEach((item: any) => {
        statsMap.set(item.id, item.statistics);
      });

      const niches = data.items.map((item: any) => {
        const snippet = item.snippet;
        const statistics = statsMap.get(item.id.videoId) || {};

        const views = parseInt(statistics.viewCount || "0");
        const likes = parseInt(statistics.likeCount || "0");
        const comments = parseInt(statistics.commentCount || "0");

        const engagementRate = views > 0 ? ((likes + comments) / views) * 100 : 0;
        const trendScore = Math.min(100, Math.round((Math.log10(views + 1) * 10) + (engagementRate * 2)));

        const text = `${snippet.title} ${snippet.description}`.toLowerCase();
        const keywords = text
          .split(/\W+/)
          .filter((word: string) => word.length > 4)
          .slice(0, 10);

        return {
          title: snippet.title,
          description: snippet.description || "",
          category: "search",
          trendScore,
          searchVolume: views,
          competitionLevel: trendScore > 70 ? "high" : trendScore > 40 ? "medium" : "low",
          keywords: Array.from(new Set(keywords)),
          thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
          youtubeData: {
            videoId: item.id.videoId,
            channelId: snippet.channelId,
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            statistics,
          },
        };
      });

      return {
        success: true,
        count: niches.length,
        niches,
      };
    } catch (error: any) {
      console.error("YouTube search error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});
