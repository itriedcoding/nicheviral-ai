import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Video,
  Brain,
  Zap,
  ChevronRight,
  Play,
  Mic,
  Film,
  Image,
  Wand2
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
      <AnimatedBackground />
      <Navigation />

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
              <span className="text-sm font-medium">50+ Real AI Models Integrated</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent animate-gradient">
              Create Viral Content
            </span>
            <br />
            <span className="text-foreground">with AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Generate professional videos, images, and audio with 50+ premium AI models.
            Runway, Luma, FLUX Pro, ElevenLabs, and more. No fake data, all real APIs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link to="/auth">
              <Button size="lg" className="group px-8 py-6 text-lg rounded-xl red-glow hover:red-glow-strong transition-all">
                Get Started Free
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#demo-video">
              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-6 text-lg rounded-xl glass hover:glass-strong transition-all"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <StatCard value="50+" label="AI Models" />
            <StatCard value="9" label="Video Models" />
            <StatCard value="15+" label="Image Models" />
            <StatCard value="1080p" label="HD Quality" />
          </motion.div>
        </div>

      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-5xl font-bold mb-4">
              Everything You Need to Create Viral Content
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              50+ real AI models integrated. No fake data, no mocks. Professional production quality.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={Video}
              title="9 Video Generation Models"
              description="Runway Gen-3, Luma Dream Machine, Kling Video, Minimax, Mochi, HunyuanVideo, CogVideoX, LTX-Video, and custom Neura AI with smart fallbacks."
            />
            <FeatureCard
              icon={Image}
              title="15+ Image Generation Models"
              description="FLUX Pro Ultra (4K+), FLUX Realism, FLUX Schnell, Stable Diffusion 3.5, SDXL Turbo, DALL-E 3, and more professional models."
            />
            <FeatureCard
              icon={Mic}
              title="Premium Audio Generation"
              description="ElevenLabs TTS, OpenAI TTS, PlayHT, and Bark for professional voice generation and text-to-speech."
            />
            <FeatureCard
              icon={Brain}
              title="AI Niche Discovery"
              description="Real AI-powered niche discovery using Groq Llama 3.3 70B. Analyze trends, search volumes, and competition levels."
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast Generation"
              description="SDXL Turbo generates in under 2 seconds. FLUX Schnell for ultra-fast professional results."
            />
            <FeatureCard
              icon={Wand2}
              title="Advanced Editing Tools"
              description="FLUX Fill for professional inpainting, FLUX Redux for high-fidelity variations, and InsightFace for face swapping."
            />
          </motion.div>
        </div>
      </section>

      {/* Models Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Real AI Models</Badge>
            <h2 className="text-5xl font-bold mb-4">
              50+ Premium AI Models
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              All models connected to real APIs. No fake data. No mocks. Production-ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-2xl p-8"
            >
              <Film className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Video Models</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Runway Gen-3 (4K Hollywood-grade)</li>
                <li>• Luma Dream Machine (1080p)</li>
                <li>• Kling Video (1080p)</li>
                <li>• Minimax Video (720p)</li>
                <li>• Mochi 1 (1080p)</li>
                <li>• HunyuanVideo (720p)</li>
                <li>• CogVideoX-5B (480p)</li>
                <li>• LTX-Video (768x512)</li>
                <li>• Neura AI (Smart Routing)</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <Image className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Image Models</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• FLUX Pro v1.1 Ultra (4K+)</li>
                <li>• FLUX Realism (Photorealistic)</li>
                <li>• FLUX Schnell (Ultra Fast)</li>
                <li>• FLUX Fill (Inpainting)</li>
                <li>• FLUX Redux (Variations)</li>
                <li>• Stable Diffusion 3.5 Large</li>
                <li>• SDXL Turbo (&lt;2s)</li>
                <li>• DALL-E 3</li>
                <li>• Plus 7+ more models</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card rounded-2xl p-8"
            >
              <Mic className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Audio & AI Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• ElevenLabs TTS</li>
                <li>• OpenAI TTS</li>
                <li>• PlayHT</li>
                <li>• Bark Audio</li>
                <li>• AI Niche Discovery (Groq)</li>
                <li>• AI Script Generation</li>
                <li>• Face Swap (InsightFace)</li>
                <li>• Music Generation (Suno AI)</li>
                <li>• Image Upscaling (RealESRGAN)</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="demo-video" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Watch Demo</Badge>
            <h2 className="text-5xl font-bold mb-4">
              See AI Content Creation in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how easy it is to create professional videos with 50+ AI models in seconds
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/2QkgD-_fW-Y"
                title="AI Content Creation Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Security & Trust</Badge>
            <h2 className="text-5xl font-bold mb-4">
              Built for Security & Reliability
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade security with 99.9% uptime. Real-time monitoring and comprehensive audit logs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/security">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-2xl p-8 cursor-pointer hover:red-glow transition-all"
              >
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Security Center</h3>
                <p className="text-muted-foreground">End-to-end encryption, SOC 2 compliance, and secure data handling.</p>
              </motion.div>
            </Link>

            <Link to="/status">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-2xl p-8 cursor-pointer hover:red-glow transition-all"
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Status Page</h3>
                <p className="text-muted-foreground">Real-time system status, uptime monitoring, and incident history.</p>
              </motion.div>
            </Link>

            <Link to="/trust">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-2xl p-8 cursor-pointer hover:red-glow transition-all"
              >
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Trust Center</h3>
                <p className="text-muted-foreground">Compliance certifications, privacy policies, and security practices.</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-12"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Create with AI?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators using 50+ real AI models to generate professional content in seconds.
            </p>
            <Link to="/auth">
              <Button size="lg" className="px-12 py-6 text-lg rounded-xl red-glow hover:red-glow-strong">
                Start Creating Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
