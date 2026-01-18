import { motion } from "framer-motion";
import { TrendingUp, Video, Eye, Zap } from "lucide-react";

interface StatsCardsProps {
  videosGenerated?: number;
  totalViews?: number;
  trendsAnalyzed?: number;
  creditsUsed?: number;
}

export function StatsCards({
  videosGenerated = 0,
  totalViews = 0,
  trendsAnalyzed = 0,
  creditsUsed = 0
}: StatsCardsProps) {
  const stats = [
    {
      icon: Video,
      label: "Videos Generated",
      value: videosGenerated,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Eye,
      label: "Est. Total Views",
      value: totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: TrendingUp,
      label: "Trends Analyzed",
      value: trendsAnalyzed,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Zap,
      label: "Credits Used",
      value: creditsUsed,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.bgColor} rounded-lg p-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
