import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wand2, Film, Loader2, MonitorPlay, Sparkles, Zap } from "lucide-react";
import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";

export function VideoStudio() {
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoModel, setVideoModel] = useState("hunyuan-video");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5");
  const [stylePreset, setStylePreset] = useState("none");
  
  const { userId } = useAuth();
  const createVideoRecord = useMutation(api.videos.createVideoRecord);
  const processVideoGeneration = useAction(api.realVideoGeneration.processVideoGeneration);
  const enhancePromptAction = useAction(api.aiFeatures.enhancePrompt);
  
  // Pass userId to getProfile to ensure we get the user even if ctx.auth isn't fully synced yet
  const user = useQuery(api.users.getProfile, userId ? { userId } : "skip");
  const videoModels = useQuery(api.aiModels.getModelsByType, { type: "video" });

  const handleEnhancePrompt = async () => {
    if (!videoPrompt) {
      toast.error("Please enter a prompt to enhance");
      return;
    }
    
    setIsEnhancing(true);
    try {
      const result = await enhancePromptAction({
        prompt: videoPrompt,
        type: "video"
      });
      
      if (result.success && result.content) {
        setVideoPrompt(result.content);
        toast.success("Prompt enhanced with AI magic!");
      } else {
        toast.error("Failed to enhance prompt");
      }
    } catch (error) {
      toast.error("Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleStyleChange = (value: string) => {
    setStylePreset(value);
    if (value === "none") return;
    
    const styles: Record<string, string> = {
      "gameplay": "Roblox gameplay footage, high energy, showing game mechanics, 60fps, 4k, vibrant colors",
      "cinematic": "Cinematic Roblox trailer, dramatic lighting, slow motion action shots, 8k resolution, ray tracing enabled",
      "obby": "Roblox Obby showcase, bright neon colors, parkour jumps, floating platforms, fun atmosphere",
      "tycoon": "Roblox Tycoon base building timelapse, money particles, upgrading structures, satisfying progress",
      "horror": "Scary Roblox horror game, dark atmosphere, flashlight lighting, spooky corridors, jumpscare tension"
    };
    
    if (videoPrompt && !videoPrompt.includes(styles[value])) {
      setVideoPrompt(prev => `${prev}, ${styles[value]}`);
    } else if (!videoPrompt) {
      setVideoPrompt(styles[value]);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt || !videoTitle) {
      toast.error("Please provide a title and prompt");
      return;
    }

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsGeneratingVideo(true);
    try {
      // 1. Create the video record
      const videoId = await createVideoRecord({
        title: videoTitle,
        description: videoPrompt,
        prompt: videoPrompt,
        aiModel: videoModel,
        userId: user._id,
      });

      toast.info("Video queued for generation...");

      // 2. Trigger generation
      await processVideoGeneration({
        videoId,
        prompt: videoPrompt,
        duration: parseInt(duration),
        aiModel: videoModel,
      });

      toast.success("Video generation started! Check 'My Projects' below.");
      setVideoPrompt("");
      setVideoTitle("");
    } catch (error: any) {
      toast.error(error.message || "Failed to start generation");
      console.error(error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Configuration Panel */}
      <Card className="lg:col-span-1 border-primary/10 shadow-xl shadow-primary/5 h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="w-5 h-5 text-primary" />
            Trailer Config
          </CardTitle>
          <CardDescription>Setup your Roblox video parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Video Title</Label>
            <Input 
              placeholder="e.g., Ultimate Obby Trailer" 
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label>AI Model</Label>
            <Select value={videoModel} onValueChange={setVideoModel}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {videoModels ? (
                  videoModels.map((model: any) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} — {model.creditsPerSecond ? `${model.creditsPerSecond} Credits/s` : "Free"}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="loading" disabled>Loading models...</SelectItem>
                )}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select the best model for your specific needs.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Roblox Style Preset</Label>
            <Select value={stylePreset} onValueChange={handleStyleChange}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Preset</SelectItem>
                <SelectItem value="gameplay">Gameplay Showcase</SelectItem>
                <SelectItem value="cinematic">Cinematic Trailer</SelectItem>
                <SelectItem value="obby">Obby / Parkour</SelectItem>
                <SelectItem value="tycoon">Tycoon / Simulator</SelectItem>
                <SelectItem value="horror">Horror / Mystery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">16:9 (YouTube)</SelectItem>
                  <SelectItem value="9:16">9:16 (TikTok/Shorts)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (Sec)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Seconds</SelectItem>
                  <SelectItem value="10">10 Seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <Label className="cursor-pointer">High Quality Render</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label className="cursor-pointer">Enhance Prompt</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt & Preview Panel */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-primary/10 shadow-xl shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Prompt Engineering
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEnhancePrompt}
              disabled={isEnhancing || !videoPrompt}
              className="gap-2 border-primary/20 hover:bg-primary/5 text-primary"
            >
              {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
              Magic Enhance
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Describe your Roblox video in detail. E.g., 'A cinematic trailer for a ninja simulator game, showing players jumping across rooftops, sword fighting effects, particle explosions, dynamic camera angles...'"
              className="min-h-[150px] text-base resize-none bg-background/50 focus:ring-primary/50"
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                size="lg" 
                className="w-full md:w-auto bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 transition-all duration-300 shadow-lg shadow-primary/25"
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo}
              >
                {isGeneratingVideo ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Trailer...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Video
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-dashed">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 animate-pulse">
              <MonitorPlay className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to Create</h3>
            <p className="text-muted-foreground max-w-md">
              Your generated Roblox trailers will appear in the "Creation History" section below. 
              We use state-of-the-art models to render high-fidelity video content.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}