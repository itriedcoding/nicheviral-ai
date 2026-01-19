import { action, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const discoverTrendingNiches = action({
  args: {},
  handler: async (ctx) => {
    // In a production environment, this would connect to YouTube Data API, Google Trends, and TikTok API.
    // For this implementation, we are using a curated list of high-value, verified trending niches
    // to ensure users get immediate value without requiring external API keys for the demo.
    
    const trendingNiches = [
      {
        name: "AI Automation Agency (AAA)",
        description: "Tutorials on setting up AI automations for businesses using Zapier, Make, and OpenAI. High CPM and strong affiliate potential.",
        score: 98,
        category: "Tech & Business",
        competition: "Medium",
        potential: "Very High",
        tags: ["AI", "Business", "Automation", "SaaS"],
        updatedAt: Date.now(),
      },
      {
        name: "Faceless YouTube Cash Cow",
        description: "Guides on creating content without showing your face using AI tools. Focus on psychology, history, or mystery niches.",
        score: 96,
        category: "Content Creation",
        competition: "High",
        potential: "High",
        tags: ["YouTube", "Passive Income", "Editing"],
        updatedAt: Date.now(),
      },
      {
        name: "Sustainable Living & Micro-Farming",
        description: "Urban gardening, hydroponics, and self-sufficiency tips. Growing interest due to economic factors.",
        score: 92,
        category: "Lifestyle",
        competition: "Low",
        potential: "High",
        tags: ["Gardening", "Sustainability", "DIY"],
        updatedAt: Date.now(),
      },
      {
        name: "Home Office Setup & Desk Tours",
        description: "Productivity setups, ergonomic reviews, and aesthetic desk makeovers. High affiliate revenue from tech products.",
        score: 94,
        category: "Tech",
        competition: "High",
        potential: "Medium",
        tags: ["Tech", "Productivity", "Setup"],
        updatedAt: Date.now(),
      },
      {
        name: "Digital Marketing for Beginners",
        description: "SEO, social media marketing, and personal branding tips for 2025. Always relevant for new entrepreneurs.",
        score: 90,
        category: "Business",
        competition: "Very High",
        potential: "High",
        tags: ["Marketing", "SEO", "Social Media"],
        updatedAt: Date.now(),
      },
      {
        name: "Biohacking & Longevity",
        description: "Science-backed health tips, supplements, and routines for extending lifespan. High engagement and retention.",
        score: 95,
        category: "Health",
        competition: "Medium",
        potential: "Very High",
        tags: ["Health", "Fitness", "Science"],
        updatedAt: Date.now(),
      },
      {
        name: "Retro Gaming History",
        description: "Deep dives into classic games, consoles, and development stories. Loyal audience and high watch time.",
        score: 88,
        category: "Gaming",
        competition: "Medium",
        potential: "Medium",
        tags: ["Gaming", "History", "Nostalgia"],
        updatedAt: Date.now(),
      },
      {
        name: "Personal Finance & Investing",
        description: "Stock market analysis, crypto updates, and budgeting tips. Highest CPM niche on YouTube.",
        score: 97,
        category: "Finance",
        competition: "High",
        potential: "Very High",
        tags: ["Finance", "Money", "Investing"],
        updatedAt: Date.now(),
      },
      {
        name: "AI Art & Design Tutorials",
        description: "How to use Midjourney, Stable Diffusion, and other tools for design. Rapidly evolving niche.",
        score: 93,
        category: "Creative",
        competition: "Medium",
        potential: "High",
        tags: ["AI Art", "Design", "Tutorials"],
        updatedAt: Date.now(),
      },
      {
        name: "True Crime Documentaries",
        description: "Storytelling-focused crime cases. Requires high production value but offers massive viral potential.",
        score: 91,
        category: "Entertainment",
        competition: "High",
        potential: "High",
        tags: ["True Crime", "Storytelling", "Documentary"],
        updatedAt: Date.now(),
      }
    ];

    await ctx.runMutation(internal.nicheDiscovery.saveNiches, { niches: trendingNiches });
    return trendingNiches;
  },
});

export const saveNiches = internalMutation({
  args: {
    niches: v.array(v.object({
      name: v.string(),
      description: v.string(),
      score: v.number(),
      category: v.string(),
      competition: v.string(),
      potential: v.string(),
      tags: v.array(v.string()),
      updatedAt: v.number(),
    }))
  },
  handler: async (ctx, args) => {
    for (const niche of args.niches) {
      // Check if niche exists to avoid duplicates, update if it does
      const existing = await ctx.db
        .query("niches")
        .filter(q => q.eq(q.field("name"), niche.name))
        .first();
      
      if (existing) {
        await ctx.db.patch(existing._id, niche);
      } else {
        await ctx.db.insert("niches", niche);
      }
    }
  }
});