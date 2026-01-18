"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";
import * as bcrypt from "bcryptjs";

// Initialize admin account
// This should only be run once to create the admin account
//
// ⚠️ IMPORTANT SECURITY NOTICE ⚠️
// Admin credentials are ONLY logged to server console
// NEVER exposed on the website or in responses
//
// Admin credentials:
// Email: admin@neuraai.cyou
// Password: NeuraAdmin2026!Secure#Pass

export const createAdminAccount = action({
  args: {},
  handler: async (ctx) => {
    try {
      const ADMIN_EMAIL = "admin@neuraai.cyou";
      const ADMIN_PASSWORD = "NeuraAdmin2026!Secure#Pass";

      // Try to find admin by email
      const existingAdmin = await ctx.runQuery(api.adminHelpers.findUserByEmail, {
        email: ADMIN_EMAIL,
      });

      let adminUserId: string;

      if (existingAdmin) {
        console.log("⚠️ Admin account already exists, updating role and credits...");
        adminUserId = existingAdmin._id;
      } else {
        // Hash admin password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

        // Create admin user
        const result = await ctx.runMutation(api.simpleAuthMutations.createUserWithPassword, {
          email: ADMIN_EMAIL,
          passwordHash,
        });

        adminUserId = result.userId;
      }

      // Set admin role
      await ctx.runMutation(api.admin.setAdminRole, {
        userId: adminUserId as any,
      });

      // Give unlimited credits
      await ctx.runMutation(api.admin.setUnlimitedCredits, {
        userId: adminUserId as any,
      });

      // Log credentials ONLY to server console (never sent to frontend)
      console.log("\n");
      console.log("=".repeat(60));
      console.log("✅ ADMIN ACCOUNT CREATED SUCCESSFULLY");
      console.log("=".repeat(60));
      console.log("Email:", ADMIN_EMAIL);
      console.log("Password:", ADMIN_PASSWORD);
      console.log("Credits: UNLIMITED (999,999,999)");
      console.log("Role: admin");
      console.log("=".repeat(60));
      console.log("⚠️ SECURITY WARNING:");
      console.log("These credentials are ONLY visible in server logs");
      console.log("They are NEVER exposed on the website");
      console.log("Change password after first login in production");
      console.log("=".repeat(60));
      console.log("\n");

      return {
        success: true,
        message: "Admin account created successfully. Check server logs for credentials (NEVER exposed on website).",
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
