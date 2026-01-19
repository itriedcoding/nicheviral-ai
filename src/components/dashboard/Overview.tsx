import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Zap, Video, TrendingUp, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";

export function Overview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { userId } = useAuth();
  
  const userVideos = useQuery(api.videos.getUserVideos, userId ? { userId, limit: 5 } : "skip");
  const credits = useQuery(api.videos.getUserCredits, userId ? { userId } : "skip");
  const trendingNiches = useQuery(api.niches.getTrendingNiches, { limit: 3 });

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back. Here's your content overview.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => onNavigate("studio")} className="gap-2 shadow-lg shadow-primary/20">
            <Zap className="h-4 w-4" />
            New Generation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/10 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userVideos?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Generated content
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary/10 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{credits?.credits || 0}</div>
            <p className="text-xs text-muted-foreground">
              {credits?.subscriptionTier === "free" ? "Free Plan" : "Pro Plan"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Generations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!userVideos ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-20 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ))
              ) : userVideos.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <Video className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-4">No videos generated yet.</p>
                  <Button variant="outline" onClick={() => onNavigate("studio")}>
                    Start Creating
                  </Button>
                </div>
              ) : (
                userVideos.map((video) => (
                  <div key={video._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-20 bg-muted rounded overflow-hidden relative">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary">
                            <Video className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{video.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{video.status} • {video.aiModel}</p>
                      </div>
                    </div>
                    {video.videoUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle>Trending Niches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!trendingNiches ? (
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : trendingNiches.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No trending niches discovered yet.</p>
                  <Button variant="link" onClick={() => onNavigate("growth")} className="mt-2">
                    Go to Discovery Engine
                  </Button>
                </div>
              ) : (
                trendingNiches.map((niche) => (
                  <div key={niche._id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-primary">{niche.name}</h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Score: {niche.score}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {niche.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate("growth")}>
                      Analyze Niche
                    </Button>
                  </div>
                ))
              )}
              <Button variant="ghost" className="w-full gap-2" onClick={() => onNavigate("growth")}>
                View All Niches <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}