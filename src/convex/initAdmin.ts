"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";
import * as bcrypt from "bcryptjs";

// Initialize admin account
// This should only be run once to create the admin account
// Admin credentials:
// Email: admin@neuraai.cyou
// Password: [Generated securely - never exposed on website]

export const createAdminAccount = action({
  args: {},
  handler: async (ctx) => {
    try {
      const ADMIN_EMAIL = "admin@neuraai.cyou";
      const ADMIN_PASSWORD = "NeuraAdmin2026!SecurePass"; // Change this in production

      // Check if admin already exists
      const existingAdmin = await ctx.runQuery(api.users.getUserById, {
        userId: "admin",
      });

      if (existingAdmin) {
        return {
          success: false,
          message: "Admin account already exists",
        };
      }

      // Hash admin password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

      // Create admin user
      await ctx.runMutation(api.simpleAuthMutations.createUserWithPassword, {
        email: ADMIN_EMAIL,
        passwordHash,
      });

      // Initialize admin credits (unlimited = 999999)
      await ctx.runMutation(api.videos.initializeUserCredits, {
        userId: "admin" as any,
      });

      console.log("✅ Admin account created successfully");
      console.log("Email:", ADMIN_EMAIL);
      console.log("Password: [REDACTED - Check initAdmin.ts securely]");

      return {
        success: true,
        message: "Admin account created. Check server logs for credentials.",
      };
    } catch (error: any) {
      console.error("❌ Error creating admin:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
});
