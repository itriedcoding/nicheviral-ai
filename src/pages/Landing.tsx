import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Zap, CheckCircle2, Sparkles, Video, Globe } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background z-0" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            The Future of Content Creation
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Create Viral AI Videos <br />
            <span className="text-primary">Grow on Autopilot</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Generate high-end, cinematic videos with the world's most advanced AI models. 
            Identify trending niches and dominate YouTube, TikTok, and Instagram.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/auth">
              <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/25">
                Start Creating for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full backdrop-blur-sm">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm"
          >
            <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-black overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Generated with Sora V1</p>
                    <p className="text-sm text-white/60">Prompt: "Cinematic drone shot of a futuristic city..."</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Go Viral</h2>
            <p className="text-muted-foreground text-lg">
              Stop guessing. Start dominating. Our platform combines state-of-the-art generation with data-driven growth tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-colors shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Model Generation</h3>
              <p className="text-muted-foreground">
                Access Sora, Runway Gen-3, and Pika Art from a single dashboard. Choose the best model for your specific vision.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-colors shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Niche Discovery</h3>
              <p className="text-muted-foreground">
                Our AI analyzes millions of data points to find low-competition, high-traffic niches before they explode.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-colors shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cross-Platform Growth</h3>
              <p className="text-muted-foreground">
                Automatically format and schedule content for YouTube Shorts, TikTok, and Instagram Reels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <p className="text-muted-foreground">Views Generated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <p className="text-muted-foreground">Videos Created</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Creator Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">AI Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of creators who are building the future of media with Neura AI.
          </p>
          <Link to="/auth">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required for free trial. Cancel anytime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}