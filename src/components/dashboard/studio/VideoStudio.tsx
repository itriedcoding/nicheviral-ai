import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wand2, Film, Loader2, MonitorPlay, Sparkles } from "lucide-react";
import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function VideoStudio() {
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoModel, setVideoModel] = useState("runway-gen3");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5");
  
  const createVideoRecord = useMutation(api.videos.createVideoRecord);
  const processVideoGeneration = useAction(api.realVideoGeneration.processVideoGeneration);
  const user = useQuery(api.users.getProfile, {});
  const videoModels = useQuery(api.aiModels.getModelsByType, { type: "video" });

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
            Configuration
          </CardTitle>
          <CardDescription>Setup your video parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Project Title</Label>
            <Input 
              placeholder="e.g., Cyberpunk City Intro" 
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
                      {model.name} ({model.provider})
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                  <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
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
              <Label className="cursor-pointer">High Quality Mode</Label>
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Prompt Engineering
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Describe your video in extreme detail. Mention lighting, camera movement, style, and mood... (e.g., A cinematic drone shot flying through a futuristic neon city at night, rain reflecting on the streets, 8k resolution, photorealistic, slow motion)"
              className="min-h-[150px] text-base resize-none bg-background/50 focus:ring-primary/50"
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                size="lg" 
                className="w-full md:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg shadow-primary/25"
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo}
              >
                {isGeneratingVideo ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Video...
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
              Your generated videos will appear in the "My Projects" section below. 
              We use state-of-the-art models to render high-fidelity video content.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}