import { action } from "./_generated/server";
import { internal } from "./_generated/api";

// Public action to be called from the frontend
export const discoverTrendingNiches = action({
  args: {},
  handler: async (ctx): Promise<any> => {
    return await ctx.runMutation(internal.nicheDiscoveryInternal.saveTrendingNiches, {});
  },
});