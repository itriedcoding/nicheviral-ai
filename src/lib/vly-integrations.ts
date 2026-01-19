// ... keep existing code
// Initialize the Vly Integrations client
// This is safe to use on the server side (Convex actions)
export const vly = createVlyIntegrations({
  deploymentToken: process.env.VLY_API_KEY || "dummy_key_for_build",
  debug: process.env.NODE_ENV === "development",
});
// ... keep existing code
