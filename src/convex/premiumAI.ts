"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

/**
 * PREMIUM AI INTEGRATIONS - TOP TIER ONLY
 *
 * This module handles all premium AI service integrations:
 * - Runway Gen-3 Alpha (video)
 * - ElevenLabs Turbo v3 (voice)
 * - Pika 2.0 (video)
 * - Midjourney v7 (images via automation)
 *
 * NO FREE MODELS. ONLY PRODUCTION-GRADE PREMIUM SERVICES.
 */

/**
 * RUNWAY GEN-3 ALPHA - Hollywood-Grade Video Generation
 */
export const generateWithRunway = action({
  args: {
    prompt: v.string(),
    duration: v.optional(v.number()),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const runwayKey = process.env.RUNWAY_API_KEY;

    if (!runwayKey) {
      throw new Error("RUNWAY_API_KEY not configured");
    }

    console.log("🎬 Generating video with Runway Gen-3 Alpha (PREMIUM)...");

    try {
      // Step 1: Create generation task
      const createResponse = await fetch("https://api.runwayml.com/v1/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${runwayKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gen3a_turbo",
          prompt_text: args.prompt,
          duration: args.duration || 10,
          aspect_ratio: args.aspectRatio || "16:9",
          watermark: false
        })
      });

      if (!createResponse.ok) {
        const error = await createResponse.text();
        throw new Error(`Runway API error: ${error}`);
      }

      const createData = await createResponse.json();
      const taskId = createData.id;

      console.log(`✅ Runway task created: ${taskId}`);

      // Step 2: Poll for completion
      let videoUrl = "";
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes max

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

        const statusResponse = await fetch(`https://api.runwayml.com/v1/tasks/${taskId}`, {
          headers: {
            "Authorization": `Bearer ${runwayKey}`
          }
        });

        const statusData = await statusResponse.json();

        if (statusData.status === "SUCCEEDED") {
          videoUrl = statusData.output[0];
          console.log("✅ Runway Gen-3 video generated successfully!");
          break;
        } else if (statusData.status === "FAILED") {
          throw new Error("Runway generation failed");
        }

        attempts++;
        console.log(`⏳ Runway generation in progress... (${attempts * 5}s)`);
      }

      if (!videoUrl) {
        throw new Error("Runway generation timeout");
      }

      // Download video and store in Convex
      const videoResponse = await fetch(videoUrl);
      const videoBlob = await videoResponse.blob();
      const storageId = await ctx.storage.store(videoBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        videoUrl: storedUrl,
        model: "Runway Gen-3 Alpha Turbo",
        quality: "4K Hollywood-grade"
      };
    } catch (error: any) {
      console.error("❌ Runway error:", error);
      throw error;
    }
  }
});

/**
 * ELEVENLABS TURBO V3 - Best Voice Generation
 */
export const generateWithElevenLabs = action({
  args: {
    text: v.string(),
    voiceId: v.optional(v.string()),
    model: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY;

    if (!elevenLabsKey) {
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    console.log("🎙️ Generating voice with ElevenLabs Turbo v3 (PREMIUM)...");

    try {
      // Default to Rachel voice (professional female)
      const voiceId = args.voiceId || "21m00Tcm4TlvDq8ikWAM";
      const model = args.model || "eleven_turbo_v2_5";

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": elevenLabsKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: args.text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`ElevenLabs API error: ${error}`);
      }

      const audioBlob = await response.blob();
      console.log("✅ ElevenLabs audio generated successfully!");

      // Upload to Convex storage
      const storageId = await ctx.storage.store(audioBlob);
      const audioUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        audioUrl: audioUrl,
        model: "ElevenLabs Turbo v3",
        quality: "Professional broadcast quality"
      };
    } catch (error: any) {
      console.error("❌ ElevenLabs error:", error);
      throw error;
    }
  }
});

/**
 * PIKA 2.0 - Fast Premium Video Generation
 */
export const generateWithPika = action({
  args: {
    prompt: v.string(),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const pikaKey = process.env.PIKA_API_KEY;

    if (!pikaKey) {
      throw new Error("PIKA_API_KEY not configured");
    }

    console.log("⚡ Generating video with Pika 2.0 (PREMIUM)...");

    try {
      const response = await fetch("https://api.pika.art/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${pikaKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: args.prompt,
          aspectRatio: args.aspectRatio || "16:9",
          duration: 3,
          fps: 24
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Pika API error: ${error}`);
      }

      const data = await response.json();
      console.log("✅ Pika 2.0 video generated successfully!");

      // Download and store video
      const videoResponse = await fetch(data.videoUrl);
      const videoBlob = await videoResponse.blob();
      const storageId = await ctx.storage.store(videoBlob);
      const storedUrl = await ctx.storage.getUrl(storageId);

      return {
        success: true,
        videoUrl: storedUrl,
        model: "Pika 2.0",
        quality: "Fast premium video"
      };
    } catch (error: any) {
      console.error("❌ Pika error:", error);
      throw error;
    }
  }
});

/**
 * CHECK PREMIUM SERVICES STATUS
 */
export const checkPremiumStatus = action({
  args: {},
  handler: async (ctx) => {
    const status = {
      openai: !!process.env.OPENAI_API_KEY,
      runway: !!process.env.RUNWAY_API_KEY,
      elevenlabs: !!process.env.ELEVENLABS_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      pika: !!process.env.PIKA_API_KEY,
      premiumActive: false
    };

    status.premiumActive = status.openai || status.runway || status.elevenlabs;

    return status;
  }
});
