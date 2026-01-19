import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Video, Globe, Sparkles, Zap, Shield, Cpu } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary),0.3)]"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Next-Gen AI Video Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-foreground"
          >
            Viral Content <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary animate-pulse">Engineered by AI</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Deploy autonomous content pipelines. Generate cinematic videos, identify breakout trends, and dominate algorithms with enterprise-grade AI models.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/auth">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all duration-300 border border-primary/20">
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-primary/10 hover:border-primary/50 transition-all">
                <Play className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="mt-24 relative mx-auto max-w-6xl perspective-1000"
          >
            <div className="relative rounded-xl border border-primary/20 bg-card/50 p-2 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-xl pointer-events-none" />
              <div className="aspect-video rounded-lg bg-black overflow-hidden relative group">
                {/* Abstract UI Representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-primary/40 group-hover:scale-110 transition-transform duration-500 cursor-pointer shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                      <Play className="h-10 w-10 text-primary ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">Generating Scene 4...</p>
                      <div className="h-1 w-32 bg-white/20 rounded-full mt-2 overflow-hidden">
                        <div className="h-full w-2/3 bg-primary rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex gap-2">
                    <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs text-white/80 backdrop-blur-md">
                      Runway Gen-3
                    </div>
                    <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs text-white/80 backdrop-blur-md">
                      4K Resolution
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow Effect behind container */}
            <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-[3rem] opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Complete Creative <span className="text-primary">Dominance</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A unified suite of tools designed to automate the entire content lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "Multi-Model Synthesis",
                desc: "Orchestrate generation across Sora, Runway, and Luma from a single interface."
              },
              {
                icon: TrendingUp,
                title: "Predictive Analytics",
                desc: "Identify viral opportunities before they peak using real-time market data."
              },
              {
                icon: Globe,
                title: "Global Distribution",
                desc: "Auto-format and optimize content for every major video platform instantly."
              },
              {
                icon: Zap,
                title: "Instant Iteration",
                desc: "Refine scripts, hooks, and visuals in real-time with zero latency."
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Bank-grade encryption and asset protection for your intellectual property."
              },
              {
                icon: Cpu,
                title: "Automated Workflows",
                desc: "Set up set-and-forget pipelines that run 24/7 without intervention."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground relative z-10">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section (Real Capabilities) */}
      <section className="py-24 border-y border-border/50 bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { label: "AI Models", value: "5+" },
              { label: "Resolution", value: "4K" },
              { label: "Uptime", value: "99.9%" },
              { label: "Generation Speed", value: "<60s" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">{stat.value}</div>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
            Ready to <span className="text-primary">Scale?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Join the next generation of creators using AI to build massive audiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="h-14 px-12 text-lg rounded-full shadow-[0_0_25px_rgba(var(--primary),0.4)] hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] transition-all duration-300">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Free tier available • No credit card required
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}