import { Button } from "@/components/ui/button";
import { Check, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const CREDIT_PACKAGES = [
  {
    id: "starter_pack",
    name: "Starter Pack",
    credits: 500,
    price: 9.99,
    description: "Quick top-up for small projects",
    features: [
      "500 AI Credits",
      "Never Expire",
      "Use on Thumbnails & Video"
    ],
    popular: false,
  },
  {
    id: "creator_pack",
    name: "Creator Pack",
    credits: 1500,
    price: 24.99,
    description: "Best value for active creators",
    features: [
      "1,500 AI Credits",
      "Never Expire",
      "Priority Processing"
    ],
    popular: true,
  },
  {
    id: "studio_pack",
    name: "Studio Pack",
    credits: 5000,
    price: 79.99,
    description: "For high volume production",
    features: [
      "5,000 AI Credits",
      "Never Expire",
      "Highest Priority"
    ],
    popular: false,
  },
  {
    id: "enterprise_pack",
    name: "Enterprise Pack",
    credits: 15000,
    price: 199.99,
    description: "Maximum scale and power",
    features: [
      "15,000 AI Credits",
      "Never Expire",
      "Dedicated Support"
    ],
    popular: false,
  },
];

interface CreditBundlesProps {
  onSelectPackage: (packageId: string) => void;
  isLoading?: boolean;
}

export function CreditBundles({ onSelectPackage, isLoading }: CreditBundlesProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {CREDIT_PACKAGES.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative rounded-xl p-6 border flex flex-col transition-all cursor-pointer ${
            pkg.popular 
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
              : "border-border bg-card/50 hover:border-primary/50"
          }`}
          onClick={() => onSelectPackage(pkg.id)}
        >
          {pkg.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-3">Best Value</Badge>
            </div>
          )}

          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-3xl font-bold">${pkg.price}</span>
            </div>
            <div className="text-sm text-primary font-medium mb-2">
              {pkg.credits.toLocaleString()} Credits
            </div>
            <p className="text-muted-foreground text-xs">{pkg.description}</p>
          </div>

          <div className="space-y-2 mb-6 flex-grow">
            {pkg.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <Button 
            className="w-full"
            variant={pkg.popular ? "default" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              onSelectPackage(pkg.id);
            }}
            disabled={isLoading}
          >
            <Coins className="w-4 h-4 mr-2" />
            Buy Credits
          </Button>
        </motion.div>
      ))}
    </div>
  );
}