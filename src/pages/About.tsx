import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Target,
  Users,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Heart,
  Award,
  Rocket
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

function ValueCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-8 group hover:scale-105 transition-all duration-300">
      <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function TeamMember({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-red-500 flex items-center justify-center text-3xl font-bold">
        {name.charAt(0)}
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-primary mb-2">{role}</p>
      <p className="text-xs text-muted-foreground">AI Video Innovation Expert</p>
    </motion.div>
  );
}

function Statistic({ value, label }: { value: string; label: string }) {
  return (
    <motion.div variants={fadeInUp} className="text-center">
      <div className="text-5xl font-bold text-primary mb-2">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 glass-light rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">About Neura AI</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Revolutionizing Video
              <br />
              <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent animate-gradient">
                Creation with AI
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Neura AI is the world's most advanced AI-powered video creation platform, designed to empower creators,
              marketers, and businesses to produce viral content in seconds.
            </motion.p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            <Statistic value="50K+" label="Active Creators" />
            <Statistic value="2M+" label="Videos Generated" />
            <Statistic value="16+" label="AI Models" />
            <Statistic value="99.9%" label="Uptime" />
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">Our Mission</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Democratizing Video
                <br />
                <span className="text-primary">Creation for Everyone</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that everyone deserves access to cutting-edge AI technology to bring their creative visions to life.
                Our mission is to eliminate the barriers between imagination and execution.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With Neura AI, you don't need expensive equipment, years of training, or a production team.
                Just your ideas and our AI-powered platform.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Innovation First</h4>
                    <p className="text-sm text-muted-foreground">We integrate the latest AI models like Sora, Claude, and GPT-4o to deliver unmatched results.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Lightning Fast</h4>
                    <p className="text-sm text-muted-foreground">Generate professional videos in under 5 seconds, not hours or days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Privacy Focused</h4>
                    <p className="text-sm text-muted-foreground">Your data and content are secure with enterprise-grade encryption.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">Our Values</Badge>
              <h2 className="text-4xl font-bold mb-4">
                What Drives Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision we make
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            <ValueCard
              icon={Heart}
              title="User-Centric"
              description="Every feature we build starts with understanding our users' needs and pain points. Your success is our success."
            />
            <ValueCard
              icon={Rocket}
              title="Innovation"
              description="We stay at the forefront of AI technology, constantly integrating the latest models and techniques."
            />
            <ValueCard
              icon={Award}
              title="Excellence"
              description="We don't compromise on quality. Every video, thumbnail, and voiceover meets professional standards."
            />
            <ValueCard
              icon={Globe}
              title="Accessibility"
              description="AI-powered creativity should be available to everyone, everywhere, at an affordable price."
            />
            <ValueCard
              icon={Users}
              title="Community"
              description="We're building more than a platform—we're cultivating a community of creators who inspire each other."
            />
            <ValueCard
              icon={TrendingUp}
              title="Growth"
              description="We're committed to continuous improvement, learning from feedback, and evolving with our users."
            />
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Meet the Innovators
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experts in AI, video production, and creative technology
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-4 gap-8"
          >
            <TeamMember name="Alex Chen" role="CEO & Founder" image="" />
            <TeamMember name="Sarah Mitchell" role="CTO" image="" />
            <TeamMember name="Marcus Rodriguez" role="Head of AI" image="" />
            <TeamMember name="Emily Zhang" role="Creative Director" image="" />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
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
            <h2 className="text-4xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using Neura AI to produce viral content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold red-glow hover:red-glow-strong transition-all"
                >
                  Start Creating Now
                </motion.button>
              </a>
              <a href="/contact" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass rounded-xl font-bold hover:glass-strong transition-all"
                >
                  Contact Sales
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
