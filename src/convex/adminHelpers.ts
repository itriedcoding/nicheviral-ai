import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Find user by email
export const findUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    return user;
  },
});
