"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Resend } from "resend";

// Generate and send OTP
export const sendOTP = action({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      console.log("🔐 Generating OTP:", otp, "for", args.email);

      // Store OTP in database
      await ctx.runMutation(api.simpleAuthMutations.storeOTP, {
        email: args.email,
        code: otp,
        expiresAt: Date.now() + (15 * 60 * 1000), // 15 minutes
      });

      // Send email via Resend
      const resend = new Resend(process.env.RESEND_API_KEY);

      const result = await resend.emails.send({
        from: "Neura AI <noreply@neuraai.cyou>",
        to: args.email,
        subject: "Your Neura AI verification code",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 10, 15, 0.95) 100%); border-radius: 16px; border: 1px solid rgba(239, 68, 68, 0.2); box-shadow: 0 8px 32px rgba(239, 68, 68, 0.1); overflow: hidden;">
                      <tr>
                        <td align="center" style="padding: 40px 40px 20px 40px;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #ef4444;">
                            Neura AI
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding: 20px 40px;">
                          <h2 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">
                            Your Verification Code
                          </h2>
                          <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                            Enter this code to sign in to your Neura AI account:
                          </p>
                          <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                            <div style="font-size: 48px; font-weight: bold; letter-spacing: 8px; color: #ef4444; font-family: 'Courier New', monospace;">
                              ${otp}
                            </div>
                          </div>
                          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0;">
                            This code will expire in <strong style="color: #ef4444;">15 minutes</strong>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 32px 40px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                          <p style="color: #71717a; font-size: 12px; line-height: 1.6; margin: 0;">
                            <strong style="color: #a1a1aa;">Security Notice:</strong> If you didn't request this code, please ignore this email.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding: 20px 40px 40px 40px;">
                          <p style="color: #52525b; font-size: 12px; margin: 0;">
                            © 2026 Neura AI. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });

      console.log("✅ Email sent via Resend:", result);

      return {
        success: true,
        message: "Verification code sent to your email",
      };
    } catch (error: any) {
      console.error("❌ Error sending OTP:", error);
      return {
        success: false,
        error: error.message || "Failed to send verification code",
      };
    }
  },
});

// Store OTP in custom table
