import { query } from "./_generated/server";

// Debug query to check what's in the auth tables
export const checkAuthAccounts = query({
  args: {},
  handler: async (ctx) => {
    const accounts = await ctx.db.query("authAccounts").collect();
    console.log("📊 Auth accounts:", accounts.length);

    // Show recent accounts (last 5)
    const recent = accounts.slice(-5).map(acc => ({
      id: acc._id,
      provider: acc.provider,
      providerAccountId: acc.providerAccountId,
      createdAt: acc._creationTime,
    }));

    console.log("📊 Recent accounts:", recent);

    return {
      total: accounts.length,
      recent,
    };
  },
});

export const checkAuthVerificationCodes = query({
  args: {},
  handler: async (ctx) => {
    const codes = await ctx.db.query("authVerificationCodes").collect();
    console.log("🔐 Verification codes:", codes.length);

    // Show recent codes (last 5)
    const recent = codes.slice(-5).map(code => ({
      id: code._id,
      provider: code.provider,
      accountId: code.accountId,
      createdAt: code._creationTime,
      expirationTime: code.expirationTime,
    }));

    console.log("🔐 Recent codes:", recent);

    return {
      total: codes.length,
      recent,
    };
  },
});
