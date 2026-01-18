import { query } from "./_generated/server";

export const checkOTPCodes = query({
  args: {},
  handler: async (ctx) => {
    const codes = await ctx.db.query("otpCodes").collect();
    console.log("🔍 OTP Codes in database:", codes.length);
    console.log("🔍 All codes:", codes);
    return codes;
  },
});
