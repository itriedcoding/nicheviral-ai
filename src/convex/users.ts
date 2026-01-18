import { v } from "convex/values";
import { query, QueryCtx } from "./_generated/server";

/**
 * Get user by ID for custom authentication
 */
export const getUserById = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Try to get user by the custom userId from localStorage
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();

    return user;
  },
});

/**
 * Get the current signed in user. Returns null if the user is not signed in.
 * Usage: const signedInUser = await ctx.runQuery(api.users.currentUser);
 */
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    // For custom auth, we can't get userId from context
    // The frontend needs to pass userId explicitly
    // This query is deprecated - use getUserById instead
    return null;
  },
});

/**
 * Use this function internally to get the current user data. Remember to handle the null user case.
 * @param ctx
 * @returns
 */
export const getCurrentUser = async (ctx: QueryCtx) => {
  // For custom auth, return null
  // Frontend should use getUserById with userId from localStorage
  return null;
};
