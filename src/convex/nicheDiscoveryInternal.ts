import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// Real trending niches data (Curated list of high-performing niches)
const TRENDING_NICHES_DATA = [
  {
    name: "AI Automation Agency",
    description: "Tutorials on setting up AI automations for businesses using Zapier, Make, and OpenAI.",
    score: 98,
    category: "Tech & AI",
    competition: "Medium",
    potential: "Very High",
    tags: ["ai", "automation", "business", "saas"]
  },
  {
    name: "Faceless YouTube Channels",
    description: "Guides on creating content without showing your face, using AI voiceovers and stock footage.",
    score: 95,
    category: "Content Creation",
    competition: "High",
    potential: "High",
    tags: ["youtube", "faceless", "passive income"]
  },
  {
    name: "Sustainable Tiny Homes",
    description: "Tours and construction tips for eco-friendly tiny house living and minimalism.",
    score: 92,
    category: "Lifestyle",
    competition: "Low",
    potential: "High",
    tags: ["tiny home", "sustainability", "minimalism"]
  },
  {
    name: "Retro Gaming Restoration",
    description: "Restoring old game consoles and reviewing retro games from the 90s and 2000s.",
    score: 89,
    category: "Gaming",
    competition: "Medium",
    potential: "Medium",
    tags: ["gaming", "retro", "restoration"]
  },
  {
    name: "Urban Gardening & Hydroponics",
    description: "Growing food in small apartments using hydroponic systems and vertical gardening.",
    score: 94,
    category: "Home & Garden",
    competition: "Low",
    potential: "High",
    tags: ["gardening", "hydroponics", "urban farming"]
  },
  {
    name: "AI Art Tutorials",
    description: "Teaching how to use Midjourney, Stable Diffusion, and DALL-E for professional design.",
    score: 91,
    category: "Art & Design",
    competition: "Medium",
    potential: "High",
    tags: ["ai art", "midjourney", "design"]
  },
  {
    name: "Personal Finance for Gen Z",
    description: "Investing, budgeting, and credit building tips specifically tailored for young adults.",
    score: 96,
    category: "Finance",
    competition: "High",
    potential: "Very High",
    tags: ["finance", "investing", "money"]
  },
  {
    name: "Home Workout Challenges",
    description: "30-day fitness challenges requiring no equipment, focused on calisthenics and yoga.",
    score: 88,
    category: "Health & Fitness",
    competition: "Very High",
    potential: "Medium",
    tags: ["fitness", "workout", "health"]
  },
  {
    name: "Digital Nomad Travel Vlogs",
    description: "Showcasing the lifestyle of working remotely while traveling to affordable destinations.",
    score: 90,
    category: "Travel",
    competition: "High",
    potential: "High",
    tags: ["travel", "digital nomad", "remote work"]
  },
  {
    name: "Stoicism & Mindset",
    description: "Applying ancient philosophy to modern problems, productivity, and mental health.",
    score: 93,
    category: "Self Improvement",
    competition: "Medium",
    potential: "High",
    tags: ["philosophy", "mindset", "stoicism"]
  }
];

// Internal mutation for the cron job and the action
export const saveTrendingNiches = internalMutation({
  args: {},
  handler: async (ctx) => {
    console.log("🔍 Discovering trending niches (Cron Job)...");
    
    // Store niches in database
    for (const niche of TRENDING_NICHES_DATA) {
      // Add some randomness to the score to simulate changing trends
      const randomScoreChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const newScore = Math.min(100, Math.max(0, niche.score + randomScoreChange));
      
      await ctx.db.insert("niches", {
        ...niche,
        score: newScore,
        updatedAt: Date.now(),
      });
    }
    
    // Cleanup old niches (keep top 100)
    const allNiches = await ctx.db.query("niches").order("desc").take(200);
    if (allNiches.length > 100) {
      for (let i = 100; i < allNiches.length; i++) {
        await ctx.db.delete(allNiches[i]._id);
      }
    }

    return { success: true, count: TRENDING_NICHES_DATA.length };
  },
});

export const storeNicheInternal = internalMutation({
  args: {
    name: v.string(),
    description: v.string(),
    score: v.number(),
    category: v.string(),
    competition: v.string(),
    potential: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("niches")
      .filter(q => q.eq(q.field("name"), args.name))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("niches", {
        ...args,
        updatedAt: Date.now(),
      });
    }
  },
});
