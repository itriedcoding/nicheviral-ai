import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Terminal, Key, Zap, Shield, BookOpen } from "lucide-react";

export default function ApiDocs() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Code className="w-3 h-3 mr-1" />
              API Documentation
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Neura AI API
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integrate AI video generation into your applications with our powerful REST API
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Quick Start</h2>
                <p className="text-sm text-muted-foreground">Get started in minutes</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Base URL</span>
                  <Badge variant="outline">v1</Badge>
                </div>
                <code className="text-primary text-sm">https://api.neuraai.cyou/v1</code>
              </div>

              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Authentication
                  </span>
                  <Badge variant="outline">Required</Badge>
                </div>
                <code className="text-sm text-muted-foreground block mt-2">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
          </motion.div>

          {/* API Endpoints */}
          <Tabs defaultValue="video" className="space-y-6">
            <TabsList className="glass">
              <TabsTrigger value="video">Video Generation</TabsTrigger>
              <TabsTrigger value="thumbnail">Thumbnails</TabsTrigger>
              <TabsTrigger value="voiceover">Voiceovers</TabsTrigger>
              <TabsTrigger value="script">Scripts</TabsTrigger>
            </TabsList>

            {/* Video Generation Endpoint */}
            <TabsContent value="video">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-8"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">POST</Badge>
                    <code className="text-sm">/v1/generate/video</code>
                  </div>
                  <p className="text-muted-foreground">
                    Generate AI-powered videos with custom prompts and settings
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Request Body</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
{`{
  "prompt": "A cinematic sunset over mountains",
  "model": "sora",
  "duration": 10,
  "aspectRatio": "16:9",
  "voice": "Brian",
  "includeAudio": true
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Response</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400">
{`{
  "success": true,
  "contentId": "vid_abc123",
  "outputs": {
    "images": ["https://..."],
    "audio": "https://...",
    "thumbnail": "https://..."
  },
  "metadata": {
    "processingTime": 4500,
    "aiModel": "unified-ai-model-v1",
    "frameCount": 8
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Example cURL</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-muted-foreground">
{`curl -X POST https://api.neuraai.cyou/v1/generate/video \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A cinematic sunset over mountains",
    "model": "sora",
    "duration": 10
  }'`}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Thumbnail Endpoint */}
            <TabsContent value="thumbnail">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-8"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">POST</Badge>
                    <code className="text-sm">/v1/generate/thumbnail</code>
                  </div>
                  <p className="text-muted-foreground">
                    Create eye-catching thumbnails with AI image generation
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Request Body</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
{`{
  "prompt": "Dramatic YouTube thumbnail with text",
  "model": "midjourney",
  "aspectRatio": "16:9",
  "enhance": true
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Response</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400">
{`{
  "success": true,
  "contentId": "thumb_xyz789",
  "outputs": {
    "thumbnail": "https://...",
    "alternates": ["https://...", "https://..."]
  },
  "metadata": {
    "processingTime": 2300,
    "resolution": "1920x1080"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Voiceover Endpoint */}
            <TabsContent value="voiceover">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-8"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">POST</Badge>
                    <code className="text-sm">/v1/generate/voiceover</code>
                  </div>
                  <p className="text-muted-foreground">
                    Generate realistic AI voiceovers in multiple voices and languages
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Request Body</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
{`{
  "text": "Welcome to our channel!",
  "voice": "Brian",
  "model": "elevenlabs",
  "stability": 50,
  "similarity": 75
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Response</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400">
{`{
  "success": true,
  "contentId": "audio_def456",
  "outputs": {
    "audio": "https://...",
    "duration": 2.5
  },
  "metadata": {
    "processingTime": 1200,
    "characterCount": 23
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Script Endpoint */}
            <TabsContent value="script">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-8"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">POST</Badge>
                    <code className="text-sm">/v1/generate/script</code>
                  </div>
                  <p className="text-muted-foreground">
                    Generate viral video scripts with AI writing assistance
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Request Body</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
{`{
  "topic": "How to grow on YouTube",
  "duration": 60,
  "tone": "engaging",
  "includeHook": true
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Response</h3>
                    <div className="glass rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400">
{`{
  "success": true,
  "script": "Hook: Want to grow your YouTube...",
  "wordCount": 250,
  "estimatedDuration": 60,
  "sections": ["intro", "main", "cta"]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Rate Limits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-8 mt-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Rate Limits & Credits</h2>
                <p className="text-sm text-muted-foreground">Usage limits per tier</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass p-4">
                <h3 className="font-semibold mb-2">Free Tier</h3>
                <p className="text-2xl font-bold text-primary mb-2">100</p>
                <p className="text-sm text-muted-foreground">Credits per month</p>
                <p className="text-xs text-muted-foreground mt-2">5 requests/minute</p>
              </Card>

              <Card className="glass p-4">
                <h3 className="font-semibold mb-2">Pro Tier</h3>
                <p className="text-2xl font-bold text-primary mb-2">5,000</p>
                <p className="text-sm text-muted-foreground">Credits per month</p>
                <p className="text-xs text-muted-foreground mt-2">50 requests/minute</p>
              </Card>

              <Card className="glass p-4">
                <h3 className="font-semibold mb-2">Enterprise</h3>
                <p className="text-2xl font-bold text-primary mb-2">Unlimited</p>
                <p className="text-sm text-muted-foreground">Credits per month</p>
                <p className="text-xs text-muted-foreground mt-2">Custom rate limits</p>
              </Card>
            </div>
          </motion.div>

          {/* Error Codes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-8 mt-8"
          >
            <h2 className="text-2xl font-bold mb-6">Error Codes</h2>
            <div className="space-y-3">
              <div className="glass rounded-lg p-4 flex items-start gap-3">
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">400</Badge>
                <div>
                  <p className="font-medium">Bad Request</p>
                  <p className="text-sm text-muted-foreground">Invalid request parameters</p>
                </div>
              </div>

              <div className="glass rounded-lg p-4 flex items-start gap-3">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">401</Badge>
                <div>
                  <p className="font-medium">Unauthorized</p>
                  <p className="text-sm text-muted-foreground">Invalid or missing API key</p>
                </div>
              </div>

              <div className="glass rounded-lg p-4 flex items-start gap-3">
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">429</Badge>
                <div>
                  <p className="font-medium">Rate Limit Exceeded</p>
                  <p className="text-sm text-muted-foreground">Too many requests, slow down</p>
                </div>
              </div>

              <div className="glass rounded-lg p-4 flex items-start gap-3">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">500</Badge>
                <div>
                  <p className="font-medium">Internal Server Error</p>
                  <p className="text-sm text-muted-foreground">Something went wrong on our end</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
