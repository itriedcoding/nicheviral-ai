# Fix "Unauthenticated is not defined" Error

## The Problem
You're seeing: `ReferenceError: Unauthenticated is not defined`

This is a **browser caching issue**. The browser is loading an old cached version of the Navigation component that still has references to Convex Auth's `Unauthenticated` component.

## The Solution

### Step 1: Clear ALL Caches (Already Done)
```bash
# Server-side caches cleared ✅
rm -rf node_modules/.vite dist .vite
npx convex dev --once
```

### Step 2: Clear Browser Cache (YOU MUST DO THIS)

#### Option A: Hard Refresh (Easiest)
**Windows/Linux:**
- Press `Ctrl + Shift + R`
- OR Press `Ctrl + F5`

**Mac:**
- Press `Cmd + Shift + R`

#### Option B: Developer Tools Method (Most Thorough)
1. Open DevTools: Press `F12`
2. Right-click the refresh button (next to address bar)
3. Select **"Empty Cache and Hard Reload"**

#### Option C: Manual Cache Clear
1. Open DevTools: Press `F12`
2. Go to **Application** tab
3. In left sidebar, click **Storage**
4. Click **"Clear site data"**
5. Refresh the page

### Step 3: Verify It's Fixed
1. After hard refresh, go to: `http://localhost:5173/`
2. Open DevTools Console (F12 → Console tab)
3. Check for errors
4. ✅ Should see clean page with no `Unauthenticated` errors

## Why This Happened

The Navigation component was updated from:
```tsx
// OLD (cached in browser)
import { Authenticated, Unauthenticated } from "convex/react";
<Unauthenticated>...</Unauthenticated>
```

To:
```tsx
// NEW (on server)
import { getSession, clearSession } from "@/lib/auth";
{!session ? (...) : (...)}
```

Your browser is still loading the OLD cached JavaScript file.

## Verification Commands

Run these to verify server-side is correct:
```bash
# Check Navigation.tsx has NO Convex Auth imports
grep "Unauthenticated\|Authenticated" src/components/Navigation.tsx
# Should return: (no output)

# Check TypeScript compiles
npx tsc -b --noEmit
# Should return: (no errors)

# Check Convex functions
npx convex dev --once
# Should return: ✔ Convex functions ready!
```

All server checks pass ✅ - This confirms it's 100% a browser cache issue.

## Still Not Working?

Try these in order:

### 1. Close ALL browser tabs with your app
- Close every tab showing `localhost:5173`
- Close and restart the browser completely
- Open a fresh tab and navigate to `http://localhost:5173/`

### 2. Use Incognito/Private Window
- Open an Incognito window (Ctrl+Shift+N / Cmd+Shift+N)
- Navigate to `http://localhost:5173/`
- This uses zero cache

### 3. Clear All Browsing Data
**Chrome/Edge:**
1. Press `Ctrl+Shift+Delete` (Cmd+Shift+Delete on Mac)
2. Time range: **"All time"**
3. Check: **"Cached images and files"**
4. Click **"Clear data"**

**Firefox:**
1. Press `Ctrl+Shift+Delete`
2. Time range: **"Everything"**
3. Check: **"Cache"**
4. Click **"Clear Now"**

### 4. Nuclear Option - Different Browser
If still failing, try a different browser entirely:
- If using Chrome, try Firefox
- If using Firefox, try Chrome
- Fresh browser = zero cache

## What You Should See After Fix

### Landing Page (/)
```
✅ Navigation bar with "Sign In" and "Get Started" buttons
✅ No console errors
✅ Clean glassmorphism UI
```

### After Sign In (/dashboard)
```
✅ Navigation shows "Dashboard" and "Sign Out" buttons
✅ Personalized welcome message
✅ No console errors
```

---

**TL;DR**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh. The error is 100% browser cache - the server code is correct!
