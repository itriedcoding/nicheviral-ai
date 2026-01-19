"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";

/**
 * REAL VIDEO GENERATION - NO SLIDESHOWS
 *
 * This file contains ONLY real video generation APIs that create
 * ACTUAL MP4/WebM videos with motion - NOT slideshows or image sequences.
 *
 * CATEGORIES:
 * 1. FREE TIER - HuggingFace models (with HF_TOKEN)
 * 2. PREMIUM TIER - Top quality paid APIs
 *
 * ALL MODELS GENERATE REAL VIDEOS WITH MOTION
 */

interface VideoGenerationResponse {
  success: boolean;
  videoUrl?: string;
  thumbnail?: string;
  metadata: {
    model: string;
    duration: number;
    resolution: string;
    processingTime: number;
    isRealVideo: boolean; // Always true
  };
  error?: string;
}

/**
 * PROCESS VIDEO GENERATION
 * Orchestrator that handles the generation process and updates the database
 */
export const processVideoGeneration = action({
  args: {
    videoId: v.id("videos"),
    prompt: v.string(),
    duration: v.optional(v.number()),
    aiModel: v.string(),
  },
  handler: async (ctx, args) => {
    // Update status to generating
    await ctx.runMutation(internal.videos.internalUpdateVideoStatus, {
      videoId: args.videoId,
      status: "generating",
    });

    try {
      console.log(`🚀 Starting video generation for ${args.videoId} with model ${args.aiModel}`);
      
      let result: VideoGenerationResponse;
      
      // Determine which model to use based on selection and availability
      // If specific premium models are requested and keys exist, use them
      if (args.aiModel.includes("runway") && process.env.RUNWAY_API_KEY) {
         result = await ctx.runAction(api.videoModels.generateWithRunwayGen3, { 
           prompt: args.prompt, 
           duration: args.duration 
         });
      } else if (args.aiModel.includes("luma") && process.env.FAL_API_KEY) {
         result = await ctx.runAction(api.videoModels.generateWithLumaDreamMachine, { 
           prompt: args.prompt, 
           duration: args.duration 
         });
      } else if (args.aiModel === "hunyuan-video") {
         // Explicitly use Hunyuan Video (Free)
         result = await ctx.runAction(api.videoModels.generateWithHunyuanVideo, { 
           prompt: args.prompt, 
           duration: args.duration 
         });
      } else if (args.aiModel === "cogvideox-5b") {
         // Explicitly use CogVideoX (Free)
         result = await ctx.runAction(api.videoModels.generateWithCogVideoX, { 
           prompt: args.prompt, 
           duration: args.duration 
         });
      } else if (args.aiModel.includes("sora") && process.env.OPENAI_API_KEY) {
         // Placeholder for Sora if it becomes available or mapped to something else
         // For now, fallback to smart selector if Sora is selected but not implemented
         result = await ctx.runAction(api.realVideoGeneration.generateRealVideo, { 
           prompt: args.prompt, 
           duration: args.duration 
         });
      } else {
         // Fallback to smart selector which checks all available keys
         // This handles the "Free" tier (HuggingFace) and auto-selection
         result = await ctx.runAction(api.realVideoGeneration.generateRealVideo, { 
           prompt: args.prompt, 
           duration: args.duration 
         });
      }

      if (result.success && result.videoUrl) {
        console.log(`✅ Video generation successful for ${args.videoId}`);
        try {
          await ctx.runMutation(internal.videos.internalUpdateVideoStatus, {
            videoId: args.videoId,
            status: "completed",
            videoUrl: result.videoUrl,
            metadata: result.metadata,
            duration: result.metadata.duration || args.duration || 0,
          });
        } catch (updateError) {
          console.error("Failed to update video status with full metadata, trying minimal update", updateError);
          // Fallback to minimal update in case metadata schema doesn't match
          await ctx.runMutation(internal.videos.internalUpdateVideoStatus, {
            videoId: args.videoId,
            status: "completed",
            videoUrl: result.videoUrl,
          });
        }
      } else {
        throw new Error(result.error || "Generation failed with unknown error");
      }
    } catch (error: any) {
      console.error(`❌ Video generation failed for ${args.videoId}:`, error);
      await ctx.runMutation(internal.videos.internalUpdateVideoStatus, {
        videoId: args.videoId,
        status: "failed",
        errorMessage: error.message || "Unknown error occurred during generation",
      });
    }
  }
});

/**
 * SMART SELECTOR: Choose best available real video model
 * Priority: Premium (if keys available) → Free (always works)
 */
export const generateRealVideo = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<VideoGenerationResponse> => {
    console.log("🎯 Selecting best REAL video generation model...");

    // Check what keys are available
    const hasRunway = !!process.env.RUNWAY_API_KEY;
    const hasFal = !!process.env.FAL_API_KEY;
    const hasHF = !!process.env.HF_TOKEN;

    // PREMIUM TIER (if keys available)
    if (hasRunway) {
      console.log("💎 Using Runway Gen-3 (Premium)");
      return await ctx.runAction(api.videoModels.generateWithRunwayGen3, args);
    }

    if (hasFal) {
      console.log("💎 Using Luma Dream Machine (Premium)");
      return await ctx.runAction(api.videoModels.generateWithLumaDreamMachine, args);
    }

    // FREE TIER (always available with HF_TOKEN)
    if (hasHF) {
      console.log("🆓 Using HunyuanVideo (Free)");
      try {
        const result = await ctx.runAction(api.videoModels.generateWithHunyuanVideo, args);
        if (result.success) return result;
      } catch (e) {
        console.log("Trying CogVideoX-5B instead...");
      }

      console.log("🆓 Using CogVideoX-5B (Free)");
      return await ctx.runAction(api.videoModels.generateWithCogVideoX, args);
    }

    throw new Error("No video generation APIs configured. Set HF_TOKEN, FAL_API_KEY, or RUNWAY_API_KEY");
  },
});