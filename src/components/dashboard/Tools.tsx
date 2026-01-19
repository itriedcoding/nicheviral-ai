import { motion } from "framer-motion";
import { 
  Type, 
  Tags, 
  MessageSquare, 
  Search, 
  Wand2,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Tools() {
  const tools = [
    {
      title: "Game Title Generator",
      description: "Generate catchy, high-CTR titles for your Roblox games.",
      icon: <Type className="w-6 h-6 text-primary" />,
      status: "Available"
    },
    {
      title: "Description Optimizer",
      description: "Create SEO-friendly game descriptions to rank higher in search.",
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      status: "Available"
    },
    {
      title: "Tag Generator",
      description: "Find the best tags to maximize your game's discoverability.",
      icon: <Tags className="w-6 h-6 text-green-500" />,
      status: "Available"
    },
    {
      title: "Competitor Spy",
      description: "Analyze successful games in your niche to see what works.",
      icon: <Search className="w-6 h-6 text-orange-500" />,
      status: "Coming Soon"
    },
    {
      title: "Update Log Writer",
      description: "Write engaging update logs to keep players coming back.",
      icon: <Wand2 className="w-6 h-6 text-purple-500" />,
      status: "Available"
    },
    {
      title: "Social Post Creator",
      description: "Generate posts for Twitter, Discord, and TikTok.",
      icon: <Share2 className="w-6 h-6 text-pink-500" />,
      status: "Coming Soon"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Creator Tools</h1>
        <p className="text-muted-foreground">
          AI-powered utilities to help you manage and grow your Roblox games.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl border border-border hover:border-primary/20 transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-background/50 group-hover:bg-primary/10 transition-colors">
                {tool.icon}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                tool.status === "Available" 
                  ? "bg-green-500/10 text-green-500" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {tool.status}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {tool.description}
            </p>
            <Button 
              className="w-full" 
              variant={tool.status === "Available" ? "default" : "secondary"}
              disabled={tool.status !== "Available"}
            >
              {tool.status === "Available" ? "Open Tool" : "In Development"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}