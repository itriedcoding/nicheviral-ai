# REAL VIDEO GENERATION APIs - Complete Guide

**IMPORTANT: All APIs listed below generate ACTUAL MP4/WebM VIDEO FILES with real motion, NOT slideshows or image sequences.**

---

## FREE / LOW-COST OPTIONS

### 1. HuggingFace Inference API (FREE TIER AVAILABLE)

**Authentication:**
- Token: `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`
- Header: `Authorization: Bearer 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`

**Endpoint:**
```
POST https://api-inference.huggingface.co/models/{model_id}
```

**Available Models (REAL VIDEO GENERATION):**

#### A. Tencent HunyuanVideo
- **Model ID:** `tencent/HunyuanVideo`
- **Generates:** Real videos with consistent motion
- **Specifications:**
  - Duration: Up to 5 seconds
  - Resolution: 720p
  - Frame Rate: 24 fps
  - Output: MP4 video

**Request Format:**
```bash
curl https://api-inference.huggingface.co/models/tencent/HunyuanVideo \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": "A cat walks on the grass, realistic style",
    "parameters": {
      "num_frames": 49,
      "guidance_scale": 6,
      "num_inference_steps": 50,
      "seed": 42
    }
  }'
```

**Response:**
Returns raw video bytes (MP4 format)

#### B. Lightricks LTX-Video
- **Model ID:** `Lightricks/LTX-Video`
- **Generates:** Real videos with high fidelity motion
- **Specifications:**
  - Very fast generation (distilled version available)
  - Strong prompt adherence
  - Output: MP4 video

#### C. CogVideoX-5B
- **Model ID:** `THUDM/CogVideoX-5b`
- **Generates:** REAL videos with frame-by-frame motion
- **Specifications:**
  - Duration: 6 seconds
  - Frame Rate: 8 fps
  - Resolution: 720x480
  - Total Frames: 49 frames with continuous motion
  - Output: MP4 video

**Key Features:**
- Uses diffusion-based transformer architecture
- 3D RoPE positional encoding for temporal understanding
- Generates temporal sequences with genuine motion (NOT individual frames)
- Examples: butterflies fluttering, rain dynamics, running subjects, water ripples

**FREE TIER:**
- Available through HuggingFace Inference API
- Rate limits apply (higher limits for PRO users)
- Providers: Fal AI, Replicate integration available

**Pricing:**
- FREE tier with rate limits
- PRO users: Higher rate limits
- Enterprise: Custom pricing

---

## PREMIUM APIS (TOP-TIER QUALITY)

### 2. OpenAI Sora 2 (via Replicate)

**Status:** Available through Replicate
**Generates:** Real videos with synced audio
**Quality:** Flagship model, home video quality

**API Details:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer <REPLICATE_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "SORA_VERSION_ID",
    "input": {
      "prompt": "A teddy bear in sunglasses playing electric guitar"
    }
  }' \
  https://api.replicate.com/v1/predictions
```

**Pricing:** Premium pricing (check Replicate for current rates)
**Output:** MP4 video with audio
**Features:**
- Highest quality video generation
- Synced audio generation
- Multiple duration options

---

### 3. Google Veo 3.1 (via Replicate & fal.ai)

**Generates:** Real videos with cinematic quality
**Features:**
- Higher-fidelity video output
- Context-aware audio generation
- Reference image support
- Last frame support

**Via Replicate:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer <REPLICATE_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "VEO_VERSION_ID",
    "input": {
      "prompt": "A serene lake surrounded by mountains at sunset"
    }
  }' \
  https://api.replicate.com/v1/predictions
```

**Pricing:** Premium (provider rates apply)
**Output:** MP4 video with audio

---

### 4. Luma AI Dream Machine (Ray2)

**Generates:** Real production-quality videos
**Model:** Ray2 - Production-ready frontier text-to-video model

**API Endpoint:**
```
https://api.lumalabs.ai/dream-machine/v1/generations
```

**Authentication:**
- Bearer token authentication
- Get API key from: https://lumalabs.ai/dream-machine/api/keys

