import { Email } from "@convex-dev/auth/providers/Email";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";
import { Resend } from "resend";

export const emailOtp = Email({
  id: "email-otp",
  maxAge: 60 * 15, // 15 minutes
  // This function can be asynchronous
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes: Uint8Array) {
        crypto.getRandomValues(bytes);
      },
    };
    const alphabet = "0123456789";
    return generateRandomString(random, alphabet, 6);
  },
  async sendVerificationRequest({ identifier: email, token }) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Neura AI <onboarding@resend.dev>",
        to: email,
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
                      <!-- Header -->
                      <tr>
                        <td align="center" style="padding: 40px 40px 20px 40px;">
                          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <h1 style="margin: 0; font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                              Neura AI
                            </h1>
                          </div>
                        </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                        <td align="center" style="padding: 20px 40px;">
                          <h2 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">
                            Your Verification Code
                          </h2>
                          <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                            Enter this code to sign in to your Neura AI account:
                          </p>

                          <!-- OTP Code -->
                          <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                            <div style="font-size: 48px; font-weight: bold; letter-spacing: 8px; color: #ef4444; font-family: 'Courier New', monospace;">
                              ${token}
                            </div>
                          </div>

                          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0;">
                            This code will expire in <strong style="color: #ef4444;">15 minutes</strong>.
                          </p>
                        </td>
                      </tr>

                      <!-- Security Notice -->
                      <tr>
                        <td style="padding: 32px 40px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                          <p style="color: #71717a; font-size: 12px; line-height: 1.6; margin: 0;">
                            <strong style="color: #a1a1aa;">Security Notice:</strong> If you didn't request this code, please ignore this email. Never share your verification code with anyone.
                          </p>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td align="center" style="padding: 20px 40px 40px 40px;">
                          <p style="color: #52525b; font-size: 12px; margin: 0;">
                            © 2024 Neura AI. All rights reserved.
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
    } catch (error) {
      console.error("Resend email error:", error);
      throw new Error("Failed to send verification email");
    }
  },
});
