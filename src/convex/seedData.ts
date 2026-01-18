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
        title: "AI Tools for Content Creators",
        description: "Discover the latest AI tools transforming content creation, from video editing to script writing",
        category: "Technology",
        trendScore: 92,
        searchVolume: 5200000,
        competitionLevel: "high",
        keywords: ["artificial intelligence", "content creation", "video editing", "automation", "productivity"],
        thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
      },
      {
        title: "Passive Income Ideas for 2024",
        description: "Top strategies for building passive income streams with minimal upfront investment",
        category: "Business",
        trendScore: 88,
        searchVolume: 8900000,
        competitionLevel: "high",
        keywords: ["passive income", "online business", "entrepreneurship", "financial freedom", "side hustle"],
        thumbnailUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop",
      },
      {
        title: "Minimalist Home Organization",
        description: "Transform your space with these simple minimalist organization techniques",
        category: "Lifestyle",
        trendScore: 75,
        searchVolume: 3400000,
        competitionLevel: "medium",
        keywords: ["minimalism", "organization", "declutter", "home design", "lifestyle"],
        thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
      },
      {
        title: "Quick Healthy Meal Prep",
        description: "30-minute meal prep ideas for busy professionals who want to eat healthy",
        category: "Health",
        trendScore: 81,
        searchVolume: 6700000,
        competitionLevel: "high",
        keywords: ["meal prep", "healthy eating", "quick recipes", "nutrition", "weight loss"],
        thumbnailUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=450&fit=crop",
      },
      {
        title: "Productivity Hacks for Remote Workers",
        description: "Science-backed techniques to maximize productivity while working from home",
        category: "Productivity",
        trendScore: 79,
        searchVolume: 4200000,
        competitionLevel: "medium",
        keywords: ["productivity", "remote work", "time management", "focus", "efficiency"],
        thumbnailUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop",
      },
      {
        title: "Beginner's Guide to Investing",
        description: "Start your investment journey with these essential tips for beginners",
        category: "Finance",
        trendScore: 86,
        searchVolume: 7800000,
        competitionLevel: "high",
        keywords: ["investing", "stocks", "finance", "wealth building", "money management"],
        thumbnailUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop",
      },
      {
        title: "Travel on a Budget",
        description: "Explore the world without breaking the bank with these money-saving travel tips",
        category: "Travel",
        trendScore: 73,
        searchVolume: 5600000,
        competitionLevel: "medium",
        keywords: ["budget travel", "cheap flights", "backpacking", "travel tips", "destinations"],
        thumbnailUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=450&fit=crop",
      },
      {
        title: "Mental Health Self-Care Routine",
        description: "Daily practices to improve your mental health and overall wellbeing",
        category: "Health",
        trendScore: 84,
        searchVolume: 6100000,
        competitionLevel: "medium",
        keywords: ["mental health", "self care", "wellness", "mindfulness", "stress relief"],
        thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop",
      },
      {
        title: "Side Hustles That Actually Work",
        description: "Proven side hustle ideas that can generate real income in 2024",
        category: "Business",
        trendScore: 90,
        searchVolume: 9200000,
        competitionLevel: "high",
        keywords: ["side hustle", "extra income", "freelancing", "gig economy", "entrepreneurship"],
        thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
      },
      {
        title: "Photography Tips for Beginners",
        description: "Master the basics of photography with these essential tips and tricks",
        category: "Creative",
        trendScore: 71,
        searchVolume: 4800000,
        competitionLevel: "medium",
        keywords: ["photography", "camera tips", "composition", "lighting", "editing"],
        thumbnailUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=450&fit=crop",
      },
      {
        title: "Plant-Based Diet Transformation",
        description: "How to transition to a plant-based diet and feel amazing",
        category: "Health",
        trendScore: 77,
        searchVolume: 5300000,
        competitionLevel: "medium",
        keywords: ["plant based", "vegan", "healthy diet", "nutrition", "recipes"],
        thumbnailUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=450&fit=crop",
      },
      {
        title: "Social Media Marketing Strategies",
        description: "Grow your brand with these proven social media marketing tactics",
        category: "Marketing",
        trendScore: 85,
        searchVolume: 7100000,
        competitionLevel: "high",
        keywords: ["social media", "marketing", "instagram", "content strategy", "engagement"],
        thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
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
