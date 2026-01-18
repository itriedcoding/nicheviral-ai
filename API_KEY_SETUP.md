# 🔑 API Key Setup Guide

## Quick Start: Enable Premium AI Features

---

## Option 1: Full Premium (Recommended)

**Set OpenAI API Key to unlock:**
- ✅ Sora 2 video generation (real MP4 videos)
- ✅ DALL-E 3 image generation (HD quality)
- ✅ GPT-4o text generation (scripts, scenes)

### Steps:

1. **Get OpenAI API Key:**
   - Visit: https://platform.openai.com/api-keys
   - Sign in or create account
   - Click "Create new secret key"
   - Copy the key (starts with `sk-proj-` or `sk-`)

2. **Set the key in Convex:**
   ```bash
   npx convex env set OPENAI_API_KEY "sk-proj-YOUR_KEY_HERE"
   ```

3. **Verify it works:**
   - Generate a video in the app
   - Check console logs for "🚀 Attempting Sora 2 video generation..."
   - If Sora 2 works, you'll see "✅ Sora 2 video generated successfully!"

4. **Add billing to OpenAI account:**
   - Go to https://platform.openai.com/account/billing
   - Add payment method
   - Set usage limits if desired

**Cost per video:**
- Sora 2: ~$0.20 per 10 seconds
- DALL-E 3: ~$0.04 per image
- GPT-4o: ~$0.005 per request

---

## Option 2: Balanced (Flux Pro Images)

**Set Flux API Key for high-quality images:**

### Steps:

1. **Get Flux API Key:**
   - Visit: https://docs.bfl.ml/
   - Sign up for API access
   - Get your API key from dashboard

2. **Set the key in Convex:**
   ```bash
   npx convex env set FLUX_API_KEY "YOUR_FLUX_KEY_HERE"
   ```

3. **Verify:**
   - Generate video with images
   - Check for "✅ Flux Pro generated scene" in logs

**Cost per video:**
- Flux Pro: ~$0.02 per image × 4 images = ~$0.08 per video

---

## Option 3: Free Tier (No API Keys)

**Current setup works without any API keys:**
- ✅ Pollinations AI (images)
- ✅ StreamElements TTS (audio)
- ✅ Slideshow videos
- ✅ $0.00 cost

**No setup needed** - already working!

---

## Checking Current Setup

### View current environment variables:
```bash
npx convex env list
```

### Expected output with keys set:
```
OPENAI_API_KEY: sk-proj-***************
FLUX_API_KEY: ***************
SQUARE_ACCESS_TOKEN: ***************
SQUARE_APPLICATION_ID: sq0idp-***************
SQUARE_LOCATION_ID: ***************
VLY_INTEGRATION_KEY: ***************
```

---

## Testing the Setup

### Test with a video generation:

1. Open AI Studio in the app
2. Enter prompt: "tech product review video"
3. Duration: 10 seconds
4. Click "Generate"
5. Watch console logs:

**With OPENAI_API_KEY:**
```
🚀 Attempting Sora 2 video generation...
✅ Sora 2 video generated successfully!
```

**Without OPENAI_API_KEY (Fallback):**
```
⚠️ Sora 2 not available, falling back to slideshow generation
📸 Generating slideshow with advanced AI models...
✅ DALL-E 3 generated scene 1 (if key set)
OR
✅ Flux Pro generated scene 1 (if Flux key set)
OR
✅ Pollinations AI generated scene 1 (free fallback)
```

---

## Cost Management

### OpenAI Usage Limits:

Set monthly limits to control costs:

1. Go to https://platform.openai.com/account/limits
2. Set "Monthly budget" (e.g., $50)
3. Set "Usage alert" (e.g., 80% of budget)

### Estimated Monthly Costs:

**Low usage (10 videos/day):**
- With Sora 2: ~$60/month (10 videos × $0.20 × 30 days)
- With slideshow + DALL-E: ~$30/month (10 videos × $0.10 × 30 days)
- With Pollinations (free): $0/month

**Medium usage (50 videos/day):**
- With Sora 2: ~$300/month
- With slideshow + DALL-E: ~$150/month
- With Pollinations (free): $0/month

**High usage (200 videos/day):**
- With Sora 2: ~$1,200/month
- With slideshow + DALL-E: ~$600/month
- With Pollinations (free): $0/month

---

## Troubleshooting

### "Error: insufficient_quota" (OpenAI)
**Cause:** No credits in OpenAI account
**Fix:** Add payment method at https://platform.openai.com/account/billing

### "Error: invalid_api_key" (OpenAI)
**Cause:** API key is wrong or expired
**Fix:**
1. Create new key at https://platform.openai.com/api-keys
2. Update: `npx convex env set OPENAI_API_KEY "sk-proj-..."`

### "Sora 2 not available"
**Cause:** Sora 2 API might not be available in your region or account
**Fix:** System automatically falls back to slideshow generation (still great quality)

### Videos still using Pollinations instead of DALL-E 3
**Cause:** OPENAI_API_KEY not set or API call failing
**Fix:**
1. Verify key is set: `npx convex env list`
2. Check OpenAI account has credits
3. Check console logs for error messages

### "Unauthorized" on VLY calls
**Cause:** VLY_INTEGRATION_KEY issue (known issue)
**Status:** Not critical - OpenAI API key bypasses VLY and works directly
**Fix:** Set OPENAI_API_KEY to use direct OpenAI API instead

---

## API Key Security

### Best Practices:

1. **Never commit API keys to Git**
   - Keys are stored in Convex environment variables
   - Never add to `.env` files that might be committed

2. **Rotate keys regularly**
   - Create new keys every 3-6 months
   - Delete old keys from OpenAI dashboard

3. **Use separate keys for development/production**
   - Create different keys for testing vs production
   - Set lower limits on development keys

4. **Monitor usage**
   - Check OpenAI dashboard weekly
   - Set up usage alerts
   - Review unexpected spikes

---

## Summary

### To enable ALL features:
```bash
npx convex env set OPENAI_API_KEY "sk-proj-YOUR_KEY_HERE"
```

### To enable just image upgrades:
```bash
npx convex env set FLUX_API_KEY "YOUR_FLUX_KEY_HERE"
```

### To use free tier:
- No action needed - already working!

---

**Choose the option that fits your budget and quality needs.**
**The system works great with all three options!**

---

**Last Updated:** January 18, 2026
