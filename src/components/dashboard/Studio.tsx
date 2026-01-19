import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Image as ImageIcon, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VideoStudio } from "./studio/VideoStudio";
import { ThumbnailStudio } from "./studio/ThumbnailStudio";
import { ProjectHistory } from "./studio/ProjectHistory";

export function Studio() {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="h-full flex flex-col p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Creative Studio
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Professional AI content generation suite for creators.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <Sparkles className="w-3 h-3 mr-2 text-yellow-500" />
            Pro Mode Active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] p-1 bg-muted/50">
          <TabsTrigger value="video" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Video className="w-4 h-4 mr-2" />
            Video Generation
          </TabsTrigger>
          <TabsTrigger value="thumbnail" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <ImageIcon className="w-4 h-4 mr-2" />
            Thumbnail Creator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="space-y-6">
          <VideoStudio />
        </TabsContent>

        <TabsContent value="thumbnail" className="space-y-6">
          <ThumbnailStudio />
        </TabsContent>
      </Tabs>

      <ProjectHistory />
    </div>
  );
}