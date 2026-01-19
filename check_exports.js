import * as pkg from "@vly-ai/integrations";
console.log("Exports:", Object.keys(pkg));
try {
  const Vly = pkg.Vly || pkg.default;
  console.log("Vly type:", typeof Vly);
} catch (e) {
  console.log("Error:", e.message);
}
