# REAL Payment System - No Mocks or Fakes

## Overview
The payment system uses **Square Payment Gateway** for REAL credit card processing. Users MUST pay before receiving credits - NO fake or mock payments accepted.

## How It Works

### 1. **REAL Payment Processing**
- Uses Square Payment API (https://developer.squareup.com/)
- Processes actual credit card payments
- Money is REALLY charged to customer's card
- Credits are ONLY added after successful payment verification

### 2. **Payment Flow**
```
1. User enters card details in frontend
2. Square Web Payments SDK tokenizes card (creates cardNonce)
3. Frontend sends cardNonce to our backend
4. Backend calls Square API to charge the card
5. Square processes REAL payment
6. If payment succeeds → credits added immediately
7. If payment fails → NO credits added, error returned
```

### 3. **Security**
- Card details NEVER touch our servers
- Square handles all PCI compliance
- Card is tokenized on client-side using Square SDK
- Only the token (cardNonce) is sent to backend
- Square API validates and processes payment

## Setup Required

### Environment Variables (Required)
Add these to your Convex environment (Settings → Environment Variables):

```bash
SQUARE_ACCESS_TOKEN=your_square_access_token
SQUARE_APPLICATION_ID=your_square_application_id
SQUARE_ENVIRONMENT=sandbox  # or "production" for live payments
```

### Getting Square Credentials

1. **Create Square Account**
   - Go to https://squareup.com/signup
   - Complete account setup

2. **Get API Credentials**
   - Go to https://developer.squareup.com/apps
   - Create new application
   - Get your credentials:
     - **Access Token**: Found in "Credentials" tab
     - **Application ID**: Found in "Credentials" tab

3. **Test vs Production**
   - **Sandbox**: Use sandbox credentials for testing (no real money)
   - **Production**: Use production credentials for real payments

### Sandbox Testing
- **Test Card**: `4111 1111 1111 1111`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

## Backend Functions

### `processCreditCardPayment`
```typescript
// Main payment processing function
api.paymentProcessor.processCreditCardPayment({
  userId: string,        // User ID
  packageId: string,     // "starter", "pro", "business", or "enterprise"
  cardNonce: string,     // Tokenized card from Square SDK
  cardholderName: string // Name on card
})
```

**Returns:**
- `success: true` + `transactionId` if payment succeeds
- `success: false` + `error` message if payment fails

### `processTestPayment`
```typescript
// For sandbox testing only - uses test card nonce
api.paymentProcessor.processTestPayment({
  userId: string,
  packageId: string
})
```

### `getSquareApplicationId`
```typescript
// Get Square credentials for frontend
api.paymentProcessor.getSquareApplicationId()
```

## Credit Packages

| Package    | Credits | Price   |
|------------|---------|---------|
| Starter    | 500     | $9.99   |
| Pro        | 1,500   | $24.99  |
| Business   | 5,000   | $79.99  |
| Enterprise | 15,000  | $199.99 |

## Payment Verification

### What Happens on Success:
1. Square API returns payment confirmation
2. Transaction ID is saved to database
3. Credits are IMMEDIATELY added to user account
4. Purchase marked as "completed"
5. User can start using credits right away

### What Happens on Failure:
1. Square API returns error
2. NO credits are added
3. NO purchase record is created
4. User sees error message
5. No money is charged

## Important Security Notes

### ✅ What We Do:
- Use Square's secure payment processing
- Tokenize cards on client-side
- Verify all payments before adding credits
- Store only last 4 digits of card
- Log all transactions for audit

### ❌ What We DON'T Do:
- Store full card numbers
- Accept payments without verification
- Give credits before payment
- Use fake or mock payment processing
- Allow test payments in production

## Troubleshooting

### "Payment system not configured"
- Add `SQUARE_ACCESS_TOKEN` to Convex environment variables

### "Payment failed"
- Check card details are correct
- Verify card has sufficient funds
- Check if card supports online payments
- Try different card

### "Test payments not allowed in production"
- You're trying to use `processTestPayment` in production
- Use `processCreditCardPayment` with real card instead

## API Documentation

For detailed Square API docs:
- https://developer.squareup.com/reference/square/payments-api
- https://developer.squareup.com/docs/web-payments/overview

## Summary

✅ **REAL payments only** - No mocks or fakes
✅ **Square Payment Gateway** - Industry-standard, PCI-compliant
✅ **Verified before credits** - Credits only added after successful payment
✅ **Secure** - Card details never touch our servers
✅ **Tested** - Sandbox mode for safe testing

❌ **NO fake payments**
❌ **NO manual verification needed**
❌ **NO credits without payment**
