import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Zap, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Our Mission
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
              Democratizing High-End<br />Video Creation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              NicheViral AI was founded with a single belief: professional-grade video production shouldn't be limited to big studios. We're building the world's most advanced AI video platform to empower creators, marketers, and businesses to tell their stories.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {[
              { label: "Videos Generated", value: "1M+" },
              { label: "Active Creators", value: "50k+" },
              { label: "AI Models", value: "15+" },
              { label: "Countries", value: "120+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation First</h3>
              <p className="text-muted-foreground">
                We constantly push the boundaries of what's possible with Generative AI, integrating the latest models from OpenAI, Runway, and Stability AI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Creator Centric</h3>
              <p className="text-muted-foreground">
                Every feature we build is designed to solve real problems for content creators. We listen to our community and evolve with their needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Global Impact</h3>
              <p className="text-muted-foreground">
                We're breaking down language and technical barriers, allowing anyone, anywhere to create world-class video content.
              </p>
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-12">Meet the Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Alex Chen", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
                { name: "Sarah Miller", role: "Head of AI", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
                { name: "David Park", role: "CTO", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}