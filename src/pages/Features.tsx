import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Video,
  Image,
  Mic,
  FileText,
  Zap,
  Brain,
  TrendingUp,
  Shield,
  Wand2,
  Film,
  Users,
  BarChart3,
  Download,
  CheckCircle2,
  Layers,
  Clock
} from "lucide-react";
import { Link } from "react-router";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

function FeatureCard({ icon: Icon, title, description, features }: { icon: any; title: string; description: string; features: string[] }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-8 group hover:scale-105 transition-all duration-300"
    >
      <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function BenefitCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div variants={fadeInUp} className="glass rounded-xl p-6">
      <Icon className="w-10 h-10 text-primary mb-4" />
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default function Features() {
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
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Powerful Features</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Everything You Need
              <br />
              <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent animate-gradient">
                To Create Viral Content
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Harness the power of 16+ cutting-edge AI models to generate videos, thumbnails, voiceovers,
              and scripts in seconds. No experience required.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Features</Badge>
            <h2 className="text-4xl font-bold mb-4">AI-Powered Content Creation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-quality content in seconds
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <FeatureCard
              icon={Video}
              title="AI Video Generation"
              description="Create stunning videos from text prompts using state-of-the-art AI models."
              features={[
                "Sora, Luma, Haiper, and more AI models",
                "Generate videos in under 5 seconds",
                "Full HD 1080p output quality",
                "Customizable duration (5-60 seconds)",
                "Multiple aspect ratios (16:9, 9:16, 1:1)",
                "Advanced prompt engineering",
              ]}
            />

            <FeatureCard
              icon={Image}
              title="Thumbnail Creation"
              description="Eye-catching thumbnails that boost click-through rates."
              features={[
                "DALL-E 3, Midjourney, and Stable Diffusion",
                "Click-worthy designs optimized for engagement",
                "Multiple styles and themes",
                "Instant generation in 3 seconds",
                "High-resolution outputs",
                "A/B testing variations",
              ]}
            />

            <FeatureCard
              icon={Mic}
              title="Voice Generation"
              description="Natural-sounding voiceovers in any language or accent."
              features={[
                "ElevenLabs, PlayHT, and more voice AI",
                "100+ voices and accents",
                "Emotion and tone control",
                "Multi-language support",
                "Voice cloning capabilities",
                "Professional audio quality",
              ]}
            />

            <FeatureCard
              icon={FileText}
              title="Script Writing"
              description="Engaging scripts tailored to your niche and audience."
              features={[
                "GPT-4o, Claude 3.5, and Gemini",
                "Viral hooks and storytelling",
                "SEO-optimized content",
                "Multiple tones and styles",
                "Instant generation in 2 seconds",
                "Customizable templates",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Advanced Features</Badge>
            <h2 className="text-4xl font-bold mb-4">Built for Professionals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade tools for serious creators
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            <BenefitCard
              icon={TrendingUp}
              title="Trending Niche Discovery"
              description="AI-powered insights to find viral niches before they saturate. Stay ahead of trends."
            />
            <BenefitCard
              icon={Brain}
              title="Smart AI Models"
              description="Access to 16+ cutting-edge AI models. Always using the best technology available."
            />
            <BenefitCard
              icon={Zap}
              title="Lightning Fast"
              description="Generate content in under 5 seconds. No more waiting hours for renders."
            />
            <BenefitCard
              icon={Layers}
              title="Batch Generation"
              description="Create multiple videos, thumbnails, or voiceovers simultaneously."
            />
            <BenefitCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Track your generations, credits usage, and content performance."
            />
            <BenefitCard
              icon={Download}
              title="Flexible Exports"
              description="Download in multiple formats: MP4, MOV, PNG, JPG, MP3, WAV."
            />
            <BenefitCard
              icon={Users}
              title="Team Collaboration"
              description="Share workspaces and collaborate with your team in real-time."
            />
            <BenefitCard
              icon={Shield}
              title="Enterprise Security"
              description="Bank-grade encryption, SOC 2 compliance, and GDPR ready."
            />
            <BenefitCard
              icon={Clock}
              title="24/7 Support"
              description="Expert support team available around the clock to help you succeed."
            />
          </motion.div>
        </div>
      </section>

      {/* Integration Highlights */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Seamless Integrations</Badge>
                <h2 className="text-4xl font-bold mb-6">
                  Works With Your
                  <br />
                  <span className="text-primary">Favorite Tools</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Integrate Neura AI with your existing workflow. Export to YouTube, TikTok, Instagram,
                  and more with one click.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Direct upload to social platforms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">API access for custom workflows</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Webhook notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Zapier and Make.com compatible</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/integrations">
                    <Button size="lg" className="rounded-xl">
                      View All Integrations
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">16+</div>
                  <div className="text-sm text-muted-foreground">AI Models</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Integrations</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{"<5s"}</div>
                  <div className="text-sm text-muted-foreground">Generation</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 text-center"
          >
            <Wand2 className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 50,000+ creators using Neura AI to produce viral content every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="px-8 py-6 text-lg rounded-xl red-glow hover:red-glow-strong">
                  Start Creating Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl glass hover:glass-strong">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
