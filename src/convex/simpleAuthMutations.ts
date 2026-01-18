import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Store OTP in custom table
export const storeOTP = mutation({
  args: {
    email: v.string(),
    code: v.string(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Delete old OTPs for this email
    const oldOTPs = await ctx.db
      .query("otpCodes")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();

    for (const old of oldOTPs) {
      await ctx.db.delete(old._id);
    }

    // Store new OTP
    await ctx.db.insert("otpCodes", {
      email: args.email,
      code: args.code,
      expiresAt: args.expiresAt,
      used: false,
    });

    console.log("✅ OTP stored in database for", args.email);
  },
});

// Verify OTP
export const verifyOTP = mutation({
  args: {
    email: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("🔍 Verifying OTP:", args.code, "for", args.email);

    // Find OTP
    const otpRecord = await ctx.db
      .query("otpCodes")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!otpRecord) {
      console.log("❌ No OTP found for", args.email);
      throw new Error("No verification code found. Please request a new one.");
    }

    // Check if expired
    if (Date.now() > otpRecord.expiresAt) {
      console.log("❌ OTP expired for", args.email);
      await ctx.db.delete(otpRecord._id);
      throw new Error("Verification code expired. Please request a new one.");
    }

    // Check if already used
    if (otpRecord.used) {
      console.log("❌ OTP already used for", args.email);
      throw new Error("Verification code already used. Please request a new one.");
    }

    // Check if code matches
    if (otpRecord.code !== args.code) {
      console.log("❌ OTP mismatch. Expected:", otpRecord.code, "Got:", args.code);
      throw new Error("Incorrect verification code. Please try again.");
    }

    // Mark as used
    await ctx.db.patch(otpRecord._id, { used: true });

    // Create or get user
    let user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      const userId = await ctx.db.insert("users", {
        email: args.email,
        emailVerificationTime: Date.now(),
        isAnonymous: false,
      });
      user = await ctx.db.get(userId);
    }

    console.log("✅ OTP verified successfully for", args.email);

    // Clean up old OTP
    await ctx.db.delete(otpRecord._id);

    return {
      success: true,
      userId: user!._id,
    };
  },
});
