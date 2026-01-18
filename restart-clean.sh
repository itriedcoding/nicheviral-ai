#!/bin/bash
echo "🧹 Cleaning all caches..."
rm -rf node_modules/.vite dist .vite

echo "🔄 Regenerating Convex functions..."
npx convex dev --once

echo "✅ Server is clean! Now:"
echo "1. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)"
echo "2. Or open DevTools (F12) → Right-click refresh → Empty Cache and Hard Reload"
echo ""
echo "📝 See CLEAR_CACHE.md for detailed instructions"
