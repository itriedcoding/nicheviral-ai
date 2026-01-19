import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  TrendingUp,
  Video,
  Sparkles,
  Search,
  Play,
  Loader2,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
  Zap,
  Coins,
  Image,
  Mic,
  FileText,
  Download,
  Trash2,
  RefreshCw,
  Settings,
  Wand2,
  Film,
  ChevronDown
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Id } from "@/convex/_generated/dataModel";
import { Navigation } from "@/components/Navigation";
import { StatsCards } from "@/components/StatsCards";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getSession } from "@/lib/auth";

function NicheCard({ niche, userId }: { niche: any; userId: string }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [aiModel, setAiModel] = useState("sora");
  const [isGenerating, setIsGenerating] = useState(false);

  const createVideo = useAction(api.modelCoordinator.generate);
  const generateIdeas = useAction(api.aiGeneration.generateVideoIdeas);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  const handleGenerateIdeas = async () => {
    setLoadingIdeas(true);
    try {
      const result = await generateIdeas({
        nicheTitle: niche.title,
        nicheDescription: niche.description,
      });

      if (result.success) {
        setIdeas(result.ideas);
        toast.success("Generated video ideas!");
      } else {
        toast.error(result.error || "Failed to generate ideas");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleCreateVideo = async () => {
    if (!title || !prompt) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!userId) {
      toast.error("Please sign in to create videos");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await createVideo({
        userId: userId,
        prompt,
        type: "complete",
        model: aiModel,
        duration: 10,
        voice: "Brian",
      });

      if (result.success) {
        toast.success(`✨ ${result.metadata?.model}: REAL video generated in ${(result.metadata?.processingTime || 0) / 1000}s!`);
        setOpen(false);
        setPrompt("");
        setTitle("");
      } else {
        toast.error(result.error || "Failed to generate video");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const competitionColor = {
    low: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-card rounded-xl overflow-hidden cursor-pointer group"
        >
          {niche.thumbnailUrl && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={niche.thumbnailUrl}
                alt={niche.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge className={`${competitionColor[niche.competitionLevel as keyof typeof competitionColor]}`}>
                  {niche.competitionLevel}
                </Badge>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold text-lg">{niche.trendScore}</span>
              </div>
              <span className="text-muted-foreground text-sm">Trend Score</span>
            </div>

            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {niche.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {niche.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {(niche.searchVolume / 1000000).toFixed(1)}M
              </div>
              <div className="flex flex-wrap gap-1">
                {niche.keywords.slice(0, 3).map((keyword: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="glass-strong max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Video from Niche</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Generate an AI video based on this trending niche
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Niche Info */}
          <div className="glass rounded-lg p-4">
            <h4 className="font-bold mb-2">{niche.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{niche.description}</p>
            <div className="flex gap-2 flex-wrap">
              <Badge>Score: {niche.trendScore}</Badge>
              <Badge variant="outline">{niche.competitionLevel} competition</Badge>
              <Badge variant="outline">{(niche.searchVolume / 1000000).toFixed(1)}M views</Badge>
            </div>
          </div>

          {/* AI Ideas Generator */}
          <div>
            <Button
              onClick={handleGenerateIdeas}
              disabled={loadingIdeas}
              variant="outline"
              className="w-full glass"
            >
              {loadingIdeas ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Video Ideas
                </>
              )}
            </Button>

            {ideas.length > 0 && (
              <div className="mt-4 space-y-2">
                {ideas.map((idea, i) => (
                  <div
                    key={i}
                    className="glass rounded-lg p-3 cursor-pointer hover:glass-strong transition-all"
                    onClick={() => {
                      setTitle(idea.title);
                      setPrompt(idea.hook || idea.content);
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm mb-1">{idea.title}</h5>
                        <p className="text-xs text-muted-foreground">{idea.hook}</p>
                      </div>
                      {idea.engagementScore && (
                        <Badge variant="outline" className="text-xs">
                          {idea.engagementScore}/10
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Creation Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Video Title</label>
              <Input
                placeholder="Enter a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Video Prompt</label>
              <Textarea
                placeholder="Describe what you want in the video..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="glass"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">AI Model</label>
              <Select value={aiModel} onValueChange={setAiModel}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="sora">Sora Turbo (20s, 1080p)</SelectItem>
                  <SelectItem value="runway">Runway Gen-3 (10s, 4K)</SelectItem>
                  <SelectItem value="pika">Pika 1.5 (3s, 720p)</SelectItem>
                  <SelectItem value="luma">Luma Dream Machine (5s, 1080p)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCreateVideo}
              disabled={isGenerating}
              className="w-full red-glow"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Generate Video (50 Credits)
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function VideoCard({ video }: { video: any }) {
  const statusColors = {
    queued: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    generating: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        {video.status === "generating" && (
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        )}
        {video.status === "completed" && video.videoUrl && (
          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
        )}
        {video.status === "queued" && (
          <Clock className="w-12 h-12 text-primary" />
        )}
        <div className="absolute top-3 right-3">
          <Badge className={statusColors[video.status as keyof typeof statusColors]}>
            {video.status}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{video.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{video.description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>Model: {video.aiModel}</span>
          {video.duration && <span>{video.duration}s</span>}
        </div>

        {video.status === "completed" && (
          <Button className="w-full" variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Watch Video
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// AI System Status Component
function AISystemStatus() {
  const checkStatus = useAction(api.selfHostedAI.checkSelfHostedStatus);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const result = await checkStatus({});
        setStatus(result);
      } catch (e) {
        console.log("Could not check self-hosted status");
      }
      setLoading(false);
    };
    loadStatus();
  }, []);

  if (loading) return null;

  const selfHostedActive = status?.ollama || status?.comfyui;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 mb-6 border-2 border-primary/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${selfHostedActive ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
          <div>
            <h3 className="font-bold text-sm">AI System Status</h3>
            <p className="text-xs text-muted-foreground">
              {selfHostedActive ? (
                <>
                  🖥️ <span className="text-green-500 font-semibold">SELF-HOSTED</span> - Running on your hardware
                  {status.ollama && <span className="ml-2">✅ Ollama ({status.models?.length || 0} models)</span>}
                  {status.comfyui && <span className="ml-2">✅ ComfyUI</span>}
                  {status.tts && <span className="ml-2">✅ TTS</span>}
                </>
              ) : (
                <>
                  ☁️ <span className="text-yellow-500 font-semibold">CLOUD</span> - Using free cloud services (Groq, HuggingFace, Pollinations)
                </>
              )}
            </p>
          </div>
        </div>
        <Badge variant={selfHostedActive ? "default" : "secondary"} className="text-xs">
          {selfHostedActive ? "Local GPU" : "Cloud Free"}
        </Badge>
      </div>
    </motion.div>
  );
}

// AI Studio Components
function AIStudioSection({ userId }: { userId: string }) {
  const [activeSubTab, setActiveSubTab] = useState("video");

  return (
    <div className="space-y-6">
      {/* AI System Status */}
      <AISystemStatus />

      {/* Sub-navigation */}
      <div className="glass-card rounded-xl p-2">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Button
            variant={activeSubTab === "video" ? "default" : "ghost"}
            onClick={() => setActiveSubTab("video")}
            className={activeSubTab === "video" ? "red-glow" : ""}
          >
            <Video className="w-4 h-4 mr-2" />
            Video
          </Button>
          <Button
            variant={activeSubTab === "thumbnail" ? "default" : "ghost"}
            onClick={() => setActiveSubTab("thumbnail")}
            className={activeSubTab === "thumbnail" ? "red-glow" : ""}
          >
            <Image className="w-4 h-4 mr-2" />
            Thumbnail
          </Button>
          <Button
            variant={activeSubTab === "editing" ? "default" : "ghost"}
            onClick={() => setActiveSubTab("editing")}
            className={activeSubTab === "editing" ? "red-glow" : ""}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Editing
          </Button>
          <Button
            variant={activeSubTab === "voiceover" ? "default" : "ghost"}
            onClick={() => setActiveSubTab("voiceover")}
            className={activeSubTab === "voiceover" ? "red-glow" : ""}
          >
            <Mic className="w-4 h-4 mr-2" />
            Voiceover
          </Button>
          <Button
            variant={activeSubTab === "script" ? "default" : "ghost"}
            onClick={() => setActiveSubTab("script")}
            className={activeSubTab === "script" ? "red-glow" : ""}
          >
            <FileText className="w-4 h-4 mr-2" />
            Script
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === "video" && <VideoGenerationSection key="video" userId={userId} />}
        {activeSubTab === "thumbnail" && <ThumbnailGenerationSection key="thumbnail" userId={userId} />}
        {activeSubTab === "editing" && <ImageEditingSection key="editing" userId={userId} />}
        {activeSubTab === "voiceover" && <VoiceoverGenerationSection key="voiceover" userId={userId} />}
        {activeSubTab === "script" && <ScriptGenerationSection key="script" userId={userId} />}
      </AnimatePresence>
    </div>
  );
}

function VideoGenerationSection({ userId }: { userId: string }) {
  const [model, setModel] = useState("neura");
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([5]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);

  const createVideo = useAction(api.modelCoordinator.generate);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!userId) {
      toast.error("Please sign in");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await createVideo({
        userId: userId,
        prompt,
        type: "video",
        model: model,
        duration: duration[0],
        voice: "Brian",
      });

      if (result.success) {
        toast.success(`✨ ${result.metadata?.model}: REAL video generated in ${(result.metadata?.processingTime || 0) / 1000}s!`);
        setGeneratedVideo(result);
      } else {
        toast.error(result.error || "Failed to generate video");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const modelCredits = {
    neura: 0,
    runway: 60,
    luma: 45,
    hunyuan: 0,
    cogvideox: 0,
    ltx: 0,
    selfhosted: 0
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card rounded-xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            Video Generation
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create REAL videos with motion - NOT slideshows. All models generate actual MP4/WebM video files.
          </p>
        </div>
        <Badge className={`${model === 'neura' || model === 'selfhosted' || model === 'cogvideox' || model === 'hunyuan' || model === 'ltx' ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'}`}>
          {modelCredits[model as keyof typeof modelCredits] === 0 ? 'FREE' : `${modelCredits[model as keyof typeof modelCredits]} Credits/video`}
        </Badge>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">AI Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="glass">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong max-h-[500px] overflow-y-auto">
              {/* CATEGORY 1: NEURA AI MODEL (Custom) */}
              <div className="px-2 py-1.5 text-xs font-bold text-purple-500">
                🧠 NEURA AI MODEL (CUSTOM)
              </div>
              <SelectItem value="neura">
                <div className="flex items-center justify-between w-full">
                  <span>Neura AI Model v1.0</span>
                  <span className="text-xs text-purple-400 ml-4">Advanced • Multi-Capability</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* CATEGORY 2: PREMIUM VIDEO MODELS (Text-to-Video) */}
              <div className="px-2 py-1.5 text-xs font-bold text-yellow-500">
                💎 PREMIUM VIDEO - TEXT-TO-VIDEO
              </div>
              <SelectItem value="runway-gen3">
                <div className="flex items-center justify-between w-full">
                  <span>🎬 Runway Gen-3 Alpha Turbo</span>
                  <span className="text-xs text-yellow-400 ml-4">4K • 10s</span>
                </div>
              </SelectItem>
              <SelectItem value="luma">
                <div className="flex items-center justify-between w-full">
                  <span>✨ Luma Dream Machine (Ray2)</span>
                  <span className="text-xs text-yellow-400 ml-4">1080p • 5s</span>
                </div>
              </SelectItem>
              <SelectItem value="kling">
                <div className="flex items-center justify-between w-full">
                  <span>🎥 Kling Video v1.6</span>
                  <span className="text-xs text-yellow-400 ml-4">1080p • 5s</span>
                </div>
              </SelectItem>
              <SelectItem value="minimax">
                <div className="flex items-center justify-between w-full">
                  <span>📹 Minimax Video</span>
                  <span className="text-xs text-yellow-400 ml-4">720p • 6s</span>
                </div>
              </SelectItem>
              <SelectItem value="haiper">
                <div className="flex items-center justify-between w-full">
                  <span>⚡ Haiper Video v2</span>
                  <span className="text-xs text-yellow-400 ml-4">1080p • 4s</span>
                </div>
              </SelectItem>
              <SelectItem value="mochi">
                <div className="flex items-center justify-between w-full">
                  <span>🌟 Mochi 1 (Genmo)</span>
                  <span className="text-xs text-yellow-400 ml-4">1080p • 5s</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* CATEGORY 3: FREE VIDEO MODELS (Text-to-Video) */}
              <div className="px-2 py-1.5 text-xs font-bold text-green-500">
                🆓 FREE VIDEO - TEXT-TO-VIDEO
              </div>
              <SelectItem value="hunyuan">
                <div className="flex items-center justify-between w-full">
                  <span>🎥 HunyuanVideo (Tencent)</span>
                  <span className="text-xs text-green-400 ml-4">720p • 5s • FREE</span>
                </div>
              </SelectItem>
              <SelectItem value="cogvideox">
                <div className="flex items-center justify-between w-full">
                  <span>📹 CogVideoX-5B (Tsinghua)</span>
                  <span className="text-xs text-green-400 ml-4">480p • 6s • FREE</span>
                </div>
              </SelectItem>
              <SelectItem value="ltx">
                <div className="flex items-center justify-between w-full">
                  <span>⚡ LTX-Video (Lightricks)</span>
                  <span className="text-xs text-green-400 ml-4">768x512 • 5s • FREE</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* CATEGORY 4: IMAGE-TO-VIDEO MODELS */}
              <div className="px-2 py-1.5 text-xs font-bold text-cyan-500">
                🖼️ IMAGE-TO-VIDEO
              </div>
              <SelectItem value="runway-gen2">
                <div className="flex items-center justify-between w-full">
                  <span>🎬 Runway Gen-2</span>
                  <span className="text-xs text-cyan-400 ml-4">720p • Image Animation</span>
                </div>
              </SelectItem>
              <SelectItem value="hunyuan-i2v">
                <div className="flex items-center justify-between w-full">
                  <span>🎥 Hunyuan Image-to-Video</span>
                  <span className="text-xs text-cyan-400 ml-4">720p Animation</span>
                </div>
              </SelectItem>
              <SelectItem value="animatediff">
                <div className="flex items-center justify-between w-full">
                  <span>🎨 AnimateDiff</span>
                  <span className="text-xs text-cyan-400 ml-4">Animation</span>
                </div>
              </SelectItem>
              <SelectItem value="stable-video">
                <div className="flex items-center justify-between w-full">
                  <span>📽️ Stable Video Diffusion</span>
                  <span className="text-xs text-cyan-400 ml-4">Motion</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* CATEGORY 5: SELF-HOSTED */}
              <div className="px-2 py-1.5 text-xs font-bold text-blue-500">
                🖥️ SELF-HOSTED
              </div>
              <SelectItem value="selfhosted">
                <div className="flex items-center justify-between w-full">
                  <span>Local GPU Models</span>
                  <span className="text-xs text-blue-400 ml-4">Your Infrastructure</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Prompt</Label>
          <Textarea
            placeholder="A cinematic shot of a sunset over the ocean with flying birds..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="glass"
          />
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between glass"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced Settings
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 glass rounded-lg p-4"
          >
            <div>
              <Label className="text-sm font-medium mb-2 block">Duration (seconds)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={3}
                  max={20}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12">{duration[0]}s</span>
              </div>
            </div>
          </motion.div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt}
          className="w-full red-glow"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Video...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Video
            </>
          )}
        </Button>
      </div>

      {generatedVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Generation Started</h4>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              Processing
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Your video is being generated. Check the "My Videos" tab to view progress.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function ThumbnailGenerationSection({ userId }: { userId: string }) {
  const [model, setModel] = useState("midjourney");
  const [prompt, setPrompt] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("16:9");

  const generateThumbnail = useAction(api.unifiedAIModel.generateWithUnifiedAI);

  const modelCredits = {
    midjourney: 25,
    dalle: 20,
    sdxl: 15,
    leonardo: 18
  };

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!userId) {
      toast.error("Please sign in");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateThumbnail({
        userId,
        prompt,
        type: "thumbnail",
        aspectRatio,
        model,
      });

      if (result.success) {
        toast.success(`✨ Unified AI Model: Thumbnail generated in ${(result.metadata?.processingTime || 0) / 1000}s!`);
      } else {
        toast.error(result.error || "Failed to generate thumbnail");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card rounded-xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Image className="w-6 h-6 text-primary" />
            Thumbnail Generation
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create eye-catching thumbnails for your videos
          </p>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          {modelCredits[model as keyof typeof modelCredits]} Credits
        </Badge>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">AI Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="glass">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong max-h-[500px] overflow-y-auto">
              {/* FLUX MODELS (Top Tier) */}
              <div className="px-2 py-1.5 text-xs font-bold text-purple-500">
                ⚡ FLUX MODELS (PREMIUM)
              </div>
              <SelectItem value="flux-pro-ultra">
                <div className="flex items-center justify-between w-full">
                  <span>🔥 FLUX Pro v1.1 Ultra</span>
                  <span className="text-xs text-purple-400 ml-4">4K+ • Ultra Quality</span>
                </div>
              </SelectItem>
              <SelectItem value="flux-pro">
                <div className="flex items-center justify-between w-full">
                  <span>⚡ FLUX Pro v1.1</span>
                  <span className="text-xs text-purple-400 ml-4">Ultra High Quality</span>
                </div>
              </SelectItem>
              <SelectItem value="flux-realism">
                <div className="flex items-center justify-between w-full">
                  <span>📸 FLUX Realism</span>
                  <span className="text-xs text-purple-400 ml-4">Photorealistic</span>
                </div>
              </SelectItem>
              <SelectItem value="flux-schnell">
                <div className="flex items-center justify-between w-full">
                  <span>⚡ FLUX Schnell</span>
                  <span className="text-xs text-purple-400 ml-4">Fast High Quality</span>
                </div>
              </SelectItem>
              <SelectItem value="flux-dev">
                <div className="flex items-center justify-between w-full">
                  <span>🛠️ FLUX Dev</span>
                  <span className="text-xs text-purple-400 ml-4">Balanced</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* STABLE DIFFUSION MODELS */}
              <div className="px-2 py-1.5 text-xs font-bold text-blue-500">
                🎨 STABLE DIFFUSION
              </div>
              <SelectItem value="sd35-large">
                <div className="flex items-center justify-between w-full">
                  <span>🌟 SD 3.5 Large</span>
                  <span className="text-xs text-blue-400 ml-4">Latest • High Detail</span>
                </div>
              </SelectItem>
              <SelectItem value="sdxl-turbo">
                <div className="flex items-center justify-between w-full">
                  <span>⚡ SDXL Turbo</span>
                  <span className="text-xs text-blue-400 ml-4">Ultra Fast • &lt;2s</span>
                </div>
              </SelectItem>
              <SelectItem value="sdxl-lightning">
                <div className="flex items-center justify-between w-full">
                  <span>⚡ SDXL Lightning</span>
                  <span className="text-xs text-blue-400 ml-4">Ultra Fast</span>
                </div>
              </SelectItem>
              <SelectItem value="sdxl">
                <div className="flex items-center justify-between w-full">
                  <span>🎨 Stable Diffusion XL</span>
                  <span className="text-xs text-blue-400 ml-4">1024x1024</span>
                </div>
              </SelectItem>
              <SelectItem value="stable-cascade">
                <div className="flex items-center justify-between w-full">
                  <span>🚀 Stable Cascade</span>
                  <span className="text-xs text-blue-400 ml-4">Fast Variant</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* SPECIALIZED IMAGE MODELS */}
              <div className="px-2 py-1.5 text-xs font-bold text-yellow-500">
                ✨ SPECIALIZED
              </div>
              <SelectItem value="recraft">
                <div className="flex items-center justify-between w-full">
                  <span>Recraft V3</span>
                  <span className="text-xs text-yellow-400 ml-4">Style Control</span>
                </div>
              </SelectItem>
              <SelectItem value="ideogram">
                <div className="flex items-center justify-between w-full">
                  <span>Ideogram v2</span>
                  <span className="text-xs text-yellow-400 ml-4">Text in Images</span>
                </div>
              </SelectItem>
              <SelectItem value="omnigen">
                <div className="flex items-center justify-between w-full">
                  <span>OmniGen v1</span>
                  <span className="text-xs text-yellow-400 ml-4">Universal Editor</span>
                </div>
              </SelectItem>
              <SelectItem value="aura-flow">
                <div className="flex items-center justify-between w-full">
                  <span>Aura Flow</span>
                  <span className="text-xs text-yellow-400 ml-4">Fast HQ</span>
                </div>
              </SelectItem>
              <SelectItem value="photomaker">
                <div className="flex items-center justify-between w-full">
                  <span>Photomaker</span>
                  <span className="text-xs text-yellow-400 ml-4">Personalized</span>
                </div>
              </SelectItem>
              <SelectItem value="kolors">
                <div className="flex items-center justify-between w-full">
                  <span>Kolors</span>
                  <span className="text-xs text-yellow-400 ml-4">Chinese Model</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* POPULAR MODELS */}
              <div className="px-2 py-1.5 text-xs font-bold text-green-500">
                🌟 POPULAR
              </div>
              <SelectItem value="midjourney">
                <div className="flex items-center justify-between w-full">
                  <span>Midjourney V6</span>
                  <span className="text-xs text-green-400 ml-4">Artistic 8K</span>
                </div>
              </SelectItem>
              <SelectItem value="dalle">
                <div className="flex items-center justify-between w-full">
                  <span>DALL-E 3</span>
                  <span className="text-xs text-green-400 ml-4">OpenAI</span>
                </div>
              </SelectItem>
              <SelectItem value="leonardo">
                <div className="flex items-center justify-between w-full">
                  <span>Leonardo Phoenix</span>
                  <span className="text-xs text-green-400 ml-4">Cinematic</span>
                </div>
              </SelectItem>
              <SelectItem value="pixart">
                <div className="flex items-center justify-between w-full">
                  <span>PixArt-Σ</span>
                  <span className="text-xs text-green-400 ml-4">Photorealistic</span>
                </div>
              </SelectItem>
              <SelectItem value="playground">
                <div className="flex items-center justify-between w-full">
                  <span>Playground v2.5</span>
                  <span className="text-xs text-green-400 ml-4">Professional</span>
                </div>
              </SelectItem>
              <SelectItem value="kandinsky">
                <div className="flex items-center justify-between w-full">
                  <span>Kandinsky 3</span>
                  <span className="text-xs text-green-400 ml-4">Unique Style</span>
                </div>
              </SelectItem>
              <SelectItem value="deepfloyd">
                <div className="flex items-center justify-between w-full">
                  <span>DeepFloyd IF</span>
                  <span className="text-xs text-green-400 ml-4">Text Understanding</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Prompt</Label>
          <Textarea
            placeholder="A dramatic YouTube thumbnail showing a surprised person with text 'YOU WON'T BELIEVE THIS!'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="glass"
          />
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between glass"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced Settings
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 glass rounded-lg p-4"
          >
            <div>
              <Label className="text-sm font-medium mb-2 block">Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="16:9">16:9 (YouTube)</SelectItem>
                  <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt}
          className="w-full red-glow"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Thumbnail...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Thumbnail
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

function ImageEditingSection({ userId }: { userId: string }) {
  const [tool, setTool] = useState("background-removal");
  const [imageUrl, setImageUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const processImage = useAction(api.unifiedAIModel.generateWithUnifiedAI);

  const toolCredits = {
    "background-removal": 5,
    "face-swap": 8,
    "face-restore": 6,
    "upscale-4x": 10,
    "upscale-ccsr": 12,
  };

  const handleProcess = async () => {
    if (!imageUrl) {
      toast.error("Please enter an image URL");
      return;
    }

    if (!userId) {
      toast.error("Please sign in");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processImage({
        userId,
        prompt: imageUrl,
        type: "thumbnail",
        model: tool,
      });

      if (result.success) {
        toast.success(`✨ Image processed with ${tool} successfully!`);
        setProcessedImage(result.outputs?.images?.[0] || null);
      } else {
        toast.error(result.error || "Failed to process image");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card rounded-xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-primary" />
            Image Editing Tools
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Professional AI-powered image editing - background removal, upscaling, face enhancement
          </p>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          {toolCredits[tool as keyof typeof toolCredits]} Credits
        </Badge>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Editing Tool</Label>
          <Select value={tool} onValueChange={setTool}>
            <SelectTrigger className="glass">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong max-h-[500px] overflow-y-auto">
              {/* FLUX EDITING TOOLS (Premium) */}
              <div className="px-2 py-1.5 text-xs font-bold text-purple-500">
                ⚡ FLUX EDITING (PREMIUM)
              </div>
              <SelectItem value="flux-fill">
                <div className="flex items-center justify-between w-full">
                  <span>🎨 FLUX Fill (Inpainting)</span>
                  <span className="text-xs text-purple-400 ml-4">Professional Inpainting</span>
                </div>
              </SelectItem>
              <SelectItem value="flux-redux">
                <div className="flex items-center justify-between w-full">
                  <span>🔄 FLUX Redux (Variations)</span>
                  <span className="text-xs text-purple-400 ml-4">High Fidelity Variations</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* BACKGROUND & OBJECT TOOLS */}
              <div className="px-2 py-1.5 text-xs font-bold text-blue-500">
                🖼️ BACKGROUND & OBJECTS
              </div>
              <SelectItem value="background-removal">
                <div className="flex items-center justify-between w-full">
                  <span>✂️ Background Removal (Rembg)</span>
                  <span className="text-xs text-blue-400 ml-4">Professional</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* FACE TOOLS */}
              <div className="px-2 py-1.5 text-xs font-bold text-yellow-500">
                👤 FACE ENHANCEMENT
              </div>
              <SelectItem value="face-swap">
                <div className="flex items-center justify-between w-full">
                  <span>Face Swap AI</span>
                  <span className="text-xs text-yellow-400 ml-4">Realistic</span>
                </div>
              </SelectItem>
              <SelectItem value="face-restore">
                <div className="flex items-center justify-between w-full">
                  <span>Face Restore (GFPGAN)</span>
                  <span className="text-xs text-yellow-400 ml-4">Enhancement</span>
                </div>
              </SelectItem>
              <SelectItem value="codeformer">
                <div className="flex items-center justify-between w-full">
                  <span>CodeFormer</span>
                  <span className="text-xs text-yellow-400 ml-4">Face Restoration</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* UPSCALING TOOLS */}
              <div className="px-2 py-1.5 text-xs font-bold text-green-500">
                ⬆️ UPSCALING
              </div>
              <SelectItem value="upscale-4x">
                <div className="flex items-center justify-between w-full">
                  <span>Clarity Upscaler</span>
                  <span className="text-xs text-green-400 ml-4">4x Universal</span>
                </div>
              </SelectItem>
              <SelectItem value="upscale-ccsr">
                <div className="flex items-center justify-between w-full">
                  <span>CCSR</span>
                  <span className="text-xs text-green-400 ml-4">4x Super Resolution</span>
                </div>
              </SelectItem>
              <SelectItem value="real-esrgan">
                <div className="flex items-center justify-between w-full">
                  <span>Real-ESRGAN</span>
                  <span className="text-xs text-green-400 ml-4">Image SR</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Image URL</Label>
          <Input
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="glass"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter the URL of the image you want to edit
          </p>
        </div>

        {tool === "face-swap" && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Target Face URL</Label>
            <Input
              placeholder="https://example.com/target-face.jpg"
              className="glass"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL of the image with the face you want to swap to
            </p>
          </div>
        )}

        <Button
          onClick={handleProcess}
          disabled={isProcessing || !imageUrl}
          className="w-full red-glow"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing Image...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Process Image
            </>
          )}
        </Button>
      </div>

      {processedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Processed Image</h4>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Complete
            </Badge>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={processedImage}
              alt="Processed"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(processedImage, '_blank')}
              className="glass"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function VoiceoverGenerationSection({ userId }: { userId: string }) {
  const [model, setModel] = useState("elevenlabs");
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Brian");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVoiceover = useAction(api.unifiedAIModel.generateWithUnifiedAI);

  const modelCredits = {
    elevenlabs: 10,
    playht: 12,
    openai: 8,
    murf: 9
  };

  const handleGenerate = async () => {
    if (!text) {
      toast.error("Please enter text");
      return;
    }

    if (!userId) {
      toast.error("Please sign in");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateVoiceover({
        userId,
        prompt: text,
        type: "voiceover",
        model,
        voice,
      });

      if (result.success) {
        toast.success(`✨ Unified AI Model: Voiceover ready in ${(result.metadata?.processingTime || 0) / 1000}s! ${result.outputs?.audio ? 'Audio ready!' : ''}`);
      } else {
        toast.error(result.error || "Failed to generate voiceover");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card rounded-xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Mic className="w-6 h-6 text-primary" />
            Voiceover Generation
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Generate realistic AI voiceovers
          </p>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          {modelCredits[model as keyof typeof modelCredits]} Credits
        </Badge>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">AI Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="glass">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong">
              {/* PREMIUM VOICE MODELS */}
              <div className="px-2 py-1.5 text-xs font-bold text-yellow-500">
                💎 PREMIUM VOICE
              </div>
              <SelectItem value="elevenlabs-turbo">
                <div className="flex items-center justify-between w-full">
                  <span>ElevenLabs Turbo v3</span>
                  <span className="text-xs text-yellow-400 ml-4">Best Quality • 29 Lang</span>
                </div>
              </SelectItem>
              <SelectItem value="elevenlabs">
                <div className="flex items-center justify-between w-full">
                  <span>ElevenLabs Turbo V2</span>
                  <span className="text-xs text-yellow-400 ml-4">29 languages</span>
                </div>
              </SelectItem>
              <SelectItem value="playht">
                <div className="flex items-center justify-between w-full">
                  <span>PlayHT 3.0</span>
                  <span className="text-xs text-yellow-400 ml-4">Natural Speech</span>
                </div>
              </SelectItem>
              <SelectItem value="openai">
                <div className="flex items-center justify-between w-full">
                  <span>OpenAI TTS HD</span>
                  <span className="text-xs text-yellow-400 ml-4">6 voices</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* PREMIUM MUSIC GENERATION */}
              <div className="px-2 py-1.5 text-xs font-bold text-purple-500">
                🎵 MUSIC GENERATION
              </div>
              <SelectItem value="stable-audio">
                <div className="flex items-center justify-between w-full">
                  <span>Stable Audio</span>
                  <span className="text-xs text-purple-400 ml-4">Professional Music</span>
                </div>
              </SelectItem>
              <SelectItem value="musicgen">
                <div className="flex items-center justify-between w-full">
                  <span>MusicGen (Meta)</span>
                  <span className="text-xs text-purple-400 ml-4">AI Music</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* FREE MODELS */}
              <div className="px-2 py-1.5 text-xs font-bold text-green-500">
                🆓 FREE
              </div>
              <SelectItem value="bark">
                <div className="flex items-center justify-between w-full">
                  <span>Bark</span>
                  <span className="text-xs text-green-400 ml-4">Multi-voice TTS • FREE</span>
                </div>
              </SelectItem>

              <Separator className="my-2" />

              {/* OTHER OPTIONS */}
              <div className="px-2 py-1.5 text-xs font-bold text-blue-500">
                🎙️ ADDITIONAL
              </div>
              <SelectItem value="murf">
                <div className="flex items-center justify-between w-full">
                  <span>Murf AI Studio</span>
                  <span className="text-xs text-blue-400 ml-4">120+ voices</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Voice</Label>
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger className="glass">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong">
              <SelectItem value="rachel">Rachel - Professional Female</SelectItem>
              <SelectItem value="adam">Adam - Deep Male</SelectItem>
              <SelectItem value="bella">Bella - Young Female</SelectItem>
              <SelectItem value="josh">Josh - Casual Male</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Text</Label>
          <Textarea
            placeholder="Enter the text you want to convert to speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="glass"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Character count: {text.length} | Estimated duration: {Math.ceil(text.length / 15)}s
          </p>
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between glass"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced Settings
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 glass rounded-lg p-4"
          >
            <div>
              <Label className="text-sm font-medium mb-2 block">Stability</Label>
              <Slider defaultValue={[50]} min={0} max={100} step={5} />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Similarity</Label>
              <Slider defaultValue={[75]} min={0} max={100} step={5} />
            </div>
          </motion.div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !text}
          className="w-full red-glow"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Voiceover...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Voiceover
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

function ScriptGenerationSection({ userId }: { userId: string }) {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([60]);
  const [tone, setTone] = useState("engaging");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");

  const generateScript = useAction(api.fastGeneration.generateScriptFast);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!userId) {
      toast.error("Please sign in");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateScript({
        prompt,
        duration: duration[0],
        tone,
      });

      if (result.success) {
        setGeneratedScript(result.script || "");
        toast.success("Script generated in seconds!");
      } else {
        toast.error(result.error || "Failed to generate script");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    toast.success("Script copied to clipboard!");
  };

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `script_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Script downloaded!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card rounded-xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Script Generation
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Generate viral video scripts with AI
          </p>
        </div>
        <Badge className="bg-primary/20 text-primary border-primary/30">
          5 Credits
        </Badge>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Topic / Prompt</Label>
          <Textarea
            placeholder="What's your video about? (e.g., 'How to grow on YouTube in 2026')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="glass"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Duration (seconds)</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={duration}
              onValueChange={setDuration}
              min={30}
              max={300}
              step={30}
              className="flex-1"
            />
            <span className="text-sm font-medium w-16">{duration[0]}s</span>
          </div>
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between glass"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced Settings
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 glass rounded-lg p-4"
          >
            <div>
              <Label className="text-sm font-medium mb-2 block">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="engaging">Engaging & Energetic</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual & Friendly</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt}
          className="w-full red-glow"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Script...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Script
            </>
          )}
        </Button>
      </div>

      {generatedScript && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Generated Script</h4>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={copyToClipboard}
                className="glass"
              >
                <FileText className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={downloadScript}
                className="glass"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[300px] w-full rounded-md glass p-4">
            <pre className="text-sm whitespace-pre-wrap font-mono">{generatedScript}</pre>
          </ScrollArea>
        </motion.div>
      )}
    </motion.div>
  );
}

// My Videos Section
function MyVideosSection({ userId }: { userId: string }) {
  const [filterType, setFilterType] = useState("all");

  const userVideos = useQuery(
    api.videos.getUserVideos,
    userId ? { userId: userId as any } : "skip"
  );

  const deleteVideo = useMutation(api.videos.deleteVideo);
  const regenerateContent = useAction(api.unifiedAIModel.generateWithUnifiedAI);

  const handleDelete = async (videoId: Id<"videos">) => {
    try {
      await deleteVideo({ id: videoId });
      toast.success("Video deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleRegenerate = async (video: any) => {
    try {
      toast.info("Regenerating content with unified AI model...");

      const result = await regenerateContent({
        userId: video.userId,
        prompt: video.prompt,
        type: "complete",
        model: video.aiModel,
        duration: video.duration || 10,
        voice: video.voiceModel || "Brian",
      });

      if (result.success) {
        toast.success(`✨ Content regenerated! ${result.metadata?.frameCount || 0} frames created in ${(result.metadata?.processingTime || 0) / 1000}s`);
      } else {
        toast.error(result.error || "Failed to regenerate content");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterType === "all" ? "default" : "ghost"}
            onClick={() => setFilterType("all")}
            size="sm"
            className={filterType === "all" ? "red-glow" : ""}
          >
            All Content
          </Button>
          <Button
            variant={filterType === "video" ? "default" : "ghost"}
            onClick={() => setFilterType("video")}
            size="sm"
            className={filterType === "video" ? "red-glow" : ""}
          >
            <Video className="w-4 h-4 mr-2" />
            Videos
          </Button>
          <Button
            variant={filterType === "thumbnail" ? "default" : "ghost"}
            onClick={() => setFilterType("thumbnail")}
            size="sm"
            className={filterType === "thumbnail" ? "red-glow" : ""}
          >
            <Image className="w-4 h-4 mr-2" />
            Thumbnails
          </Button>
          <Button
            variant={filterType === "voiceover" ? "default" : "ghost"}
            onClick={() => setFilterType("voiceover")}
            size="sm"
            className={filterType === "voiceover" ? "red-glow" : ""}
          >
            <Mic className="w-4 h-4 mr-2" />
            Voiceovers
          </Button>
          <Button
            variant={filterType === "script" ? "default" : "ghost"}
            onClick={() => setFilterType("script")}
            size="sm"
            className={filterType === "script" ? "red-glow" : ""}
          >
            <FileText className="w-4 h-4 mr-2" />
            Scripts
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      {!userVideos ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : userVideos.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-bold mb-2">No Content Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start creating with AI Studio to see your content here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVideos.map((video: any) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl overflow-hidden group"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                {video.status === "generating" && (
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                )}
                {video.status === "completed" && video.thumbnailUrl && (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).src = `https://image.pollinations.ai/prompt/${encodeURIComponent(video.title)}?width=400&height=300&nologo=true`;
                    }}
                  />
                )}
                {video.status === "queued" && (
                  <Clock className="w-12 h-12 text-primary" />
                )}
                <div className="absolute top-3 right-3">
                  <Badge className={
                    video.status === "completed" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    video.status === "generating" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                    video.status === "failed" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }>
                    {video.status}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Wand2 className="w-3 h-3" />
                    {video.aiModel}
                  </span>
                  <span>{new Date(video._creationTime).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2">
                  {video.status === "completed" && video.videoUrl && (
                    <>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          // Handle video playback
                          if (video.videoUrl.startsWith('data:application/json')) {
                            // This is slideshow video data - open in modal player
                            try {
                              const base64Data = video.videoUrl.split(',')[1];
                              const jsonStr = atob(base64Data);
                              const videoData = JSON.parse(jsonStr);

                              // Create a new window to play the slideshow
                              const playerWindow = window.open('', '_blank', 'width=1920,height=1080');
                              if (playerWindow) {
                                playerWindow.document.write(`
                                  <!DOCTYPE html>
                                  <html>
                                  <head>
                                    <title>${video.title}</title>
                                    <style>
                                      body {
                                        margin: 0;
                                        padding: 0;
                                        background: #000;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        height: 100vh;
                                        font-family: Arial, sans-serif;
                                      }
                                      #slideshow {
                                        width: 100%;
                                        height: 100%;
                                        position: relative;
                                      }
                                      .slide {
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        object-fit: contain;
                                        opacity: 0;
                                        transition: opacity 0.5s;
                                      }
                                      .slide.active {
                                        opacity: 1;
                                      }
                                      #controls {
                                        position: fixed;
                                        bottom: 20px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        background: rgba(0,0,0,0.8);
                                        padding: 10px 20px;
                                        border-radius: 10px;
                                        color: white;
                                      }
                                    </style>
                                  </head>
                                  <body>
                                    <div id="slideshow"></div>
                                    <div id="controls">
                                      <p>Slide <span id="current">1</span> of ${videoData.slides.length}</p>
                                    </div>
                                    <audio id="audio" ${videoData.audio ? `src="${videoData.audio}"` : ''} autoplay></audio>
                                    <script>
                                      const slides = ${JSON.stringify(videoData.slides)};
                                      const slideDuration = ${videoData.slideDuration} * 1000;
                                      let currentSlide = 0;
                                      const container = document.getElementById('slideshow');

                                      // Create all slide images
                                      slides.forEach((src, idx) => {
                                        const img = document.createElement('img');
                                        img.src = src;
                                        img.className = 'slide' + (idx === 0 ? ' active' : '');
                                        container.appendChild(img);
                                      });

                                      // Slideshow logic
                                      function showSlide(index) {
                                        const allSlides = document.querySelectorAll('.slide');
                                        allSlides.forEach(s => s.classList.remove('active'));
                                        allSlides[index].classList.add('active');
                                        document.getElementById('current').textContent = index + 1;
                                      }

                                      setInterval(() => {
                                        currentSlide = (currentSlide + 1) % slides.length;
                                        showSlide(currentSlide);
                                      }, slideDuration);
                                    </script>
                                  </body>
                                  </html>
                                `);
                                toast.success("Playing video in new window");
                              }
                            } catch (e) {
                              toast.error("Failed to play video");
                              console.error(e);
                            }
                          } else if (video.videoUrl.startsWith('data:')) {
                            // Text content
                            const link = document.createElement('a');
                            link.href = video.videoUrl;
                            link.download = `${video.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
                            link.click();
                            toast.success("Content downloaded!");
                          } else if (video.videoUrl.startsWith('http')) {
                            window.open(video.videoUrl, '_blank');
                            toast.success("Opening content!");
                          }
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {video.videoUrl.startsWith('data:application/json') ? 'Play Video' : 'View'}
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRegenerate(video)}
                    className="glass"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(video._id)}
                    className="glass hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  // Check authentication
  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setIsAuthenticated(true);
      setUserEmail(session.userEmail);
      setUserId(session.userId);
    }
  }, [navigate]);
  const fetchTrending = useAction(api.youtube.fetchTrendingVideos);
  const searchNiches = useAction(api.youtube.searchNiches);
  const discoverNichesAI = useAction(api.nicheDiscovery.discoverTrendingNiches);

  const niches = useQuery(api.youtubeQueries.getNiches, {
    limit: 50,
    category: selectedCategory,
  });

  const userCredits = useQuery(
    api.videos.getUserCredits,
    userId ? { userId: userId as any } : "skip"
  );

  const isUserAdmin = useQuery(
    api.admin.isAdmin,
    userId ? { userId } : "skip"
  );

  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Auto-fetch trending on mount if no niches exist
    if (niches && niches.length === 0) {
      handleFetchTrending();
    }
  }, [niches]);

  // Show nothing while checking auth
  if (!isAuthenticated) {
    return null;
  }

  const handleFetchTrending = async () => {
    setIsLoadingTrending(true);
    try {
      // Use AI-powered niche discovery (REAL, NOT FAKE)
      toast.info("🤖 AI discovering trending niches...");
      const niches = await discoverNichesAI({
        category: selectedCategory === "all" ? undefined : selectedCategory,
        count: 15,
      });

      if (niches && niches.length > 0) {
        toast.success(`✨ AI discovered ${niches.length} trending niches!`);
      } else {
        toast.warning("No niches discovered. Try again.");
      }
    } catch (error: any) {
      toast.error(`Failed to discover niches: ${error.message}`);
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const result = await searchNiches({ query: searchQuery });
      if (result.success) {
        toast.success(`Found ${result.count} niches!`);
      } else {
        toast.error(result.error || "Search failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {userEmail.split('@')[0]}! Here's your creative analytics.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass rounded-xl px-6 py-3 flex items-center gap-3 shimmer">
                <Coins className="w-5 h-5 text-primary" />
                <div>
                  {isUserAdmin ? (
                    <>
                      <div className="font-bold text-lg flex items-center gap-2">
                        <span className="text-2xl">♾️</span> UNLIMITED
                      </div>
                      <div className="text-xs text-muted-foreground">Admin Credits</div>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-lg">{userCredits?.credits || 100}</div>
                      <div className="text-xs text-muted-foreground">Credits Remaining</div>
                    </>
                  )}
                </div>
              </div>
              {!isUserAdmin && (
                <Button className="red-glow" onClick={() => navigate("/billing")}>
                  <Zap className="w-4 h-4 mr-2" />
                  Buy Credits
                </Button>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards
            videosGenerated={niches?.length || 0}
            trendsAnalyzed={niches?.length || 0}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs defaultValue="niches" className="space-y-8">
          <TabsList className="glass">
            <TabsTrigger value="niches">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Niches
            </TabsTrigger>
            <TabsTrigger value="studio">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Studio
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              My Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="niches" className="space-y-6">
            {/* Search & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Search niches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="glass"
                  />
                  <Button onClick={handleSearch} disabled={isSearching} className="red-glow">
                    {isSearching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Button
                  onClick={handleFetchTrending}
                  disabled={isLoadingTrending}
                  variant="outline"
                  className="glass red-glow"
                >
                  {isLoadingTrending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      AI Discovering...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      🤖 Discover with AI
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Niches Grid */}
            {niches === undefined ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : niches.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No Niches Found</h3>
                <p className="text-muted-foreground mb-6">
                  Click "Refresh Trends" to discover trending niches
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {niches.map((niche: any) => (
                  <NicheCard key={niche._id} niche={niche} userId={userId} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="studio" className="space-y-6">
            <AIStudioSection userId={userId} />
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <MyVideosSection userId={userId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
