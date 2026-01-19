"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { vly } from "../lib/vly-integrations";

// Helper to call AI using Vly Integrations
async function callOpenAI(prompt: string, systemPrompt: string) {
  try {
    const result = await vly.ai.completion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      maxTokens: 1000,
    });

    if (result.success && result.data) {
      return result.data.choices[0]?.message?.content || "No response generated";
    }
    
    throw new Error(result.error || "AI request failed");
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    throw new Error(`AI Generation failed: ${error.message}`);
  }
}

export const enhancePrompt = action({
  args: { prompt: v.string(), type: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = args.type === 'video' 
      ? "You are an expert video prompt engineer for AI video generation models like Runway and Sora. Enhance the user's prompt to be highly detailed, describing lighting, camera angles, motion, texture, and mood. Keep it under 100 words."
      : "You are an expert image prompt engineer for DALL-E 3 and Midjourney. Enhance the user's prompt to be highly detailed, describing composition, lighting, style, and texture. Keep it under 100 words.";
      
    const prompt = `Original Prompt: ${args.prompt}`;
    
    try {
      const enhanced = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: enhanced };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateScript = action({
  args: { topic: v.string(), tone: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are an expert YouTube script writer. Write a compelling, high-retention script for the given topic. Include a hook, intro, body points, and call to action.";
    const prompt = `Topic: ${args.topic}\nTone: ${args.tone || "Engaging"}`;
    
    try {
      const script = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: script };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateTags = action({
  args: { title: v.string(), description: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube SEO expert. Generate a comma-separated list of high-ranking tags for the video.";
    const prompt = `Title: ${args.title}\nDescription: ${args.description || ""}`;
    
    try {
      const tags = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: tags };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const optimizeTitle = action({
  args: { originalTitle: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube expert. Provide 5 alternative, high-CTR titles for the given video title. Return them as a numbered list.";
    const prompt = `Original Title: ${args.originalTitle}`;
    
    try {
      const titles = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: titles };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateDescription = action({
  args: { title: v.string(), keyPoints: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube expert. Write a SEO-optimized video description including the title and key points. Include timestamps if possible (placeholder).";
    const prompt = `Title: ${args.title}\nKey Points: ${args.keyPoints}`;
    
    try {
      const description = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: description };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateThumbnailIdeas = action({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube thumbnail expert. Describe 3 compelling thumbnail concepts for this video title. Be visual and descriptive.";
    const prompt = `Title: ${args.title}`;
    
    try {
      const ideas = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: ideas };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateVideoIdeas = action({
  args: { niche: v.string(), count: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const count = args.count || 5;
    const systemPrompt = "You are a YouTube growth strategist. Generate unique, high-potential video ideas for the given niche. Return them as a numbered list.";
    const prompt = `Niche: ${args.niche}\nCount: ${count}`;
    
    try {
      const ideas = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: ideas };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateShortsScript = action({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are an expert at creating viral YouTube Shorts. Write a 60-second script (approx 150 words) that is fast-paced, engaging, and has a strong hook.";
    const prompt = `Topic: ${args.topic}`;
    
    try {
      const script = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: script };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateCommunityPost = action({
  args: { topic: v.string(), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube community manager. Write an engaging Community Tab post to drive interaction (poll, question, or update).";
    const prompt = `Topic: ${args.topic}\nType: ${args.type || "Engagement"}`;
    
    try {
      const post = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: post };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const repurposeContent = action({
  args: { script: v.string(), platform: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = `You are a content repurposing expert. Rewrite the provided YouTube script into a format suitable for ${args.platform} (e.g., Twitter Thread, Blog Post, LinkedIn).`;
    const prompt = `Script: ${args.script}\nTarget Platform: ${args.platform}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateChannelName = action({
  args: { niche: v.string(), style: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a branding expert. Generate 10 catchy, memorable YouTube channel names based on the niche and style.";
    const prompt = `Niche: ${args.niche}\nStyle: ${args.style || "Modern"}`;
    
    try {
      const names = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: names };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generatePlaylistNames = action({
  args: { niche: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube SEO expert. Generate 5 optimized playlist names that would encourage binge-watching for this niche.";
    const prompt = `Niche: ${args.niche}`;
    
    try {
      const names = await callOpenAI(prompt, systemPrompt);
      return { success: true, content: names };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateImage = action({
  args: { 
    prompt: v.string(),
    size: v.optional(v.string()),
    quality: v.optional(v.string()),
    n: v.optional(v.number()),
    userId: v.optional(v.string()),
    model: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ success: boolean; imageUrl?: string; error?: string }> => {
    let result;
    const modelId = args.model || "dall-e-3";

    console.log(`🎨 Generating image with model: ${modelId}`);

    // Route to specific model handlers
    if (modelId === "flux-schnell") {
      result = await ctx.runAction(api.imageModels.generateWithFluxSchnell, {
        prompt: args.prompt
      });
    } else if (modelId === "stable-diffusion-xl-lightning") {
      result = await ctx.runAction(api.imageModels.generateWithSDXLLightning, {
        prompt: args.prompt
      });
    } else if (modelId === "dall-e-2") {
      result = await ctx.runAction(api.imageModels.generateWithDallE2, {
        prompt: args.prompt,
        size: args.size,
        n: args.n
      });
    } else {
      // Default to DALL-E 3 (handles "dall-e-3" and fallbacks)
      // If user requested a model we don't have (like Midjourney), we fallback to DALL-E 3 
      // but with style modifiers to approximate it, or we could throw an error.
      // For now, we'll use DALL-E 3 as the premium fallback.
      
      let finalPrompt = args.prompt;
      if (modelId === "midjourney-v6") {
        finalPrompt += " --style raw --v 6.0 (Midjourney V6 style, highly detailed, artistic)";
      } else if (modelId === "stable-diffusion-3") {
        finalPrompt += " (Stable Diffusion 3 style, realistic, cinematic lighting)";
      } else if (modelId === "flux-pro") {
        finalPrompt += " (Flux Pro style, professional photography, sharp focus, 8k)";
      }

      result = await ctx.runAction(api.imageModels.generateWithDallE3, {
        prompt: finalPrompt,
        size: args.size,
        quality: args.quality,
        n: args.n
      });
    }

    if (!result.success || !result.imageUrl) {
      throw new Error(result.error || "Image generation failed");
    }

    // Save to database if userId is provided
    if (args.userId) {
      await ctx.runMutation(internal.images.internalSaveImage, {
        userId: args.userId,
        prompt: args.prompt,
        imageUrl: result.imageUrl,
        model: modelId,
        aspectRatio: "1:1", 
      });
    }

    return { success: true, imageUrl: result.imageUrl };
  },
});

export const generateVideoHook = action({
  args: { topic: v.string(), style: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a viral content expert. Generate 3 scroll-stopping hooks (first 3-5 seconds) for a video on this topic. Explain why each works.";
    const prompt = `Topic: ${args.topic}\nStyle: ${args.style || "Dramatic"}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateSponsorshipPitch = action({
  args: { niche: v.string(), brand: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a brand deal negotiator. Write a professional, persuasive sponsorship pitch email to a brand. Focus on value proposition and audience alignment.";
    const prompt = `Niche: ${args.niche}\nTarget Brand: ${args.brand || "Potential Sponsor"}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateCommentReply = action({
  args: { comment: v.string(), tone: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a community manager. Draft a polite, engaging, and viral-potential reply to this YouTube comment.";
    const prompt = `Comment: "${args.comment}"\nTone: ${args.tone || "Professional"}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateCollaborationIdeas = action({
  args: { niche: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube strategist. Suggest 5 collaboration ideas for this niche, including types of videos and potential channel archetypes to partner with.";
    const prompt = `Niche: ${args.niche}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateChannelAudit = action({
  args: { channelName: v.string(), niche: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a YouTube consultant. Provide a 5-point checklist for auditing a channel in this niche. Focus on branding, thumbnails, titles, and content strategy.";
    const prompt = `Channel Name: ${args.channelName}\nNiche: ${args.niche}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateTrendPrediction = action({
  args: { niche: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a trend forecaster. Predict 3 upcoming trends or video formats for this niche based on general market movements.";
    const prompt = `Niche: ${args.niche}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateLivestreamPlan = action({
  args: { topic: v.string(), duration: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a live event producer. Create a run-of-show for a livestream. Include segments, engagement activities, and breaks.";
    const prompt = `Topic: ${args.topic}\nDuration: ${args.duration || "1 hour"}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});

export const generateShortsSeries = action({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    const systemPrompt = "You are a short-form content expert. Plan a 7-day YouTube Shorts series on this topic. Provide a title and brief concept for each day.";
    const prompt = `Topic: ${args.topic}`;
    
    try {
      const content = await callOpenAI(prompt, systemPrompt);
      return { success: true, content };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});