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
  History,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getSession } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionPlans, SUBSCRIPTION_PLANS } from "@/components/billing/SubscriptionPlans";
import { CreditBundles, CREDIT_PACKAGES } from "@/components/billing/CreditBundles";

export default function Billing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [purchaseType, setPurchaseType] = useState<"subscription" | "credits">("subscription");
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState("");
  const [squareConfigured, setSquareConfigured] = useState(false);
  const [paymentFormReady, setPaymentFormReady] = useState(false);
  
  // Check if we are in trial setup mode from URL
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
    if (preselectedPlan) {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === preselectedPlan);
      if (plan) {
        setSelectedItem(plan);
        setPurchaseType("subscription");
      }
    }
  }, [preselectedPlan]);

  // Fetch user credits and subscription info
  const userCredits = useQuery(
    api.videos.getUserCredits,
    userId ? { userId: userId as any } : "skip"
  );

  // Fetch purchase history
  const purchases = useQuery(
    api.billing.getUserPurchases,
    userId ? { userId, limit: 10 } : "skip"
  );

  // Payment processor actions
  const processCreditCard = useAction(api.paymentProcessor.processCreditCardPayment);
  const getSquareConfig = useAction(api.paymentProcessor.getSquareApplicationId);
  const startTrial = useMutation(api.billing.startSubscriptionTrial);

  // Check if Square is configured
  useEffect(() => {
    const checkSquareConfig = async () => {
      try {
        const config = await getSquareConfig({});
        setSquareConfigured(!!config?.applicationId);
      } catch (error) {
        console.log("Square not configured");
        setSquareConfigured(false);
      }
    };
    checkSquareConfig();
  }, [getSquareConfig]);

  const handleSelectPlan = (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (plan) {
      setSelectedItem(plan);
      setPurchaseType("subscription");
      // Scroll to payment section
      setTimeout(() => {
        document.getElementById("payment-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSelectPackage = (packageId: string) => {
    const pkg = CREDIT_PACKAGES.find(p => p.id === packageId);
    if (pkg) {
      setSelectedItem(pkg);
      setPurchaseType("credits");
      // Scroll to payment section
      setTimeout(() => {
        document.getElementById("payment-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const initializePayment = async () => {
    if (!selectedItem) {
      toast.error("Please select a plan or package");
      return;
    }

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
    if (!selectedItem) return;

    // @ts-ignore
    const card = (window as any).squareCard;
    if (!card) {
      toast.error("Payment form not initialized");
      return;
    }

    setIsProcessing(true);

    try {
      toast.info(purchaseType === "subscription" ? "Verifying card for trial..." : "Processing payment...");

      // Tokenize card details
      const result = await card.tokenize();

      if (result.status === 'OK') {
        if (purchaseType === "subscription") {
          // Start Trial Flow
          await startTrial({ planId: selectedItem.id });
          
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
            packageId: selectedItem.id,
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
            setSelectedItem(null);
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
              Billing & Plans
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your subscription and credit balance
            </p>
          </div>

          {/* Current Balance & Status */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Available Credits</span>
              </div>
              <div className="text-4xl font-bold text-primary">{userCredits?.credits || 0}</div>
              <Button variant="link" className="text-xs mt-2" onClick={() => document.getElementById("plans-tabs")?.scrollIntoView({ behavior: "smooth" })}>
                Top up credits
              </Button>
            </div>

            <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Current Plan</span>
              </div>
              <div className="text-2xl font-bold capitalize">
                {userCredits?.subscriptionTier || "Free Plan"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Status: <span className="capitalize text-primary">{userCredits?.subscriptionStatus || "Active"}</span>
              </div>
              {userCredits?.trialEndsAt && (
                <Badge variant="secondary" className="mt-2">
                  Trial ends {new Date(userCredits.trialEndsAt).toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>

          {/* Plans & Packages Tabs */}
          <div id="plans-tabs" className="mb-12">
            <Tabs defaultValue={preselectedPlan ? "subscriptions" : "subscriptions"} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="subscriptions">Subscription Plans</TabsTrigger>
                  <TabsTrigger value="credits">Credit Packs</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="subscriptions">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Upgrade your Workspace</h2>
                  <p className="text-muted-foreground">Start with a 7-day free trial. Cancel anytime.</p>
                </div>
                <SubscriptionPlans 
                  onSelectPlan={handleSelectPlan} 
                  currentPlanId={userCredits?.subscriptionTier}
                  isLoading={isProcessing}
                />
              </TabsContent>

              <TabsContent value="credits">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Pay-as-you-go Credits</h2>
                  <p className="text-muted-foreground">One-time purchase. Credits never expire.</p>
                </div>
                <CreditBundles 
                  onSelectPackage={handleSelectPackage}
                  isLoading={isProcessing}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Payment Section */}
          {selectedItem && (
            <motion.div
              id="payment-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="glass-card rounded-xl p-8 border-2 border-primary/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {purchaseType === "subscription" ? "Start Free Trial" : "Complete Purchase"}
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
                    <span className="text-sm text-muted-foreground">Item</span>
                    <span className="font-medium">{selectedItem.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Credits</span>
                    <span className="font-medium">{selectedItem.credits.toLocaleString()}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">${selectedItem.price}</span>
                      {purchaseType === "subscription" && (
                        <p className="text-xs text-muted-foreground">Billed after 7 days</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trial Info */}
                {purchaseType === "subscription" && (
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

                {/* Action Buttons */}
                {!paymentFormReady ? (
                  <Button
                    onClick={initializePayment}
                    disabled={isProcessing || !squareConfigured}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Initializing...</>
                    ) : (
                      <><CreditCard className="w-5 h-5 mr-2" /> Enter Payment Details</>
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
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                    ) : (
                      <><Lock className="w-5 h-5 mr-2" /> {purchaseType === "subscription" ? "Start Free Trial" : `Pay $${selectedItem.price}`}</>
                    )}
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-4"
                  onClick={() => {
                    setSelectedItem(null);
                    setPaymentFormReady(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* Purchase History */}
          {purchases && purchases.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <History className="w-6 h-6 text-primary" />
                Transaction History
              </h2>

              <div className="glass-card rounded-xl overflow-hidden">
                <div className="divide-y divide-border">
                  {purchases.map((purchase: any) => (
                    <div key={purchase._id} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Receipt className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium capitalize">{purchase.packageId.replace(/_/g, " ")}</p>
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