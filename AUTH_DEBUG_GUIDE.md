# Authentication Debug Guide

## Issue
"The verification code you entered is incorrect" error when entering OTP code.

## Debugging Steps Added

### 1. Backend Logging (Convex)
I've added console logs to track the entire OTP flow:

**In `src/convex/auth/emailOtp.ts`:**
- 🔐 Logs when email is sent
- 🔐 Shows the generated token
- ✅ Confirms email sent successfully via Resend
- ❌ Shows any Resend errors

### 2. Frontend Logging (Auth Page)
**In `src/pages/Auth.tsx`:**
- 🔍 Shows form data being submitted (email + code)
- 🔍 Displays the OTP value from input
- ✅ Confirms successful sign-in
- ❌ Shows verification errors with details

## How to Debug

### Step 1: Open Browser Console
1. Go to `/auth` page
2. Open Developer Tools (F12)
3. Go to Console tab

### Step 2: Enter Your Email
1. Enter your email address
2. Click "Continue"
3. **Check Console for:**
   ```
   🔐 Sending OTP email to: your@email.com
   🔐 Generated token: 123456
   ✅ Email sent successfully via Resend: {...}
   ```

### Step 3: Check Your Email
1. Open the email from "Neura AI <onboarding@resend.dev>"
2. Note the 6-digit code (e.g., 123456)
3. **Compare this code with the logged token in Step 2**
   - If they MATCH ✅ - email is working correctly
   - If they DON'T MATCH ❌ - there's an issue with email rendering

### Step 4: Enter the Code
1. Enter the 6-digit code from the email
2. Click "Verify code" or press Enter
3. **Check Console for:**
   ```
   🔍 Form data being submitted:
     - email: your@email.com
     - code: 123456
     - otp value: 123456
   ```

### Step 5: Analyze the Results

#### Success Case ✅
```
✅ Signed in successfully
```
- You'll be redirected to the dashboard
- Authentication is working!

#### Failure Case ❌
```
❌ OTP verification error: [error details]
```

**Common Issues:**

1. **Code doesn't match**
   - Console shows different code than email
   - **Fix:** Check email template rendering

2. **Code is null/undefined**
   ```
   - code: null
   - otp value: 123456
   ```
   - **Fix:** Form field name issue (should be "code")

3. **Email is missing**
   ```
   - email: null
   ```
   - **Fix:** Hidden input not passing email correctly

4. **Timing issue**
   - Code expires after 15 minutes
   - **Fix:** Request new code

## Convex Logs

To see backend logs in real-time:

```bash
# Terminal 1: Run Convex dev
npx convex dev

# Terminal 2: Watch logs
npx convex logs --history 50
```

Look for:
- "🔐 Sending OTP email to:"
- "🔐 Generated token:"
- "✅ Email sent successfully"
- Any errors from Resend

## Common Root Causes

### 1. Resend API Key Issue
**Symptom:** No email received
**Check:**
```bash
npx convex env get RESEND_API_KEY
```
**Should show:** `re_VhisKndq_9ToRkdmMsqepJ6UgDzwBUPk9`

### 2. Email Rendering Issue
**Symptom:** Code in email doesn't match generated token
**Check:** The `${token}` variable in HTML template (line 65 of emailOtp.ts)

### 3. Form Field Name Mismatch
**Symptom:** Code is null when submitted
**Check:** Hidden input has `name="code"` (line 196 of Auth.tsx)

### 4. Session/Cache Issue
**Symptom:** Old codes being validated
**Fix:** Clear browser storage:
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### 5. Convex Auth Provider Config
**Symptom:** Provider not found errors
**Check:** `src/convex/auth.ts` includes `emailOtp` provider

## Testing Checklist

- [ ] Resend API key is set in Convex environment
- [ ] Email is received within 30 seconds
- [ ] Code in email matches console log
- [ ] Form submits with both email and code
- [ ] No TypeScript/compilation errors
- [ ] Browser console shows detailed logs
- [ ] Code has not expired (< 15 minutes)

## Emergency Fallback

If OTP still doesn't work, use Guest Login:
1. Click "Continue as Guest" button
2. This uses anonymous authentication
3. Bypasses email verification

## Getting Help

If still not working, share these logs:
1. Browser console logs (all 🔍 and ❌ messages)
2. Convex logs (npx convex logs)
3. Screenshot of email received
4. Exact error message

The logs will show exactly where the process is failing!
