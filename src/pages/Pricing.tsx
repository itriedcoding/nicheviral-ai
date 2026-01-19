import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const startTrial = useMutation(api.billing.startSubscriptionTrial);

  const handleStartTrial = async (planId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      await startTrial({ planId });
      toast.success("7-Day Free Trial Started!", {
        description: "You have full access for 7 days. You will be billed automatically after the trial ends."
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Failed to start trial", {
        description: error.message
      });
    }
  };

  const plans = [
    {
      id: "starter",
      name: "Starter Plan",
      price: "$9.99",
      period: "/month",
      credits: 500,
      description: "Perfect for trying out AI video generation.",
      features: [
        "500 AI Credits / month",
        "Access to Standard Models",
        "720p Video Quality",
        "Basic Support",
        "Community Access"
      ],
      popular: false
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "$24.99",
      period: "/month",
      credits: 1500,
      description: "For creators ready to grow their channel.",
      features: [
        "1,500 AI Credits / month",
        "Access to All Models (Runway, Luma)",
        "1080p Video Quality",
        "Priority Generation Queue",
        "Niche Discovery Tool",
        "Commercial Rights"
      ],
      popular: true
    },
    {
      id: "business",
      name: "Business Plan",
      price: "$79.99",
      period: "/month",
      credits: 5000,
      description: "High volume generation for serious creators.",
      features: [
        "5,000 AI Credits / month",
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
      id: "enterprise",
      name: "Enterprise Plan",
      price: "$199.99",
      period: "/month",
      credits: 15000,
      description: "Maximum power for agencies and studios.",
      features: [
        "15,000 AI Credits / month",
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
          <p className="text-xl text-muted-foreground mb-8">
            Start with a 7-day free trial. Cancel anytime.
            Choose the plan that fits your growth.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20">
            <Zap className="h-4 w-4 fill-current" />
            <span>7-Day Free Trial Included on All Plans • No Commitment • Cancel Anytime</span>
          </div>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border flex flex-col ${
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
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-8 p-4 bg-secondary/50 rounded-lg flex items-center justify-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{plan.credits.toLocaleString()} Credits</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-12 rounded-xl font-bold ${
                  plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
                onClick={() => handleStartTrial(plan.id)}
              >
                Start 7-Day Free Trial
              </Button>
              <p className="text-xs text-center mt-3 text-muted-foreground">
                {plan.price}/mo after trial. Cancel anytime.
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}