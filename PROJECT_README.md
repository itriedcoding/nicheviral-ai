# Neura AI - AI-Powered Viral Video Creation Platform

A stunning full-stack application for discovering trending niches and creating viral videos using AI. Built with React, Convex, and cutting-edge AI models.

## Features

### 🎨 Glassmorphism Design
- Beautiful black and strawberry red color scheme
- Frosted glass effects with backdrop blur
- Smooth animations and transitions
- Fully responsive (mobile + desktop)

### 🔥 Trending Niches Discovery
- Real-time YouTube API integration
- Discover trending topics before they explode
- Smart trend scoring algorithm
- Category-based filtering
- Keyword extraction and analysis

### 🤖 AI Video Generation
- Multiple AI models: Sora, Runway, Pika Labs, Stable Diffusion
- AI-powered script generation using GPT-4o
- Voiceover generation with ElevenLabs
- Automated video idea generation
- Real-time generation status tracking

### ✨ Premium Features
- 3D floating orbs animation
- Scroll-triggered animations
- Hover effects throughout
- Glassmorphic cards and UI elements
- Credit-based system
- User authentication via Convex Auth

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Three Fiber** - 3D graphics
- **shadcn/ui** - Beautiful component library

### Backend
- **Convex** - Reactive real-time backend
- **Convex Auth** - Built-in authentication
- **Node.js Actions** - Server-side operations

### AI Integration
- **@vly-ai/integrations** - AI model access
- **YouTube Data API v3** - Trending data
- **GPT-4o-mini** - Script generation
- **ElevenLabs** - Voice synthesis (ready)
- **Sora/Runway** - Video generation (ready)

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
Add these to your Convex dashboard (API Keys tab):

```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

Get your YouTube API key from: https://console.cloud.google.com/apis/credentials

### 3. Start Development Server
```bash
# Terminal 1: Start Convex
npx convex dev

# Terminal 2: Start Vite
pnpm dev
```

### 4. Seed Sample Data (Optional)
```bash
npx convex run seedData:seedNiches
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── FloatingOrbs.tsx # 3D animated background
├── convex/
│   ├── schema.ts        # Database schema
│   ├── youtube.ts       # YouTube API integration
│   ├── youtubeQueries.ts# Niche queries
│   ├── aiGeneration.ts  # AI video generation
│   ├── videos.ts        # Video management
│   └── seedData.ts      # Test data seeding
├── pages/
│   ├── Landing.tsx      # Landing page with hero
│   ├── Dashboard.tsx    # Main app dashboard
│   └── Auth.tsx         # Authentication page
├── index.css            # Glassmorphism theme
└── main.tsx             # App entry point
```

## Key Files Explained

### Database Schema (`src/convex/schema.ts`)
- **niches**: Trending topics from YouTube
- **videos**: AI-generated video records
- **generations**: User generation history
- **userCredits**: Credit system
- **users**: User accounts (Convex Auth)

### YouTube Integration (`src/convex/youtube.ts`)
- `fetchTrendingVideos` - Get trending videos from YouTube
- `searchNiches` - Search for specific niches
- Automatic trend score calculation
- Keyword extraction

### AI Generation (`src/convex/aiGeneration.ts`)
- `generateScript` - Create video scripts with AI
- `createVideo` - Full video generation pipeline
- `generateVideoIdeas` - Brainstorm video concepts
- `generateVoiceover` - Text-to-speech (ready)

### Dashboard (`src/pages/Dashboard.tsx`)
- Browse trending niches
- Generate AI videos
- View generation status
- Credit management

## Customization

### Theme Colors
Edit `src/index.css` to change the color scheme:
- `--primary`: Strawberry red accent
- `--background`: Pure black background
- `--card`: Glassmorphic card opacity

### Glassmorphism Utilities
- `.glass` - Standard glass effect
- `.glass-strong` - More opaque
- `.glass-light` - More transparent
- `.glass-card` - Cards with shadow
- `.red-glow` - Red glow effect

### AI Models
Edit model selection in `src/pages/Dashboard.tsx`:
```typescript
<SelectItem value="sora">Sora (OpenAI)</SelectItem>
<SelectItem value="runway">Runway Gen-3</SelectItem>
<SelectItem value="pika">Pika Labs</SelectItem>
```

## API Integration

### YouTube API
1. Enable YouTube Data API v3 in Google Cloud Console
2. Create API credentials
3. Add to Convex environment variables
4. Max 10,000 quota units per day (free tier)

### AI Integration
The project uses `@vly-ai/integrations` for AI functionality:
- Pre-configured and ready to use
- No API key management needed
- Supports multiple AI models
- Built-in credit system

To use your own API keys instead:
1. Remove `@vly-ai/integrations` dependency
2. Install specific SDKs (OpenAI, ElevenLabs, etc.)
3. Add API keys to environment
4. Update action implementations

## Production Deployment

### 1. Deploy Convex
```bash
npx convex deploy
```

### 2. Deploy Frontend
```bash
pnpm build
```

Deploy the `dist/` folder to:
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- Any static host

### 3. Configure Environment
- Add production YouTube API key
- Configure authentication providers
- Set up custom domain

## Features Roadmap

### Ready for Integration
- ✅ YouTube trending data
- ✅ AI script generation
- ✅ Niche discovery
- ✅ User authentication
- ⏳ Actual Sora API (coming soon)
- ⏳ ElevenLabs voiceover (ready)
- ⏳ Video rendering pipeline
- ⏳ Payment integration
- ⏳ Video export/download

## Notes

This is a demo application showcasing:
- Real YouTube API integration
- Real AI script generation
- Production-ready architecture
- Professional UI/UX design

For actual video generation, you'll need:
1. Sora API access (waitlist)
2. Runway API key (paid)
3. Or alternative video generation API

The infrastructure is ready - just plug in the APIs!

## Credits

Built with:
- Claude Code (AI-assisted development)
- Convex (backend & database)
- vly.ai (AI integrations)
- shadcn/ui (components)
- Unsplash (sample images)

## License

This is a demonstration project. Feel free to use as reference or starting point for your own projects.
