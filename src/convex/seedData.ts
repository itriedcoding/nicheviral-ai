import { mutation } from "./_generated/server";

export const seedNiches = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existing = await ctx.db.query("niches").first();
    if (existing) {
      return { message: "Data already exists", count: 0 };
    }

    const sampleNiches = [
      {
        name: "AI Tools for Content Creators",
        description: "Discover the latest AI tools transforming content creation, from video editing to script writing",
        category: "Technology",
        score: 92,
        potential: "Very High",
        competition: "High",
        tags: ["artificial intelligence", "content creation", "video editing", "automation", "productivity"],
        updatedAt: Date.now(),
      },
      {
        name: "Passive Income Ideas for 2024",
        description: "Top strategies for building passive income streams with minimal upfront investment",
        category: "Business",
        score: 88,
        potential: "High",
        competition: "High",
        tags: ["passive income", "online business", "entrepreneurship", "financial freedom", "side hustle"],
        updatedAt: Date.now(),
      },
      {
        name: "Minimalist Home Organization",
        description: "Transform your space with these simple minimalist organization techniques",
        category: "Lifestyle",
        score: 75,
        potential: "Medium",
        competition: "Medium",
        tags: ["minimalism", "organization", "declutter", "home design", "lifestyle"],
        updatedAt: Date.now(),
      },
      {
        name: "Quick Healthy Meal Prep",
        description: "30-minute meal prep ideas for busy professionals who want to eat healthy",
        category: "Health",
        score: 81,
        potential: "High",
        competition: "High",
        tags: ["meal prep", "healthy eating", "quick recipes", "nutrition", "weight loss"],
        updatedAt: Date.now(),
      },
      {
        name: "Productivity Hacks for Remote Workers",
        description: "Science-backed techniques to maximize productivity while working from home",
        category: "Productivity",
        score: 79,
        potential: "Medium",
        competition: "Medium",
        tags: ["productivity", "remote work", "time management", "focus", "efficiency"],
        updatedAt: Date.now(),
      },
      {
        name: "Beginner's Guide to Investing",
        description: "Start your investment journey with these essential tips for beginners",
        category: "Finance",
        score: 86,
        potential: "Very High",
        competition: "High",
        tags: ["investing", "stocks", "finance", "wealth building", "money management"],
        updatedAt: Date.now(),
      },
      {
        name: "Travel on a Budget",
        description: "Explore the world without breaking the bank with these money-saving travel tips",
        category: "Travel",
        score: 73,
        potential: "Medium",
        competition: "Medium",
        tags: ["budget travel", "cheap flights", "backpacking", "travel tips", "destinations"],
        updatedAt: Date.now(),
      },
      {
        name: "Mental Health Self-Care Routine",
        description: "Daily practices to improve your mental health and overall wellbeing",
        category: "Health",
        score: 84,
        potential: "High",
        competition: "Medium",
        tags: ["mental health", "self care", "wellness", "mindfulness", "stress relief"],
        updatedAt: Date.now(),
      },
      {
        name: "Side Hustles That Actually Work",
        description: "Proven side hustle ideas that can generate real income in 2024",
        category: "Business",
        score: 90,
        potential: "Very High",
        competition: "High",
        tags: ["side hustle", "extra income", "freelancing", "gig economy", "entrepreneurship"],
        updatedAt: Date.now(),
      },
      {
        name: "Photography Tips for Beginners",
        description: "Master the basics of photography with these essential tips and tricks",
        category: "Creative",
        score: 71,
        potential: "Medium",
        competition: "Medium",
        tags: ["photography", "camera tips", "composition", "lighting", "editing"],
        updatedAt: Date.now(),
      },
      {
        name: "Plant-Based Diet Transformation",
        description: "How to transition to a plant-based diet and feel amazing",
        category: "Health",
        score: 77,
        potential: "Medium",
        competition: "Medium",
        tags: ["plant based", "vegan", "healthy diet", "nutrition", "recipes"],
        updatedAt: Date.now(),
      },
      {
        name: "Social Media Marketing Strategies",
        description: "Grow your brand with these proven social media marketing tactics",
        category: "Marketing",
        score: 85,
        potential: "High",
        competition: "High",
        tags: ["social media", "marketing", "instagram", "content strategy", "engagement"],
        updatedAt: Date.now(),
      }
    ];

    let count = 0;
    for (const niche of sampleNiches) {
      await ctx.db.insert("niches", niche);
      count++;
    }

    return { message: "Successfully seeded niches", count };
  },
});