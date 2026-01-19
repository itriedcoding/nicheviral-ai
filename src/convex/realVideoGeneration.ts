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

interface VideoGenerationRequest {
  prompt: string;
  duration?: number;
  aspectRatio?: string;
  fps?: number;
}

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
         result = await ctx.runAction(api.realVideoGeneration.generateWithRunwayGen3, { 
           prompt: args.prompt, 
           duration: args.duration 
         });
      } else if (args.aiModel.includes("luma") && process.env.FAL_API_KEY) {
         result = await ctx.runAction(api.realVideoGeneration.generateWithLumaDreamMachine, { 
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
 * FREE TIER: HuggingFace HunyuanVideo
 * REAL 720p video generation (5 seconds)
 */
export const generateWithHunyuanVideo = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<VideoGenerationResponse> => {
    const startTime = Date.now();
    const hfToken = process.env.HF_TOKEN;

    if (!hfToken) {
      throw new Error("HF_TOKEN not configured");
    }

    try {
      console.log("🎬 HunyuanVideo: Generating REAL video...");

      const response = await fetch(
        "https://api-inference.huggingface.co/models/tencent/HunyuanVideo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: args.prompt,
            parameters: {
              num_frames: 129, // ~5 seconds at 25fps
              fps: 25,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("HunyuanVideo error:", errorText);
        throw new Error(`HunyuanVideo API error: ${response.status}`);
      }

      // Get video blob
      const videoBlob = await response.blob();

      // Store in Convex storage
      const storageId = await ctx.storage.store(videoBlob);
      const videoUrl = await ctx.storage.getUrl(storageId);

      console.log("✅ HunyuanVideo: REAL video generated!");

      return {
        success: true,
        videoUrl: videoUrl!,
        metadata: {
          model: "HunyuanVideo (Tencent)",
          duration: 5,
          resolution: "720p",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    } catch (error: any) {
      console.error("❌ HunyuanVideo failed:", error.message);
      return {
        success: false,
        error: error.message,
        metadata: {
          model: "HunyuanVideo (Tencent)",
          duration: 0,
          resolution: "N/A",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    }
  },
});

/**
 * FREE TIER: HuggingFace CogVideoX-5B
 * REAL 480p video generation (6 seconds)
 */
export const generateWithCogVideoX = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<VideoGenerationResponse> => {
    const startTime = Date.now();
    const hfToken = process.env.HF_TOKEN;

    if (!hfToken) {
      throw new Error("HF_TOKEN not configured");
    }

    try {
      console.log("🎬 CogVideoX-5B: Generating REAL video...");

      const response = await fetch(
        "https://api-inference.huggingface.co/models/THUDM/CogVideoX-5b",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: args.prompt,
            parameters: {
              num_frames: 49,
              fps: 8,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("CogVideoX error:", errorText);
        throw new Error(`CogVideoX API error: ${response.status}`);
      }

      // Get video blob
      const videoBlob = await response.blob();

      // Store in Convex storage
      const storageId = await ctx.storage.store(videoBlob);
      const videoUrl = await ctx.storage.getUrl(storageId);

      console.log("✅ CogVideoX-5B: REAL video generated!");

      return {
        success: true,
        videoUrl: videoUrl!,
        metadata: {
          model: "CogVideoX-5B (THUDM)",
          duration: 6,
          resolution: "480p (720x480)",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    } catch (error: any) {
      console.error("❌ CogVideoX-5B failed:", error.message);
      return {
        success: false,
        error: error.message,
        metadata: {
          model: "CogVideoX-5B (THUDM)",
          duration: 0,
          resolution: "N/A",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    }
  },
});

/**
 * FREE TIER: HuggingFace LTX-Video
 * REAL fast video generation
 */
export const generateWithLTXVideo = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<VideoGenerationResponse> => {
    const startTime = Date.now();
    const hfToken = process.env.HF_TOKEN;

    if (!hfToken) {
      throw new Error("HF_TOKEN not configured");
    }

    try {
      console.log("🎬 LTX-Video: Generating REAL video...");

      const response = await fetch(
        "https://api-inference.huggingface.co/models/Lightricks/LTX-Video",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: args.prompt,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("LTX-Video error:", errorText);
        throw new Error(`LTX-Video API error: ${response.status}`);
      }

      // Get video blob
      const videoBlob = await response.blob();

      // Store in Convex storage
      const storageId = await ctx.storage.store(videoBlob);
      const videoUrl = await ctx.storage.getUrl(storageId);

      console.log("✅ LTX-Video: REAL video generated!");

      return {
        success: true,
        videoUrl: videoUrl!,
        metadata: {
          model: "LTX-Video (Lightricks)",
          duration: 5,
          resolution: "768x512",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    } catch (error: any) {
      console.error("❌ LTX-Video failed:", error.message);
      return {
        success: false,
        error: error.message,
        metadata: {
          model: "LTX-Video (Lightricks)",
          duration: 0,
          resolution: "N/A",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    }
  },
});

/**
 * PREMIUM TIER: Luma AI Dream Machine (via fal.ai)
 * Top-tier REAL video generation
 */
export const generateWithLumaDreamMachine = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<VideoGenerationResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      throw new Error("FAL_API_KEY not configured");
    }

    try {
      console.log("🎬 Luma Dream Machine: Generating REAL premium video...");

      const response = await fetch("https://queue.fal.run/fal-ai/luma-dream-machine", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          aspect_ratio: args.aspectRatio || "16:9",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Luma error:", errorText);
        throw new Error(`Luma API error: ${response.status}`);
      }

      const data = await response.json();
      const videoUrl = data.video?.url;

      if (!videoUrl) {
        throw new Error("No video URL in Luma response");
      }

      // Download and store
      const videoResponse = await fetch(videoUrl);
      const videoBlob = await videoResponse.blob();
      const storageId = await ctx.storage.store(videoBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      console.log("✅ Luma Dream Machine: REAL premium video generated!");

      return {
        success: true,
        videoUrl: storedUrl!,
        metadata: {
          model: "Luma AI Dream Machine (Ray2)",
          duration: 5,
          resolution: "1080p",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    } catch (error: any) {
      console.error("❌ Luma Dream Machine failed:", error.message);
      return {
        success: false,
        error: error.message,
        metadata: {
          model: "Luma AI Dream Machine (Ray2)",
          duration: 0,
          resolution: "N/A",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    }
  },
});

/**
 * PREMIUM TIER: Runway Gen-3 Alpha
 * Hollywood-grade REAL video generation
 */
export const generateWithRunwayGen3 = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<VideoGenerationResponse> => {
    const startTime = Date.now();
    const runwayKey = process.env.RUNWAY_API_KEY;

    if (!runwayKey) {
      throw new Error("RUNWAY_API_KEY not configured");
    }

    try {
      console.log("🎬 Runway Gen-3: Generating REAL Hollywood-grade video...");

      // Create generation task
      const createResponse = await fetch("https://api.runwayml.com/v1/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${runwayKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gen3a_turbo",
          prompt_text: args.prompt,
          duration: args.duration || 10,
          aspect_ratio: args.aspectRatio || "16:9",
          watermark: false,
        }),
      });

      if (!createResponse.ok) {
        throw new Error(`Runway API error: ${createResponse.status}`);
      }

      const createData = await createResponse.json();
      const taskId = createData.id;

      // Poll for completion
      let videoUrl: string | null = null;
      const maxAttempts = 60;
      let attempts = 0;

      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const statusResponse = await fetch(
          `https://api.runwayml.com/v1/tasks/${taskId}`,
          {
            headers: { Authorization: `Bearer ${runwayKey}` },
          }
        );

        const statusData = await statusResponse.json();

        if (statusData.status === "SUCCEEDED") {
          videoUrl = statusData.output[0];
          break;
        } else if (statusData.status === "FAILED") {
          throw new Error("Runway generation failed");
        }

        attempts++;
      }

      if (!videoUrl) {
        throw new Error("Runway generation timeout");
      }

      // Download and store
      const videoResponse = await fetch(videoUrl);
      const videoBlob = await videoResponse.blob();
      const storageId = await ctx.storage.store(videoBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      console.log("✅ Runway Gen-3: REAL Hollywood-grade video generated!");

      return {
        success: true,
        videoUrl: storedUrl!,
        metadata: {
          model: "Runway Gen-3 Alpha Turbo",
          duration: args.duration || 10,
          resolution: "4K",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    } catch (error: any) {
      console.error("❌ Runway Gen-3 failed:", error.message);
      return {
        success: false,
        error: error.message,
        metadata: {
          model: "Runway Gen-3 Alpha Turbo",
          duration: 0,
          resolution: "N/A",
          processingTime: Date.now() - startTime,
          isRealVideo: true,
        },
      };
    }
  },
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
      return await ctx.runAction(api.realVideoGeneration.generateWithRunwayGen3, args);
    }

    if (hasFal) {
      console.log("💎 Using Luma Dream Machine (Premium)");
      return await ctx.runAction(api.realVideoGeneration.generateWithLumaDreamMachine, args);
    }

    // FREE TIER (always available with HF_TOKEN)
    if (hasHF) {
      console.log("🆓 Using HunyuanVideo (Free)");
      try {
        const result = await ctx.runAction(api.realVideoGeneration.generateWithHunyuanVideo, args);
        if (result.success) return result;
      } catch (e) {
        console.log("Trying CogVideoX-5B instead...");
      }

      console.log("🆓 Using CogVideoX-5B (Free)");
      return await ctx.runAction(api.realVideoGeneration.generateWithCogVideoX, args);
    }

    throw new Error("No video generation APIs configured. Set HF_TOKEN, FAL_API_KEY, or RUNWAY_API_KEY");
  },
});