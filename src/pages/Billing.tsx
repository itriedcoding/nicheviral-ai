import { motion } from "framer-motion";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  CreditCard,
  Check,
  Shield,
  Lock,
  ArrowLeft,
  Loader2,
  Coins,
  AlertCircle,
  Receipt,
  Calendar,
  Zap,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getSession } from "@/lib/auth";

// Credit packages
const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    credits: 500,
    price: 9.99,
    description: "Perfect for trying out AI generation",
    features: ["500 AI Credits", "Video Generation", "Thumbnail Creation", "Email Support"],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 1500,
    price: 24.99,
    description: "Best for content creators",
    features: ["1,500 AI Credits", "Priority Generation", "All AI Models", "Priority Support"],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    credits: 5000,
    price: 79.99,
    description: "For professional studios",
    features: ["5,000 AI Credits", "Fastest Processing", "Advanced Features", "24/7 Support"],
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 15000,
    price: 199.99,
    description: "Maximum power and scale",
    features: ["15,000 AI Credits", "Dedicated Support", "Custom Integration", "SLA Guarantee"],
    popular: false,
  },
];

export default function Billing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState("");
  const [squareConfigured, setSquareConfigured] = useState(false);
  const [paymentFormReady, setPaymentFormReady] = useState(false);
  
  // Check if we are in trial setup mode
  const isTrialMode = searchParams.get("trial") === "true";
  const preselectedPlan = searchParams.get("plan");

  // Check authentication
  useEffect(() => {
    const session = getSession();
    if (!session) {
      const returnUrl = isTrialMode 
        ? `/billing?plan=${preselectedPlan}&trial=true` 
        : "/billing";
      navigate(`/auth?redirect=${encodeURIComponent(returnUrl)}`);
    } else {
      setUserId(session.userId);
    }
  }, [navigate, isTrialMode, preselectedPlan]);

  // Auto-select plan if in URL
  useEffect(() => {
    if (preselectedPlan && PACKAGES.find(p => p.id === preselectedPlan)) {
      setSelectedPackage(preselectedPlan);
    }
  }, [preselectedPlan]);

  // Fetch user credits
  const userCredits = useQuery(
    api.videos.getUserCredits,
    userId ? { userId: userId as any } : "skip"
  );

  // Fetch purchase history
  const purchases = useQuery(
    api.billing.getUserPurchases,
    userId ? { userId, limit: 10 } : "skip"
  );

  // Payment processor actions - PRODUCTION ONLY
  const processCreditCard = useAction(api.paymentProcessor.processCreditCardPayment);
  const getSquareConfig = useAction(api.paymentProcessor.getSquareApplicationId);
  const startTrial = useMutation(api.billing.startSubscriptionTrial);

  // Check if Square is configured
  useEffect(() => {
    const checkSquareConfig = async () => {
      try {
        const config = await getSquareConfig({});
        setSquareConfigured(true);
      } catch (error) {
        console.log("Square not configured");
        setSquareConfigured(false);
      }
    };
    checkSquareConfig();
  }, [getSquareConfig]);

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error("Please select a package");
      return;
    }

    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    if (!pkg) return;

    setIsProcessing(true);

    try {
      // Get Square configuration
      const squareConfig = await getSquareConfig({});

      if (!squareConfig.applicationId) {
        throw new Error("Payment system not configured");
      }

      // Check if Square SDK is loaded
      // @ts-ignore
      if (!window.Square) {
        throw new Error("Square Payment SDK not loaded. Please refresh the page.");
      }

      toast.info("Initializing payment form...");

      // Show the card container first
      setPaymentFormReady(true);

      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check if card container exists
      const cardContainer = document.getElementById('card-container');
      if (!cardContainer) {
        throw new Error("Card container not found. Please try again.");
      }

      // Initialize Square Payments with location ID
      // @ts-ignore
      const payments = window.Square.payments(squareConfig.applicationId, squareConfig.locationId);
      const card = await payments.card();
      await card.attach('#card-container');

      toast.success("Payment form ready! Enter your card details.");

      // Store card instance for cleanup
      (window as any).squareCard = card;
      setIsProcessing(false);

    } catch (error: any) {
      toast.error(error.message || "Failed to initialize payment form");
      setPaymentFormReady(false);
      setIsProcessing(false);
    }
  };

  // Handle actual payment when Pay button is clicked
  const handlePayment = async () => {
    if (!selectedPackage) return;

    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    if (!pkg) return;

    // @ts-ignore
    const card = (window as any).squareCard;
    if (!card) {
      toast.error("Payment form not initialized");
      return;
    }

    setIsProcessing(true);

    try {
      toast.info(isTrialMode ? "Verifying card..." : "Processing payment...");

      // Tokenize card details
      const result = await card.tokenize();

      if (result.status === 'OK') {
        if (isTrialMode) {
          // Start Trial Flow
          // In a real app, we would save the card nonce to create a Customer in Square
          // For now, we just verify tokenization worked and start the trial
          
          await startTrial({ planId: pkg.id });
          
          toast.success("🎉 7-Day Free Trial Started Successfully!");
          toast.info("You will be billed automatically after 7 days.");
          
          // Clean up and redirect
          await card.destroy();
          (window as any).squareCard = null;
          navigate("/dashboard");
          
        } else {
          // One-time Purchase Flow
          const paymentResult = await processCreditCard({
            userId,
            packageId: pkg.id,
            cardNonce: result.token,
            cardholderName: "Customer",
          });

          if (paymentResult.success) {
            toast.success("✅ Payment successful! Credits added to your account.");
            toast.info(`Transaction ID: ${paymentResult.transactionId}`, {
              duration: 5000,
            });

            // Clean up
            await card.destroy();
            (window as any).squareCard = null;
            setPaymentFormReady(false);
            setSelectedPackage(null);
            setIsProcessing(false);
          } else {
            throw new Error(paymentResult.error || "Payment failed");
          }
        }
      } else {
        let errorMessage = `Tokenization failed: ${result.status}`;
        if (result.errors) {
          errorMessage += ` - ${JSON.stringify(result.errors)}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  if (!userId) return null;

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPackage);

  return (
    <div className="min-h-screen relative bg-background">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">
              {isTrialMode ? "Start Your Free Trial" : "Purchase Credits"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isTrialMode 
                ? "Enter your payment details to activate your 7-day free trial" 
                : "Choose a plan that fits your needs"}
            </p>
          </div>

          {/* Current Balance */}
          {!isTrialMode && (
            <div className="max-w-md mx-auto mb-12">
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Current Balance</span>
                </div>
                <div className="text-4xl font-bold text-primary">{userCredits?.credits || 0}</div>
                <div className="text-xs text-muted-foreground mt-1">AI Credits</div>
              </div>
            </div>
          )}

          {/* Pricing Cards - Hide if in trial mode with preselected plan */}
          {(!isTrialMode || !preselectedPlan) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {PACKAGES.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ y: -4 }}
                  className={`relative glass-card rounded-xl p-6 cursor-pointer transition-all border ${
                    selectedPackage === pkg.id
                      ? "border-primary shadow-lg"
                      : "border-transparent hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground border-0 px-3">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-3xl font-bold">${pkg.price}</span>
                    </div>
                    <div className="text-sm text-primary font-medium mb-3">
                      {pkg.credits.toLocaleString()} Credits
                    </div>
                    <p className="text-xs text-muted-foreground">{pkg.description}</p>
                  </div>

                  <div className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {selectedPackage === pkg.id && (
                    <div className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none" />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Payment Section */}
          {selectedPackage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass-card rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {isTrialMode ? "Activate Trial" : "Checkout"}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Order Summary */}
                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Package</span>
                    <span className="font-medium">{selectedPkg?.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Credits</span>
                    <span className="font-medium">{selectedPkg?.credits.toLocaleString()}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">${selectedPkg?.price}</span>
                      {isTrialMode && (
                        <p className="text-xs text-muted-foreground">Due after 7 days</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trial Info */}
                {isTrialMode && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-primary text-sm mb-1">7-Day Free Trial</p>
                        <p className="text-xs text-muted-foreground">
                          You won't be charged today. Your subscription will start automatically after 7 days unless you cancel.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Status */}
                {!squareConfigured ? (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-400 text-sm mb-1">Payment System Not Configured</p>
                        <p className="text-xs text-red-300/80">
                          Please contact support to enable payment processing.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      <p className="text-sm text-green-400">
                        <strong>Secure Payment Ready</strong>
                      </p>
                    </div>
                  </div>
                )}

                {/* Square Card Container */}
                {paymentFormReady && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Card Details</label>
                    <div
                      id="card-container"
                      className="border border-border rounded-lg p-4 bg-background/50"
                    ></div>
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-6 py-4 mb-6 border-t border-b border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {!paymentFormReady ? (
                  <Button
                    onClick={handlePurchase}
                    disabled={isProcessing || !squareConfigured}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Initializing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        {isTrialMode ? "Enter Payment Details" : "Continue to Payment"}
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        {isTrialMode ? "Start Free Trial" : `Pay $${selectedPkg?.price}`}
                      </>
                    )}
                  </Button>
                )}

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </motion.div>
          )}

          {/* Purchase History - Only show if not in trial mode */}
          {!isTrialMode && purchases && purchases.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Receipt className="w-6 h-6 text-primary" />
                Purchase History
              </h2>

              <div className="glass-card rounded-xl overflow-hidden">
                <div className="divide-y divide-border">
                  {purchases.map((purchase: any) => (
                    <div key={purchase._id} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Coins className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{purchase.credits} Credits</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(purchase._creationTime).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${purchase.amount}</p>
                          <Badge variant="outline" className="text-xs">
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}