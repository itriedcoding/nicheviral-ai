import { motion } from "framer-motion";
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
  Coins
} from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { Link } from "react-router";
import { Id } from "@/convex/_generated/dataModel";
import { Navigation } from "@/components/Navigation";
import { StatsCards } from "@/components/StatsCards";
import { AnimatedBackground } from "@/components/AnimatedBackground";

function NicheCard({ niche, currentUser }: { niche: any; currentUser: any }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [aiModel, setAiModel] = useState("sora");
  const [isGenerating, setIsGenerating] = useState(false);

  const createVideo = useAction(api.aiGeneration.createVideo);
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

    if (!currentUser) {
      toast.error("Please sign in to create videos");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await createVideo({
        userId: currentUser._id,
        title,
        prompt,
        nicheId: niche._id,
        aiModel,
        includeVoiceover: true,
      });

      if (result.success) {
        toast.success("Video generation started! Check your videos tab.");
        setOpen(false);
        setPrompt("");
        setTitle("");
      } else {
        toast.error(result.error || "Failed to start video generation");
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
                  <SelectItem value="sora">Sora (OpenAI)</SelectItem>
                  <SelectItem value="runway">Runway Gen-3</SelectItem>
                  <SelectItem value="pika">Pika Labs</SelectItem>
                  <SelectItem value="stable">Stable Diffusion Video</SelectItem>
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

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const currentUser = useQuery(api.users.currentUser);
  const fetchTrending = useAction(api.youtube.fetchTrendingVideos);
  const searchNiches = useAction(api.youtube.searchNiches);

  const niches = useQuery(api.youtubeQueries.getNiches, {
    limit: 50,
    category: selectedCategory,
  });

  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Auto-fetch trending on mount if no niches exist
    if (niches && niches.length === 0) {
      handleFetchTrending();
    }
  }, [niches]);

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
      <Authenticated>
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
                  Welcome back! Here's your creative analytics.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="glass rounded-xl px-6 py-3 flex items-center gap-3 shimmer">
                  <Coins className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-bold text-lg">100</div>
                    <div className="text-xs text-muted-foreground">Credits Remaining</div>
                  </div>
                </div>
                <Button className="red-glow">
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
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
                    <NicheCard key={niche._id} niche={niche} currentUser={currentUser} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="glass-card rounded-xl p-12 text-center">
                <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No Videos Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start creating AI-powered videos from trending niches
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Authenticated>

      <Unauthenticated>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="glass-card rounded-xl p-12 text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to access the dashboard
            </p>
            <Link to="/auth">
              <Button className="red-glow">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Unauthenticated>
    </div>
  );
}
