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

  const createVideo = useAction(api.unifiedAIModel.generateWithUnifiedAI);
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
        toast.success(`✨ Unified AI Model: Generated ${result.outputs?.images?.length || 0} frames with audio!`);
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

// AI Studio Components
function AIStudioSection({ userId }: { userId: string }) {
  const [activeSubTab, setActiveSubTab] = useState("video");

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="glass-card rounded-xl p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
        {activeSubTab === "voiceover" && <VoiceoverGenerationSection key="voiceover" userId={userId} />}
        {activeSubTab === "script" && <ScriptGenerationSection key="script" userId={userId} />}
      </AnimatePresence>
    </div>
  );
}

function VideoGenerationSection({ userId }: { userId: string }) {
  const [model, setModel] = useState("sora");
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([5]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);

  const createVideo = useAction(api.unifiedAIModel.generateWithUnifiedAI);

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
        toast.success(`✨ Unified AI: ${result.metadata?.frameCount || 0} AI frames + narration in ${(result.metadata?.processingTime || 0) / 1000}s!`);
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
    sora: 50,
    runway: 60,
    pika: 30,
    luma: 45
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
            Create stunning videos with AI
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
              <SelectItem value="sora">
                <div className="flex items-center justify-between w-full">
                  <span>OpenAI Sora Turbo</span>
                  <span className="text-xs text-muted-foreground ml-4">20s, 1080p</span>
                </div>
              </SelectItem>
              <SelectItem value="runway">
                <div className="flex items-center justify-between w-full">
                  <span>Runway Gen-3 Alpha</span>
                  <span className="text-xs text-muted-foreground ml-4">10s, 4K</span>
                </div>
              </SelectItem>
              <SelectItem value="pika">
                <div className="flex items-center justify-between w-full">
                  <span>Pika 1.5</span>
                  <span className="text-xs text-muted-foreground ml-4">3s, 720p</span>
                </div>
              </SelectItem>
              <SelectItem value="luma">
                <div className="flex items-center justify-between w-full">
                  <span>Luma Dream Machine</span>
                  <span className="text-xs text-muted-foreground ml-4">5s, 1080p</span>
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
            <SelectContent className="glass-strong">
              <SelectItem value="midjourney">
                <div className="flex items-center justify-between w-full">
                  <span>Midjourney V6</span>
                  <span className="text-xs text-muted-foreground ml-4">8K</span>
                </div>
              </SelectItem>
              <SelectItem value="dalle">
                <div className="flex items-center justify-between w-full">
                  <span>DALL-E 3</span>
                  <span className="text-xs text-muted-foreground ml-4">1024x1792</span>
                </div>
              </SelectItem>
              <SelectItem value="sdxl">
                <div className="flex items-center justify-between w-full">
                  <span>Stable Diffusion XL</span>
                  <span className="text-xs text-muted-foreground ml-4">1024x1024</span>
                </div>
              </SelectItem>
              <SelectItem value="leonardo">
                <div className="flex items-center justify-between w-full">
                  <span>Leonardo.AI</span>
                  <span className="text-xs text-muted-foreground ml-4">1920x1080</span>
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
              <SelectItem value="elevenlabs">
                <div className="flex items-center justify-between w-full">
                  <span>ElevenLabs Turbo V2</span>
                  <span className="text-xs text-muted-foreground ml-4">29 languages</span>
                </div>
              </SelectItem>
              <SelectItem value="playht">
                <div className="flex items-center justify-between w-full">
                  <span>PlayHT 3.0</span>
                  <span className="text-xs text-muted-foreground ml-4">Multi-lingual</span>
                </div>
              </SelectItem>
              <SelectItem value="openai">
                <div className="flex items-center justify-between w-full">
                  <span>OpenAI TTS HD</span>
                  <span className="text-xs text-muted-foreground ml-4">6 voices</span>
                </div>
              </SelectItem>
              <SelectItem value="murf">
                <div className="flex items-center justify-between w-full">
                  <span>Murf AI Studio</span>
                  <span className="text-xs text-muted-foreground ml-4">120+ voices</span>
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

  const handleDelete = async (videoId: Id<"videos">) => {
    try {
      await deleteVideo({ id: videoId });
      toast.success("Video deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleRegenerate = async (video: any) => {
    toast.info("Regeneration feature coming soon!");
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
                    <Button
                      size="sm"
                      className="flex-1"
                      variant="outline"
                      onClick={() => {
                        // Handle different types of content
                        if (video.videoUrl.startsWith('data:')) {
                          // For data URLs (text content), create downloadable file
                          const link = document.createElement('a');
                          link.href = video.videoUrl;
                          link.download = `${video.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
                          link.click();
                          toast.success("Content downloaded!");
                        } else if (video.videoUrl.startsWith('http')) {
                          // For external URLs, open in new tab
                          window.open(video.videoUrl, '_blank');
                          toast.success("Opening content in new tab!");
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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
      const result = await fetchTrending({});
      if (result.success) {
        toast.success(`Loaded ${result.count} trending niches!`);
      } else {
        toast.error(result.error || "Failed to fetch trends");
      }
    } catch (error: any) {
      toast.error(error.message);
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
                  className="glass"
                >
                  {isLoadingTrending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Refresh Trends
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
