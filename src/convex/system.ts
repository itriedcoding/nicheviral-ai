import { query } from "./_generated/server";

export const health = query({
  args: {},
  handler: async (ctx) => {
    const startTime = Date.now();
    
    // Test database connectivity
    const convexHealth = await ctx.db.query("users").take(1);
    
    const responseTime = Date.now() - startTime;
    
    return {
      convex: true,
      database: true,
      avgResponseTime: `${responseTime}ms`,
      timestamp: Date.now(),
      status: "operational",
    };
  },
});
