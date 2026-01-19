import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Users, BarChart3, ArrowUpRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function Growth() {
  // In a real app, we would query the niches table
  // const niches = useQuery(api.niches.getTrendingNiches);
  
  const trendingNiches = [
    { title: "AI Automation", score: 98, volume: "High", competition: "Medium" },
    { title: "Faceless Finance", score: 95, volume: "High", competition: "High" },
    { title: "Sustainable Living", score: 89, volume: "Medium", competition: "Low" },
    { title: "Retro Tech Reviews", score: 85, volume: "Medium", competition: "Low" },
  ];

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Growth & Analytics</h2>
          <p className="text-muted-foreground">
            Discover trending niches and track your channel performance.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2 bg-gradient-to-r from-primary/10 via-background to-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Niche Discovery Engine
            </CardTitle>
            <CardDescription>
              Find high-potential video topics with low competition using our AI analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input placeholder="Enter a keyword (e.g., 'crypto', 'meditation', 'gaming')..." className="h-12" />
              <Button size="lg" className="h-12 px-8">Analyze</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Trending Niches This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {trendingNiches.map((niche, i) => (
                <div key={i} className="p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={i === 0 ? "default" : "secondary"}>
                      Score: {niche.score}
                    </Badge>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{niche.title}</h3>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Vol: {niche.volume}</span>
                    <span>•</span>
                    <span>Comp: {niche.competition}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Channel Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <h4 className="text-2xl font-bold">124.5K</h4>
                </div>
                <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">+12%</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subscribers Gained</p>
                  <h4 className="text-2xl font-bold">1,204</h4>
                </div>
                <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">+5.4%</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Est. Revenue</p>
                  <h4 className="text-2xl font-bold">$450.20</h4>
                </div>
                <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">+18%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Audience Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>US & Canada</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Europe</span>
                  <span className="font-bold">30%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[30%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Asia</span>
                  <span className="font-bold">15%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[15%]" />
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Your audience is primarily interested in <span className="text-foreground font-medium">Tech</span> and <span className="text-foreground font-medium">Finance</span> content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