**Request Format:**
```bash
curl -X POST https://api.lumalabs.ai/dream-machine/v1/generations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A panda playing guitar in a bamboo forest",
    "aspect_ratio": "16:9",
    "loop": false
  }'
```

**Specifications:**
- **Aspect Ratios:** 16:9, 9:16, 4:3, 3:4, 21:9, 9:21
- **Resolutions:** 540p (default), 720p (2x cost), 1080p (4x cost)
- **Duration:** 5 seconds (default) or 9 seconds (2x cost)
- **Output:** MP4 video files
- **Loop Support:** Seamless looping available

**Pricing via fal.ai:**
- **Base Price:** $0.50 per video (540p, 5 seconds)
- **720p:** 2x base price ($1.00)
- **1080p:** 4x base price ($2.00)
- **9 seconds:** 2x duration cost

**Via fal.ai endpoint:**
```
POST https://fal.run/fal-ai/luma-dream-machine
```

**Features:**
- Fast coherent motion
- Ultra-realistic details
- Logical event sequences
- Camera control and keyframe manipulation
- Video extension and looping
- Character and visual reference capabilities

**Documentation:** https://docs.lumalabs.ai/

---

### 5. Kling Video v1.6 & v2.5 (via fal.ai & Replicate)

**Generates:** Real videos with cinematic visuals and fluid motion
**Quality:** Top-tier with smooth motion and cinematic depth

#### A. Kling 1.0 Standard (via fal.ai)

**Endpoint:**
```
POST https://fal.run/fal-ai/kling-video/v1/standard/text-to-video
```

**Request Format:**
```javascript
const response = await fetch('https://fal.run/fal-ai/kling-video/v1/standard/text-to-video', {
  method: 'POST',
  headers: {
    'Authorization': 'Key YOUR_FAL_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "A teddy bear in sunglasses playing electric guitar and dancing",
    duration: 5,
    aspect_ratio: "16:9",
    negative_prompt: "blur, distort, and low quality",
    cfg_scale: 0.5
  })
});
```

**Parameters:**
- **prompt** (required): Text description
- **duration**: 5 or 10 seconds (default: 5)
- **aspect_ratio**: 16:9, 9:16, or 1:1 (default: 16:9)
- **negative_prompt**: Unwanted elements
- **cfg_scale**: Guidance strength 0-1 (default: 0.5)

**Output:**
```json
{
  "video": {
    "url": "https://fal.media/files/.../output.mp4",
    "file_size": 1234567,
    "content_type": "video/mp4"
  }
}
```

**Pricing:**
- **Standard:** $0.045 per second
- **5 seconds:** ~$0.225
- **10 seconds:** ~$0.45
- **Processing time:** ~6 minutes

#### B. Kling 1.6 Pro (via fal.ai)

**Endpoint:**
```
POST https://fal.run/fal-ai/kling-video/v1.6/pro/text-to-video
```

**Pricing:**
- **Pro:** $0.095 per second
- **5 seconds:** ~$0.475
- **10 seconds:** ~$0.95

**Features:**
- Enhanced output quality
- Same duration and aspect ratio options
- Commercial use permitted

#### C. Kling v2.5 Turbo Pro (via Replicate)

**Features:**
- Smooth motion and cinematic depth
- Remarkable prompt adherence
- Optimized for fast turnaround
- 1.6M+ runs on Replicate

**Via Replicate API:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer <REPLICATE_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "KLING_VERSION_ID",
    "input": {
      "prompt": "A cat walks on the grass, realistic style"
    }
  }' \
  https://api.replicate.com/v1/predictions
```

---

### 6. MiniMax Video-01 (Hailuo) (via Replicate & fal.ai)

**Generates:** Real cinematic videos with camera movement effects
**Quality:** 720p HD with diverse styles

**Via Replicate:**

**Endpoint:**
```
POST https://api.replicate.com/v1/predictions
```

**Request Format:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer <REPLICATE_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "MINIMAX_VERSION_ID",
    "input": {
      "prompt": "A teddy bear in sunglasses playing electric guitar",
      "prompt_optimizer": true
    }
  }' \
  https://api.replicate.com/v1/predictions
```

