# Video Generation API - Quick Reference Card

## ONE-COMMAND TEST (FREE)

```bash
curl https://api-inference.huggingface.co/models/tencent/HunyuanVideo \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{"inputs": "A cat walks on the grass"}' \
  --output video.mp4
```

---

## API KEYS YOU HAVE

✅ **HuggingFace:** `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` (FREE)
❌ **Groq:** `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` (NO VIDEO)

---

## BEST OPTIONS BY USE CASE

### Free / Testing
**HuggingFace HunyuanVideo** - FREE, 720p, 5s

### Cheapest Premium
**LTX Video (fal.ai)** - $0.02/video

### Best Value
**HunyuanVideo (fal.ai)** - $0.40/video, 720p
**Kling Standard** - $0.23/video, multiple resolutions

### Production Quality
**Luma Dream Machine** - $0.50-$2.00, 540p-1080p
**Kling Pro** - $0.48-$0.95, cinematic quality

### Top Tier + Audio
**OpenAI Sora 2** - Premium, with audio
**Google Veo 3.1** - Premium, with audio
**Runway Gen-4** - Professional, with audio

---

## PRICING CHEAT SHEET

| Model | Cost | Duration | Resolution | Audio |
|-------|------|----------|------------|-------|
| **HuggingFace** | FREE | 5-6s | 720p | ❌ |
| **LTX Video** | $0.02 | Variable | 768x512 | ❌ |
| **Kling Standard** | $0.23 | 5s | Multiple | ❌ |
| **HunyuanVideo** | $0.40 | 5s | 720p | ❌ |
| **Kling Pro** | $0.48 | 5s | Multiple | ❌ |
| **MiniMax** | $0.50 | 6s | 720p | ❌ |
| **Luma 540p** | $0.50 | 5s | 540p | ❌ |
| **Luma 720p** | $1.00 | 5s | 720p | ❌ |
| **Luma 1080p** | $2.00 | 5s | 1080p | ❌ |
| **Sora 2** | Premium | Variable | High | ✅ |
| **Veo 3.1** | Premium | Variable | High | ✅ |
| **Runway** | Credits | 2-10s | Up to 1280p | ✅ |

---

## PLATFORMS

### HuggingFace (FREE)
- **URL:** https://huggingface.co/
- **Token:** Already have
- **Models:** HunyuanVideo, CogVideoX, LTX-Video
- **Best For:** Testing, development

### fal.ai (Best Value)
- **URL:** https://fal.ai/dashboard
- **Models:** 10+ video models
- **Best For:** Production, cost-effective

### Replicate (Most Options)
- **URL:** https://replicate.com/account/api-tokens
- **Models:** Sora 2, Veo 3.1, Kling, MiniMax, more
- **Best For:** Access to latest models

### Runway (Professional)
- **URL:** https://app.runwayml.com/account/api
- **Models:** Gen-4, Gen-3, Veo 3.1
- **Best For:** Professional production

### Luma AI (Production Quality)
- **URL:** https://lumalabs.ai/dream-machine/api/keys
- **Model:** Ray2
- **Best For:** High-quality at affordable price

---

## CODE SNIPPETS

### Python - FREE
```python
import requests

response = requests.post(
    "https://api-inference.huggingface.co/models/tencent/HunyuanVideo",
    headers={"Authorization": "Bearer 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"},
    json={"inputs": "A panda playing guitar"}
)

with open("video.mp4", "wb") as f:
    f.write(response.content)
```

### Python - Premium (fal.ai)
```python
import fal_client

result = fal_client.submit(
    "fal-ai/luma-dream-machine",
    arguments={"prompt": "A serene lake at sunset"}
).get()

print(result["video"]["url"])
```

### JavaScript - FREE
```javascript
const response = await fetch(
  'https://api-inference.huggingface.co/models/tencent/HunyuanVideo',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({inputs: "A panda playing guitar"})
  }
);

const videoBlob = await response.blob();
```

---

## TROUBLESHOOTING

**Model loading error?** Wait 60 seconds (cold start)

**Rate limited?** Upgrade to HF PRO or use premium API

**Low quality?** Try Luma, Kling Pro, or Sora 2

**Need audio?** Use Sora 2, Veo 3.1, or Runway

**Too expensive?** Use HunyuanVideo ($0.40) or Kling Standard ($0.23)

---

## DOCUMENTATION

📄 **Complete Guide:** `/home/daytona/codebase/REAL_VIDEO_GENERATION_APIS.md` (22KB)
🚀 **Quick Start:** `/home/daytona/codebase/VIDEO_API_QUICK_START.md` (8.2KB)
📊 **Summary:** `/home/daytona/codebase/VIDEO_API_SUMMARY.md` (9KB)
✅ **Checklist:** `/home/daytona/codebase/VIDEO_API_IMPLEMENTATION_CHECKLIST.md` (11KB)
⚡ **This Card:** `/home/daytona/codebase/VIDEO_API_QUICK_REFERENCE.md`

---

## KEY FACTS

✅ All APIs generate REAL videos with motion (NOT slideshows)
✅ FREE option available NOW with your HuggingFace token
✅ Premium from $0.02/video
✅ Top-tier from $0.50/video
✅ Audio available on Sora 2, Veo 3.1, Runway
✅ Up to 1080p resolution available
✅ Up to 10 seconds duration available

---

**Start Testing Now:** Run the one-command test at the top!
