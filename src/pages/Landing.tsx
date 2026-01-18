import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Video,
  TrendingUp,
  Brain,
  Zap,
  ChevronRight,
  Play,
  Star,
  Mic,
  Film
} from "lucide-react";
import { Link } from "react-router";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-8 group hover:scale-105 transition-all duration-300 hover:red-glow cursor-pointer"
    >
      <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass rounded-xl p-6 text-center"
    >
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <FloatingOrbs />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 glass-light rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Video Creation</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent animate-gradient">
              Neura AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover trending niches and create viral videos with cutting-edge AI.
            Powered by Sora, ElevenLabs, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link to="/auth">
              <Button size="lg" className="group px-8 py-6 text-lg rounded-xl red-glow hover:red-glow-strong transition-all">
                Get Started
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="group px-8 py-6 text-lg rounded-xl glass hover:glass-strong transition-all"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <StatCard value="10M+" label="Videos Generated" />
            <StatCard value="500K+" label="Active Users" />
            <StatCard value="50+" label="AI Models" />
            <StatCard value="99.9%" label="Uptime" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1.2 }, y: { repeat: Infinity, duration: 1.5 } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-1">
            <motion.div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-5xl font-bold mb-4">
              Powerful Features
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create viral content and dominate your niche
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={TrendingUp}
              title="Trending Niches"
              description="Real-time analysis of YouTube trends to discover profitable niches before they explode"
            />
            <FeatureCard
              icon={Brain}
              title="AI Video Generation"
              description="Generate stunning videos with Sora and other cutting-edge AI models in minutes"
            />
            <FeatureCard
              icon={Mic}
              title="AI Voiceovers"
              description="Natural-sounding voices powered by ElevenLabs in multiple languages and accents"
            />
            <FeatureCard
              icon={Film}
              title="Professional Editing"
              description="Automatic editing, transitions, and effects that make your videos stand out"
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Generate and export videos 10x faster than traditional video editing tools"
            />
            <FeatureCard
              icon={Star}
              title="Viral Templates"
              description="Proven templates and formats optimized for maximum engagement and views"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From idea to viral video in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Discover Trends", desc: "Browse trending niches powered by real YouTube data" },
              { step: "02", title: "Generate Video", desc: "Create stunning AI videos with just a prompt" },
              { step: "03", title: "Go Viral", desc: "Download and publish your viral-ready content" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center red-glow"
          >
            <Video className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Go Viral?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators using Neura AI to generate millions of views
            </p>
            <Link to="/auth">
              <Button size="lg" className="px-12 py-7 text-lg rounded-xl red-glow-strong hover:scale-105 transition-all">
                Start Creating Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 glass-light mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
            Neura AI
          </div>
          <p className="text-muted-foreground mb-6">
            Powered by Sora, ElevenLabs, and cutting-edge AI technology
          </p>
          <div className="flex gap-6 justify-center text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
