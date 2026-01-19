import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// 1. Roblox Trending Games Cron
// Run every 2 hours to discover new trending games using Official Roblox API
crons.interval(
  "fetch-roblox-games",
  { hours: 2 },
  internal.roblox.fetchTrendingGames,
  {}
);

// 2. Subscription Management Cron
// Run every hour to check for expired trials and renewals
crons.interval(
  "check-subscription-status",
  { hours: 1 },
  internal.billing.checkSubscriptionStatus,
  {}
);

export default crons;