**Specifications:**
- **Resolution:** 720p HD
- **Duration:** Up to 6 seconds
- **Frame Rate:** 25 fps
- **Output:** MP4 video
- **Features:** Cinematic camera movement effects

**Advanced Features:**
- **Optional first frame image:** Controls output aspect ratio
- **Subject reference image:** Character-consistent generation (S2V-01 model)
- **Prompt optimizer:** Automatic prompt enhancement (default: enabled)

**Pricing:**
- **Per video:** $0.50 (or 20 videos for $10)
- **Typical run:** ~$0.016
- **Hourly rate:** $0.0001 per second

**Via fal.ai:**
```
POST https://fal.run/fal-ai/minimax-video
Price: $0.50 per video
```

**Key Capabilities:**
- High compression rates
- Excellent text responsiveness
- Text-to-video and image-to-video modes
- Visually striking content with native HD output

---

### 7. Tencent HunyuanVideo (via Replicate & fal.ai)

**Generates:** Real videos with realistic motion
**Quality:** State-of-the-art with strong prompt adherence

**Via Replicate:**

**Endpoint:**
```
POST https://api.replicate.com/v1/predictions
```

**Request Format:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer <REPLICATE_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "HUNYUAN_VERSION_ID",
    "input": {
      "prompt": "A cat walks on the grass, realistic style",
      "video_length": 129,
      "width": 1280,
      "height": 720,
      "inference_steps": 50,
      "guidance_scale": 6,
      "fps": 24,
      "seed": 42
    }
  }' \
  https://api.replicate.com/v1/predictions
```

**Parameters:**
- **prompt**: Text description (required)
- **video_length**: 1-200 frames (must be 4k+1, e.g., 49 or 129)
- **width/height**: Up to 1280px (divisible by 16)
- **inference_steps**: 1-50 (default: 50)
- **guidance_scale**: 1-10 (default: 6)
- **fps**: Minimum 1 (default: 24)
- **seed**: Optional for reproducibility

**Pricing:**
- **Cost:** $0.0061 per second
- **Estimated run:** ~$1.25 per generation
- **Hardware:** 4x H100 GPUs

**Output:** MP4 video files

**Via fal.ai:**
```
POST https://fal.run/fal-ai/hunyuan-video
Price: $0.40 per video
```

**Specifications:**
- **Duration:** ~5 seconds
- **Resolution:** 480p, 580p, or 720p (default)
- **Aspect Ratios:** 16:9 or 9:16
- **Frame Counts:** 85 or 129 frames
- **Processing Time:** ~4 minutes
- **Commercial Use:** Free for commercial applications

**Additional Features:**
- **Pro Mode:** Enhanced quality (2x billing units)
- **num_inference_steps:** 2-30 (default: 30)

---

### 8. Runway Gen-3 & Gen-4 Turbo (Official API)

**Generates:** Real professional-grade videos
**Models:** Gen-4 Turbo (latest), Gen-3 Alpha, Veo 3.1

**API Endpoint:**
```
https://api.dev.runwayml.com/v1/
```

**Authentication:**
- Bearer token authentication
- Header: `Authorization: Bearer YOUR_RUNWAY_API_KEY`
- Required Header: `X-Runway-Version: 2024-11-06`

**Available Endpoints:**

#### A. Text to Video
```bash
POST /v1/text_to_video
```

**Models:** veo3.1, veo3.1_fast, veo3

**Request Format:**
```json
{
  "model": "veo3.1",
  "prompt": "A serene lake surrounded by mountains at sunset",
  "duration": 5,
  "resolution": "1280x720"
}
```

#### B. Image to Video
```bash
POST /v1/image_to_video
```

**Models:** gen4_turbo, veo3.1, veo3

**Request Format:**
```json
{
  "model": "gen4_turbo",
  "image_url": "https://example.com/image.jpg",
  "prompt": "The mountain moves and water flows",
  "duration": 5,
  "resolution": "1280x720"
}
```

#### C. Video to Video
```bash
POST /v1/video_to_video
```

**Model:** gen4_aleph

#### D. Video Upscale
```bash
POST /v1/video_upscale
```

**Model:** upscale_v1 (up to 4X enlargement)

**Specifications:**
- **Resolutions:** 1280×720, 720×1280, 1104×832, 960×960, 1584×672, and more
- **Duration:** 2-10 seconds (varies by model)
- **Options:** 4, 6, or 8-second durations available
- **Input Types:** HTTPS URLs, Runway upload URIs (`runway://...`), Data URIs

