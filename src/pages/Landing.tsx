import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
            <StatCard value="4" label="Video AI Models" />
            <StatCard value="4" label="Thumbnail Models" />
            <StatCard value="4" label="Voice AI Models" />
            <StatCard value="16+" label="Total AI Models" />
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

      {/* AI Models Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Premium AI Models</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access the world's most advanced AI models for video, voice, and thumbnail generation
            </p>
          </div>

          {/* Video Generation Models */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Video className="w-8 h-8 text-primary" />
              Video Generation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "OpenAI Sora Turbo", desc: "20s of photorealistic 1080p video", resolution: "1080p", icon: Wand2 },
                { name: "Runway Gen-3 Alpha", desc: "10s of 4K video with motion control", resolution: "4K", icon: Film },
                { name: "Pika 1.5", desc: "3s rapid HD video generation", resolution: "720p", icon: Zap },
                { name: "Luma Dream Machine", desc: "5s of cinematic 3D video", resolution: "1080p", icon: Play }
              ].map((model, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:red-glow"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <model.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">{model.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{model.desc}</p>
                  <Badge variant="outline" className="text-xs">{model.resolution}</Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Thumbnail Generation Models */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Image className="w-8 h-8 text-primary" />
              Thumbnail Generation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Midjourney V6", desc: "Industry-leading photorealistic images", resolution: "8K", icon: Star },
                { name: "DALL-E 3", desc: "Precise prompt following with text", resolution: "1024x1792", icon: Sparkles },
                { name: "Stable Diffusion XL", desc: "Open-source with fine control", resolution: "1024x1024", icon: Wand2 },
                { name: "Leonardo.AI", desc: "Optimized for YouTube thumbnails", resolution: "1920x1080", icon: Image }
              ].map((model, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:red-glow"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <model.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">{model.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{model.desc}</p>
                  <Badge variant="outline" className="text-xs">{model.resolution}</Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Voice Generation Models */}
          <div>
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Mic className="w-8 h-8 text-primary" />
              Voice Generation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "ElevenLabs Turbo V2", desc: "Ultra-realistic voice in 29 languages", features: "Voice Cloning", icon: Mic },
                { name: "PlayHT 3.0", desc: "Conversational AI with emotion", features: "Multi-lingual", icon: Wand2 },
                { name: "OpenAI TTS HD", desc: "High-quality natural voices", features: "6 Premium Voices", icon: Sparkles },
                { name: "Murf AI Studio", desc: "Professional voiceovers with control", features: "120+ Voices", icon: Mic }
              ].map((model, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:red-glow"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <model.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">{model.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{model.desc}</p>
                  <Badge variant="outline" className="text-xs">{model.features}</Badge>
                </motion.div>
              ))}
            </div>
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
              Access 16+ premium AI models to create professional content
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


      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for you. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                features: [
                  "100 video generations/month",
                  "AI script generation",
                  "Trending niche analysis",
                  "HD video exports",
                  "Basic voiceover",
                  "Email support"
                ],
                cta: "Start Free Trial",
                popular: false
              },
              {
                name: "Pro",
                price: "$79",
                period: "/month",
                features: [
                  "500 video generations/month",
                  "Advanced AI models (Sora, Runway)",
                  "Premium voiceovers (ElevenLabs)",
                  "4K video exports",
                  "Priority rendering",
                  "24/7 support",
                  "Custom branding",
                  "API access"
                ],
                cta: "Start Free Trial",
                popular: true
              },
              {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                features: [
                  "Unlimited generations",
                  "All AI models",
                  "White-label solution",
                  "Dedicated account manager",
                  "Custom integrations",
                  "Team collaboration",
                  "Advanced analytics",
                  "SLA guarantee"
                ],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-primary red-glow' : ''
                } relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth">
                  <Button
                    className={`w-full ${plan.popular ? 'red-glow-strong' : ''}`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Neura AI
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the AI video generation work?",
                a: "Neura AI uses state-of-the-art models like OpenAI's Sora and Runway Gen-3 to create stunning videos from text prompts. Our AI analyzes your niche, generates engaging scripts, and produces professional videos in minutes."
              },
              {
                q: "What AI models are supported?",
                a: "We support multiple cutting-edge AI models including Sora (OpenAI), Runway Gen-3, Pika Labs, and Stable Diffusion Video. Choose the model that best fits your content style and requirements."
              },
              {
                q: "How accurate is the trending niche analysis?",
                a: "Our system uses the official YouTube Data API to fetch real-time trending data. We analyze millions of videos daily, calculating trend scores based on views, engagement, and growth velocity to identify opportunities before they peak."
              },
              {
                q: "Can I use the videos commercially?",
                a: "Yes! All videos generated with Neura AI are yours to use commercially. You retain full ownership and can monetize them on any platform including YouTube, TikTok, Instagram, and more."
              },
              {
                q: "What's included in the free trial?",
                a: "The free trial includes 10 video generations, access to all AI models, trending niche analysis, and basic support. No credit card required to start."
              },
              {
                q: "How long does video generation take?",
                a: "Most videos are generated in 2-5 minutes depending on length and complexity. Enterprise users get priority rendering with sub-2-minute generation times."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 hover:glass-strong transition-all duration-300"
              >
                <h4 className="font-bold text-lg mb-3">{faq.q}</h4>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 glass-light mt-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                Neura AI
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The ultimate AI-powered platform for discovering trending niches and creating viral videos. Join thousands of creators generating millions of views.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:red-glow transition-all">
                  <span className="text-lg">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:red-glow transition-all">
                  <span className="text-lg">in</span>
                </a>
                <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:red-glow transition-all">
                  <span className="text-lg">▶</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Neura AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
