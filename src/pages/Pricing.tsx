import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Pricing() {
  const plans = [
    {
      name: "Starter Pack",
      price: "$9.99",
      credits: 500,
      description: "Perfect for trying out AI video generation.",
      features: [
        "500 AI Credits",
        "Access to Standard Models",
        "720p Video Quality",
        "Basic Support",
        "Community Access"
      ],
      popular: false
    },
    {
      name: "Pro Pack",
      price: "$24.99",
      credits: 1500,
      description: "For creators ready to grow their channel.",
      features: [
        "1,500 AI Credits",
        "Access to All Models (Runway, Luma)",
        "1080p Video Quality",
        "Priority Generation Queue",
        "Niche Discovery Tool",
        "Commercial Rights"
      ],
      popular: true
    },
    {
      name: "Business Pack",
      price: "$79.99",
      credits: 5000,
      description: "High volume generation for serious creators.",
      features: [
        "5,000 AI Credits",
        "Access to All Models + Beta Features",
        "4K Video Upscaling",
        "Instant Generation Queue",
        "Advanced Analytics",
        "API Access",
        "Dedicated Support"
      ],
      popular: false
    },
    {
      name: "Enterprise Pack",
      price: "$199.99",
      credits: 15000,
      description: "Maximum power for agencies and studios.",
      features: [
        "15,000 AI Credits",
        "Custom Model Fine-tuning",
        "Unlimited Team Members",
        "White-label Options",
        "SLA & Account Manager",
        "Custom Integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Pay as you go with our credit packs. No monthly subscriptions required.
            Credits never expire.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border ${
                plan.popular 
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" 
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/ pack</span>
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-8 p-4 bg-secondary/50 rounded-lg flex items-center justify-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{plan.credits.toLocaleString()} Credits</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-12 rounded-xl ${
                  plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
                asChild
              >
                <Link to="/auth">Get Started</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}