**Task Management:**
```bash
GET /v1/tasks/{task_id}
POST /v1/tasks/{task_id}/cancel
DELETE /v1/tasks/{task_id}
```

**Pricing:**
- Credit-based system
- Usage tracked by model and day
- Check organization endpoints for credit balance

**Documentation:** https://docs.dev.runwayml.com/api

---

### 9. Lightricks LTX Video (via fal.ai)

**Generates:** Real videos from text or images
**Quality:** Research preview with fast generation

**Endpoints:**
- Text-to-Video: `POST https://fal.run/fal-ai/ltx-video/text-to-video`
- Image-to-Video: `POST https://fal.run/fal-ai/ltx-video/image-to-video`

**Authentication:**
```javascript
// JavaScript
fal.config({ credentials: "YOUR_FAL_KEY_HERE" });

// Python
os.environ["FAL_KEY"] = "YOUR_FAL_KEY_HERE"
```

**Request Format:**
```json
{
  "prompt": "A panda playing guitar in a bamboo forest",
  "guidance_scale": 3,
  "num_inference_steps": 30,
  "seed": 42
}
```

**Parameters:**
- **guidance_scale:** 2-10 (default: 3)
- **num_inference_steps:** 1-50 (default: 30)
- **seed:** Optional for reproducibility

**Pricing:**
- **Cost:** $0.02 per video
- **Hardware:** GPU-H100 infrastructure

**Specifications:**
- **Image-to-Video Resolution:** 768x512 recommended
- **Status:** Preview/Research only (not production-ready)
- **Output:** MP4 video

---

### 10. Alibaba Wan 2.5 & 2.6 (via Replicate)

**Generates:** Real videos, open-source
**Quality:** Inexpensive for short, low-res clips

**Via Replicate:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer <REPLICATE_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "WAN_VERSION_ID",
    "input": {
      "prompt": "A cat walks on the grass"
    }
  }' \
  https://api.replicate.com/v1/predictions
```

**Pricing:** Very inexpensive for short, low-resolution clips
**Output:** MP4 video
**Features:** Open-source text-to-video generation

---

### 11. PixVerse v4/v5 (via Replicate)

**Generates:** Real stylized videos
**Quality:** 360p-1080p with enhanced motion

**Via Replicate:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer <REPLICATE_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "PIXVERSE_VERSION_ID",
    "input": {
      "prompt": "A magical forest with glowing trees"
    }
  }' \
  https://api.replicate.com/v1/predictions
```

**Specifications:**
- **Duration:** 5-8 seconds
- **Resolution:** 360p-1080p
- **Enhanced motion quality**

**Pricing:**
- **Cost:** ~$0.30 for a 5-second, 360p video

---

## REPLICATE API - UNIVERSAL FORMAT

All Replicate models use the same API format:

**Authentication:**
```
Authorization: Bearer <your_replicate_api_token>
```

**Get API Token:** https://replicate.com/account/api-tokens

**Create Prediction:**
```bash
curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "MODEL_VERSION_ID",
    "input": {
      "prompt": "Your text prompt here"
    }
  }' \
  https://api.replicate.com/v1/predictions
```

**Get Prediction Status:**
```bash
curl -s -X GET \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/predictions/{prediction_id}
```

**Response Format:**
```json
{
  "id": "prediction_id",
  "status": "succeeded",
  "output": "https://replicate.delivery/pbxt/video.mp4",
  "metrics": {
    "predict_time": 123.45
  }
}
```

