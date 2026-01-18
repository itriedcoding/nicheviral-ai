import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // add other tables here

    // Trending niches discovered from YouTube API
    niches: defineTable({
      title: v.string(),
      description: v.string(),
      category: v.string(),
      trendScore: v.number(), // 0-100 trending score
      searchVolume: v.number(),
      competitionLevel: v.string(), // "low", "medium", "high"
      keywords: v.array(v.string()),
      thumbnailUrl: v.optional(v.string()),
      youtubeData: v.optional(v.any()), // Raw YouTube API data
    })
      .index("by_category", ["category"])
      .index("by_trend_score", ["trendScore"]),

    // AI-generated videos
    videos: defineTable({
      userId: v.id("users"),
      nicheId: v.optional(v.id("niches")),
      title: v.string(),
      description: v.string(),
      prompt: v.string(), // Original prompt used
      status: v.union(
        v.literal("queued"),
        v.literal("generating"),
        v.literal("completed"),
        v.literal("failed")
      ),
      videoUrl: v.optional(v.string()), // URL to generated video
      thumbnailUrl: v.optional(v.string()),
      duration: v.optional(v.number()), // Duration in seconds
      aiModel: v.string(), // e.g., "sora", "runway"
      voiceModel: v.optional(v.string()), // e.g., "elevenlabs-*"
      metadata: v.optional(v.any()), // Additional metadata
      errorMessage: v.optional(v.string()),
    })
      .index("by_user", ["userId"])
      .index("by_status", ["status"])
      .index("by_niche", ["nicheId"]),

    // User generations history
    generations: defineTable({
      userId: v.id("users"),
      videoId: v.id("videos"),
      generationType: v.string(), // "video", "voiceover", "script"
      creditsUsed: v.number(),
      processingTime: v.optional(v.number()), // Time in seconds
    }).index("by_user", ["userId"]),

    // User credits/subscriptions
    userCredits: defineTable({
      userId: v.id("users"),
      credits: v.number(),
      subscriptionTier: v.union(
        v.literal("free"),
        v.literal("pro"),
        v.literal("enterprise")
      ),
      subscriptionStatus: v.string(),
      renewalDate: v.optional(v.number()),
    }).index("by_user", ["userId"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
