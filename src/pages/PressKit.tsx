import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon, FileText } from "lucide-react";

export default function PressKit() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Media Resources
            </Badge>
            <h1 className="text-5xl font-bold mb-6">Press Kit</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Official brand assets, logos, and product screenshots for media use.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Brand Logos</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" /> Download All
                </Button>
              </div>
              <div className="space-y-4">
                <div className="glass p-6 rounded-xl flex items-center justify-center bg-white/5">
                  <img src="/logo.svg" alt="Logo Dark" className="h-8" />
                </div>
                <div className="glass p-6 rounded-xl flex items-center justify-center bg-white">
                  <img src="/logo.svg" alt="Logo Light" className="h-8 invert" />
                </div>
              </div>
            </motion.div>

            {/* Brand Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Brand Guidelines</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" /> PDF
                </Button>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>Our brand guidelines cover:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Logo usage and clear space</li>
                  <li>Color palette (Primary Blue, Dark, Light)</li>
                  <li>Typography (Inter font family)</li>
                  <li>Tone of voice and messaging</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* About Boilerplate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-2xl mb-12"
          >
            <h3 className="text-xl font-bold mb-4">About NicheViral AI</h3>
            <div className="glass p-6 rounded-xl relative group">
              <p className="text-muted-foreground leading-relaxed">
                "NicheViral AI is the leading AI-powered video generation platform designed for content creators and marketers. By combining advanced generative models with trend analysis, NicheViral AI enables users to produce high-quality, viral-ready content in minutes rather than hours."
              </p>
              <Button variant="ghost" size="sm" className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Copy
              </Button>
            </div>
          </motion.div>

          {/* Contact */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">For press inquiries, please contact:</p>
            <a href="mailto:press@nicheviral.ai" className="text-primary font-semibold hover:underline text-lg">
              press@nicheviral.ai
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}