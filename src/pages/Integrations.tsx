import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Video,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  Mail,
  Webhook,
  Code,
  Zap,
  Share2,
  Cloud,
  Database,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

function IntegrationCard({ icon: Icon, name, description, category, status }: { icon: any; name: string; description: string; category: string; status: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-6 group hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <Badge variant={status === "Live" ? "default" : "secondary"} className="text-xs">
          {status}
        </Badge>
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Badge variant="outline" className="text-xs">
        {category}
      </Badge>
    </motion.div>
  );
}

function CategorySection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}

export default function Integrations() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 glass-light rounded-full px-6 py-3 mb-8">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Integrations</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Connect With
              <br />
              <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent animate-gradient">
                Everything You Use
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Seamlessly integrate Neura AI with your favorite platforms, tools, and services.
              Export, automate, and streamline your content creation workflow.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Integrations</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">16+</div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">API</div>
              <div className="text-sm text-muted-foreground">Full Access</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="glass rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Integrations */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CategorySection
            title="Social Media Platforms"
            description="Share your content directly to your favorite social platforms with one click"
          >
            <IntegrationCard
              icon={Youtube}
              name="YouTube"
              description="Direct upload to YouTube with optimized titles, descriptions, and tags."
              category="Social Media"
              status="Live"
            />
            <IntegrationCard
              icon={Instagram}
              name="Instagram"
              description="Post Reels and Stories automatically with perfect formatting."
              category="Social Media"
              status="Live"
            />
            <IntegrationCard
              icon={Video}
              name="TikTok"
              description="Upload viral videos to TikTok with trending hashtags and captions."
              category="Social Media"
              status="Live"
            />
            <IntegrationCard
              icon={Twitter}
              name="X (Twitter)"
              description="Share video clips and promotional content to your X feed."
              category="Social Media"
              status="Live"
            />
            <IntegrationCard
              icon={Facebook}
              name="Facebook"
              description="Post to Facebook Pages and Groups with scheduled publishing."
              category="Social Media"
              status="Live"
            />
            <IntegrationCard
              icon={Linkedin}
              name="LinkedIn"
              description="Share professional content to your LinkedIn network."
              category="Social Media"
              status="Live"
            />
          </CategorySection>

          {/* AI Models */}
          <CategorySection
            title="AI Models & Services"
            description="Powered by the world's most advanced AI technologies"
          >
            <IntegrationCard
              icon={Sparkles}
              name="OpenAI (Sora, GPT-4o)"
              description="State-of-the-art video and text generation with GPT-4o and Sora."
              category="AI Models"
              status="Live"
            />
            <IntegrationCard
              icon={Sparkles}
              name="Anthropic (Claude)"
              description="Advanced language understanding with Claude 3.5 Sonnet."
              category="AI Models"
              status="Live"
            />
            <IntegrationCard
              icon={Sparkles}
              name="ElevenLabs"
              description="Ultra-realistic voice generation in 100+ languages."
              category="AI Models"
              status="Live"
            />
            <IntegrationCard
              icon={Sparkles}
              name="Google (Gemini)"
              description="Multimodal AI capabilities with Gemini Pro."
              category="AI Models"
              status="Live"
            />
            <IntegrationCard
              icon={Sparkles}
              name="Stability AI"
              description="High-quality image generation with Stable Diffusion."
              category="AI Models"
              status="Live"
            />
            <IntegrationCard
              icon={Sparkles}
              name="Midjourney"
              description="Artistic image generation for stunning thumbnails."
              category="AI Models"
              status="Live"
            />
          </CategorySection>

          {/* Automation Tools */}
          <CategorySection
            title="Automation & Workflow"
            description="Automate your content pipeline with powerful integrations"
          >
            <IntegrationCard
              icon={Zap}
              name="Zapier"
              description="Connect Neura AI with 5,000+ apps for custom workflows."
              category="Automation"
              status="Live"
            />
            <IntegrationCard
              icon={Share2}
              name="Make (Integromat)"
              description="Build complex automation scenarios with visual workflows."
              category="Automation"
              status="Live"
            />
            <IntegrationCard
              icon={Webhook}
              name="Webhooks"
              description="Real-time notifications for generation completions and events."
              category="Automation"
              status="Live"
            />
            <IntegrationCard
              icon={Code}
              name="REST API"
              description="Full programmatic access to all Neura AI features."
              category="Developer"
              status="Live"
            />
            <IntegrationCard
              icon={Database}
              name="Airtable"
              description="Store and manage your content metadata in Airtable."
              category="Automation"
              status="Coming Soon"
            />
            <IntegrationCard
              icon={Mail}
              name="SendGrid"
              description="Email notifications for completed generations."
              category="Automation"
              status="Live"
            />
          </CategorySection>

          {/* Storage & Cloud */}
          <CategorySection
            title="Storage & Cloud Services"
            description="Seamlessly sync and backup your generated content"
          >
            <IntegrationCard
              icon={Cloud}
              name="Google Drive"
              description="Automatically save all generated content to Google Drive."
              category="Storage"
              status="Coming Soon"
            />
            <IntegrationCard
              icon={Cloud}
              name="Dropbox"
              description="Sync videos and assets to Dropbox for easy access."
              category="Storage"
              status="Coming Soon"
            />
            <IntegrationCard
              icon={Cloud}
              name="Amazon S3"
              description="Store high-resolution content in your own S3 buckets."
              category="Storage"
              status="Live"
            />
            <IntegrationCard
              icon={Cloud}
              name="Azure Blob"
              description="Enterprise-grade storage with Microsoft Azure."
              category="Storage"
              status="Live"
            />
            <IntegrationCard
              icon={Database}
              name="Notion"
              description="Organize your content pipeline in Notion databases."
              category="Productivity"
              status="Coming Soon"
            />
            <IntegrationCard
              icon={MessageSquare}
              name="Slack"
              description="Get notifications and updates in your Slack workspace."
              category="Communication"
              status="Live"
            />
          </CategorySection>
        </div>
      </section>

      {/* API Documentation CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Code className="w-12 h-12 text-primary mb-6" />
                <h2 className="text-4xl font-bold mb-4">Build Custom Integrations</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Access our full REST API to build custom workflows, automate content generation,
                  and integrate Neura AI into your existing applications.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Comprehensive API documentation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">SDKs for Python, JavaScript, and more</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Webhook support for real-time events</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Rate limits up to 1000 requests/min</span>
                  </div>
                </div>
                <Button size="lg" className="rounded-xl">
                  View API Documentation
                </Button>
              </div>

              <div className="glass rounded-xl p-6">
                <pre className="text-xs text-muted-foreground overflow-x-auto">
                  <code>{`// Generate a video with Neura AI API
import { NeuraAI } from '@neuraai/sdk';

const neura = new NeuraAI({
  apiKey: 'your_api_key'
});

const video = await neura.videos.create({
  prompt: 'A futuristic cityscape',
  model: 'sora',
  duration: 10,
  resolution: '1080p'
});

console.log(video.url);
// https://cdn.neuraai.cyou/video.mp4`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Request Integration */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 text-center"
          >
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold mb-4">Need a Custom Integration?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always adding new integrations. Let us know which platforms or tools you'd like to see next.
            </p>
            <Link to="/contact">
              <Button size="lg" className="px-8 py-6 text-lg rounded-xl red-glow hover:red-glow-strong">
                Request Integration
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
