import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, ArrowUpRight, Sparkles, Bookmark, BarChart2, Target, Zap } from "lucide-react";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function Growth() {
  const { userId } = useAuth();
  const trendingNiches = useQuery(api.niches.getTrendingNiches, { limit: 12 });
  const discoverNiches = useAction(api.nicheDiscovery.discoverTrendingNiches);
  const saveNiche = useMutation(api.users.saveNiche);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDiscover = async () => {
    setIsDiscovering(true);
    try {
      await discoverNiches({});
      toast.success("Market analysis complete. New niches identified.");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
      console.error(error);
    } finally {
      setIsDiscovering(false);
    }
  };

  const handleSaveNiche = async (nicheId: any) => {
    try {
      await saveNiche({ nicheId });
      toast.success("Niche saved to watchlist");
    } catch (error) {
      toast.error("Failed to save niche");
    }
  };

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Growth Intelligence
          </h2>
          <p className="text-muted-foreground mt-1 text-lg">
            AI-powered market analysis and trend discovery engine.
          </p>
        </div>
        <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
          <Target className="h-4 w-4" />
          View Saved Niches
        </Button>
      </div>

      <div className="grid gap-8">
        {/* Discovery Engine */}
        <Card className="bg-gradient-to-br from-card to-background border-primary/20 shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Search className="h-6 w-6 text-primary" />
              Niche Discovery Engine
            </CardTitle>
            <CardDescription className="text-base">
              Analyze millions of data points to find high-potential, low-competition video topics.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Enter a category (e.g., 'AI automation', 'sustainable living', 'retro gaming')..." 
                  className="h-12 pl-10 bg-background/50 border-primary/20 focus-visible:ring-primary/30 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="h-12 px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-lg font-medium min-w-[200px]"
                onClick={handleDiscover}
                disabled={isDiscovering}
              >
                {isDiscovering ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    <span>Run Analysis</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trending Opportunities
            </h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-background/50">Real-time Data</Badge>
              <Badge variant="outline" className="bg-background/50">AI Verified</Badge>
            </div>
          </div>

          {!trendingNiches ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(8).fill(0).map((_, i) => (
                <Card key={i} className="h-[200px] animate-pulse bg-muted/20" />
              ))}
            </div>
          ) : trendingNiches.length === 0 ? (
            <Card className="border-dashed border-2 bg-muted/10">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Use the Discovery Engine above to analyze the market and find trending niches.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trendingNiches.map((niche, i) => (
                <Card key={niche._id} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={i < 3 ? "default" : "secondary"} className={i < 3 ? "bg-primary hover:bg-primary/90" : ""}>
                        Score: {niche.score}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 -mt-2 -mr-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveNiche(niche._id);
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {niche.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {niche.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <div className="bg-secondary/30 p-2 rounded-lg text-center">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Potential</div>
                        <div className="font-bold text-sm">{niche.potential}</div>
                      </div>
                      <div className="bg-secondary/30 p-2 rounded-lg text-center">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Competition</div>
                        <div className="font-bold text-sm">{niche.competition}</div>
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