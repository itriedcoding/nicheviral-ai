import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Image as ImageIcon, Download, Share2 } from "lucide-react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";

export function ThumbnailStudio() {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("dall-e-3");

  const { userId } = useAuth();
  const generateImageAction = useAction(api.aiFeatures.generateImage);
  const user = useQuery(api.users.getProfile, userId ? { userId } : "skip");
  const thumbnailModels = useQuery(api.aiModels.getModelsByType, { type: "thumbnail" });

  const handleGenerateImage = async () => {
    if (!imagePrompt) {
      toast.error("Please provide a prompt");
      return;
    }

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsGeneratingImage(true);
    try {
      const result = await generateImageAction({
        prompt: imagePrompt,
        size: "1024x1024",
        quality: "hd",
        userId: user._id,
        model: selectedModel,
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        toast.success("Thumbnail generated successfully!");
      } else {
        throw new Error(result.error || "Generation failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to generate image");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-primary/10 shadow-xl shadow-primary/5">
        <CardHeader>
          <CardTitle>Thumbnail Generator</CardTitle>
          <CardDescription>Create click-worthy thumbnails with AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>AI Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {thumbnailModels ? (
                  thumbnailModels.map((model: any) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} ({model.provider})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="dall-e-3">DALL-E 3 (OpenAI)</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Image Description</Label>
            <Textarea 
              placeholder="A shocked YouTuber face pointing at a floating glowing orb, high contrast, saturated colors, 4k, youtube thumbnail style..."
              className="min-h-[200px] text-base resize-none bg-background/50"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <Button 
            className="w-full size-lg" 
            onClick={handleGenerateImage}
            disabled={isGeneratingImage}
          >
            {isGeneratingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Thumbnail...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Generate Thumbnail
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-primary/10 shadow-xl shadow-primary/5 overflow-hidden">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[400px] bg-black/5 p-0">
          {generatedImage ? (
            <div className="relative w-full h-full group">
              <img 
                src={generatedImage} 
                alt="Generated Thumbnail" 
                className="w-full h-full object-cover aspect-video"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button variant="secondary" size="icon" onClick={() => window.open(generatedImage, '_blank')}>
                  <Download className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground">Generated thumbnail will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}