**Rate Limits:**
- Prediction creation: 600 requests/minute
- Other endpoints: 3000 requests/minute

**Available Video Models on Replicate:**
- OpenAI Sora 2
- Google Veo 3.1 & 3.1-Fast
- Kling v2.5 Turbo Pro
- MiniMax Video-01 (Hailuo 2.3)
- Tencent HunyuanVideo
- Alibaba Wan 2.5 & 2.6
- PixVerse v4/v5

---

## FAL.AI API - UNIVERSAL FORMAT

**Authentication:**
```javascript
// JavaScript
import * as fal from "@fal-ai/serverless-client";
fal.config({ credentials: "YOUR_FAL_KEY_HERE" });

// Python
import os
os.environ["FAL_KEY"] = "YOUR_FAL_KEY_HERE"
```

**Get API Key:** https://fal.ai/dashboard

**Base Endpoint:**
```
https://fal.run/
```

**Request Format:**
```bash
curl -X POST https://fal.run/{model_endpoint} \
  -H "Authorization: Key YOUR_FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Your text prompt here"
  }'
```

**Available Video Models on fal.ai:**
- Luma Dream Machine: `fal-ai/luma-dream-machine` ($0.50/video)
- Kling 1.0 Standard: `fal-ai/kling-video/v1/standard/text-to-video` ($0.045/sec)
- Kling 1.6 Pro: `fal-ai/kling-video/v1.6/pro/text-to-video` ($0.095/sec)
- MiniMax Video: `fal-ai/minimax-video` ($0.50/video)
- HunyuanVideo: `fal-ai/hunyuan-video` ($0.40/video)
- LTX Video: `fal-ai/ltx-video` ($0.02/video)
- Veo 3.1: Available
- Sora 2: Available
- Wan v2.6: Available

**Features:**
- Optional authentication (higher rate limits with API key)
- Synchronous and queue-based requests
- Webhook integration
- WebSocket support for real-time updates

---

## COMPARISON TABLE

| API | Free Tier | Cost per Video | Quality | Duration | Resolution | Audio |
|-----|-----------|---------------|---------|----------|------------|-------|
| **HuggingFace (HunyuanVideo)** | ✅ Yes | FREE (rate limited) | Good | ~5s | 720p | ❌ |
| **HuggingFace (LTX-Video)** | ✅ Yes | FREE (rate limited) | Good | Variable | Variable | ❌ |
| **HuggingFace (CogVideoX)** | ✅ Yes | FREE (rate limited) | Good | 6s | 720x480 | ❌ |
| **OpenAI Sora 2** | ❌ No | Premium | Excellent | Variable | High | ✅ |
| **Google Veo 3.1** | ❌ No | Premium | Excellent | Variable | High | ✅ |
| **Luma Dream Machine** | ❌ No | $0.50-$2.00 | Excellent | 5-9s | 540p-1080p | ❌ |
| **Kling Standard** | ❌ No | $0.045/sec | Very Good | 5-10s | Multiple | ❌ |
| **Kling Pro** | ❌ No | $0.095/sec | Excellent | 5-10s | Multiple | ❌ |
| **MiniMax Video-01** | ❌ No | $0.50 | Very Good | 6s | 720p | ❌ |
| **HunyuanVideo (Replicate)** | ❌ No | $0.0061/sec | Very Good | ~5s | Up to 1280p | ❌ |
| **Runway Gen-4** | ❌ No | Credit-based | Excellent | 2-10s | Up to 1280p | ✅ |
| **LTX Video** | ❌ No | $0.02 | Good (Preview) | Variable | 768x512 | ❌ |
| **PixVerse** | ❌ No | ~$0.30 | Good | 5-8s | 360p-1080p | ❌ |

---

## RECOMMENDATIONS

### For FREE/Low Budget:
1. **HuggingFace HunyuanVideo** - Best free option with consistent motion
2. **HuggingFace CogVideoX** - Proven diffusion-based video generation
3. **LTX Video via fal.ai** - Only $0.02 per video (cheapest premium option)

