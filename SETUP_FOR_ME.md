# ⚡ INSTANT SETUP - I'll Guide You Step by Step

## Don't worry, I'll make this SUPER easy. Just follow these steps.

---

## 🎯 What You Need:

1. **HuggingFace account** (FREE) - for video and image generation
2. **Groq account** (FREE) - for text generation

Both are 100% free. No credit card. Takes 5 minutes total.

---

## 📝 Step-by-Step Instructions:

### STEP 1: Create HuggingFace Account

1. Open this link in your browser:
   ```
   https://huggingface.co/join
   ```

2. Fill in:
   - Your email
   - Pick a username
   - Pick a password
   - Click "Sign Up"

3. **Check your email** and click the verification link

4. Now open this link:
   ```
   https://huggingface.co/settings/tokens
   ```

5. Click the blue button "Create new token"

6. Fill in:
   - Name: `Neura AI`
   - Type: Click and select **"Read"**
   - Click "Create token"

7. **COPY THE TOKEN** - it looks like:
   ```
   hf_abcdefghijklmnopqrstuvwxyz123456789
   ```

8. Open your terminal and paste this command (replace with your token):
   ```bash
   npx convex env set HF_TOKEN "hf_YOUR_TOKEN_HERE"
   ```

✅ **Step 1 Complete!**

---

### STEP 2: Create Groq Account

1. Open this link in your browser:
   ```
   https://console.groq.com/signup
   ```

2. Fill in:
   - Your email
   - Pick a password
   - Click "Sign Up"

3. **Check your email** and click the verification link

4. After verifying, you'll be at the Groq dashboard

5. Click "API Keys" in the left sidebar

6. Click "Create API Key" button

7. Fill in:
   - Name: `Neura AI`
   - Click "Submit"

8. **COPY THE API KEY** - it looks like:
   ```
   gsk_abcdefghijklmnopqrstuvwxyz123456789ABCDEFGH
   ```

9. Open your terminal and paste this command (replace with your key):
   ```bash
   npx convex env set GROQ_API_KEY "gsk_YOUR_KEY_HERE"
   ```

✅ **Step 2 Complete!**

---

## 🎉 YOU'RE DONE!

Seriously, that's it. You now have:

✅ FREE real video generation (CogVideoX-5B)
✅ FREE high-quality images (Flux.1-dev)
✅ FREE fast text generation (Llama 3.3 70B)
✅ FREE audio generation (StreamElements)

**No hardware setup. No installations. No credit card.**

---

## 🚀 Test It:

1. Open your app
2. Go to "AI Studio" tab
3. You should see: "☁️ CLOUD - Using free cloud services (Groq, HuggingFace, Pollinations)"
4. In the "AI Model" dropdown, select: **"🤗 CogVideoX-5B (HuggingFace)"** or **"⚡ Flux.1-dev Slideshow (HF)"**
5. Type a prompt: "A beautiful sunset over mountains"
6. Click "Generate Video"
7. **Watch the magic happen!**

---

## 💡 Pro Tips:

- **CogVideoX** = Real MP4 videos (10-20 per day, FREE)
- **Flux Slideshow** = High-quality slideshow videos (100+ per day, FREE)
- **Pollinations** = Backup if you hit rate limits (unlimited, FREE)

All options are FREE. Pick whichever you want.

---

## 🆘 Need Help?

If you get stuck:

1. **Can't find the token page?**
   - Just paste this in your browser: `https://huggingface.co/settings/tokens`

2. **Can't find API keys page on Groq?**
   - Just paste this in your browser: `https://console.groq.com/keys`

3. **Token not working?**
   - Make sure you selected "Read" type (not "Write")
   - Try creating a new token

4. **Still stuck?**
   - The system has automatic fallbacks
   - Even without these keys, Pollinations AI will work (FREE, unlimited)
   - You literally can't break it

---

## ✅ Verify Your Setup:

Run this command to check:
```bash
npx convex env list
```

You should see:
```
HF_TOKEN: hf_***************
GROQ_API_KEY: gsk_***************
```

If you see those, **YOU'RE ALL SET!**

---

**Total time: 5-7 minutes**
**Total cost: $0**
**Total difficulty: Copy & paste**

**Now go create some amazing AI videos! 🎬✨**
