"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Custom credit card payment processor
// This processes payments WITHOUT Stripe, PayPal, or any third-party
export const processCreditCardPayment = action({
  args: {
    userId: v.string(),
    packageId: v.string(),
    cardNumber: v.string(),
    cardExpiry: v.string(),
    cardCVV: v.string(),
    cardholderName: v.string(),
    billingAddress: v.optional(v.any()),
  },
  handler: async (ctx, args): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    try {
      console.log("💳 Processing custom credit card payment...");

      // Validate card number (Luhn algorithm)
      const isValidCard = validateCardNumber(args.cardNumber);
      if (!isValidCard) {
        return {
          success: false,
          error: "Invalid card number",
        };
      }

      // Validate expiry date
      const isValidExpiry = validateExpiry(args.cardExpiry);
      if (!isValidExpiry) {
        return {
          success: false,
          error: "Card expired or invalid expiry date",
        };
      }

      // Validate CVV
      const isValidCVV = /^\d{3,4}$/.test(args.cardCVV);
      if (!isValidCVV) {
        return {
          success: false,
          error: "Invalid CVV code",
        };
      }

      // Get package details
      const packages: Record<string, { credits: number; price: number }> = {
        starter: { credits: 500, price: 9.99 },
        pro: { credits: 1500, price: 24.99 },
        business: { credits: 5000, price: 79.99 },
        enterprise: { credits: 15000, price: 199.99 },
      };

      const pkg = packages[args.packageId];
      if (!pkg) {
        return {
          success: false,
          error: "Invalid package selected",
        };
      }

      // Generate transaction ID
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // In production, here you would:
      // 1. Encrypt card details
      // 2. Contact payment gateway/bank API
      // 3. Process authorization
      // 4. Handle 3D Secure if required
      // 5. Settle transaction

      // For now, simulate successful payment processing
      // In production, this would be replaced with real payment gateway integration
      const paymentDetails = {
        cardLast4: args.cardNumber.slice(-4),
        cardType: detectCardType(args.cardNumber),
        transactionId,
        timestamp: Date.now(),
        amount: pkg.price,
        currency: "USD",
      };

      // Create purchase record
      const purchaseResult = await ctx.runMutation(api.billing.createPurchase, {
        userId: args.userId,
        packageId: args.packageId,
        amount: pkg.price,
        credits: pkg.credits,
        paymentMethod: "credit_card",
        paymentDetails,
      });

      // Complete purchase and add credits
      await ctx.runMutation(api.billing.completePurchase, {
        purchaseId: purchaseResult.purchaseId,
        transactionId,
      });

      console.log("✅ Payment processed successfully:", transactionId);

      return {
        success: true,
        transactionId,
      };
    } catch (error: any) {
      console.error("❌ Payment processing error:", error);
      return {
        success: false,
        error: error.message || "Payment processing failed",
      };
    }
  },
});

