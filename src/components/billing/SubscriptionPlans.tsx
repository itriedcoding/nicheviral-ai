import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const SUBSCRIPTION_PLANS = [
  {
    id: "starter",
    name: "Starter Plan",
    price: 9.99,
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
    price: 24.99,
    period: "/month",
    credits: 1500,
    description: "For creators ready to grow their channel.",
    features: [
      "1,500 AI Credits / month",
      "Access to All Models",
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
    price: 79.99,
    period: "/month",
    credits: 5000,
    description: "High volume generation for serious creators.",
    features: [
      "5,000 AI Credits / month",
      "Access to All Models + Beta",
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
    price: 199.99,
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

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void;
  currentPlanId?: string;
  isLoading?: boolean;
}

export function SubscriptionPlans({ onSelectPlan, currentPlanId, isLoading }: SubscriptionPlansProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SUBSCRIPTION_PLANS.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative rounded-xl p-6 border flex flex-col transition-all ${
            plan.popular 
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
              : "border-border bg-card/50 hover:border-primary/50"
          } ${currentPlanId === plan.id ? "ring-2 ring-primary" : ""}`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-3">Most Popular</Badge>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            <p className="text-muted-foreground text-xs">{plan.description}</p>
          </div>

          <div className="mb-6 p-3 bg-secondary/50 rounded-lg flex items-center justify-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm">{plan.credits.toLocaleString()} Credits</span>
          </div>

          <ul className="space-y-3 mb-6 flex-grow">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button 
            className={`w-full font-bold ${
              plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-foreground"
            }`}
            onClick={() => onSelectPlan(plan.id)}
            disabled={isLoading || currentPlanId === plan.id}
          >
            {currentPlanId === plan.id ? "Current Plan" : "Start 7-Day Free Trial"}
          </Button>
          <p className="text-[10px] text-center mt-2 text-muted-foreground">
            Then ${plan.price}/mo. Cancel anytime.
          </p>
        </motion.div>
      ))}
    </div>
  );
}
