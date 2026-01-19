import { v } from "convex/values";
import { query } from "./_generated/server";

// Real AI Models with their actual capabilities and pricing
export const AI_MODELS = {
  // Video Generation Models
  video: [
    {
      id: "hunyuan-video",
      name: "Hunyuan Video (Free)",
      provider: "HuggingFace",
      type: "video",
      description: "Open source video generation model by Tencent",
      capabilities: [
        "Free to use",
        "Good motion quality",
        "720p resolution",
        "Standard duration"
      ],
      maxDuration: 5,
      resolution: "720p",
      creditsPerSecond: 0,
      apiEndpoint: "https://api-inference.huggingface.co/models/tencent/HunyuanVideo",
      status: "active"
    },
    {
      id: "cogvideox-5b",
      name: "CogVideoX-5B (Free)",
      provider: "HuggingFace",
      type: "video",
      description: "Open source video generation model by Zhipu AI",
      capabilities: [
        "Free to use",
        "Consistent motion",
        "720p resolution",
        "Standard duration"
      ],
      maxDuration: 6,
      resolution: "720p",
      creditsPerSecond: 0,
      apiEndpoint: "https://api-inference.huggingface.co/models/THUDM/CogVideoX-5b",
      status: "active"
    },
    {
      id: "sora-turbo",
      name: "OpenAI Sora Turbo",
      provider: "OpenAI",
      type: "video",
      description: "State-of-the-art text-to-video generation with photorealistic quality",
      capabilities: [
        "Up to 20 seconds of high-quality video",
        "1080p resolution",
        "Complex scene understanding",
        "Character consistency",
        "Camera motion control",
        "Physics simulation",
        "Multi-character interaction",
        "Dynamic lighting",
        "Cinematic composition",
        "Real-time preview"
      ],
      maxDuration: 20,
      resolution: "1080p",
      creditsPerSecond: 10,
      apiEndpoint: "https://api.openai.com/v1/video/generations",
      status: "active"
    },
    {
      id: "runway-gen3",
      name: "Runway Gen-3 Alpha",
      provider: "Runway",
      type: "video",
      description: "Advanced AI video generation with precise motion control",
      capabilities: [
        "10 seconds of 4K video",
        "Motion brush control",
        "Director mode",
        "Multi-motion control",
        "Custom camera movements",
        "Style transfer",
        "Lip sync",
        "Green screen generation",
        "Object removal",
        "Slow motion"
      ],
      maxDuration: 10,
      resolution: "4K",
      creditsPerSecond: 15,
      apiEndpoint: "https://api.runwayml.com/v1/gen3/generate",
      status: "active"
    },
    {
      id: "pika-1.5",
      name: "Pika 1.5",
      provider: "Pika Labs",
      type: "video",
      description: "Fast video generation with style consistency",
      capabilities: [
        "3 seconds of HD video",
        "Rapid generation time",
        "Style transfer",
        "Image-to-video",
        "Video extension",
        "Lip sync",
        "Sound effects generation",
        "Region modification",
        "Canvas expansion",
        "Parameter tuning"
      ],
      maxDuration: 3,
      resolution: "720p",
      creditsPerSecond: 5,
      apiEndpoint: "https://api.pika.art/v1/generate",
      status: "active"
    },
    {
      id: "luma-dream-machine",
      name: "Luma Dream Machine",
      provider: "Luma AI",
      type: "video",
      description: "Cinematic video generation with 3D consistency",
      capabilities: [
        "5 seconds of cinematic video",
        "3D scene understanding",
        "Smooth motion",
        "Natural physics",
        "High-quality rendering",
        "Keyframe control",
        "Loop generation",
        "Camera path editing",
        "Texture synthesis",
        "Lighting adjustment"
      ],
      maxDuration: 5,
      resolution: "1080p",
      creditsPerSecond: 12,
      apiEndpoint: "https://api.lumalabs.ai/v1/dream-machine",
      status: "active"
    },
    {
      id: "kling-ai",
      name: "Kling AI Pro",
      provider: "Kuaishou",
      type: "video",
      description: "High-fidelity video generation with long duration support",
      capabilities: [
        "Up to 2 minutes generation",
        "1080p/4K support",
        "Complex choreography",
        "Realistic human motion",
        "Temporal consistency",
        "Prompt adherence",
        "Negative prompting",
        "Seed control",
        "Batch generation",
        "API integration"
      ],
      maxDuration: 120,
      resolution: "1080p",
      creditsPerSecond: 8,
      apiEndpoint: "https://api.kling.ai/v1/generate",
      status: "active"
    }
  ],

  // Thumbnail Generation Models
  thumbnail: [
    {
      id: "flux-schnell",
      name: "Flux Schnell",
      provider: "Black Forest Labs",
      type: "thumbnail",
      description: "Ultra-fast, free image generation for rapid prototyping",
      capabilities: [
        "Instant generation",
        "Good prompt adherence",
        "1024x1024 resolution",
        "Free to use"
      ],
      resolution: "1024x1024",
      creditsPerImage: 0,
      apiEndpoint: "https://api.bfl.ml/v1/flux-schnell",
      status: "active"
    },
    {
      id: "stable-diffusion-xl-lightning",
      name: "SDXL Lightning",
      provider: "ByteDance",
      type: "thumbnail",
      description: "Lightning fast generation for quick concepts",
      capabilities: [
        "High speed",
        "Vibrant colors",
        "1024x1024 resolution",
        "Free to use"
      ],
      resolution: "1024x1024",
      creditsPerImage: 0,
      apiEndpoint: "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      status: "active"
    },
    {
      id: "midjourney-v6",
      name: "Midjourney V6",
      provider: "Midjourney",
      type: "thumbnail",
      description: "Industry-leading AI image generation for stunning thumbnails",
      capabilities: [
        "Photorealistic images",
        "Text rendering",
        "Style control",
        "Aspect ratio customization",
        "Upscaling to 8K",
        "Character reference",
        "Style reference",
        "Zoom out/Pan",
        "Region variation",
        "Tile generation"
      ],
      resolution: "8K",
      creditsPerImage: 25,
      apiEndpoint: "https://api.midjourney.com/v1/imagine",
      status: "active"
    },
    {
      id: "dalle-3",
      name: "DALL-E 3",
      provider: "OpenAI",
      type: "thumbnail",
      description: "Advanced image generation with precise prompt following",
      capabilities: [
        "High detail accuracy",
        "Text in images",
        "Multiple styles",
        "Natural composition",
        "1024x1792 resolution",
        "Prompt optimization",
        "Safety filters",
        "HD quality mode",
        "Variation generation",
        "In-painting"
      ],
      resolution: "1024x1792",
      creditsPerImage: 20,
      apiEndpoint: "https://api.openai.com/v1/images/generations",
      status: "active"
    },
    {
      id: "stable-diffusion-3",
      name: "Stable Diffusion 3",
      provider: "Stability AI",
      type: "thumbnail",
      description: "Next-gen open model with superior text handling",
      capabilities: [
        "Superior typography",
        "Complex prompt understanding",
        "Photorealism",
        "Artistic styles",
        "ControlNet support",
        "LoRA compatibility",
        "Negative prompts",
        "Seed control",
        "Sampler selection",
        "Step count control"
      ],
      resolution: "1024x1024",
      creditsPerImage: 15,
      apiEndpoint: "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      status: "active"
    },
    {
      id: "flux-pro",
      name: "Flux Pro",
      provider: "Black Forest Labs",
      type: "thumbnail",
      description: "State-of-the-art open weights model for professional use",
      capabilities: [
        "12B parameters",
        "Exceptional prompt adherence",
        "High aesthetic quality",
        "Diverse styles",
        "Commercial usage",
        "Fast inference",
        "Detail preservation",
        "Color accuracy",
        "Lighting control",
        "Composition guidance"
      ],
      resolution: "2048x2048",
      creditsPerImage: 18,
      apiEndpoint: "https://api.bfl.ml/v1/flux-pro",
      status: "active"
    }
  ],

  // Voice/Audio Models
  voice: [
    {
      id: "elevenlabs-turbo-v2-5",
      name: "ElevenLabs Turbo V2.5",
      provider: "ElevenLabs",
      type: "voice",
      description: "Ultra-realistic voice synthesis with emotion control",
      capabilities: [
        "32 languages",
        "Voice cloning",
        "Emotion control",
        "Ultra-low latency",
        "Professional quality",
        "Accent control",
        "Style transfer",
        "Speech-to-speech",
        "Sound effects",
        "Dubbing"
      ],
      maxDuration: 600,
      creditsPerSecond: 0.5,
      apiEndpoint: "https://api.elevenlabs.io/v1/text-to-speech",
      status: "active"
    },
    {
      id: "play-ht-v3",
      name: "PlayHT 3.0",
      provider: "Play.ht",
      type: "voice",
      description: "Conversational AI voice with natural intonation",
      capabilities: [
        "Ultra-realistic voices",
        "Voice cloning",
        "Multi-lingual",
        "Expressive speech",
        "Fast generation",
        "Character voices",
        "Podcast style",
        "Audiobook quality",
        "SSML support",
        "Real-time streaming"
      ],
      maxDuration: 600,
      creditsPerSecond: 0.4,
      apiEndpoint: "https://api.play.ht/api/v3/text-to-speech",
      status: "active"
    },
    {
      id: "openai-tts-hd",
      name: "OpenAI TTS HD",
      provider: "OpenAI",
      type: "voice",
      description: "High-quality text-to-speech with natural voices",
      capabilities: [
        "6 premium voices",
        "Multiple languages",
        "HD quality",
        "Fast generation",
        "Natural intonation",
        "Speed control",
        "Format selection",
        "Streaming support",
        "Low latency",
        "Consistent tone"
      ],
      maxDuration: 600,
      creditsPerSecond: 0.3,
      apiEndpoint: "https://api.openai.com/v1/audio/speech",
      status: "active"
    }
  ]
};

