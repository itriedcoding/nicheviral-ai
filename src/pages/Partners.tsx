import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, ArrowRight } from "lucide-react";

export default function Partners() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Partnerships
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Grow With <span className="text-primary">NicheViral AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our ecosystem of technology partners, agencies, and affiliates. Together, we're shaping the future of content creation.
            </p>
          </motion.div>

          {/* Partner Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-10 rounded-3xl"
            >
              <h3 className="text-2xl font-bold mb-4">Technology Partners</h3>
              <p className="text-muted-foreground mb-8">
                We integrate with leading AI models and platforms. If you have an API or tool that can enhance our video generation pipeline, let's connect.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {["OpenAI", "Anthropic", "Stability AI", "ElevenLabs", "Runway"].map((partner) => (
                  <Badge key={partner} variant="secondary" className="text-sm py-1 px-3">
                    {partner}
                  </Badge>
                ))}
              </div>
              <Button className="w-full">Become a Tech Partner</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-10 rounded-3xl"
            >
              <h3 className="text-2xl font-bold mb-4">Agency Partners</h3>
              <p className="text-muted-foreground mb-8">
                Agencies use NicheViral AI to scale content production for clients. Get access to bulk pricing, white-label options, and dedicated support.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Volume discounts up to 40%
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Priority rendering queue
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  API access for custom workflows
                </li>
              </ul>
              <Button variant="outline" className="w-full">Apply for Agency Program</Button>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
          >
            <Handshake className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We're always looking for innovative ways to collaborate. Reach out to our partnerships team to discuss opportunities.
            </p>
            <Button size="lg" className="rounded-xl px-8">
              Contact Partnerships <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}