import { internalMutation } from "./_generated/server";

export const addCreditsToAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allUserCredits = await ctx.db.query("userCredits").collect();
    
    let count = 0;
    for (const userCredit of allUserCredits) {
      await ctx.db.patch(userCredit._id, {
        credits: userCredit.credits + 200
      });
      count++;
    }
    
    return { success: true, count };
  },
});
