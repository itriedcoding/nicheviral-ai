import { VlyIntegrations } from "@vly-ai/integrations";

// Initialize Vly with API key from environment variables
// Using a proxy to allow for lazy initialization and avoid build-time errors if key is missing
export const vly = new Proxy({} as VlyIntegrations, {
  get: (_target, prop) => {
    const instance = new VlyIntegrations({
      apiKey: process.env.VLY_API_KEY || "dummy_key_for_build",
    });
    // @ts-ignore
    return instance[prop];
  },
});
