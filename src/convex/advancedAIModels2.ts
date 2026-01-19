"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * ADVANCED AI MODELS PART 2
 *
 * Categories continued:
 * - AUDIO/VOICE GENERATION
 * - IMAGE UPSCALING/ENHANCEMENT
 * - ANIMATION/MOTION
 * - SPECIALIZED MODELS
 */

interface ModelResponse {
  success: boolean;
  url?: string;
  audioUrl?: string;
  imageUrl?: string;
  metadata: {
    model: string;
    category: string;
    processingTime: number;
    quality: string;
  };
  error?: string;
}

// ============================================
// CATEGORY 3: AUDIO/VOICE GENERATION
// ============================================

/**
 * FAL.AI: ELEVENLABS TURBO V3
 * Best voice cloning and TTS
 */
export const falElevenLabsTurbo = action({
  args: {
    text: v.string(),
    voice: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "ElevenLabs Turbo v3",
          category: "Audio/Voice",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/elevenlabs-text-to-speech", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: args.text,
          voice_id: args.voice || "ErXwobaYiN019PkySvjV", // Antoni voice
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const audioUrl = data.audio_url;

      if (!audioUrl) throw new Error("No audio URL in response");

      const audioBlob = await fetch(audioUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(audioBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        audioUrl: storedUrl!,
        metadata: {
          model: "ElevenLabs Turbo v3",
          category: "Audio/Voice",
          processingTime: Date.now() - startTime,
          quality: "Professional Voice",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "ElevenLabs Turbo v3",
          category: "Audio/Voice",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: STABLE AUDIO
 * Music and sound generation
 */
export const falStableAudio = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Stable Audio",
          category: "Audio/Music",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/stable-audio", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          seconds_total: args.duration || 10,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const audioUrl = data.audio_file?.url;

      if (!audioUrl) throw new Error("No audio URL in response");

      const audioBlob = await fetch(audioUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(audioBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        audioUrl: storedUrl!,
        metadata: {
          model: "Stable Audio",
          category: "Audio/Music",
          processingTime: Date.now() - startTime,
          quality: "Professional Music",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Stable Audio",
          category: "Audio/Music",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: MUSICGEN
 * Facebook's music generation model
 */
export const falMusicGen = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "MusicGen",
          category: "Audio/Music",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/musicgen", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          duration: args.duration || 10,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const audioUrl = data.audio_file?.url;

      if (!audioUrl) throw new Error("No audio URL in response");

      const audioBlob = await fetch(audioUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(audioBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        audioUrl: storedUrl!,
        metadata: {
          model: "MusicGen (Meta)",
          category: "Audio/Music",
          processingTime: Date.now() - startTime,
          quality: "AI Music",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "MusicGen (Meta)",
          category: "Audio/Music",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

// ============================================
// CATEGORY 4: IMAGE UPSCALING/ENHANCEMENT
// ============================================

/**
 * FAL.AI: CLARITY UPSCALER
 * Universal image upscaling
 */
export const falClarityUpscaler = action({
  args: {
    imageUrl: v.string(),
    scale: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Clarity Upscaler",
          category: "Image Enhancement",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/clarity-upscaler", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: args.imageUrl,
          scale: args.scale || 2,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const imageUrl = data.image?.url;

      if (!imageUrl) throw new Error("No image URL in response");

      const imageBlob = await fetch(imageUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(imageBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        imageUrl: storedUrl!,
        metadata: {
          model: "Clarity Upscaler",
          category: "Image Enhancement",
          processingTime: Date.now() - startTime,
          quality: "Enhanced",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Clarity Upscaler",
          category: "Image Enhancement",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: CCSR (Real-ESRGAN successor)
 * Advanced image restoration and upscaling
 */
export const falCCSR = action({
  args: {
    imageUrl: v.string(),
    scale: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "CCSR",
          category: "Image Enhancement",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/ccsr", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: args.imageUrl,
          scale: args.scale || 4,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const imageUrl = data.image?.url;

      if (!imageUrl) throw new Error("No image URL in response");

      const imageBlob = await fetch(imageUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(imageBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        imageUrl: storedUrl!,
        metadata: {
          model: "CCSR",
          category: "Image Enhancement",
          processingTime: Date.now() - startTime,
          quality: "Super Resolution",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "CCSR",
          category: "Image Enhancement",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: FACE RESTORE (GFPGAN)
 * Face enhancement and restoration
 */
export const falFaceRestore = action({
  args: {
    imageUrl: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Face Restore (GFPGAN)",
          category: "Image Enhancement",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/face-to-sticker", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: args.imageUrl,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const imageUrl = data.image?.url;

      if (!imageUrl) throw new Error("No image URL in response");

      const imageBlob = await fetch(imageUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(imageBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        imageUrl: storedUrl!,
        metadata: {
          model: "Face Restore (GFPGAN)",
          category: "Image Enhancement",
          processingTime: Date.now() - startTime,
          quality: "Face Enhanced",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Face Restore (GFPGAN)",
          category: "Image Enhancement",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

// ============================================
// CATEGORY 5: ANIMATION/MOTION MODELS
// ============================================

/**
 * FAL.AI: ANIMATE DIFF
 * Turn images into animations
 */
export const falAnimateDiff = action({
  args: {
    prompt: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "AnimateDiff",
          category: "Animation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/animatediff", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          image_url: args.imageUrl,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const videoUrl = data.video?.url;

      if (!videoUrl) throw new Error("No video URL in response");

      const videoBlob = await fetch(videoUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(videoBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        url: storedUrl!,
        metadata: {
          model: "AnimateDiff",
          category: "Animation",
          processingTime: Date.now() - startTime,
          quality: "Animated",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "AnimateDiff",
          category: "Animation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: STABLE VIDEO DIFFUSION
 * Open source video generation
 */
export const falStableVideoDiffusion = action({
  args: {
    imageUrl: v.string(),
    motionBucketId: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Stable Video Diffusion",
          category: "Animation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/stable-video-diffusion", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: args.imageUrl,
          motion_bucket_id: args.motionBucketId || 127,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const videoUrl = data.video?.url;

      if (!videoUrl) throw new Error("No video URL in response");

      const videoBlob = await fetch(videoUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(videoBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        url: storedUrl!,
        metadata: {
          model: "Stable Video Diffusion",
          category: "Animation",
          processingTime: Date.now() - startTime,
          quality: "Image-to-Video",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Stable Video Diffusion",
          category: "Animation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

// ============================================
// SPECIALIZED MODELS
// ============================================

/**
 * FAL.AI: IDEOGRAM V2
 * Text-in-images specialist
 */
export const falIdeogram = action({
  args: {
    prompt: v.string(),
    imageSize: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Ideogram v2",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/ideogram", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          image_size: args.imageSize || "landscape_16_9",
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const imageUrl = data.images?.[0]?.url;

      if (!imageUrl) throw new Error("No image URL in response");

      const imageBlob = await fetch(imageUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(imageBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        imageUrl: storedUrl!,
        metadata: {
          model: "Ideogram v2",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "Text-in-Image Specialist",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Ideogram v2",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: OMNIGEN
 * Universal image editing and generation
 */
export const falOmniGen = action({
  args: {
    prompt: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "OmniGen",
          category: "Image Editing",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/omnigen-v1", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          image_url: args.imageUrl,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const imageUrl = data.images?.[0]?.url;

      if (!imageUrl) throw new Error("No image URL in response");

      const imageBlob = await fetch(imageUrl).then((r) => r.blob());
      const storageId = await ctx.storage.store(imageBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        imageUrl: storedUrl!,
        metadata: {
          model: "OmniGen v1",
          category: "Image Editing",
          processingTime: Date.now() - startTime,
          quality: "Universal Editor",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "OmniGen v1",
          category: "Image Editing",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * GET ALL AVAILABLE MODELS
 */
export const getAllAdvancedModels = action({
  args: {},
  handler: async () => {
    const hasRunway = !!process.env.RUNWAY_API_KEY;
    const hasFal = !!process.env.FAL_API_KEY;
    const hasHF = !!process.env.HF_TOKEN;

    return {
      configured: { runway: hasRunway, fal: hasFal, hf: hasHF },
      totalModels: 35,
      categories: {
        videoGeneration: 10,
        imageGeneration: 15,
        audioVoice: 5,
        upscalingEnhancement: 5,
      },
    };
  },
});
