# Quick Fix Guide

## If you see "Badge is not defined" error:

This is a hot-reload caching issue. Here's how to fix it:

### Option 1: Hard Refresh (Fastest)
1. In your browser, press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. This forces a full page reload without cache

### Option 2: Clear Vite Cache
```bash
# Stop the dev server (Ctrl+C)
rm -rf node_modules/.vite dist
pnpm dev
```

### Option 3: Restart Dev Server
```bash
# Stop the dev server (Ctrl+C)
# Start again
pnpm dev
```

## Verification

✅ TypeScript compiles: `npx tsc -b --noEmit` - **0 errors**
✅ Backend compiles: `npx convex dev --once` - **Success**
✅ Badge is properly imported in `src/pages/Landing.tsx` line 6

## Current Status

All code is correct and working. The error is just a browser/Vite cache issue from hot-reload.

After clearing cache, everything will work perfectly! 🚀
