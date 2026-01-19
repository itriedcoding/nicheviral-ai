import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function Status() {
  const systems = [
    { name: "Roblox API Integration", status: "operational" },
    { name: "AI Thumbnail Generation", status: "operational" },
    { name: "Video Rendering Engine", status: "operational" },
    { name: "Dashboard & Analytics", status: "operational" },
    { name: "Payment Processing", status: "operational" },
    { name: "User Authentication", status: "operational" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">System Status</h1>
            <div className="flex items-center justify-center gap-2 text-green-500 bg-green-500/10 py-2 px-4 rounded-full inline-flex">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">All Systems Operational</span>
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-hidden border border-border">
            <div className="p-6 border-b border-border bg-muted/30">
              <h2 className="font-semibold">Current Status</h2>
            </div>
            <div className="divide-y divide-border">
              {systems.map((system, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <span className="font-medium">{system.name}</span>
                  <div className="flex items-center gap-2">
                    {system.status === "operational" ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Operational
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        Issue Detected
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Incident History</h3>
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">No incidents reported today</h4>
                    <p className="text-sm text-muted-foreground">
                      All systems are running smoothly.
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Updated 2 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}