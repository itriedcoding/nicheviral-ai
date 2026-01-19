# 🎥 HuggingFace Video Models - Important Info

## ⚠️ IMPORTANT: Model Warmup Required

HuggingFace inference API puts models to "sleep" when not in use to save resources. This means:

### First Request (Cold Start):
- ⏱️ Takes 20-30 seconds to load model into memory
- ❌ Returns error: "Model is loading"
- This is NORMAL and EXPECTED

### Second Request (Warmed Up):
- ✅ Model is ready
- ✅ Generates video successfully
- ⚡ Much faster (~30-60 seconds for actual generation)

---

## 🎯 SOLUTION: Just Try Again

When you see: **"All free video models are currently loading or unavailable"**

**Do this**:
1. Wait 30 seconds
2. Click "Generate Video" again
3. Success! ✅

**Why**: The first request woke up the model, the second request uses it.

---

## 🔄 HOW IT WORKS

### HunyuanVideo (720p, 5s):
```
First Request  → Model loads (20-30s) → Returns error
Wait 30s       → Model ready
Second Request → Generates video ✅ (30-60s)
```

### CogVideoX-5B (480p, 6s):
```
First Request  → Model loads (20-30s) → Returns error
Wait 30s       → Model ready
Second Request → Generates video ✅ (30-45s)
```

### LTX-Video (Fast):
```
First Request  → Model loads (15-20s) → Returns error
Wait 30s       → Model ready
Second Request → Generates video ✅ (20-40s)
```

---

## 💡 PRO TIPS

### Tip 1: Pre-Warm Models
Generate a test video first to wake up models:
- Select HunyuanVideo
- Generate with simple prompt: "A sunset"
- Wait for error
- Wait 30s
- Try again → Success!
- Now all future generations are faster

### Tip 2: Use Direct Model Selection
Instead of Neura AI (which tries all 3 models), select specific model:
- Select "🎥 HunyuanVideo" directly
- Faster because it only tries one model
- Best quality of free models

### Tip 3: Timing
- First generation of the day: Expect warmup
- Subsequent generations: Fast (models stay loaded for ~10 minutes)
- If model errors again: Wait 30s and retry

---

## 🎬 MODELS AVAILABLE

### 1. HunyuanVideo (Tencent) ⭐⭐⭐⭐
- **Resolution**: 720p (1280x720)
- **Duration**: 5 seconds
- **FPS**: 25
- **Frames**: 129
- **Quality**: Best free option
- **Warmup**: 20-30s
- **Generation**: 30-60s

### 2. CogVideoX-5B (Tsinghua) ⭐⭐⭐
- **Resolution**: 480p (720x480)
- **Duration**: 6 seconds
- **FPS**: 8
- **Frames**: 49
- **Quality**: Good
- **Warmup**: 20-30s
- **Generation**: 30-45s

### 3. LTX-Video (Lightricks) ⭐⭐⭐
- **Resolution**: 768x512
- **Duration**: 5 seconds
- **Quality**: Fast generation
- **Warmup**: 15-20s
- **Generation**: 20-40s

---

## 🚀 QUICK START CHECKLIST

- [x] HF_TOKEN configured ✅
- [x] Models integrated ✅
- [x] Neura AI fallback working ✅
- [ ] **First warmup**: Generate test video
- [ ] **Wait 30s** after first error
- [ ] **Try again** → Success!

---

## ❓ FAQ

### Q: Why do I get "models loading" error?
**A**: First request wakes up the model. Wait 30s and try again.

### Q: How long does warmup take?
**A**: 20-30 seconds. Only happens on first use or after model sleeps.

### Q: Can I skip warmup?
**A**: No, it's how HuggingFace free tier works. Premium models don't need warmup.

### Q: Do premium models need warmup?
**A**: No! Runway and Luma are always ready (but cost money).

### Q: Which free model is best?
**A**: HunyuanVideo (720p, best quality). Select it directly for fastest results.

### Q: How do I avoid warmup?
**A**: Use models regularly (every 10 minutes) or upgrade to premium models.

---

## ✅ REMEMBER

**FIRST TIME ALWAYS NEEDS WARMUP**

This is not a bug - it's how free AI models work!

1. First request: Wakes up model
2. Wait 30 seconds
3. Second request: Works perfectly ✅

**After warmup, models stay fast for ~10 minutes!**

🎬 **Your system is working correctly!**
