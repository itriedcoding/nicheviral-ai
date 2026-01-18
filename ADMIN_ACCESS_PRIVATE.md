# 🔐 ADMIN ACCESS (PRIVATE - DO NOT SHARE)

**Status:** ✅ Admin panel is HIDDEN from website but fully functional

---

## 🎯 How to Access Admin Panel

### Direct URL (Not Linked Anywhere):
```
https://quick-mails-march.vly.sh/admin
```

**IMPORTANT:** This page is NOT linked anywhere on the website. You must type the URL directly.

---

## 🔑 Admin Credentials

```
Email: admin@neuraai.cyou
Password: NeuraAdmin2026!Secure#Pass
```

**Copy-paste these exactly - they are case-sensitive!**

---

## 📋 Access Instructions

### Step 1: Login First
1. Go to: `https://quick-mails-march.vly.sh/auth`
2. Click **"Sign In"**
3. Enter the email and password above
4. You'll be redirected to `/dashboard`

### Step 2: Access Admin Panel
1. Type in browser: `https://quick-mails-march.vly.sh/admin`
2. Press Enter
3. Admin panel will load

**OR**

1. Type directly in browser: `https://quick-mails-march.vly.sh/admin`
2. If not logged in, you'll be redirected to login
3. After login, navigate back to `/admin`

---

## 🛡️ Security Features

### 1. Hidden from Navigation
- ❌ NO button on website
- ❌ NO link in navigation
- ❌ NO mention on any page
- ✅ Only accessible by typing URL

### 2. Role-Based Protection
- Checks if user is authenticated
- Checks if user has admin role
- Redirects non-admin users to /dashboard
- Shows error: "Access denied: Admin only"

### 3. Admin-Only Features
- View all users
- Manage user credits
- View all transactions
- View payment history
- Admin action audit log
- Dashboard statistics
- Revenue analytics

---

## 💳 Admin Features

### User Management
- **View All Users:** See complete user list with emails, credits, roles
- **Update Credits:** Add or remove credits from any user
- **Ban Users:** Temporarily suspend user accounts
- **Delete Users:** Permanently remove users (use carefully!)
- **Search Users:** Find users by email or name

### Financial Management
- **Revenue Stats:** Total revenue, pending payments, refunds
- **Purchase History:** All credit purchases with details
- **Transaction Logs:** Credit additions/deductions with reasons
- **Payment Analytics:** Daily/weekly/monthly revenue charts

### System Monitoring
- **Admin Actions Log:** Audit trail of all admin activities
- **User Statistics:** Total users, active users, banned users
- **Video Generation Stats:** Total videos, success/fail rates
- **System Health:** Credits distributed, average user balance

---

## 🎨 Admin Panel Layout

### Navigation Tabs:
1. **Dashboard** - Overview statistics and charts
2. **Users** - User management and search
3. **Transactions** - Credit purchase history
4. **Actions** - Admin activity audit log

### Dashboard Statistics:
- Total Users
- Total Revenue
- Videos Generated
- Active Users

---

## ⚠️ Admin Safety Rules

### What You CAN Do:
✅ Add unlimited credits to your account
✅ View all user data
✅ Manage user credits
✅ View all transactions
✅ Monitor system activity

### What You SHOULD NOT Do:
❌ Share admin credentials with anyone
❌ Delete users unless absolutely necessary
❌ Remove credits from active users arbitrarily
❌ Ban users without reason

### Best Practices:
- Always add a reason when updating credits
- Check user history before taking action
- Monitor the admin actions log regularly
- Keep credentials secure (use password manager)

---

## 🔍 Verification

### Backend Test (Already Verified):
```bash
npx convex run passwordAuth:signInWithPassword \
  '{"email": "admin@neuraai.cyou", "password": "NeuraAdmin2026!Secure#Pass"}'

Result: ✅ SUCCESS
{
  "success": true,
  "userId": "k972pxm0rqf0wxpj9bvcz8kjw57zek5b"
}
```

### Database Check:
```
User ID: k972pxm0rqf0wxpj9bvcz8kjw57zek5b
Email: admin@neuraai.cyou
Role: admin
Credits: 999,999,999 (unlimited)
Status: ✅ Active
```

---

## 📊 Admin Privileges

### Unlimited Credits:
- Your account has 999,999,999 credits
- Displayed as "♾️ UNLIMITED" in dashboard
- Never need to buy credits
- No purchase button shows for admin

### Full Access:
- All Convex admin functions
- All user management functions
- All billing functions
- All system monitoring functions

### Audit Trail:
- All admin actions are logged
- View your own action history in "Actions" tab
- Timestamp, action type, target user recorded

---

## 🚀 Quick Access Checklist

**Before accessing admin panel:**
- [ ] Site is deployed and running
- [ ] You have the credentials (see above)
- [ ] You're on the correct URL

**To access:**
1. [ ] Login at `/auth` with admin credentials
2. [ ] Navigate to `/admin` by typing URL
3. [ ] Verify admin panel loads with all tabs

**If it doesn't work:**
- Check you're using correct credentials (case-sensitive)
- Ensure you're logged in first
- Try logging out and back in
- Clear browser cache and try again

---

## 🔒 Security Summary

**Visibility:** ❌ NOT visible on website (no links, no buttons, no mentions)

**Accessibility:** ✅ Accessible via direct URL `/admin`

**Protection:** ✅ Role-based authentication (admin role required)

**Credentials:** 🔐 Stored securely in database (password hashed with bcrypt)

**Data:** ✅ All real - no fake or mock data

**Audit:** ✅ All actions logged in database

---

## 📞 Support

**If you can't access the admin panel:**

1. **Check credentials** - Must be exact (case-sensitive)
2. **Check browser** - Try incognito mode
3. **Check deployment** - Ensure site is serving production build from dist/
4. **Check backend** - Run the verification command above

**If admin panel is showing to regular users:**
- This should NOT happen - navigation links removed
- Regular users redirected to /dashboard if they try to access /admin
- Only you (admin@neuraai.cyou) can access it

---

**KEEP THIS DOCUMENT PRIVATE!**

**Do NOT:**
- Share credentials with anyone
- Commit this file to public repositories
- Display credentials on the website
- Store credentials in plaintext in code

**Do:**
- Keep credentials in a password manager
- Change password if compromised
- Monitor admin actions log regularly
- Use admin powers responsibly

---

**Last Updated:** 2026-01-18 18:45 UTC
**Status:** ✅ Hidden and Secured
**Credentials:** ✅ Verified Working
**Build:** ✅ Production Ready
