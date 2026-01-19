# Video Generation API - Quick Start Guide

## IMMEDIATE ACTION ITEMS

### 1. FREE Option (Start Here)
Use your existing **HuggingFace Token** to generate videos RIGHT NOW:

```bash
curl https://api-inference.huggingface.co/models/tencent/HunyuanVideo \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": "A cat walks on the grass, realistic style",
    "parameters": {
      "num_frames": 49,
      "guidance_scale": 6,
      "num_inference_steps": 50
    }
  }' \
  --output video.mp4
```

**This generates a REAL 5-second MP4 video with motion!**

### 2. Best FREE Models on HuggingFace

All accessible with your token: `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`

1. **tencent/HunyuanVideo** - Best quality, 720p, 5 seconds
2. **THUDM/CogVideoX-5b** - 6 seconds, 720x480, proven diffusion model
3. **Lightricks/LTX-Video** - Fast generation, high fidelity motion

### 3. Upgrade to Premium (Recommended)

**Best Value Premium APIs:**

| API | Cost | Quality | Best For |
|-----|------|---------|----------|
| **LTX Video** (fal.ai) | $0.02/video | Good | Testing/Development |
| **HunyuanVideo** (fal.ai) | $0.40/video | Very Good | Commercial Use |
| **Kling Standard** (fal.ai) | $0.23-$0.45 | Very Good | General Purpose |
| **MiniMax** (Replicate) | $0.50/video | Very Good | 720p HD Videos |
| **Luma Dream Machine** | $0.50-$2.00 | Excellent | Production Quality |

**Top Tier (Best Quality):**
1. **OpenAI Sora 2** - Flagship with audio (Replicate)
2. **Google Veo 3.1** - Cinematic with audio (Replicate/fal.ai)
3. **Runway Gen-4 Turbo** - Professional grade (Official API)

---

## PYTHON IMPLEMENTATION

### Option 1: FREE - HuggingFace

```python
import requests

def generate_video_free(prompt):
    """Generate video using FREE HuggingFace API"""
    API_URL = "https://api-inference.huggingface.co/models/tencent/HunyuanVideo"
    headers = {"Authorization": "Bearer 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"}

    payload = {
        "inputs": prompt,
        "parameters": {
            "num_frames": 49,
            "guidance_scale": 6,
            "num_inference_steps": 50
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        with open("output.mp4", "wb") as f:
            f.write(response.content)
        return "output.mp4"
    else:
        raise Exception(f"Error: {response.status_code} - {response.text}")

# Use it
video = generate_video_free("A panda playing guitar in a bamboo forest")
print(f"Video saved: {video}")
```

### Option 2: PREMIUM - fal.ai (Best Value)

```python
import fal_client
import os

os.environ["FAL_KEY"] = "your_fal_api_key"

def generate_video_premium(prompt, model="fal-ai/luma-dream-machine"):
    """Generate video using premium fal.ai API"""
    handler = fal_client.submit(
        model,
        arguments={
            "prompt": prompt,
            "aspect_ratio": "16:9"
        }
    )

    result = handler.get()
    return result["video"]["url"]

# Use it
video_url = generate_video_premium("A serene lake at sunset with mountains")
print(f"Video URL: {video_url}")
```

### Option 3: PREMIUM - Replicate (Most Models)

```python
import replicate
import os

os.environ["REPLICATE_API_TOKEN"] = "your_replicate_token"

def generate_video_replicate(prompt, model="minimax/video-01"):
    """Generate video using Replicate API"""
    output = replicate.run(
        model,
        input={
            "prompt": prompt,
            "prompt_optimizer": True
        }
    )
    return output

# Use it
video_url = generate_video_replicate("A teddy bear playing electric guitar")
print(f"Video URL: {video_url}")
```

---

## JAVASCRIPT IMPLEMENTATION

### Option 1: FREE - HuggingFace

```javascript
async function generateVideoFree(prompt) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/tencent/HunyuanVideo',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_frames: 49,
          guidance_scale: 6,
          num_inference_steps: 50
        }
      })
    }
  );

  const videoBlob = await response.blob();
  return videoBlob; // Save to file system or return URL
}

// Use it
const video = await generateVideoFree("A cat walks on the grass");
```

### Option 2: PREMIUM - fal.ai

