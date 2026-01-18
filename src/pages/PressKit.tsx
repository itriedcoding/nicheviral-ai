import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Image, Video, Newspaper } from "lucide-react";

export default function PressKit() {
  const logos = [
    { name: "Primary Logo (PNG)", size: "1024x1024", file: "neura-logo-primary.png" },
    { name: "White Logo (PNG)", size: "1024x1024", file: "neura-logo-white.png" },
    { name: "Black Logo (PNG)", size: "1024x1024", file: "neura-logo-black.png" },
    { name: "Icon Only (SVG)", size: "512x512", file: "neura-icon.svg" }
  ];

  const assets = [
    { name: "Product Screenshots", type: "Images", count: "15 files", size: "45 MB" },
    { name: "Demo Videos", type: "Videos", count: "5 files", size: "280 MB" },
    { name: "Brand Guidelines", type: "PDF", count: "1 file", size: "8 MB" },
    { name: "Company Fact Sheet", type: "PDF", count: "1 file", size: "2 MB" }
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Newspaper className="w-3 h-3 mr-1" />
              Media Resources
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Press Kit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to cover Neura AI in your publication
            </p>
          </motion.div>

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Company Overview</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Neura AI is a leading AI video creation platform that democratizes professional content creation for millions of creators worldwide.
              </p>
              <p>
                Founded in 2025, we've raised $50M in Series B funding and serve over 100,000 creators across 150 countries.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="glass rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">100K+</div>
                  <div className="text-sm">Active Creators</div>
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">5M+</div>
                  <div className="text-sm">Videos Generated</div>
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">150+</div>
                  <div className="text-sm">Countries</div>
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">$50M</div>
                  <div className="text-sm">Series B Funding</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Brand Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {logos.map((logo, index) => (
                <div key={index} className="glass rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold mb-1">{logo.name}</div>
                    <div className="text-sm text-muted-foreground">{logo.size}</div>
                  </div>
                  <Button variant="outline" size="sm" className="glass">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full red-glow">
              <Download className="w-4 h-4 mr-2" />
              Download All Logos (ZIP)
            </Button>
          </motion.div>

          {/* Media Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Media Assets</h2>
            <div className="space-y-4">
              {assets.map((asset, index) => (
                <div key={index} className="glass rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      {asset.type === "Images" && <Image className="w-6 h-6 text-primary" />}
                      {asset.type === "Videos" && <Video className="w-6 h-6 text-primary" />}
                      {asset.type === "PDF" && <FileText className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.count} • {asset.size}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="glass">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-muted-foreground mb-6">
              For press inquiries, interviews, or additional assets, please contact our PR team
            </p>
            <div className="space-y-2 mb-6">
              <div><span className="text-muted-foreground">Email:</span> <span className="text-primary">press@neura-ai.com</span></div>
              <div><span className="text-muted-foreground">Phone:</span> <span className="text-primary">+1 (555) 123-4567</span></div>
            </div>
            <Button className="red-glow">
              Contact PR Team
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