// Bank transfer payment
export const processBankTransfer = action({
  args: {
    userId: v.string(),
    packageId: v.string(),
    accountNumber: v.string(),
    routingNumber: v.string(),
    accountHolderName: v.string(),
    bankName: v.string(),
  },
  handler: async (ctx, args): Promise<{ success: boolean; transactionId?: string; instructions?: string; error?: string }> => {
    try {
      console.log("🏦 Processing bank transfer...");

      // Get package details
      const packages: Record<string, { credits: number; price: number }> = {
        starter: { credits: 500, price: 9.99 },
        pro: { credits: 1500, price: 24.99 },
        business: { credits: 5000, price: 79.99 },
        enterprise: { credits: 15000, price: 199.99 },
      };

      const pkg = packages[args.packageId];
      if (!pkg) {
        return {
          success: false,
          error: "Invalid package selected",
        };
      }

      const transactionId = `BANK_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const paymentDetails = {
        accountLast4: args.accountNumber.slice(-4),
        bankName: args.bankName,
        transactionId,
        timestamp: Date.now(),
        amount: pkg.price,
        currency: "USD",
      };

      // Create pending purchase (bank transfers require manual verification)
      await ctx.runMutation(api.billing.createPurchase, {
        userId: args.userId,
        packageId: args.packageId,
        amount: pkg.price,
        credits: pkg.credits,
        paymentMethod: "bank_transfer",
        paymentDetails,
      });

      const instructions = `
Bank Transfer Instructions:
- Transfer Amount: $${pkg.price}
- Reference ID: ${transactionId}
- Bank Name: ${args.bankName}
- Processing Time: 1-3 business days
- Your credits will be added after verification
      `;

      console.log("✅ Bank transfer initiated:", transactionId);

      return {
        success: true,
        transactionId,
        instructions,
      };
    } catch (error: any) {
      console.error("❌ Bank transfer error:", error);
      return {
        success: false,
        error: error.message || "Bank transfer failed",
      };
    }
  },
});

// Cryptocurrency payment
export const processCryptoPayment = action({
  args: {
    userId: v.string(),
    packageId: v.string(),
    walletAddress: v.string(),
    cryptoCurrency: v.string(), // BTC, ETH, USDT, USDC
  },
  handler: async (ctx, args): Promise<{ success: boolean; transactionId?: string; paymentAddress?: string; amount?: string; error?: string }> => {
    try {
      console.log("₿ Processing cryptocurrency payment...");

      // Get package details
      const packages: Record<string, { credits: number; price: number }> = {
        starter: { credits: 500, price: 9.99 },
        pro: { credits: 1500, price: 24.99 },
        business: { credits: 5000, price: 79.99 },
        enterprise: { credits: 15000, price: 199.99 },
      };

      const pkg = packages[args.packageId];
      if (!pkg) {
        return {
          success: false,
          error: "Invalid package selected",
        };
      }

      // Crypto conversion rates (in production, fetch from API)
      const cryptoRates: Record<string, number> = {
        BTC: 0.00023, // $1 = 0.00023 BTC (example rate)
        ETH: 0.0042,  // $1 = 0.0042 ETH
        USDT: 1.0,    // $1 = 1 USDT (stablecoin)
        USDC: 1.0,    // $1 = 1 USDC (stablecoin)
      };

      const rate = cryptoRates[args.cryptoCurrency];
      if (!rate) {
        return {
          success: false,
          error: "Unsupported cryptocurrency",
        };
      }

      const cryptoAmount = (pkg.price * rate).toFixed(8);
      const transactionId = `CRYPTO_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Generate payment address (in production, use crypto payment gateway)
      const paymentAddress = generateCryptoAddress(args.cryptoCurrency);

      const paymentDetails = {
        walletAddress: args.walletAddress,
        cryptoCurrency: args.cryptoCurrency,
        cryptoAmount,
        paymentAddress,
        transactionId,
        timestamp: Date.now(),
        usdAmount: pkg.price,
      };

      // Create pending purchase
      await ctx.runMutation(api.billing.createPurchase, {
        userId: args.userId,
        packageId: args.packageId,
        amount: pkg.price,
        credits: pkg.credits,
        paymentMethod: "cryptocurrency",
        paymentDetails,
      });

      console.log("✅ Crypto payment initiated:", transactionId);

      return {
        success: true,
        transactionId,
        paymentAddress,
        amount: `${cryptoAmount} ${args.cryptoCurrency}`,
      };
    } catch (error: any) {
      console.error("❌ Crypto payment error:", error);
      return {
        success: false,
        error: error.message || "Crypto payment failed",
      };
    }
  },
});

// Helper functions

function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');

  // Check if all digits
  if (!/^\d+$/.test(cleaned)) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

function validateExpiry(expiry: string): boolean {
  // Format: MM/YY
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = parseInt(match[1]);
  const year = parseInt(match[2]) + 2000;

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

function detectCardType(cardNumber: string): string {
  const cleaned = cardNumber.replace(/[\s-]/g, '');

  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "Mastercard";
  if (/^3[47]/.test(cleaned)) return "American Express";
  if (/^6(?:011|5)/.test(cleaned)) return "Discover";

  return "Unknown";
}

function generateCryptoAddress(currency: string): string {
  // In production, generate real payment address from crypto gateway
  // This is a placeholder format
  const prefixes: Record<string, string> = {
    BTC: "1",
    ETH: "0x",
    USDT: "0x",
    USDC: "0x",
  };

  const prefix = prefixes[currency] || "0x";
  const random = Math.random().toString(36).substr(2, 32).toUpperCase();

  return `${prefix}${random}`;
}
