import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  Check,
  X,
  Zap,
  Sparkles,
  Crown,
  Building2,
  HelpCircle,
  ArrowRight,
  Video,
  Image,
  Mic,
  FileText,
} from "lucide-react";

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: 9.99,
    credits: 500,
    description: "Perfect for trying out AI generation",
    icon: Sparkles,
    features: [
      "500 Credits",
      "Video Generation",
      "Thumbnail Creation",
      "Script Writing",
      "Voiceover Generation",
      "Email Support",
      "Standard Processing Speed",
      "HD Quality (1080p)",
    ],
    limits: [
      "Up to 10 videos/month",
      "Basic AI models",
      "48h response time",
    ],
    popular: false,
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: "pro",
    name: "Pro",
    price: 24.99,
    credits: 1500,
    description: "Best for content creators",
    icon: Zap,
    features: [
      "1,500 Credits",
      "Priority Video Generation",
      "Advanced Thumbnail Creation",
      "AI Script Enhancement",
      "Premium Voice Models",
      "Priority Email Support",
      "Fast Processing Speed",
      "4K Quality",
      "Trending Niche Analysis",
      "Video Ideas Generator",
    ],
    limits: [
      "Up to 30 videos/month",
      "All AI models",
      "24h response time",
    ],
    popular: true,
    color: "from-primary/20 to-red-500/20",
  },
  {
    id: "business",
    name: "Business",
    price: 79.99,
    credits: 5000,
    description: "For professional studios",
    icon: Crown,
    features: [
      "5,000 Credits",
      "Fastest Processing",
      "Bulk Video Generation",
      "Custom Thumbnails",
      "Advanced Script Templates",
      "Multi-Language Voiceovers",
      "24/7 Priority Support",
      "8K Quality",
      "Team Collaboration",
      "API Access",
      "Custom Branding",
      "Analytics Dashboard",
    ],
    limits: [
      "Up to 100 videos/month",
      "Premium AI models",
      "2h response time",
    ],
    popular: false,
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199.99,
    credits: 15000,
    description: "Maximum power and scale",
    icon: Building2,
    features: [
      "15,000 Credits",
      "Unlimited Processing Power",
      "White-Label Solution",
      "Custom AI Training",
      "Dedicated Account Manager",
      "Custom Voice Cloning",
      "24/7 Phone & Email Support",
      "12K+ Quality",
      "Advanced Team Management",
      "Full API Access",
      "Custom Integration",
      "SLA Guarantee",
      "On-Premise Deployment",
      "Custom Features",
    ],
    limits: [
      "Unlimited videos",
      "All models + custom",
      "30min response time",
    ],
    popular: false,
    color: "from-amber-500/20 to-amber-600/20",
  },
];

