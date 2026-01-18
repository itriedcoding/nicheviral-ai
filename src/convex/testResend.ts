"use node";

import { action } from "./_generated/server";
import { Resend } from "resend";

export const testResendEmail = action({
  args: {},
  handler: async () => {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      console.log("Testing Resend with API key:", process.env.RESEND_API_KEY?.substring(0, 10) + "...");

      const result = await resend.emails.send({
        from: "Neura AI <noreply@neuraai.cyou>",
        to: "delivered@resend.dev", // Resend's test email
        subject: "Test Email from Neura AI - Verified Domain",
        html: "<p>This is a test email from verified domain. Token: 123456</p>",
      });

      console.log("✅ Resend test result:", result);

      return {
        success: true,
        result,
      };
    } catch (error: any) {
      console.error("❌ Resend test error:", error);
      return {
        success: false,
        error: error.message || String(error),
      };
    }
  },
});
