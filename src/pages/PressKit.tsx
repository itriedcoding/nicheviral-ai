import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Mail } from "lucide-react";

export default function PressKit() {
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
              <Newspaper className="w-3 h-3 mr-1" />
              Media Resources
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Press Kit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Media resources and press information
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
            <p className="text-muted-foreground leading-relaxed">
              Neura AI is an AI-powered video creation platform that helps creators generate professional content using advanced machine learning models. Our unified AI system combines video generation, voice synthesis, and script writing to streamline the content creation process.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-muted-foreground mb-6">
              For press inquiries, interviews, or additional information, please contact our team
            </p>
            <div className="space-y-2 mb-6">
              <div><span className="text-muted-foreground">Email:</span> <span className="text-primary">press@neura-ai.com</span></div>
            </div>
            <a href="mailto:press@neura-ai.com" className="inline-block">
              <Button className="red-glow">
                <Mail className="w-4 h-4 mr-2" />
                Contact Press Team
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
