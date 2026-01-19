import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileText, Tag, Type, AlignLeft, Image as ImageIcon, Copy, Loader2, Sparkles, Lightbulb, Video, MessageSquare, Share2, AtSign, ListVideo } from "lucide-react";

export function Tools() {
  const [activeTool, setActiveTool] = useState("script");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // Actions
  const generateScript = useAction(api.aiFeatures.generateScript);
  const generateTags = useAction(api.aiFeatures.generateTags);
  const optimizeTitle = useAction(api.aiFeatures.optimizeTitle);
  const generateDescription = useAction(api.aiFeatures.generateDescription);
  const generateThumbnailIdeas = useAction(api.aiFeatures.generateThumbnailIdeas);
  
  // New Actions
  const generateVideoIdeas = useAction(api.aiFeatures.generateVideoIdeas);
  const generateShortsScript = useAction(api.aiFeatures.generateShortsScript);
  const generateCommunityPost = useAction(api.aiFeatures.generateCommunityPost);
  const repurposeContent = useAction(api.aiFeatures.repurposeContent);
  const generateChannelName = useAction(api.aiFeatures.generateChannelName);
  const generatePlaylistNames = useAction(api.aiFeatures.generatePlaylistNames);

  // Inputs
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      let res;
      if (activeTool === "script") {
        res = await generateScript({ topic });
      } else if (activeTool === "tags") {
        res = await generateTags({ title });
      } else if (activeTool === "title") {
        res = await optimizeTitle({ originalTitle: title });
      } else if (activeTool === "description") {
        res = await generateDescription({ title, keyPoints: desc });
      } else if (activeTool === "thumbnail") {
        res = await generateThumbnailIdeas({ title });
      } else if (activeTool === "ideas") {
        res = await generateVideoIdeas({ niche: topic });
      } else if (activeTool === "shorts") {
        res = await generateShortsScript({ topic });
      } else if (activeTool === "community") {
        res = await generateCommunityPost({ topic });
      } else if (activeTool === "repurpose") {
        res = await repurposeContent({ script: desc, platform });
      } else if (activeTool === "channel_name") {
        res = await generateChannelName({ niche: topic });
      } else if (activeTool === "playlist") {
        res = await generatePlaylistNames({ niche: topic });
      }

      if (res?.success) {
        setResult(res.content);
        toast.success("Generated successfully!");
      } else {
        toast.error(res?.error || "Failed to generate");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Creator Tools</h2>
        <p className="text-muted-foreground">Supercharge your content creation with 10+ advanced AI tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 h-[600px] overflow-y-auto pr-2">
          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "script" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("script")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <CardTitle className="text-base">Script Generator</CardTitle>
                <CardDescription>Generate full video scripts</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "ideas" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("ideas")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <CardTitle className="text-base">Video Ideas</CardTitle>
                <CardDescription>Get viral video concepts</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "shorts" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("shorts")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Video className="h-6 w-6 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <CardTitle className="text-base">Shorts Script</CardTitle>
                <CardDescription>Viral 60s scripts</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "title" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("title")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Type className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <CardTitle className="text-base">Title Optimizer</CardTitle>
                <CardDescription>Get high-CTR title variations</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "tags" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("tags")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Tag className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <CardTitle className="text-base">Tag Generator</CardTitle>
                <CardDescription>SEO-optimized video tags</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "description" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("description")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <AlignLeft className="h-6 w-6 text-orange-600 dark:text-orange-300" />
              </div>
              <div>
                <CardTitle className="text-base">Description Writer</CardTitle>
                <CardDescription>SEO-rich video descriptions</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "thumbnail" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("thumbnail")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
                <ImageIcon className="h-6 w-6 text-pink-600 dark:text-pink-300" />
              </div>
              <div>
                <CardTitle className="text-base">Thumbnail Ideas</CardTitle>
                <CardDescription>Creative visual concepts</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "community" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("community")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <CardTitle className="text-base">Community Post</CardTitle>
                <CardDescription>Engage your audience</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "repurpose" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("repurpose")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                <Share2 className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
              </div>
              <div>
                <CardTitle className="text-base">Content Repurposer</CardTitle>
                <CardDescription>Turn scripts into tweets/blogs</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "channel_name" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("channel_name")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                <AtSign className="h-6 w-6 text-teal-600 dark:text-teal-300" />
              </div>
              <div>
                <CardTitle className="text-base">Channel Name</CardTitle>
                <CardDescription>Catchy brand names</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:border-primary ${activeTool === "playlist" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setActiveTool("playlist")}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-lime-100 dark:bg-lime-900 rounded-lg">
                <ListVideo className="h-6 w-6 text-lime-600 dark:text-lime-300" />
              </div>
              <div>
                <CardTitle className="text-base">Playlist Names</CardTitle>
                <CardDescription>Binge-worthy playlist titles</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                {activeTool === "script" && "Script Generator"}
                {activeTool === "ideas" && "Video Idea Generator"}
                {activeTool === "shorts" && "Shorts Script Generator"}
                {activeTool === "title" && "Title Optimizer"}
                {activeTool === "tags" && "Tag Generator"}
                {activeTool === "description" && "Description Writer"}
                {activeTool === "thumbnail" && "Thumbnail Idea Generator"}
                {activeTool === "community" && "Community Post Generator"}
                {activeTool === "repurpose" && "Content Repurposer"}
                {activeTool === "channel_name" && "Channel Name Generator"}
                {activeTool === "playlist" && "Playlist Name Generator"}
              </CardTitle>
              <CardDescription>
                Fill in the details below to generate content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {(activeTool === "script" || activeTool === "ideas" || activeTool === "shorts" || activeTool === "community" || activeTool === "channel_name" || activeTool === "playlist") && (
                <div className="space-y-2">
                  <Label>
                    {activeTool === "channel_name" ? "Niche / Style" : "Video Topic / Niche"}
                  </Label>
                  <Input 
                    placeholder="e.g., The Future of AI in 2025" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              )}

              {(activeTool === "title" || activeTool === "tags" || activeTool === "thumbnail") && (
                <div className="space-y-2">
                  <Label>Video Title / Topic</Label>
                  <Input 
                    placeholder="e.g., How to bake a cake" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              )}

              {activeTool === "description" && (
                <>
                  <div className="space-y-2">
                    <Label>Video Title</Label>
                    <Input 
                      placeholder="e.g., 10 Tips for Better Sleep" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Key Points</Label>
                    <Textarea 
                      placeholder="List the main points you cover..." 
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </>
              )}

              {activeTool === "repurpose" && (
                <>
                  <div className="space-y-2">
                    <Label>Target Platform</Label>
                    <Input 
                      placeholder="e.g., Twitter, LinkedIn, Blog" 
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Original Script / Content</Label>
                    <Textarea 
                      placeholder="Paste your script here..." 
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                </>
              )}

              <Button 
                className="w-full" 
                onClick={handleGenerate} 
                disabled={loading}
              >
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
        </div>
      </div>
    </div>
  );
}