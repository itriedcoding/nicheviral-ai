import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ToolWorkspaceProps {
  activeTool: string;
}

export function ToolWorkspace({ activeTool }: ToolWorkspaceProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  
  // Inputs
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [style, setStyle] = useState("");

  // Actions
  const generateScript = useAction(api.aiFeatures.generateScript);
  const generateTags = useAction(api.aiFeatures.generateTags);
  const optimizeTitle = useAction(api.aiFeatures.optimizeTitle);
  const generateDescription = useAction(api.aiFeatures.generateDescription);
  const generateThumbnailIdeas = useAction(api.aiFeatures.generateThumbnailIdeas);
  const generateVideoIdeas = useAction(api.aiFeatures.generateVideoIdeas);
  const generateShortsScript = useAction(api.aiFeatures.generateShortsScript);
  const generateCommunityPost = useAction(api.aiFeatures.generateCommunityPost);
  const repurposeContent = useAction(api.aiFeatures.repurposeContent);
  const generateChannelName = useAction(api.aiFeatures.generateChannelName);
  const generatePlaylistNames = useAction(api.aiFeatures.generatePlaylistNames);
  
  // New Actions
  const generateVideoHook = useAction(api.aiFeatures.generateVideoHook);
  const generateSponsorshipPitch = useAction(api.aiFeatures.generateSponsorshipPitch);
  const generateCommentReply = useAction(api.aiFeatures.generateCommentReply);
  const generateCollaborationIdeas = useAction(api.aiFeatures.generateCollaborationIdeas);
  const generateChannelAudit = useAction(api.aiFeatures.generateChannelAudit);
  const generateTrendPrediction = useAction(api.aiFeatures.generateTrendPrediction);
  const generateLivestreamPlan = useAction(api.aiFeatures.generateLivestreamPlan);
  const generateShortsSeries = useAction(api.aiFeatures.generateShortsSeries);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      let res;
      const commonArgs = { topic, title, niche: topic, style };

      switch (activeTool) {
        case "script": res = await generateScript({ topic, tone: style }); break;
        case "tags": res = await generateTags({ title }); break;
        case "title": res = await optimizeTitle({ originalTitle: title }); break;
        case "description": res = await generateDescription({ title, keyPoints: desc }); break;
        case "thumbnail": res = await generateThumbnailIdeas({ title }); break;
        case "ideas": res = await generateVideoIdeas({ niche: topic }); break;
        case "shorts": res = await generateShortsScript({ topic }); break;
        case "community": res = await generateCommunityPost({ topic }); break;
        case "repurpose": res = await repurposeContent({ script: desc, platform }); break;
        case "channel_name": res = await generateChannelName({ niche: topic, style }); break;
        case "playlist": res = await generatePlaylistNames({ niche: topic }); break;
        case "hook": res = await generateVideoHook({ topic, style }); break;
        case "sponsorship": res = await generateSponsorshipPitch({ niche: topic, brand: title }); break;
        case "reply": res = await generateCommentReply({ comment: desc, tone: style }); break;
        case "collab": res = await generateCollaborationIdeas({ niche: topic }); break;
        case "audit": res = await generateChannelAudit({ channelName: title, niche: topic }); break;
        case "trends": res = await generateTrendPrediction({ niche: topic }); break;
        case "livestream": res = await generateLivestreamPlan({ topic, duration: style }); break;
        case "series": res = await generateShortsSeries({ topic }); break;
      }

      if (res?.success) {
        setResult(res.content || "");
        toast.success("Generated successfully!");
      } else {
        toast.error(res?.error || "Failed to generate");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const getToolTitle = () => {
    const titles: Record<string, string> = {
      script: "Script Generator",
      ideas: "Video Idea Generator",
      shorts: "Shorts Script Generator",
      title: "Title Optimizer",
      tags: "Tag Generator",
      description: "Description Writer",
      thumbnail: "Thumbnail Idea Generator",
      community: "Community Post Generator",
      repurpose: "Content Repurposer",
      channel_name: "Channel Name Generator",
      playlist: "Playlist Name Generator",
      hook: "Video Hook Generator",
      sponsorship: "Sponsorship Pitch Generator",
      reply: "Comment Reply Generator",
      collab: "Collaboration Idea Generator",
      audit: "Channel Audit Tool",
      trends: "Trend Predictor",
      livestream: "Livestream Planner",
      series: "Shorts Series Planner"
    };
    return titles[activeTool] || "AI Tool";
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{getToolTitle()}</CardTitle>
        <CardDescription>Fill in the details below to generate content.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {/* Dynamic Inputs based on activeTool */}
        {["script", "ideas", "shorts", "community", "channel_name", "playlist", "hook", "collab", "trends", "livestream", "series", "sponsorship"].includes(activeTool) && (
          <div className="space-y-2">
            <Label>
              {activeTool === "channel_name" || activeTool === "collab" || activeTool === "trends" || activeTool === "sponsorship" ? "Niche / Industry" : "Video Topic"}
            </Label>
            <Input 
              placeholder="e.g., Tech Reviews, Cooking, Gaming" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        )}

        {["title", "tags", "thumbnail", "description", "audit", "sponsorship"].includes(activeTool) && (
          <div className="space-y-2">
            <Label>
              {activeTool === "audit" ? "Channel Name" : activeTool === "sponsorship" ? "Target Brand Name" : "Video Title"}
            </Label>
            <Input 
              placeholder={activeTool === "sponsorship" ? "e.g., Nike" : "e.g., My Awesome Video"} 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}

        {["script", "channel_name", "hook", "reply", "livestream"].includes(activeTool) && (
          <div className="space-y-2">
            <Label>
              {activeTool === "livestream" ? "Duration" : "Tone / Style"}
            </Label>
            <Input 
              placeholder={activeTool === "livestream" ? "e.g., 1 hour" : "e.g., Professional, Funny, Dramatic"} 
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>
        )}

        {["description", "repurpose", "reply"].includes(activeTool) && (
          <div className="space-y-2">
            <Label>
              {activeTool === "reply" ? "Comment to Reply To" : activeTool === "repurpose" ? "Original Script" : "Key Points"}
            </Label>
            <Textarea 
              placeholder="Enter text here..." 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        )}

        {activeTool === "repurpose" && (
          <div className="space-y-2">
            <Label>Target Platform</Label>
            <Input 
              placeholder="e.g., Twitter, LinkedIn" 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>
        )}

        <Button className="w-full" onClick={handleGenerate} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>

        {result && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Result</Label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}