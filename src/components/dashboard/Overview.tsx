import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp, Zap, Video } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

export function Overview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const userVideos = useQuery(api.videos.getUserVideos, { limit: 5 });
  const credits = useQuery(api.videos.getUserCredits, {}); // Assuming this exists or similar

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back. Here's what's happening with your content.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => onNavigate("studio")} className="gap-2">
            <Zap className="h-4 w-4" />
            New Generation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userVideos?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{credits?.credits || 0}</div>
            <p className="text-xs text-muted-foreground">
              {credits?.subscriptionTier === "free" ? "Free Plan" : "Pro Plan"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              +4.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88/100</div>
            <p className="text-xs text-muted-foreground">
              Top 10% of creators
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
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
                <div className="text-center py-8 text-muted-foreground">
                  No videos generated yet. Start creating!
                </div>
              ) : (
                userVideos.map((video) => (
                  <div key={video._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
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
                        <h4 className="font-medium line-clamp-1">{video.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{video.status} • {video.aiModel}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Trending Niches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-purple-400">AI Automation</h4>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">High Demand</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Tutorials on setting up AI agents are exploding right now.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate("growth")}>
                  Analyze Niche
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">Faceless Finance</h4>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">High CPM</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Personal finance tips with AI avatars.
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate("growth")}>
                  Analyze Niche
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
