import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export function Growth() {
  const trendingNiches = useQuery(api.niches.getTrendingNiches, { limit: 8 });
  const discoverNiches = useAction(api.nicheDiscovery.discoverTrendingNiches);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDiscover = async () => {
    setIsDiscovering(true);
    try {
      await discoverNiches({ category: searchQuery || "all", count: 5 });
      toast.success("New niches discovered!");
    } catch (error) {
      toast.error("Failed to discover niches. Try again.");
      console.error(error);
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Growth & Analytics</h2>
          <p className="text-muted-foreground">
            Discover trending niches using real-time AI analysis.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2 bg-gradient-to-r from-primary/5 via-background to-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Search className="h-5 w-5" />
              Niche Discovery Engine
            </CardTitle>
            <CardDescription>
              Find high-potential video topics with low competition using our AI analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input 
                placeholder="Enter a category (e.g., 'crypto', 'meditation', 'gaming')..." 
                className="h-12 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                size="lg" 
                className="h-12 px-8 shadow-lg shadow-primary/20"
                onClick={handleDiscover}
                disabled={isDiscovering}
              >
                {isDiscovering ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Discover Niches"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle>Top Trending Niches</CardTitle>
          </CardHeader>
          <CardContent>
            {!trendingNiches ? (
              <div className="text-center py-12">Loading niches...</div>
            ) : trendingNiches.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">No niches found. Use the Discovery Engine above.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {trendingNiches.map((niche, i) => (
                  <div key={niche._id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer group bg-card hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={i === 0 ? "default" : "secondary"} className={i === 0 ? "bg-primary hover:bg-primary/90" : ""}>
                        Score: {niche.trendScore}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{niche.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 h-8">
                      {niche.description}
                    </p>
                    <div className="flex gap-2 text-xs text-muted-foreground mt-auto">
                      <span className="bg-secondary px-2 py-1 rounded">Vol: {niche.searchVolume.toLocaleString()}</span>
                      <span className="bg-secondary px-2 py-1 rounded">Comp: {niche.competitionLevel}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-dashed border-2 bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect Your Channel</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Connect your YouTube channel to see real-time analytics and AI-driven growth recommendations tailored to your content.
            </p>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}