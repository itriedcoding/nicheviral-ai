"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import * as bcrypt from "bcryptjs";

// Hash password and create user with password
export const signUpWithPassword = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ success: boolean; userId?: string; error?: string }> => {
    try {
      console.log("🔐 Creating user with password for:", args.email);

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(args.password, salt);

      // Store user with password hash
      const result: { success: boolean; userId?: string } = await ctx.runMutation(api.simpleAuthMutations.createUserWithPassword, {
        email: args.email,
        passwordHash,
      });

      return result;
    } catch (error: any) {
      console.error("❌ Sign up error:", error);
      return {
        success: false,
        error: error.message || "Failed to create account",
      };
    }
  },
});

// Sign in with email and password
export const signInWithPassword = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ success: boolean; userId?: string; error?: string }> => {
    try {
      console.log("🔐 Signing in with password for:", args.email);

      // Get user
      const user: any = await ctx.runQuery(api.simpleAuthMutations.getUserByEmail, {
        email: args.email,
      });

      if (!user) {
        return {
          success: false,
          error: "No account found with this email",
        };
      }

      if (!user.passwordHash) {
        return {
          success: false,
          error: "Please use OTP sign in for this account",
        };
      }

      // Verify password
      const isValid = await bcrypt.compare(args.password, user.passwordHash);

      if (!isValid) {
        return {
          success: false,
          error: "Incorrect password",
        };
      }

      console.log("✅ Sign in successful for:", args.email);

      return {
        success: true,
        userId: user._id,
      };
    } catch (error: any) {
      console.error("❌ Sign in error:", error);
      return {
        success: false,
        error: error.message || "Failed to sign in",
      };
    }
  },
});
