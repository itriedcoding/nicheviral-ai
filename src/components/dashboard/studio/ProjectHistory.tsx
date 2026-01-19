import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Play, Image as ImageIcon, Video, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectHistory() {
  const videos = useQuery(api.videos.getUserVideos, { limit: 10 });
  const images = useQuery(api.images.getUserImages, { limit: 10 });

  return (
    <div className="space-y-6 mt-12">
      <h3 className="text-2xl font-bold tracking-tight">My Projects</h3>
      
      <Tabs defaultValue="videos" className="w-full">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="images">Thumbnails</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-4">
          {!videos ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : videos.length === 0 ? (
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <Video className="w-12 h-12 text-muted-foreground/20 mb-4" />
                <p className="text-muted-foreground">No videos generated yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video._id} className="overflow-hidden group">
                  <div className="aspect-video bg-black/10 relative">
                    {video.videoUrl ? (
                      <video 
                        src={video.videoUrl} 
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        {video.status === "generating" || video.status === "queued" ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <span className="text-xs text-muted-foreground capitalize">{video.status}...</span>
                          </div>
                        ) : video.status === "failed" ? (
                          <span className="text-destructive text-sm">Generation Failed</span>
                        ) : (
                          <Play className="w-10 h-10 text-muted-foreground/50" />
                        )}
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant={
                        video.status === "completed" ? "default" : 
                        video.status === "failed" ? "destructive" : "secondary"
                      }>
                        {video.status}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold truncate">{video.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{video.prompt}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      <span>{video.aiModel}</span>
                      <span>{new Date(video._creationTime).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          {!images ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : images.length === 0 ? (
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground/20 mb-4" />
                <p className="text-muted-foreground">No thumbnails generated yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <Card key={image._id} className="overflow-hidden group">
                  <div className="aspect-square bg-black/10 relative">
                    <img 
                      src={image.imageUrl} 
                      alt={image.prompt}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={() => window.open(image.imageUrl, '_blank')}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground line-clamp-2">{image.prompt}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      <span>{image.model}</span>
                      <span>{new Date(image._creationTime).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}