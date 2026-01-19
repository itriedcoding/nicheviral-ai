import { VlyAiIntegrations } from "@vly-ai/integrations";

export const vly = new VlyAiIntegrations({
  apiKey: process.env.VLY_INTEGRATION_KEY!,
});
