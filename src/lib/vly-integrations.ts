import { createVlyIntegrations } from "@vly-ai/integrations";

export const vly = createVlyIntegrations({
  deploymentToken: process.env.VLY_INTEGRATION_KEY || "dummy_key_for_build",
});
