import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Gamepad2, 
  ArrowUpRight, 
  Sparkles,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface OverviewProps {
  onNavigate: (page: string) => void;
}

export function Overview({ onNavigate }: OverviewProps) {
  // Fetch real data if available, otherwise use safe defaults
  const trendingGames = useQuery(api.robloxData.getTrendingGames, { limit: 3 });
  const userCredits = useQuery(api.videos.getUserCredits, {});

  const stats = [
    {
      label: "Credits Available",
      value: userCredits?.credits?.toString() || "0",
      change: "Top up",
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      color: "text-primary"
    },
    {
      label: "Games Tracked",
      value: "12",
      change: "+2 this week",
      icon: <Gamepad2 className="w-5 h-5 text-blue-500" />,
      color: "text-blue-500"
    },
    {
      label: "Thumbnails Generated",
      value: "24",
      change: "+5 today",
      icon: <Users className="w-5 h-5 text-green-500" />,
      color: "text-green-500"
    },
    {
      label: "Market Trends",
      value: "Active",
      change: "Updated 1h ago",
      icon: <Activity className="w-5 h-5 text-orange-500" />,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening in the Roblox market.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate("studio")}>
            <Sparkles className="w-4 h-4 mr-2" />
            Create Thumbnail
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl border border-border hover:border-primary/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-background/50 ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center">
                {stat.change}
                {stat.change.includes("+") && <ArrowUpRight className="w-3 h-3 ml-1" />}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Trends */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trending Games */}
        <div className="lg:col-span-2 glass-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending on Roblox
            </h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("growth")}>View All</Button>
          </div>

          <div className="space-y-4">
            {trendingGames ? (
              trendingGames.map((game, i) => (
                <div key={game._id} className="flex items-center gap-4 p-4 rounded-lg bg-background/40 hover:bg-background/60 transition-colors">
                  <div className="font-bold text-lg text-muted-foreground w-6">#{i + 1}</div>
                  <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                    {game.thumbnailUrl ? (
                      <img src={game.thumbnailUrl} alt={game.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <Gamepad2 className="w-6 h-6 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{game.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {game.playing.toLocaleString()} playing • {game.visits.toLocaleString()} visits
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-500 font-medium text-sm flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" />
                      High Growth
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Loading market data...
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12" onClick={() => onNavigate("studio")}>
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Generate Thumbnail
            </Button>
            <Button variant="outline" className="w-full justify-start h-12" onClick={() => onNavigate("growth")}>
              <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
              Analyze Competitors
            </Button>
            <Button variant="outline" className="w-full justify-start h-12" onClick={() => onNavigate("tools")}>
              <Gamepad2 className="w-4 h-4 mr-2 text-green-500" />
              Game Description AI
            </Button>
            <Link to="/billing">
              <Button variant="outline" className="w-full justify-start h-12">
                <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                Get More Credits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}