"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

// Helper to call OpenAI
async function callOpenAI(prompt: string, systemPrompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // Cost effective
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

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
