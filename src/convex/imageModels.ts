"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";

interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  metadata?: any;
}

/**
 * DALL-E 3 (OpenAI)
 * High quality, follows prompts well
 */
export const generateWithDallE3 = action({
  args: {
    prompt: v.string(),
    size: v.optional(v.string()),
    quality: v.optional(v.string()),
    n: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ImageGenerationResponse> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: args.prompt,
          size: args.size || "1024x1024",
          quality: args.quality || "standard",
          n: 1,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "DALL-E 3 generation failed");
      }

      const data = await response.json();
      return {
        success: true,
        imageUrl: data.data[0].url,
        metadata: { model: "dall-e-3", provider: "OpenAI" }
      };
    } catch (error: any) {
      console.error("DALL-E 3 error:", error);
      return { success: false, error: error.message };
    }
  },
});

/**
 * DALL-E 2 (OpenAI)
 * Faster, cheaper, less detail
 */
export const generateWithDallE2 = action({
  args: {
    prompt: v.string(),
    size: v.optional(v.string()),
    n: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<ImageGenerationResponse> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-2",
          prompt: args.prompt,
          size: args.size || "1024x1024",
          n: args.n || 1,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "DALL-E 2 generation failed");
      }

      const data = await response.json();
      return {
        success: true,
        imageUrl: data.data[0].url,
        metadata: { model: "dall-e-2", provider: "OpenAI" }
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

/**
 * Flux Schnell (Black Forest Labs via HuggingFace)
 * Free, fast, good quality
 */
export const generateWithFluxSchnell = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ImageGenerationResponse> => {
    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) throw new Error("HF_TOKEN not configured for Flux");

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: args.prompt }),
        }
      );

      // Handle 410 (Gone) or 503 (Overloaded) by falling back to SDXL Lightning
      if (!response.ok) {
        if (response.status === 410 || response.status === 503 || response.status === 404) {
          console.log(`Flux Schnell unavailable (${response.status}), falling back to SDXL Lightning...`);
          
          const sdxlResponse = await fetch(
            "https://api-inference.huggingface.co/models/ByteDance/SDXL-Lightning",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${hfToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ inputs: args.prompt }),
            }
          );

          if (!sdxlResponse.ok) {
            throw new Error(`Flux fallback (SDXL) failed: ${sdxlResponse.status}`);
          }

          const blob = await sdxlResponse.blob();
          const storageId = await ctx.storage.store(blob);
          const imageUrl = await ctx.storage.getUrl(storageId);

          return {
            success: true,
            imageUrl: imageUrl!,
            metadata: { model: "sdxl-lightning-fallback", provider: "ByteDance (HF)" }
          };
        }
        
        throw new Error(`Flux API error: ${response.status}`);
      }

      const blob = await response.blob();
      const storageId = await ctx.storage.store(blob);
      const imageUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        imageUrl: imageUrl!,
        metadata: { model: "flux-schnell", provider: "Black Forest Labs (HF)" }
      };
    } catch (error: any) {
      console.error("Flux error:", error);
      return { success: false, error: error.message };
    }
  },
});

/**
 * SDXL Lightning (ByteDance via HuggingFace)
 * Extremely fast, free
 */
export const generateWithSDXLLightning = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args): Promise<ImageGenerationResponse> => {
    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) throw new Error("HF_TOKEN not configured for SDXL");

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ByteDance/SDXL-Lightning",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: args.prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`SDXL API error: ${response.status}`);
      }

      const blob = await response.blob();
      const storageId = await ctx.storage.store(blob);
      const imageUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        imageUrl: imageUrl!,
        metadata: { model: "sdxl-lightning", provider: "ByteDance (HF)" }
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});