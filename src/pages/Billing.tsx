import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardName, setCardName] = useState("");

  // Bank transfer fields
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");

  // Crypto fields
  const [walletAddress, setWalletAddress] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("BTC");

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

  // Mutations
  const createPurchase = useMutation(api.billing.createPurchase);
  const completePurchase = useMutation(api.billing.completePurchase);

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error("Please select a package");
      return;
    }

    // Validate based on payment method
    if (paymentMethod === "credit_card") {
      if (!cardNumber || !cvv || !expiry || !cardName) {
        toast.error("Please fill in all credit card details");
        return;
      }
    } else if (paymentMethod === "bank_transfer") {
      if (!accountNumber || !routingNumber) {
        toast.error("Please fill in all bank transfer details");
        return;
      }
    } else if (paymentMethod === "cryptocurrency") {
      if (!walletAddress || !cryptoCurrency) {
        toast.error("Please fill in all cryptocurrency details");
        return;
      }
    }

    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    if (!pkg) return;

    setIsProcessing(true);

    try {
      // Prepare payment details based on method
      const paymentDetails =
        paymentMethod === "credit_card"
          ? { cardNumber: cardNumber.slice(-4), cardName, expiry }
          : paymentMethod === "bank_transfer"
          ? { accountNumber: accountNumber.slice(-4), routingNumber }
          : { walletAddress: walletAddress.slice(0, 10) + "...", cryptoCurrency };

      // Step 1: Create purchase order
      const purchaseResult = await createPurchase({
        userId,
        packageId: pkg.id,
        amount: pkg.price,
        credits: pkg.credits,
        paymentMethod,
        paymentDetails,
      });

      if (!purchaseResult.success) {
        throw new Error("Failed to create purchase");
      }

      // Step 2: Simulate payment processing (1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 3: Complete purchase and add credits
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const completeResult = await completePurchase({
        purchaseId: purchaseResult.purchaseId,
        transactionId,
      });

      if (completeResult.success) {
        toast.success(`Successfully purchased ${pkg.credits} credits!`);

        // Reset form
        setSelectedPackage(null);
        setCardNumber("");
        setCvv("");
        setExpiry("");
        setCardName("");
        setAccountNumber("");
        setRoutingNumber("");
        setWalletAddress("");
      } else {
        throw new Error("Failed to complete purchase");
      }
    } catch (error: any) {
      toast.error(error.message || "Purchase failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
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

              <div className="space-y-4">
                {/* Payment Method Selector */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Payment Method
                  </Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong">
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Credit Card Fields */}
                {paymentMethod === "credit_card" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Cardholder Name
                      </Label>
                      <Input
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="glass"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Card Number
                      </Label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, "");
                          if (value.length <= 16 && /^\d*$/.test(value)) {
                            setCardNumber(formatCardNumber(value));
                          }
                        }}
                        maxLength={19}
                        className="glass"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Expiry Date
                        </Label>
                        <Input
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 4) {
                              setExpiry(formatExpiry(value));
                            }
                          }}
                          maxLength={5}
                          className="glass"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">CVV</Label>
                        <Input
                          placeholder="123"
                          type="password"
                          value={cvv}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 3 && /^\d*$/.test(value)) {
                              setCvv(value);
                            }
                          }}
                          maxLength={3}
                          className="glass"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Bank Transfer Fields */}
                {paymentMethod === "bank_transfer" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Account Number
                      </Label>
                      <Input
                        placeholder="Enter your account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="glass"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Routing Number
                      </Label>
                      <Input
                        placeholder="Enter your routing number"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        className="glass"
                      />
                    </div>

                    <div className="glass rounded-lg p-4 bg-blue-500/10 border border-blue-500/20">
                      <p className="text-sm text-blue-400">
                        <strong>Bank Transfer Instructions:</strong><br />
                        Your credits will be added within 1-2 business days after payment verification.
                      </p>
                    </div>
                  </>
                )}

                {/* Cryptocurrency Fields */}
                {paymentMethod === "cryptocurrency" && (
                  <>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Cryptocurrency
                      </Label>
                      <Select value={cryptoCurrency} onValueChange={setCryptoCurrency}>
                        <SelectTrigger className="glass">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-strong">
                          <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="USDT">Tether (USDT)</SelectItem>
                          <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Your Wallet Address
                      </Label>
                      <Input
                        placeholder="Enter your wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="glass"
                      />
                    </div>

                    <div className="glass rounded-lg p-4 bg-purple-500/10 border border-purple-500/20">
                      <p className="text-sm text-purple-400">
                        <strong>Crypto Payment Instructions:</strong><br />
                        Send payment to our wallet and your credits will be added automatically.
                      </p>
                    </div>
                  </>
                )}

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Instant Delivery</span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full red-glow"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Complete Purchase - ${PACKAGES.find((p) => p.id === selectedPackage)?.price}
                    </>
                  )}
                </Button>
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
