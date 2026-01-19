import { VlyIntegrations } from "@vly-ai/integrations";

// Initialize Vly Integrations lazily to prevent build-time errors
// if the environment variable is missing.
let vlyInstance: any = null;

export const vly = new Proxy({}, {
  get: (target, prop) => {
    if (!vlyInstance) {
      vlyInstance = new VlyIntegrations({
        token: process.env.VLY_INTEGRATION_KEY || "dummy_token_for_build"
      } as any);
    }
    return vlyInstance[prop];
  }
}) as unknown as VlyIntegrations;