import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FileText, Tag, Type, AlignLeft, Image as ImageIcon, 
  Lightbulb, Video, MessageSquare, Share2, AtSign, 
  ListVideo, Zap, DollarSign, Users, BarChart, 
  Radio, Calendar, TrendingUp, Wand2
} from "lucide-react";

interface ToolGridProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

export function ToolGrid({ activeTool, setActiveTool }: ToolGridProps) {
  const tools = [
    { id: "script", icon: FileText, color: "blue", title: "Script Generator", desc: "Full video scripts" },
    { id: "ideas", icon: Lightbulb, color: "yellow", title: "Video Ideas", desc: "Viral concepts" },
    { id: "shorts", icon: Video, color: "red", title: "Shorts Script", desc: "60s viral scripts" },
    { id: "title", icon: Type, color: "purple", title: "Title Optimizer", desc: "High-CTR titles" },
    { id: "tags", icon: Tag, color: "green", title: "Tag Generator", desc: "SEO tags" },
    { id: "description", icon: AlignLeft, color: "orange", title: "Description Writer", desc: "SEO descriptions" },
    { id: "thumbnail", icon: ImageIcon, color: "pink", title: "Thumbnail Ideas", desc: "Visual concepts" },
    { id: "hook", icon: Zap, color: "amber", title: "Video Hooks", desc: "Scroll-stopping hooks" },
    { id: "community", icon: MessageSquare, color: "indigo", title: "Community Post", desc: "Engagement posts" },
    { id: "repurpose", icon: Share2, color: "cyan", title: "Repurposer", desc: "Multi-platform content" },
    { id: "channel_name", icon: AtSign, color: "teal", title: "Channel Name", desc: "Brand names" },
    { id: "playlist", icon: ListVideo, color: "lime", title: "Playlist Names", desc: "Binge-worthy titles" },
    { id: "sponsorship", icon: DollarSign, color: "emerald", title: "Sponsor Pitch", desc: "Brand deal emails" },
    { id: "reply", icon: MessageSquare, color: "sky", title: "Comment Reply", desc: "Engaging replies" },
    { id: "collab", icon: Users, color: "violet", title: "Collab Ideas", desc: "Partnership concepts" },
    { id: "audit", icon: BarChart, color: "rose", title: "Channel Audit", desc: "Growth checklist" },
    { id: "trends", icon: TrendingUp, color: "fuchsia", title: "Trend Predictor", desc: "Future forecasts" },
    { id: "livestream", icon: Radio, color: "crimson", title: "Livestream Plan", desc: "Run-of-show" },
    { id: "series", icon: Calendar, color: "indigo", title: "Shorts Series", desc: "7-day plan" },
  ];

  return (
    <div className="lg:col-span-1 space-y-4 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Wand2 className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Available Tools ({tools.length})</span>
      </div>
      <div className="grid gap-3">
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            className={`cursor-pointer transition-all duration-200 border-l-4 hover:shadow-md ${
              activeTool === tool.id 
                ? "border-l-primary border-y-primary/20 border-r-primary/20 bg-primary/5 shadow-sm" 
                : "border-l-transparent border-border/50 hover:border-l-primary/50 hover:bg-accent/50"
            }`}
            onClick={() => setActiveTool(tool.id)}
          >
            <CardHeader className="flex flex-row items-center gap-4 py-3 px-4">
              <div className={`p-2 rounded-md bg-background shadow-sm ring-1 ring-border/50 ${activeTool === tool.id ? "text-primary" : "text-muted-foreground"}`}>
                <tool.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className={`text-sm font-semibold truncate ${activeTool === tool.id ? "text-primary" : ""}`}>
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-xs truncate mt-0.5">
                  {tool.desc}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}