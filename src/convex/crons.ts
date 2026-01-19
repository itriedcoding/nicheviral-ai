import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// 1. Niche Discovery Cron
// Run every 24 hours to discover new trending niches
crons.interval(
  "discover-trending-niches",
  { hours: 24 },
  internal.nicheDiscoveryInternal.saveTrendingNiches,
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