### For Best Quality:
1. **OpenAI Sora 2** - Flagship quality with audio
2. **Google Veo 3.1** - Cinematic quality with context-aware audio
3. **Runway Gen-4 Turbo** - Professional-grade video generation
4. **Luma Dream Machine Ray2** - Production-ready with excellent motion

### For Best Value:
1. **MiniMax Video-01** - $0.50 for 720p HD, 6-second videos
2. **Luma Dream Machine** - $0.50 for 540p, production quality
3. **Kling Standard** - $0.045/sec, good quality at low cost
4. **HunyuanVideo (fal.ai)** - $0.40 per video with commercial use

### For Specific Use Cases:
- **Longest Duration:** Runway Gen-4 (up to 10 seconds)
- **Highest Resolution:** Runway, Luma (up to 1080p)
- **With Audio:** Sora 2, Veo 3.1, Runway
- **Fastest Generation:** Kling Turbo, LTX Video
- **Commercial Use:** HunyuanVideo, Kling, MiniMax

---

## IMPLEMENTATION EXAMPLES

### Example 1: Using HuggingFace (FREE)

```python
import requests
import os

API_URL = "https://api-inference.huggingface.co/models/tencent/HunyuanVideo"
headers = {"Authorization": f"Bearer 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"}

def generate_video(prompt):
    payload = {
        "inputs": prompt,
        "parameters": {
            "num_frames": 49,
            "guidance_scale": 6,
            "num_inference_steps": 50
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    # Response is raw video bytes
    with open("output.mp4", "wb") as f:
        f.write(response.content)

    return "output.mp4"

# Generate video
video_path = generate_video("A cat walks on the grass, realistic style")
print(f"Video saved to: {video_path}")
```

### Example 2: Using Replicate (PREMIUM)

```python
import replicate

# Set your API token
os.environ["REPLICATE_API_TOKEN"] = "your_replicate_token"

# Generate video with MiniMax
output = replicate.run(
    "minimax/video-01",
    input={
        "prompt": "A teddy bear in sunglasses playing electric guitar",
        "prompt_optimizer": True
    }
)

print(f"Video URL: {output}")
```

### Example 3: Using fal.ai (PREMIUM)

```python
import fal_client
import os

os.environ["FAL_KEY"] = "your_fal_key"

def generate_video_fal(prompt):
    handler = fal_client.submit(
        "fal-ai/luma-dream-machine",
        arguments={
            "prompt": prompt,
            "aspect_ratio": "16:9",
            "loop": False
        }
    )

    result = handler.get()
    return result["video"]["url"]

# Generate video
video_url = generate_video_fal("A panda playing guitar in a bamboo forest")
print(f"Video URL: {video_url}")
```

### Example 4: Using Runway (PREMIUM)

```bash
curl -X POST https://api.dev.runwayml.com/v1/text_to_video \
  -H "Authorization: Bearer YOUR_RUNWAY_API_KEY" \
  -H "X-Runway-Version: 2024-11-06" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gen4_turbo",
    "prompt": "A serene lake surrounded by mountains at sunset",
    "duration": 5,
    "resolution": "1280x720"
  }'
```

---

## NOTES

1. **All APIs listed generate REAL VIDEOS with motion** - not slideshows or image sequences
2. **HuggingFace is the ONLY FREE option** - all others require paid API keys
3. **Groq API does NOT support video generation** - only text/chat models
4. **Best free option:** HuggingFace HunyuanVideo or CogVideoX
5. **Best premium options:** Sora 2, Veo 3.1, Runway Gen-4, Luma Ray2
6. **Most affordable premium:** LTX Video ($0.02), HunyuanVideo fal.ai ($0.40), Kling Standard ($0.045/sec)
7. **With audio generation:** Sora 2, Veo 3.1, Runway only

---

## GETTING API KEYS

- **HuggingFace:** Already have: `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`
- **Replicate:** https://replicate.com/account/api-tokens
- **fal.ai:** https://fal.ai/dashboard
- **Runway:** https://app.runwayml.com/account/api
- **Luma:** https://lumalabs.ai/dream-machine/api/keys

---

**Last Updated:** January 2026
