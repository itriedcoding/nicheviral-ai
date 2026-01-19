"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

// YouTube API integration for fetching trending niches
export const fetchTrendingVideos = action({
  args: {
    category: v.optional(v.string()),
    maxResults: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.warn("YouTube API key not configured. Returning empty list to prevent crash.");
      return {
        success: false,
        error: "YouTube API key is missing. Please configure YOUTUBE_API_KEY in your environment variables.",
        niches: []
      };
    }

    try {
      const maxResults = args.maxResults || 50;
      const regionCode = "US";

      // Fetch trending videos
      const trendingUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}&key=${apiKey}${args.category ? `&videoCategoryId=${args.category}` : ""}`;

      const response = await fetch(trendingUrl);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`YouTube API error: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.items) {
        return {
          success: true,
          count: 0,
          niches: [],
        };
      }

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
        await ctx.runMutation(internal.youtubeQueries.storeNiche, niche);
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
        niches: []
      };
    }
  },
});

export const internalFetchTrendingVideos = internalAction({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.log("Skipping YouTube trend fetch: No API key");
      return;
    }

    try {
      // Fetch trending videos (US region, max 50)
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=US&key=${apiKey}`
      );

      if (!response.ok) return;
      const data = await response.json();
      if (!data.items) return;

      const niches = data.items.map((item: any) => {
        const snippet = item.snippet;
        const statistics = item.statistics;
        const views = parseInt(statistics.viewCount || "0");
        const likes = parseInt(statistics.likeCount || "0");
        const comments = parseInt(statistics.commentCount || "0");
        const engagementRate = views > 0 ? ((likes + comments) / views) * 100 : 0;
        const trendScore = Math.min(100, Math.round((Math.log10(views + 1) * 10) + (engagementRate * 2)));

        return {
          title: snippet.title,
          description: snippet.description || "",
          category: snippet.categoryId || "unknown",
          trendScore,
          searchVolume: views,
          competitionLevel: trendScore > 70 ? "high" : trendScore > 40 ? "medium" : "low",
          keywords: [], // Simplified for cron
          thumbnailUrl: snippet.thumbnails?.high?.url,
          youtubeData: {
            videoId: item.id,
            channelId: snippet.channelId,
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            statistics,
          },
        };
      });

      for (const niche of niches) {
        await ctx.runMutation(internal.youtubeQueries.storeNiche, niche);
      }
      console.log(`Updated ${niches.length} trending niches from YouTube`);
    } catch (e) {
      console.error("Failed to fetch trending videos in cron:", e);
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
      return {
        success: false,
        error: "YouTube API key not configured",
        niches: []
      };
    }

    try {
      const maxResults = args.maxResults || 25;
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(args.query)}&maxResults=${maxResults}&type=video&order=viewCount&key=${apiKey}`;

      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        return {
          success: true,
          count: 0,
          niches: [],
        };
      }

      // Get detailed statistics for each video
      const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
      const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`;

      const statsResponse = await fetch(statsUrl);
      const statsData = await statsResponse.json();

      const statsMap = new Map();
      if (statsData.items) {
        statsData.items.forEach((item: any) => {
          statsMap.set(item.id, item.statistics);
        });
      }

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
        niches: []
      };
    }
  },
});