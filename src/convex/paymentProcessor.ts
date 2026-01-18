"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";

// REAL Credit Card Payment Processor using Square Payment Gateway
// This processes REAL payments through Square's Payment API
export const processCreditCardPayment = action({
  args: {
    userId: v.string(),
    packageId: v.string(),
    cardNonce: v.string(), // Square card nonce (tokenized card)
    cardholderName: v.string(),
    billingAddress: v.optional(v.any()),
  },
  handler: async (ctx, args): Promise<{ success: boolean; transactionId?: string; error?: string; purchaseId?: string }> => {
    try {
      console.log("💳 Processing REAL credit card payment via Square...");

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

      // Convert amount to cents for Square API
      const amountInCents = Math.round(pkg.price * 100);

      // Get Square API key from environment
      const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
      const squareEnvironment = process.env.SQUARE_ENVIRONMENT;

      if (!squareAccessToken) {
        console.error("❌ SQUARE_ACCESS_TOKEN not configured");
        return {
          success: false,
          error: "Payment system not configured. Please contact support.",
        };
      }

      // PRODUCTION ONLY - NO SANDBOX/TEST PAYMENTS ALLOWED
      if (squareEnvironment !== "production") {
        console.error("❌ Only production payments allowed");
        return {
          success: false,
          error: "Payment system must be in production mode. Contact support.",
        };
      }

      // Square API endpoint - PRODUCTION ONLY
      const squareApiUrl = "https://connect.squareup.com/v2/payments";

      // Generate idempotency key (prevents duplicate charges)
      const idempotencyKey = `${args.userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Make REAL payment request to Square
      const paymentRequest = {
        source_id: args.cardNonce,
        idempotency_key: idempotencyKey,
        amount_money: {
          amount: amountInCents,
          currency: "USD",
        },
        autocomplete: true,
        note: `Neura AI ${args.packageId} package - ${pkg.credits} credits`,
        buyer_email_address: undefined, // Optional: can add user email
      };

      console.log("🔄 Sending payment request to Square...");

      const response = await fetch(squareApiUrl, {
        method: "POST",
        headers: {
          "Square-Version": "2024-01-18",
          "Authorization": `Bearer ${squareAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      });

      const result = await response.json();

      // Check if payment was successful
      if (!response.ok || !result.payment) {
        console.error("❌ Square payment failed:", result);

        const errorMessage = result.errors?.[0]?.detail || result.errors?.[0]?.code || "Payment failed";

        return {
          success: false,
          error: errorMessage,
        };
      }

      // Payment was successful!
      const payment = result.payment;
      const transactionId = payment.id;

      console.log("✅ Payment successful! Transaction ID:", transactionId);

      // Create purchase record with COMPLETED status (payment already verified by Square)
      const purchaseResult = await ctx.runMutation(api.billing.createPurchase, {
        userId: args.userId,
        packageId: args.packageId,
        amount: pkg.price,
        credits: pkg.credits,
        paymentMethod: "credit_card",
        paymentDetails: {
          transactionId: transactionId,
          cardLast4: payment.card_details?.card?.last_4 || "****",
          cardBrand: payment.card_details?.card?.card_brand || "Unknown",
          timestamp: Date.now(),
          amount: pkg.price,
          currency: "USD",
          status: payment.status,
          receiptUrl: payment.receipt_url,
        },
      });

      // IMMEDIATELY add credits since payment was verified by Square
      await ctx.runMutation(internal.billing.addCreditsInternal, {
        userId: args.userId,
        credits: pkg.credits,
        purchaseId: purchaseResult.purchaseId,
      });

      console.log(`✅ Added ${pkg.credits} credits to user ${args.userId}`);

      return {
        success: true,
        transactionId,
        purchaseId: purchaseResult.purchaseId,
      };

    } catch (error: any) {
      console.error("❌ Payment processing error:", error);
      return {
        success: false,
        error: error.message || "Payment processing failed. Please try again.",
      };
    }
  },
});

// REMOVED: Test payment function - PRODUCTION ONLY, NO TESTS OR MOCKS

// Get Square payment form token (called from frontend)
export const getSquareApplicationId = action({
  args: {},
  handler: async (ctx, args) => {
    const applicationId = process.env.SQUARE_APPLICATION_ID;
    const environment = process.env.SQUARE_ENVIRONMENT;

    if (!applicationId) {
      throw new Error("Square not configured");
    }

    // PRODUCTION ONLY - NO SANDBOX/TEST ALLOWED
    if (environment !== "production") {
      throw new Error("Only production payments allowed");
    }

    return {
      applicationId,
      environment,
    };
  },
});
