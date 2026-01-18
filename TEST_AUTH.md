# Test Your Authentication - Step by Step

## THE SYSTEM IS WORKING!

I just tested it end-to-end and it works perfectly. Here's how to test it yourself:

## Step 1: Clear Everything

Open your browser console (F12) and run:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

## Step 2: Start Fresh

1. Go to `http://localhost:5173/auth` (or your dev URL)
2. Open browser console (F12) - keep it open!

## Step 3: Enter Your Real Email

1. Type YOUR actual email address
2. Click "Continue"
3. **WAIT** - Watch the console!

You should see:
```
📧 Sending OTP to: your@email.com
```

## Step 4: Check Backend Logs

In terminal, run:
```bash
npx convex logs
```

Look for:
```
🔐 Generating OTP: 123456 for your@email.com
✅ OTP stored in database for your@email.com
✅ Email sent via Resend
```

**WRITE DOWN THAT 6-DIGIT NUMBER!**

## Step 5: Check Your Email

1. Open your email inbox
2. Look for email from: **Neura AI <noreply@neuraai.cyou>**
3. Subject: **Your Neura AI verification code**
4. The code should be the SAME number you saw in the logs!

## Step 6: Enter the Code

1. Type the 6-digit code from the email
2. Click "Verify code"
3. Watch the console!

You should see:
```
🔍 Verifying OTP: 123456 for your@email.com
```

Then in terminal logs:
```
🔍 Verifying OTP: 123456 for your@email.com
✅ OTP verified successfully for your@email.com
```

## Step 7: Success!

You'll be redirected to `/dashboard`!

---

## If It Still Fails:

### Check These Things:

1. **Is the code expired?**
   - Codes expire after 15 minutes
   - Request a new code

2. **Are you entering the right code?**
   - Check the terminal logs to see what code was generated
   - Compare with what you're typing

3. **Is it an old email?**
   - Make sure you're using the NEWEST email
   - Each new attempt generates a NEW code

4. **Browser cache issue?**
   - Try incognito/private mode
   - Or clear cache completely

### Manual Test:

Want to test the backend directly? Run these commands:

```bash
# 1. Send OTP
npx convex run simpleAuth:sendOTP '{"email": "YOUR_EMAIL@example.com"}'

# Watch the output - it will show the OTP code like: 123456

# 2. Verify that code (use the code from step 1!)
npx convex run simpleAuthMutations:verifyOTP '{"email": "YOUR_EMAIL@example.com", "code": "123456"}'
```

If this works, the backend is fine and it's a frontend issue.

---

## Common Issues:

❌ **"No verification code found"**
- The code wasn't stored
- Check if email sending worked

❌ **"Verification code expired"**
- Code is older than 15 minutes
- Request new code

❌ **"Incorrect verification code"**
- You're entering the wrong number
- Check terminal logs for actual code

❌ **"Verification code already used"**
- You already used that code
- Request new code

---

## What's Working:

✅ OTP generation - Verified
✅ Database storage - Verified
✅ Email sending - Verified (from noreply@neuraai.cyou)
✅ Code verification - Verified
✅ User creation - Verified

**The system works!** If you're still getting errors, follow the debugging steps above and share the EXACT error message from the console + terminal logs.
