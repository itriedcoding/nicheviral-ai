import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Zap, Video, TrendingUp, ArrowRight, Activity, Sparkles, BarChart3, Clock } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function Overview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { userId } = useAuth();
  
  const userVideos = useQuery(api.videos.getUserVideos, userId ? { userId, limit: 5 } : "skip");
  const credits = useQuery(api.videos.getUserCredits, userId ? { userId } : "skip");
  const trendingNiches = useQuery(api.niches.getTrendingNiches, { limit: 4 });

  const creditPercentage = credits ? Math.min((credits.credits / (credits.subscriptionTier === "pro" ? 1500 : 500)) * 100, 100) : 0;

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Command Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Real-time analytics and content generation status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary animate-pulse">
            <div className="w-2 h-2 rounded-full bg-primary" />
            System Operational
          </div>
          <Button onClick={() => onNavigate("studio")} className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            New Generation
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:border-primary/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Total Content</CardTitle>
            <Video className="h-4 w-4 text-primary/70 group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{userVideos?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Generated videos
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:border-primary/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Credit Balance</CardTitle>
            <Zap className="h-4 w-4 text-primary/70 group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{credits?.credits || 0}</div>
            <Progress value={creditPercentage} className="h-1 mt-2 bg-primary/20" />
            <p className="text-xs text-muted-foreground mt-2 flex justify-between">
              <span className="capitalize">{credits?.subscriptionTier || "Free"} Plan</span>
              <span>{Math.round(creditPercentage)}% used</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:border-primary/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Market Trends</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary/70 group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{trendingNiches?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active opportunities
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:border-primary/30 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">System Status</CardTitle>
            <Activity className="h-4 w-4 text-primary/70 group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">
              AI Models Online
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Generations */}
        <Card className="col-span-4 bg-card/30 border-primary/10 shadow-lg backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Productions</CardTitle>
              <CardDescription>Your latest AI-generated content</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("studio")} className="text-primary hover:text-primary/80">
              View Studio <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!userVideos ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                    <Skeleton className="h-16 w-28 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                ))
              ) : userVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border border-dashed border-primary/20 rounded-xl bg-primary/5">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground mb-4 font-medium">No productions yet</p>
                  <Button onClick={() => onNavigate("studio")} className="shadow-lg shadow-primary/20">
                    Start Your First Generation
                  </Button>
                </div>
              ) : (
                userVideos.map((video) => (
                  <div key={video._id} className="flex items-center justify-between p-3 border border-border/50 rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all group bg-card/50">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-28 bg-black/50 rounded-lg overflow-hidden relative ring-1 ring-border/50 group-hover:ring-primary/50 transition-all">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                            <Video className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="h-6 w-6 text-white fill-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">{video.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-secondary/50">{video.aiModel}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(video._creationTime).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={video.status === "completed" ? "default" : "outline"} className={video.status === "completed" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20" : ""}>
                        {video.status}
                      </Badge>
                      {video.videoUrl && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                          <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Trending Niches */}
        <Card className="col-span-3 bg-card/30 border-primary/10 shadow-lg backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Market Intelligence
            </CardTitle>
            <CardDescription>High-potential opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!trendingNiches ? (
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                </div>
              ) : trendingNiches.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-primary/20 rounded-xl bg-primary/5">
                  <p className="mb-2">No market data available.</p>
                  <Button variant="link" onClick={() => onNavigate("growth")} className="text-primary">
                    Launch Discovery Engine
                  </Button>
                </div>
              ) : (
                trendingNiches.map((niche, i) => (
                  <div key={niche._id} className="p-4 border border-border/50 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group bg-card/50" onClick={() => onNavigate("growth")}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{niche.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Score</span>
                        <span className="text-sm font-bold text-primary">{niche.score}</span>
                      </div>
                    </div>
                    <div className="w-full bg-secondary/50 h-1.5 rounded-full overflow-hidden mb-3">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(niche.score, 100)}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {niche.description}
                    </p>
                  </div>
                ))
              )}
              <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary" onClick={() => onNavigate("growth")}>
                Analyze More Niches <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}