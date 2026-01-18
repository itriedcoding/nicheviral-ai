"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { vly } from "../lib/vly-integrations";

// Generate video script using AI
export const generateScript = action({
  args: {
    prompt: v.string(),
    nicheId: v.optional(v.id("niches")),
    duration: v.optional(v.number()), // Duration in seconds
  },
  handler: async (ctx, args) => {
    try {
      const duration = args.duration || 60;
      const durationMinutes = Math.round(duration / 60);

      const systemPrompt = `You are a viral video script writer. Create engaging, hook-driven scripts optimized for social media platforms. Scripts should be concise, attention-grabbing, and structured for maximum engagement.`;

      const userPrompt = `Create a ${durationMinutes}-minute video script for: ${args.prompt}

Requirements:
- Start with a powerful hook in the first 3 seconds
- Use pattern interrupts every 10-15 seconds
- Include call-to-actions
- Keep sentences short and punchy
- Write in a conversational tone
- Include visual descriptions in [brackets]

Format:
HOOK (0-3s): [Opening line]
INTRO (3-10s): [Introduction]
MAIN CONTENT: [Core message with timestamps]
CTA: [Call to action]
OUTRO: [Closing]`;

      const result = await vly.ai.completion({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        maxTokens: 1000,
      });

      if (result.success && result.data) {
        const script = result.data.choices[0]?.message?.content || "";
        return {
          success: true,
          script,
          creditsUsed: result.usage?.credits || 0,
        };
      }

      return {
        success: false,
        error: result.error || "Failed to generate script",
      };
    } catch (error: any) {
      console.error("Script generation error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});

// Generate voiceover using ElevenLabs (simulated via vly-integrations)
export const generateVoiceover = action({
  args: {
    text: v.string(),
    voiceId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // Note: ElevenLabs integration would go here
      // For now, we'll return a mock response since direct ElevenLabs
      // integration requires their specific SDK

      // In production, you would:
      // 1. Use ElevenLabs API to generate audio
      // 2. Store the audio file
      // 3. Return the URL

      return {
        success: true,
        audioUrl: "https://example.com/voiceover.mp3", // Mock URL
        duration: 60,
        creditsUsed: 5,
        message: "Voiceover generation queued. In production, this would use ElevenLabs API.",
      };
    } catch (error: any) {
      console.error("Voiceover generation error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});

// Create video generation request
export const createVideo = action({
  args: {
    userId: v.id("users"),
    title: v.string(),
    prompt: v.string(),
    nicheId: v.optional(v.id("niches")),
    aiModel: v.string(), // "sora", "runway", etc.
    includeVoiceover: v.optional(v.boolean()),
    voiceModel: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ success: boolean; videoId?: any; script?: string; message?: string; error?: string }> => {
    try {
      // Generate a simple script using AI
      const scriptPrompt = `Create a brief video script for: ${args.prompt}`;

      const result = await vly.ai.completion({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a viral video script writer." },
          { role: "user", content: scriptPrompt },
        ],
        maxTokens: 500,
      });

      let script = "Video script generated";
      if (result.success && result.data) {
        script = result.data.choices[0]?.message?.content || script;
      }

      // Create video record in database
      const videoId = await ctx.runMutation(api.videos.createVideoRecord, {
        userId: args.userId,
        title: args.title,
        description: script.substring(0, 200),
        prompt: args.prompt,
        nicheId: args.nicheId,
        aiModel: args.aiModel,
        voiceModel: args.voiceModel,
      });

      // Update status to generating
      await ctx.runMutation(api.videos.updateVideoStatus, {
        videoId,
        status: "generating",
      });

      return {
        success: true,
        videoId,
        script,
        message: "Video generation started. This is a demo - in production, this would use Sora API.",
      };
    } catch (error: any) {
      console.error("Video creation error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});

// Generate video ideas based on niche
export const generateVideoIdeas = action({
  args: {
    nicheTitle: v.string(),
    nicheDescription: v.string(),
    count: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      const count = args.count || 5;

      const prompt = `Based on this trending niche:
Title: ${args.nicheTitle}
Description: ${args.nicheDescription}

Generate ${count} viral video ideas. For each idea, provide:
1. Title (catchy and clickbait-worthy)
2. Hook (first 3 seconds)
3. Key points to cover
4. Estimated engagement potential (1-10)

Format as JSON array with objects containing: title, hook, keyPoints (array), engagementScore (number)`;

      const result = await vly.ai.completion({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a viral content strategist." },
          { role: "user", content: prompt },
        ],
        maxTokens: 1000,
      });

      if (result.success && result.data) {
        const content = result.data.choices[0]?.message?.content || "";

        // Try to parse JSON from the response
        let ideas = [];
        try {
          const jsonMatch = content.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            ideas = JSON.parse(jsonMatch[0]);
          }
        } catch {
          // If JSON parsing fails, return the raw content
          ideas = [{ title: "AI Response", content }];
        }

        return {
          success: true,
          ideas,
          creditsUsed: result.usage?.credits || 0,
        };
      }

      return {
        success: false,
        error: result.error || "Failed to generate ideas",
      };
    } catch (error: any) {
      console.error("Idea generation error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});
