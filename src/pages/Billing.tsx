import { motion } from "framer-motion";
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  CreditCard,
  Check,
  Zap,
  Shield,
  Clock,
  Receipt,
  ArrowLeft,
  Loader2,
  Coins,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
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
    features: ["500 Credits", "Video Generation", "Thumbnail Creation", "Email Support"],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 1500,
    price: 24.99,
    description: "Best for content creators",
    features: ["1,500 Credits", "Priority Generation", "All AI Models", "Priority Support"],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    credits: 5000,
    price: 79.99,
    description: "For professional studios",
    features: ["5,000 Credits", "Fastest Processing", "Advanced Features", "24/7 Support"],
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 15000,
    price: 199.99,
    description: "Maximum power and scale",
    features: ["15,000 Credits", "Dedicated Support", "Custom Integration", "SLA Guarantee"],
    popular: false,
  },
];

export default function Billing() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState("");
  const [squareConfigured, setSquareConfigured] = useState(false);
  const [paymentFormReady, setPaymentFormReady] = useState(false);

  // Check authentication
  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUserId(session.userId);
    }
  }, [navigate]);

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

      // Initialize Square Payments
      // @ts-ignore
      const payments = window.Square.payments(squareConfig.applicationId);
      const card = await payments.card();
      await card.attach('#card-container');

      toast.success("Payment form ready! Enter your card details and click Pay.");

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
      toast.info("Processing payment...");

      // Tokenize card details
      const result = await card.tokenize();

      if (result.status === 'OK') {
        // Process REAL payment with Square
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

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="glass"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
              Purchase Credits
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Power your AI creations with our flexible credit packages
            </p>

            {/* Current Credits Display */}
            <div className="inline-flex items-center gap-3 glass-card rounded-xl px-8 py-4">
              <Coins className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="text-3xl font-bold">{userCredits?.credits || 0}</div>
                <div className="text-sm text-muted-foreground">Current Credits</div>
              </div>
            </div>
          </div>

          {/* Credit Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PACKAGES.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                  selectedPackage === pkg.id
                    ? "ring-2 ring-primary shadow-xl shadow-primary/20"
                    : ""
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-red-500 border-0">
                      <Zap className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">${pkg.price}</span>
                  </div>
                  <div className="mt-2 text-primary font-semibold">
                    {pkg.credits} Credits
                  </div>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {selectedPackage === pkg.id && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary pointer-events-none" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Payment Form */}
          {selectedPackage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto glass-card rounded-2xl p-8 mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Payment Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your purchase securely
                  </p>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="space-y-6">
                {/* Square Payment Integration Notice */}
                {!squareConfigured ? (
                  <div className="glass rounded-lg p-6 bg-red-500/10 border border-red-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-400 mb-2">Payment System Not Configured</p>
                        <p className="text-sm text-red-300/80 mb-3">
                          To accept real credit card payments, you need to configure Square payment gateway in your environment variables.
                        </p>
                        <div className="text-xs space-y-1 text-red-300/60">
                          <p>Required environment variables:</p>
                          <ul className="list-disc list-inside ml-2">
                            <li>SQUARE_APPLICATION_ID</li>
                            <li>SQUARE_ACCESS_TOKEN</li>
                            <li>SQUARE_ENVIRONMENT (sandbox or production)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="glass rounded-lg p-6 bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      <p className="text-sm text-green-400">
                        <strong>Square Payment Gateway Configured</strong><br />
                        <span className="text-green-300/80">Ready to accept real credit card payments</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Production Payment Notice */}
                <div className="glass rounded-lg p-6 bg-primary/10 border border-primary/20">
                  <p className="text-sm text-primary mb-2">
                    <strong>Production Payment System</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click "Initialize Payment Form" to load the card form, then enter your details and click "Pay Now" to complete. All transactions are REAL and will charge your card.
                  </p>
                </div>

                {/* Square Card Container - PRODUCTION */}
                {paymentFormReady && (
                  <div
                    id="card-container"
                    className="glass rounded-lg p-4 min-h-[100px] border border-primary/20"
                  ></div>
                )}

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Instant Credits</span>
                  </div>
                </div>

                {/* Initialize Payment Form Button */}
                {!paymentFormReady && (
                  <Button
                    onClick={handlePurchase}
                    disabled={isProcessing || !squareConfigured}
                    className="w-full red-glow"
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
                        Initialize Payment Form - ${PACKAGES.find((p) => p.id === selectedPackage)?.price}
                      </>
                    )}
                  </Button>
                )}

                {/* Pay Now Button (shown after form is initialized) */}
                {paymentFormReady && (
                  <Button
                    id="card-button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full red-glow"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay Now - ${PACKAGES.find((p) => p.id === selectedPackage)?.price}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Purchase History */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Receipt className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Purchase History</h2>
            </div>

            <div className="glass-card rounded-2xl p-6">
              {!purchases ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : purchases.length === 0 ? (
                <div className="text-center py-12">
                  <Receipt className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">No Purchase History</h3>
                  <p className="text-muted-foreground">
                    Your purchase history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase: any) => {
                    const pkg = PACKAGES.find((p) => p.id === purchase.packageId);
                    return (
                      <div
                        key={purchase._id}
                        className="glass rounded-xl p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Coins className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {pkg?.name || purchase.packageId} - {purchase.credits} Credits
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(purchase._creationTime).toLocaleDateString()} at{" "}
                              {new Date(purchase._creationTime).toLocaleTimeString()}
                            </p>
                            {purchase.transactionId && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Transaction: {purchase.transactionId}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">${purchase.amount.toFixed(2)}</div>
                          <Badge
                            className={
                              purchase.status === "completed"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : purchase.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
