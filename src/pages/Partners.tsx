import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, Mail, Rocket } from "lucide-react";

export default function Partners() {
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
              <Handshake className="w-3 h-3 mr-1" />
              Partnership Program
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              Partner With Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore partnership opportunities with Neura AI
            </p>
          </motion.div>

          {/* Partnership Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-12 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">Partnership Opportunities</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We're interested in partnerships that help creators worldwide access powerful AI video creation tools. Whether you're a technology company, content platform, or creator-focused business, we'd love to explore collaboration opportunities.
            </p>
            <div className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h3 className="font-bold mb-2">Technology Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Integrate Neura AI capabilities into your platform via our API
                </p>
              </div>
              <div className="glass rounded-lg p-4">
                <h3 className="font-bold mb-2">Reseller Programs</h3>
                <p className="text-sm text-muted-foreground">
                  Offer Neura AI to your customers with white-label options
                </p>
              </div>
              <div className="glass rounded-lg p-4">
                <h3 className="font-bold mb-2">Strategic Collaborations</h3>
                <p className="text-sm text-muted-foreground">
                  Co-develop solutions and expand our reach together
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Interested in Partnering?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's explore how we can work together. Reach out to discuss partnership opportunities.
            </p>
            <a href="mailto:partners@neura-ai.com" className="inline-block">
              <Button className="red-glow" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Contact Partnership Team
              </Button>
            </a>
            <p className="text-sm text-muted-foreground mt-6">
              Email: <span className="text-primary">partners@neura-ai.com</span>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
