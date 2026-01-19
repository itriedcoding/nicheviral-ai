import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Image as ImageIcon, Sparkles, Wand2, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VideoStudio } from "./studio/VideoStudio";
import { ThumbnailStudio } from "./studio/ThumbnailStudio";
import { ProjectHistory } from "./studio/ProjectHistory";
import { Card } from "@/components/ui/card";

export function Studio() {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="h-full flex flex-col p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-orange-400 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
            NicheViral Studio
            <Badge variant="outline" className="text-sm font-normal text-foreground border-primary/30 bg-primary/5">
              v2.0
            </Badge>
          </h2>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Create viral Roblox content with our advanced AI suite. Generate thumbnails and trailers in seconds.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Card className="flex items-center gap-2 px-4 py-2 bg-primary/5 border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Pro Mode Active</span>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-1">
          <TabsList className="h-12 bg-transparent p-0 gap-6">
            <TabsTrigger 
              value="video" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 text-base text-muted-foreground data-[state=active]:text-primary transition-all"
            >
              <Video className="w-4 h-4 mr-2" />
              Roblox Trailers
            </TabsTrigger>
            <TabsTrigger 
              value="thumbnail" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 text-base text-muted-foreground data-[state=active]:text-primary transition-all"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Thumbnail Creator
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="video" className="space-y-6 mt-0 focus-visible:ring-0">
          <div className="grid lg:grid-cols-1 gap-8">
            <VideoStudio />
          </div>
        </TabsContent>

        <TabsContent value="thumbnail" className="space-y-6 mt-0 focus-visible:ring-0">
          <ThumbnailStudio />
        </TabsContent>
      </Tabs>

      <div className="pt-8 border-t border-border/50">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Creation History</h3>
        </div>
        <ProjectHistory />
      </div>
    </div>
  );
}