import { Vly } from "@vly-ai/integrations";

// Lazy initialization to prevent build errors if env vars are missing
// and to ensure we don't initialize until needed
const vlyHandler = {
  get: (_target: any, prop: string) => {
    // Initialize on first access
    const vlyInstance = new Vly({
      apiKey: process.env.VLY_INTEGRATION_KEY || process.env.VLY_API_KEY || "dummy_key_for_build",
    });
    
    // Forward the property access
    const value = (vlyInstance as any)[prop];
    
    // If it's a function, bind it to the instance
    if (typeof value === 'function') {
      return value.bind(vlyInstance);
    }
    
    return value;
  }
};

export const vly = new Proxy({}, vlyHandler) as Vly;
