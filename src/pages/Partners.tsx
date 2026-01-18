import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, Zap, Users, Globe, Rocket, Check } from "lucide-react";

export default function Partners() {
  const benefits = [
    "Revenue share on referred customers",
    "Access to exclusive partner resources",
    "Co-marketing opportunities",
    "Priority technical support",
    "Early access to new features",
    "Dedicated partner success manager"
  ];

  const partnerTypes = [
    {
      icon: Users,
      title: "Reseller Partners",
      description: "Resell Neura AI to your customers with custom pricing and white-label options",
      perks: ["Up to 30% revenue share", "Custom pricing flexibility", "White-label solutions"]
    },
    {
      icon: Globe,
      title: "Agency Partners",
      description: "Build amazing content for clients using Neura AI's powerful platform",
      perks: ["Volume discounts", "Client management tools", "Priority support"]
    },
    {
      icon: Rocket,
      title: "Technology Partners",
      description: "Integrate Neura AI into your platform or workflow with our API",
      perks: ["API access", "Technical documentation", "Integration support"]
    }
  ];

  const partners = [
    { name: "TechCorp", logo: "https://via.placeholder.com/200x80/1a1a1a/ef4444?text=TechCorp" },
    { name: "Creative Studio", logo: "https://via.placeholder.com/200x80/1a1a1a/ef4444?text=Creative+Studio" },
    { name: "Media Agency", logo: "https://via.placeholder.com/200x80/1a1a1a/ef4444?text=Media+Agency" },
    { name: "Digital Solutions", logo: "https://via.placeholder.com/200x80/1a1a1a/ef4444?text=Digital+Solutions" },
    { name: "Innovation Labs", logo: "https://via.placeholder.com/200x80/1a1a1a/ef4444?text=Innovation+Labs" },
    { name: "Content Hub", logo: "https://via.placeholder.com/200x80/1a1a1a/ef4444?text=Content+Hub" }
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
              Join our growing network of partners and help creators worldwide unlock the power of AI
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "500+", label: "Active Partners" },
              { value: "$10M+", label: "Partner Revenue" },
              { value: "50K+", label: "Joint Customers" },
              { value: "95%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Partner Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Partnership Opportunities</h2>
              <p className="text-muted-foreground">Choose the partnership model that fits your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-8 hover:red-glow transition-all"
                >
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <type.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                  <p className="text-muted-foreground mb-6">{type.description}</p>
                  <div className="space-y-2">
                    {type.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-8 mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Partner Benefits</h2>
                <p className="text-muted-foreground">What you get as a Neura AI partner</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 glass rounded-lg p-4">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted By Leading Companies</h2>
              <p className="text-muted-foreground">Join these industry leaders in our partner ecosystem</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="glass-card rounded-xl p-8 flex items-center justify-center hover:scale-105 transition-all"
                >
                  <img src={partner.logo} alt={partner.name} className="w-full h-auto opacity-70 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's explore how we can grow together. Fill out our partner application and our team will be in touch.
            </p>
            <Button className="red-glow" size="lg">
              Apply to Become a Partner
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
