import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, ArrowUpRight, Sparkles, Bookmark, BarChart2, Target, Zap, Activity, Gamepad2, Users, ThumbsUp } from "lucide-react";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function Growth() {
  const { userId } = useAuth();
  const trendingGames = useQuery(api.robloxData.getTrendingGames, { limit: 12 });
  const saveNiche = useMutation(api.users.saveNiche); // We can reuse this or create saveGame
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate Market Sentiment based on total players in top games
  const totalPlayers = trendingGames ? trendingGames.reduce((acc: number, curr: any) => acc + (curr.playing || 0), 0) : 0;
  const sentimentLabel = totalPlayers > 1000000 ? "Booming" : totalPlayers > 500000 ? "Active" : "Quiet";
  const sentimentColor = totalPlayers > 1000000 ? "text-green-500" : totalPlayers > 500000 ? "text-yellow-500" : "text-red-500";

  const handleSaveGame = async (gameId: any) => {
    // Placeholder for saving game logic
    toast.success("Game saved to watchlist");
  };

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Roblox Market Intelligence
          </h2>
          <p className="text-muted-foreground mt-1 text-lg">
            Real-time analytics on top trending Roblox games.
          </p>
        </div>
        <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
          <Target className="h-4 w-4" />
          View Saved Games
        </Button>
      </div>

      <div className="grid gap-8">
        {/* Market Sentiment & Discovery Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-gradient-to-br from-card to-background border-primary/20 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Search className="h-6 w-6 text-primary" />
                Game Discovery Engine
              </CardTitle>
              <CardDescription className="text-base">
                Search for games to analyze their stats and growth potential.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Enter game name or ID..." 
                    className="h-12 pl-10 bg-background/50 border-primary/20 focus-visible:ring-primary/30 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-12 px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-lg font-medium min-w-[200px]"
                  onClick={() => toast.info("Search coming soon")}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    <span>Analyze Game</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Platform Activity
              </CardTitle>
              <CardDescription>Real-time player engagement</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="text-center">
                <h4 className={`text-4xl font-bold ${sentimentColor} mb-2`}>
                  {(totalPlayers / 1000).toFixed(1)}k+
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Active players in top 20 games
                </p>
                <Badge variant="outline" className={`${sentimentColor} border-current`}>
                  {sentimentLabel} Market
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Trending Games
            </h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-background/50">Live Data</Badge>
              <Badge variant="outline" className="bg-background/50">Roblox API</Badge>
            </div>
          </div>

          {!trendingGames ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(8).fill(0).map((_, i) => (
                <Card key={i} className="h-[200px] animate-pulse bg-muted/20" />
              ))}
            </div>
          ) : trendingGames.length === 0 ? (
            <Card className="border-dashed border-2 bg-muted/10">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Gamepad2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Games Found</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Waiting for the next data sync. Please check back in a few minutes.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trendingGames.map((game: any, i: number) => (
                <Card key={game._id} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm flex flex-col overflow-hidden">
                  <div className="aspect-video w-full bg-muted relative overflow-hidden">
                    <img 
                      src={game.thumbnailUrl} 
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {(game.playing || 0).toLocaleString()}
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {game.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-1">
                      by {game.creatorName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {game.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <div className="bg-secondary/30 p-2 rounded-lg text-center">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Visits</div>
                        <div className="font-bold text-sm">{(game.visits || 0).toLocaleString()}</div>
                      </div>
                      <div className="bg-secondary/30 p-2 rounded-lg text-center">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Upvotes</div>
                        <div className="font-bold text-sm">{(game.upVotes || 0).toLocaleString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}