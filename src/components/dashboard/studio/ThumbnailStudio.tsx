import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Image as ImageIcon, Download, Share2, Wand2, Sparkles, Upload, RefreshCw } from "lucide-react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";

export function ThumbnailStudio() {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("dall-e-3");
  const [referenceImageUrl, setReferenceImageUrl] = useState("");

  const { userId } = useAuth();
  const generateImageAction = useAction(api.aiFeatures.generateImage);
  const enhancePromptAction = useAction(api.aiFeatures.enhancePrompt);
  const user = useQuery(api.users.getProfile, userId ? { userId } : "skip");
  const thumbnailModels = useQuery(api.aiModels.getModelsByType, { type: "thumbnail" });

  const handleEnhancePrompt = async () => {
    if (!imagePrompt) {
      toast.error("Please enter a prompt to enhance");
      return;
    }
    
    setIsEnhancing(true);
    try {
      const result = await enhancePromptAction({
        prompt: `Roblox 3D game thumbnail style: ${imagePrompt}`,
        type: "image"
      });
      
      if (result.success && result.content) {
        setImagePrompt(result.content);
        toast.success("Prompt enhanced for Roblox style!");
      } else {
        toast.error("Failed to enhance prompt");
      }
    } catch (error) {
      toast.error("Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

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
      // Append Roblox style keywords if not present
      let finalPrompt = imagePrompt;
      if (!finalPrompt.toLowerCase().includes("roblox")) {
        finalPrompt = `Roblox 3D game thumbnail, high quality render, ${finalPrompt}`;
      }
      
      if (referenceImageUrl) {
        finalPrompt += ` --reference_image ${referenceImageUrl} (Make it look like this style but fix/update)`;
      }

      const result = await generateImageAction({
        prompt: finalPrompt,
        size: "1024x1024",
        quality: "hd",
        userId: user._id,
        model: selectedModel,
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        toast.success("Roblox thumbnail generated successfully!");
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Roblox Thumbnail Studio</CardTitle>
            <CardDescription>Create viral 3D game thumbnails with AI</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleEnhancePrompt}
            disabled={isEnhancing || !imagePrompt}
            className="gap-2 border-primary/20 hover:bg-primary/5 text-primary"
          >
            {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
            Magic Enhance
          </Button>
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
            <Label>Reference Image URL (Optional)</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Paste an image URL to fix or update..." 
                value={referenceImageUrl}
                onChange={(e) => setReferenceImageUrl(e.target.value)}
                className="bg-background/50"
              />
              <Button variant="outline" size="icon" title="Upload Image (Coming Soon)">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Provide an example image URL and tell the AI how to fix or update it in the prompt below.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Image Description / Instructions</Label>
            <Textarea 
              placeholder="Describe your Roblox game scene. E.g., 'A parkour obby in the sky with bright neon colors, character jumping over lava, 4k render' OR 'Fix the lighting in the reference image and make it more dramatic'..."
              className="min-h-[150px] text-base resize-none bg-background/50"
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
                Generating Asset...
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
                <Button variant="secondary" size="icon" onClick={() => {
                  setReferenceImageUrl(generatedImage);
                  toast.success("Set as reference image");
                }}>
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground">Generated Roblox thumbnail will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}