```javascript
import * as fal from "@fal-ai/serverless-client";

fal.config({ credentials: "YOUR_FAL_KEY" });

async function generateVideoPremium(prompt) {
  const result = await fal.subscribe("fal-ai/luma-dream-machine", {
    input: {
      prompt: prompt,
      aspect_ratio: "16:9"
    },
    logs: true
  });

  return result.data.video.url;
}

// Use it
const videoUrl = await generateVideoPremium("A panda playing guitar");
console.log(`Video URL: ${videoUrl}`);
```

---

## COST COMPARISON (Per Video)

### FREE
- ✅ **HuggingFace** - FREE (rate limited)

### BUDGET ($0.02 - $0.50)
- **LTX Video** - $0.02 (Preview quality)
- **Kling Standard (5s)** - $0.23
- **HunyuanVideo** - $0.40
- **MiniMax** - $0.50 (720p HD)
- **Luma Dream Machine (540p)** - $0.50

### PREMIUM ($0.50 - $2.00)
- **Kling Pro (5s)** - $0.48
- **Luma (720p)** - $1.00
- **Luma (1080p)** - $2.00

### TOP TIER (Premium Pricing)
- **OpenAI Sora 2** - Premium
- **Google Veo 3.1** - Premium
- **Runway Gen-4** - Credit-based

---

## RECOMMENDED WORKFLOW

### Phase 1: FREE Testing (Now)
1. Use HuggingFace HunyuanVideo with existing token
2. Test prompts and understand video generation
3. Determine quality requirements

### Phase 2: Low-Cost Premium (Next)
1. Sign up for fal.ai account → https://fal.ai/dashboard
2. Start with LTX Video ($0.02) for rapid testing
3. Upgrade to HunyuanVideo ($0.40) or Kling Standard ($0.23) for better quality

### Phase 3: Production (When Ready)
1. For high-quality needs: Luma Dream Machine or Kling Pro
2. For audio + video: OpenAI Sora 2 or Google Veo 3.1
3. For professional work: Runway Gen-4 Turbo

---

## API KEY SIGNUP LINKS

| Service | Signup URL | Initial Credit |
|---------|-----------|----------------|
| **HuggingFace** | ✅ Already have | FREE tier |
| **fal.ai** | https://fal.ai/dashboard | Free trial credits |
| **Replicate** | https://replicate.com/account/api-tokens | Pay as you go |
| **Runway** | https://app.runwayml.com/account/api | Credit purchase |
| **Luma** | https://lumalabs.ai/dream-machine/api/keys | Credit purchase |

---

## QUICK DECISION MATRIX

**"I want to test for FREE right now"**
→ Use HuggingFace HunyuanVideo (you already have the token)

**"I want the cheapest premium option"**
→ LTX Video on fal.ai ($0.02/video)

**"I want best value for quality"**
→ HunyuanVideo on fal.ai ($0.40/video) or Kling Standard ($0.23)

**"I want production-quality videos"**
→ Luma Dream Machine ($0.50-$2.00) or Kling Pro ($0.48)

**"I want the absolute best with audio"**
→ OpenAI Sora 2 or Google Veo 3.1 (premium)

**"I want professional/commercial use"**
→ Runway Gen-4 Turbo (credit-based, professional grade)

---

## COMMON ISSUES & SOLUTIONS

### Issue: "Is this a real video or slideshow?"
✅ **ALL APIs in this guide generate REAL MP4 videos with motion** - not slideshows

### Issue: "HuggingFace returns model loading error"
💡 Model may be cold-starting. Wait 20-60 seconds and retry. First request can take longer.

### Issue: "Rate limited on free tier"
💡 HuggingFace has rate limits. Upgrade to PRO ($9/month) for higher limits or use paid alternatives.

### Issue: "Video quality is low"
💡 Free models have limitations. Upgrade to Luma, Kling Pro, or Runway for better quality.

### Issue: "Need videos with audio"
💡 Only Sora 2, Veo 3.1, and Runway support audio generation.

---

## NEXT STEPS

1. **Test FREE option now** - Run the HuggingFace example above
2. **Review full documentation** - See `REAL_VIDEO_GENERATION_APIS.md` for complete details
3. **Sign up for fal.ai** - Best value for premium features
4. **Integrate into your app** - Use the code examples above

---

**For complete API documentation, see:** `/home/daytona/codebase/REAL_VIDEO_GENERATION_APIS.md`