const featureComparison = [
  {
    category: "Generation",
    features: [
      { name: "Video Generation", starter: true, pro: true, business: true, enterprise: true },
      { name: "Thumbnail Creation", starter: true, pro: true, business: true, enterprise: true },
      { name: "Script Writing", starter: true, pro: true, business: true, enterprise: true },
      { name: "Voiceover Generation", starter: true, pro: true, business: true, enterprise: true },
      { name: "Trending Analysis", starter: false, pro: true, business: true, enterprise: true },
      { name: "Bulk Generation", starter: false, pro: false, business: true, enterprise: true },
      { name: "Custom AI Training", starter: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    category: "Quality & Speed",
    features: [
      { name: "HD Quality (1080p)", starter: true, pro: true, business: true, enterprise: true },
      { name: "4K Quality", starter: false, pro: true, business: true, enterprise: true },
      { name: "8K Quality", starter: false, pro: false, business: true, enterprise: true },
      { name: "Standard Speed", starter: true, pro: false, business: false, enterprise: false },
      { name: "Fast Processing", starter: false, pro: true, business: false, enterprise: false },
      { name: "Priority Processing", starter: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    category: "Support & Features",
    features: [
      { name: "Email Support", starter: true, pro: true, business: true, enterprise: true },
      { name: "Priority Support", starter: false, pro: true, business: true, enterprise: true },
      { name: "24/7 Support", starter: false, pro: false, business: true, enterprise: true },
      { name: "Phone Support", starter: false, pro: false, business: false, enterprise: true },
      { name: "API Access", starter: false, pro: false, business: true, enterprise: true },
      { name: "Team Collaboration", starter: false, pro: false, business: true, enterprise: true },
      { name: "Custom Integration", starter: false, pro: false, business: false, enterprise: true },
    ],
  },
];

const creditExamples = [
  {
    icon: Video,
    name: "Video Generation",
    credits: "30-60 credits",
    description: "Based on length and model",
  },
  {
    icon: Image,
    name: "Thumbnail Creation",
    credits: "15-25 credits",
    description: "Based on resolution",
  },
  {
    icon: Mic,
    name: "Voiceover",
    credits: "8-12 credits",
    description: "Per minute of audio",
  },
  {
    icon: FileText,
    name: "Script Writing",
    credits: "5 credits",
    description: "Per script generation",
  },
];

const faqs = [
  {
    question: "How do credits work?",
    answer: "Credits are used for AI generation tasks. Different features consume different amounts of credits based on complexity and processing power required. You can see the exact credit cost before generating.",
  },
  {
    question: "Do credits expire?",
    answer: "No! Your credits never expire. Purchase once and use them whenever you need, at your own pace.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. When upgrading, you'll immediately get the additional credits. When downgrading, the change takes effect at your next billing cycle.",
  },
  {
    question: "What happens if I run out of credits?",
    answer: "You can purchase additional credit packages at any time. Your account remains active, and you can buy more credits whenever needed.",
  },
  {
    question: "Is there a free trial?",
    answer: "New users receive 100 free credits to try out our platform. No credit card required to start!",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cryptocurrency for Enterprise plans.",
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact support for a full refund.",
  },
  {
    question: "Do you offer discounts for annual plans?",
    answer: "Yes! Annual subscriptions receive a 20% discount. Contact our sales team for more information.",
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const handleGetStarted = (tierId: string) => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
            >
              <Zap className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your content creation needs. All plans include access to our powerful AI tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <Badge className="bg-primary text-primary-foreground border-primary/30 px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card className={`glass-card p-6 h-full flex flex-col ${tier.popular ? 'border-primary/50 shadow-lg shadow-primary/20' : ''}`}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                    <tier.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-primary font-medium mt-1">{tier.credits.toLocaleString()} Credits</p>
                  </div>

                  <Separator className="mb-6" />

                  <div className="space-y-3 flex-grow mb-6">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleGetStarted(tier.id)}
                    className={tier.popular ? "red-glow w-full" : "w-full glass"}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Usage Examples */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">How Credits Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Credits are consumed based on the AI features you use
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <example.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{example.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{example.credits}</p>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Compare Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Detailed comparison of features across all plans
            </p>
          </motion.div>

          <Card className="glass-card p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4 font-bold">Feature</th>
                    <th className="text-center py-4 px-4 font-bold">Starter</th>
                    <th className="text-center py-4 px-4 font-bold">Pro</th>
                    <th className="text-center py-4 px-4 font-bold">Business</th>
                    <th className="text-center py-4 px-4 font-bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`} className="border-b border-border/30">
                        <td colSpan={5} className="py-4 px-4">
                          <h3 className="font-bold text-primary">{category.category}</h3>
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b border-border/20">
                          <td className="py-3 px-4 text-sm">{feature.name}</td>
                          <td className="py-3 px-4 text-center">
                            {feature.starter ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {feature.pro ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {feature.business ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {feature.enterprise ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Pricing FAQs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Common questions about our pricing and credits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card p-6 h-full">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card p-12 text-center bg-gradient-to-br from-primary/10 via-red-500/10 to-primary/10">
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Ready to Start Creating?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators using Neura AI to generate viral content in seconds
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="red-glow" onClick={() => navigate("/auth")}>
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="glass" onClick={() => navigate("/contact")}>
                  Contact Sales
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