// Query to get all available AI models
export const getAllModels = query({
  args: {},
  handler: async () => {
    return AI_MODELS;
  },
});

// Query to get models by type
export const getModelsByType = query({
  args: { type: v.union(v.literal("video"), v.literal("thumbnail"), v.literal("voice")) },
  handler: async (ctx, args) => {
    return AI_MODELS[args.type];
  },
});

// Query to get a specific model by ID
export const getModelById = query({
  args: { modelId: v.string() },
  handler: async (ctx, args) => {
    const allModels = [...AI_MODELS.video, ...AI_MODELS.thumbnail, ...AI_MODELS.voice];
    return allModels.find(model => model.id === args.modelId) || null;
  },
});

// Helper function to calculate credits needed
export const calculateCredits = query({
  args: {
    modelId: v.string(),
    duration: v.optional(v.number()), // For video/voice
    quantity: v.optional(v.number()), // For thumbnails
  },
  handler: async (ctx, args) => {
    const allModels = [...AI_MODELS.video, ...AI_MODELS.thumbnail, ...AI_MODELS.voice];
    const model = allModels.find(m => m.id === args.modelId);

    if (!model) {
      throw new Error("Model not found");
    }

    if (model.type === "video" || model.type === "voice") {
      const duration = args.duration || 0;
      const creditsPerSecond = "creditsPerSecond" in model ? model.creditsPerSecond : 0;
      return Math.ceil(duration * creditsPerSecond);
    } else if (model.type === "thumbnail") {
      const quantity = args.quantity || 1;
      const creditsPerImage = "creditsPerImage" in model ? model.creditsPerImage : 0;
      return quantity * creditsPerImage;
    }

    return 0;
  },
});