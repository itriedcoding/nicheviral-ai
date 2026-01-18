import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket, Zap, Bug } from "lucide-react";

// REAL changelog entries based on actual development
const changelog = [
  {
    version: "2.5.0",
    date: "January 18, 2026",
    type: "feature",
    items: [
      {
        icon: Sparkles,
        title: "Unified AI Model v1",
        description: "Revolutionary unified AI pipeline that coordinates video, audio, and text generation in one intelligent system.",
        type: "new"
      },
      {
        icon: Rocket,
        title: "Content Regeneration",
        description: "Instantly regenerate any content with improved AI using saved parameters from the original generation.",
        type: "new"
      },
      {
        icon: Zap,
        title: "Real-time AI Generation",
        description: "Generate AI videos with Stable Diffusion and StreamElements TTS integration for instant results.",
        type: "new"
      }
    ]
  },
  {
    version: "2.4.2",
    date: "January 15, 2026",
    type: "fix",
    items: [
      {
        icon: Bug,
        title: "Video Deletion Authorization Fix",
        description: "Resolved authorization errors when deleting videos. Added proper admin support for content management.",
        type: "fix"
      },
      {
        icon: Zap,
        title: "Authentication Improvements",
        description: "Enhanced session handling and identity verification for better security and user experience.",
        type: "improvement"
      }
    ]
  }
];

function ChangelogEntry({ entry, index }: { entry: typeof changelog[0]; index: number }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-primary/20 text-primary border-primary/30";
      case "fix":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "improvement":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-muted";
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case "new":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "fix":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "improvement":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-muted";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {index < changelog.length - 1 && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent" />
      )}

      <div className="glass-card rounded-xl p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center relative z-10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Version {entry.version}</h2>
              <p className="text-sm text-muted-foreground">{entry.date}</p>
            </div>
          </div>
          <Badge className={getTypeColor(entry.type)}>
            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
          </Badge>
        </div>

        <div className="space-y-4">
          {entry.items.map((item, itemIndex) => (
            <motion.div
              key={itemIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
              className="glass rounded-lg p-4 hover:scale-102 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/5 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant="outline" className={getItemTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Changelog() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Rocket className="w-3 h-3 mr-1" />
              Product Updates
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Changelog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest features, improvements, and bug fixes
            </p>
          </motion.div>

          <div className="space-y-8">
            {changelog.map((entry, index) => (
              <ChangelogEntry key={entry.version} entry={entry} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-8 mt-12 text-center"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-muted-foreground">
              Follow us for the latest updates and feature announcements
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
