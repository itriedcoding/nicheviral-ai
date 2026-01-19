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
import { FileText, Tag, Type, AlignLeft, Image as ImageIcon, Copy, Loader2, Sparkles } from "lucide-react";

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

  // Inputs
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
        <p className="text-muted-foreground">Supercharge your content creation with advanced AI tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
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
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                {activeTool === "script" && "Script Generator"}
                {activeTool === "title" && "Title Optimizer"}
                {activeTool === "tags" && "Tag Generator"}
                {activeTool === "description" && "Description Writer"}
                {activeTool === "thumbnail" && "Thumbnail Idea Generator"}
              </CardTitle>
              <CardDescription>
                Fill in the details below to generate content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {activeTool === "script" && (
                <div className="space-y-2">
                  <Label>Video Topic</Label>
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
                  <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm min-h-[200px]">
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
