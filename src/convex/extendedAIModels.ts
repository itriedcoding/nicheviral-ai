"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * EXTENDED AI MODELS - ADDITIONAL 20+ MODELS
 *
 * Adding more specialized models from Fal.ai and other providers:
 * - More video models (including image-to-video)
 * - More image models (specialized use cases)
 * - Background removal
 * - Face swap / animation
 * - 3D generation
 *
 * ALL REAL API INTEGRATIONS - NO FAKE OR MOCK
 */

interface ModelResponse {
  success: boolean;
  url?: string;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  metadata: {
    model: string;
    category: string;
    processingTime: number;
    quality: string;
  };
  error?: string;
}

// ============================================
// VIDEO MODELS (Extended)
// ============================================

/**
 * FAL.AI: MOCHI 1 (Genmo)
 * High-quality open source video model
 */
export const falMochi1 = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Mochi 1 (Genmo)",
          category: "Video Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/mochi-v1", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
        videoUrl: storedUrl!,
        metadata: {
          model: "Mochi 1 (Genmo)",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "1080p Open Source",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Mochi 1 (Genmo)",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: RUNWAY GEN-2
 * Previous generation Runway model
 */
export const falRunwayGen2 = action({
  args: {
    imageUrl: v.string(),
    prompt: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Runway Gen-2",
          category: "Image-to-Video",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/runway-gen2", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: args.imageUrl,
          prompt: args.prompt,
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
        videoUrl: storedUrl!,
        metadata: {
          model: "Runway Gen-2",
          category: "Image-to-Video",
          processingTime: Date.now() - startTime,
          quality: "720p Image Animation",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Runway Gen-2",
          category: "Image-to-Video",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: HUNYUAN VIDEO (Image-to-Video)
 * Image animation with Hunyuan
 */
export const falHunyuanImageToVideo = action({
  args: {
    imageUrl: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Hunyuan Image-to-Video",
          category: "Image-to-Video",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/hunyuan-video/image-to-video", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: args.imageUrl,
          prompt: args.prompt,
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
        videoUrl: storedUrl!,
        metadata: {
          model: "Hunyuan Image-to-Video",
          category: "Image-to-Video",
          processingTime: Date.now() - startTime,
          quality: "720p Animation",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Hunyuan Image-to-Video",
          category: "Image-to-Video",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

// ============================================
// IMAGE MODELS (Extended - Including Background Removal)
// ============================================

/**
 * FAL.AI: AURA FLOW
 * Fast high-quality image generation
 */
export const falAuraFlow = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Aura Flow",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/aura-flow", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
          model: "Aura Flow",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "High Quality Fast",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Aura Flow",
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
 * FAL.AI: REMBG (Background Removal)
 * Professional background removal
 */
export const falBackgroundRemoval = action({
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
          model: "Background Removal",
          category: "Image Editing",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/imageutils/rembg", {
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
          model: "Rembg Background Removal",
          category: "Image Editing",
          processingTime: Date.now() - startTime,
          quality: "Professional",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Rembg Background Removal",
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
 * FAL.AI: FACE SWAP
 * AI-powered face swapping
 */
export const falFaceSwap = action({
  args: {
    sourceImageUrl: v.string(),
    targetImageUrl: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Face Swap",
          category: "Image Editing",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/face-swap", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base_image_url: args.targetImageUrl,
          swap_image_url: args.sourceImageUrl,
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
          model: "Face Swap AI",
          category: "Image Editing",
          processingTime: Date.now() - startTime,
          quality: "Realistic",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Face Swap AI",
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
 * FAL.AI: PHOTOMAKER
 * Personalized image generation
 */
export const falPhotomaker = action({
  args: {
    prompt: v.string(),
    inputImages: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Photomaker",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/photomaker", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          input_images: args.inputImages,
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
          model: "Photomaker",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "Personalized",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Photomaker",
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
 * FAL.AI: KOLORS
 * Advanced Chinese text-to-image model
 */
export const falKolors = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Kolors",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/kolors", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
          model: "Kolors",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "High (Chinese Model)",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Kolors",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

// ============================================
// 3D GENERATION
// ============================================

/**
 * FAL.AI: TRELLIS (Meshy)
 * 3D model generation from images
 */
export const falTrellis3D = action({
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
          model: "Trellis 3D",
          category: "3D Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/trellis", {
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
      const modelUrl = data.model?.url;

      if (!modelUrl) throw new Error("No 3D model URL in response");

      return {
        success: true,
        url: modelUrl,
        metadata: {
          model: "Trellis 3D (Meshy)",
          category: "3D Generation",
          processingTime: Date.now() - startTime,
          quality: "3D GLB Model",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Trellis 3D (Meshy)",
          category: "3D Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * GET ALL EXTENDED MODELS LIST
 */
export const getExtendedModelsList = action({
  args: {},
  handler: async () => {
    const hasFal = !!process.env.FAL_API_KEY;
    const hasHF = !!process.env.HF_TOKEN;

    return {
      configured: { fal: hasFal, hf: hasHF },
      models: {
        video: [
          "Mochi 1 (Genmo) - 1080p Open Source",
          "Runway Gen-2 - Image-to-Video",
          "Hunyuan Image-to-Video - 720p Animation",
        ],
        image: [
          "Aura Flow - Fast High Quality",
          "Photomaker - Personalized Generation",
          "Kolors - Chinese Model",
        ],
        editing: [
          "Background Removal (Rembg) - Professional",
          "Face Swap - Realistic",
        ],
        "3d": [
          "Trellis 3D (Meshy) - Image to 3D",
        ],
      },
      totalAdditionalModels: 9,
    };
  },
});

// ============================================
// ADDITIONAL NEW MODELS - NO DUPLICATES
// ============================================

/**
 * FAL.AI: KLING VIDEO
 * High-quality Chinese video model
 */
export const falKlingVideo = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Kling Video",
          category: "Video Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/kling-video/v1/standard/text-to-video", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          duration: args.duration || "5",
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
        videoUrl: storedUrl!,
        metadata: {
          model: "Kling Video",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "1080p Professional",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Kling Video",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: MINIMAX VIDEO
 * Fast Chinese video generation
 */
export const falMinimaxVideo = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Minimax Video",
          category: "Video Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/minimax/video-01", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
        videoUrl: storedUrl!,
        metadata: {
          model: "Minimax Video-01",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "720p Fast",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Minimax Video-01",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: HAIPER VIDEO
 * Fast video generation
 */
export const falHaiperVideo = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Haiper Video",
          category: "Video Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/haiper-video-v2", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
        videoUrl: storedUrl!,
        metadata: {
          model: "Haiper Video v2",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "HD Fast",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Haiper Video v2",
          category: "Video Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});

/**
 * FAL.AI: SDXL TURBO
 * Ultra-fast image generation
 */
export const falSDXLTurbo = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "SDXL Turbo",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/fast-sdxl", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
          model: "SDXL Turbo",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "Fast 1024x1024",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "SDXL Turbo",
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
 * FAL.AI: PLAYGROUND V2.5
 * Aesthetic image generation
 */
export const falPlaygroundV25 = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Playground v2.5",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/playground-v25", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
          model: "Playground v2.5",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "Aesthetic HD",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Playground v2.5",
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
 * FAL.AI: RECRAFT V3
 * Design-focused image generation
 */
export const falRecraftV3 = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "Recraft V3",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/recraft-v3", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
          model: "Recraft V3",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "Design Quality",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "Recraft V3",
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
 * FAL.AI: FLUX FILL (Inpainting)
 * Advanced image inpainting
 */
export const falFluxFill = action({
  args: {
    prompt: v.string(),
    imageUrl: v.string(),
    maskUrl: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "FLUX Fill",
          category: "Image Editing",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/flux/fill", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
          image_url: args.imageUrl,
          mask_url: args.maskUrl,
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
          model: "FLUX Fill (Inpainting)",
          category: "Image Editing",
          processingTime: Date.now() - startTime,
          quality: "Professional",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "FLUX Fill (Inpainting)",
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
 * FAL.AI: FLUX REDUX (Image Variations)
 * Generate variations of existing images
 */
export const falFluxRedux = action({
  args: {
    imageUrl: v.string(),
    prompt: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "FLUX Redux",
          category: "Image Editing",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/flux/redux", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: args.imageUrl,
          prompt: args.prompt || "",
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
          model: "FLUX Redux (Variations)",
          category: "Image Editing",
          processingTime: Date.now() - startTime,
          quality: "High Fidelity",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "FLUX Redux (Variations)",
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
 * FAL.AI: OMNIGEN
 * Multi-task unified image generation model
 */
export const falOmniGen = action({
  args: {
    prompt: v.string(),
    inputImages: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "OmniGen",
          category: "Image Generation",
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
          input_images: args.inputImages || [],
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
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "Multi-Task Unified",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "OmniGen v1",
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
 * FAL.AI: SD3.5 LARGE
 * Stable Diffusion 3.5 Large model
 */
export const falSD35Large = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ModelResponse> => {
    const startTime = Date.now();
    const falKey = process.env.FAL_API_KEY;

    if (!falKey) {
      return {
        success: false,
        metadata: {
          model: "SD 3.5 Large",
          category: "Image Generation",
          processingTime: 0,
          quality: "N/A",
        },
        error: "FAL_API_KEY not configured",
      };
    }

    try {
      const response = await fetch("https://queue.fal.run/fal-ai/stable-diffusion-v35-large", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: args.prompt,
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
          model: "SD 3.5 Large",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "High Detail",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        metadata: {
          model: "SD 3.5 Large",
          category: "Image Generation",
          processingTime: Date.now() - startTime,
          quality: "N/A",
        },
        error: error.message,
      };
    }
  },
});
