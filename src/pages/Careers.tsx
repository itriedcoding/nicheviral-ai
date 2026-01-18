import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Heart, Zap, Users, Globe, Mail } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Rocket className="w-3 h-3 mr-1" />
              Join Our Team
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Build the Future of AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our team and help democratize AI video creation for creators worldwide
            </p>
          </motion.div>

          {/* Why Join */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-12 mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Build tools used by creators worldwide
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Remote-First</h3>
                <p className="text-sm text-muted-foreground">
                  Work from anywhere in the world
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Work with cutting-edge AI technology
                </p>
              </div>
            </div>
          </motion.div>

          {/* Open Positions - Real CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <Users className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">We're Hiring!</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're looking for talented engineers, designers, and creators to join our growing team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:careers@neuraai.cyou" className="inline-block">
                <Button className="red-glow" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us Your Resume
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Email: <span className="text-primary">careers@neuraai.cyou</span>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
