# NOVASIOR Production Deployment Setup Guide

Complete step-by-step guide to set up Razorpay, Supabase, Resend, and deploy to Vercel.

---

## 📋 Table of Contents

1. [Quick Overview](#quick-overview)
2. [Setup Razorpay](#setup-razorpay)
3. [Setup Supabase](#setup-supabase)
4. [Setup Resend](#setup-resend)
5. [Deploy to Vercel](#deploy-to-vercel)
6. [Testing the Complete Flow](#testing-the-complete-flow)
7. [Switching to Live Mode](#switching-to-live-mode)

---

## Quick Overview

The system works like this:

```
Customer buys product
    ↓
Razorpay payment popup (secure)
    ↓
Payment verified (signature check)
    ↓
Order stored in Supabase (database)
    ↓
Download link generated from Supabase (signed URL, 30 days)
    ↓
Professional email sent via Resend with download link
    ↓
Customer gets access + success page
```

**The beautiful part:** Just update environment variables in Vercel. NO code changes needed ever.

---

## Setup Razorpay

### Step 1: Create Razorpay Account
1. Go to https://razorpay.com
2. Sign up and verify your email
3. Complete KYC (Know Your Customer) verification
4. Wait for approval (usually 2-4 hours)

### Step 2: Get API Keys
1. Go to https://dashboard.razorpay.com/app/settings/api-keys
2. You'll see two keys:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (long string)

### Step 3: Test Mode vs Live Mode

**TEST MODE** (for testing):
- Key ID: `rzp_test_*`
- Key Secret: `*`
- Use test card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

**LIVE MODE** (for real payments):
- Key ID: `rzp_live_*`
- Key Secret: `*`
- Real customer card payments

### Step 4: Store Keys Locally (for testing)
Create `.env` file in project root:
```
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
```

---

## Setup Supabase

### Step 1: Create Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in details:
   - Name: `novasior`
   - Region: Choose closest to your customers (e.g., us-east-1)
   - Password: Strong password (save it!)
   - Pricing Plan: Free tier is fine for launch

### Step 2: Get Credentials
After project is created:
1. Go to **Settings → API**
2. Copy three keys:
   - **Project URL** (labeled "URL")
   - **anon (public) key** (SUPABASE_ANON_KEY)
   - **service_role (secret) key** (SUPABASE_SERVICE_ROLE_KEY)

Add to `.env`:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Create Database Schema

In Supabase console, go to **SQL Editor** and run this:

```sql
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  razorpay_order_id TEXT NOT NULL UNIQUE,
  razorpay_payment_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  amount BIGINT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'paid',
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_payment_id ON orders(razorpay_payment_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
```

### Step 4: Create Storage Bucket

1. Go to **Storage** in Supabase
2. Click **Create a new bucket**
3. Name: `digital-products`
4. Make it **Private** (for security)
5. Upload your product files:
   - Create folders: `products/p-01/`, `products/p-02/`, etc.
   - Upload ZIP files with product content

---

## Setup Resend

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up with email
3. Verify email

### Step 2: Get API Key
1. Go to **API Keys** (in dashboard)
2. Click **Create API Key**
3. Copy the key (starts with `re_`)

### Step 3: Verify Your Domain
1. Go to **Domains** 
2. Click **Add Domain**
3. Enter your domain (e.g., `novasior.com`)
4. Resend will show you DNS records to add
5. Add these records to your domain registrar (Godaddy, Namecheap, etc.):
   - MX record
   - DKIM record
   - SPF record

Once verified, you can send emails from `hello@yourdomain.com` (or any subdomain)

### Step 4: Store Resend Credentials in .env
```
RESEND_API_KEY=re_1234567890abcdefghijklmnop
EMAIL_FROM=hello@novasior.com
SUPPORT_EMAIL=support@novasior.com
```

---

## Deploy to Vercel

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Add production setup"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click **New Project**
3. Import your GitHub repository
4. Select project
5. Click **Import**

### Step 3: Add Environment Variables

In Vercel dashboard for your project:
1. Go to **Settings → Environment Variables**
2. Add all these variables (copy from your `.env`):

| Variable | Value | From |
|----------|-------|------|
| `RAZORPAY_KEY_ID` | `rzp_test_...` | Razorpay dashboard |
| `RAZORPAY_KEY_SECRET` | `...` | Razorpay dashboard |
| `SUPABASE_URL` | `https://...supabase.co` | Supabase settings |
| `SUPABASE_ANON_KEY` | `eyJ...` | Supabase settings |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase settings |
| `RESEND_API_KEY` | `re_...` | Resend dashboard |
| `EMAIL_FROM` | `hello@yourdomain.com` | Your verified domain |
| `SUPPORT_EMAIL` | `support@yourdomain.com` | Your email |
| `APP_URL` | `https://yourdomain.com` | Your production URL |
| `NODE_ENV` | `production` | Leave as is |

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete
3. Once deployed, visit your Vercel URL
4. Check server health: Visit `/api/health`
5. Should show:
   ```json
   {
     "ok": true,
     "razorpayConfigured": true,
     "supabaseConfigured": true,
     "resendConfigured": true,
     "isTestMode": true
   }
   ```

---

## Testing the Complete Flow

### Local Testing (before deploying):

1. Make sure `.env` has test keys:
   ```
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   SUPABASE_URL=https://...
   SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   RESEND_API_KEY=...
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000
4. Go to Shop → Add product to cart
5. Click Checkout
6. Fill form:
   - Name: `Test User`
   - Email: `your-email@gmail.com` (real email for testing)
   - Complete checkout
7. Razorpay popup appears:
   - Card: 4111 1111 1111 1111
   - CVV: 123
   - Expiry: 12/25
8. Pay
9. Check:
   - Success page appears ✓
   - Email arrives in inbox (with download link) ✓
   - Order appears in Supabase dashboard ✓

### Production Testing (after Vercel deployment):

1. Visit your Vercel URL
2. Repeat the same flow
3. Everything should work the same

---

## Switching to Live Mode

This is the beautiful part - **NO CODE CHANGES NEEDED**

### Step 1: Get Live Razorpay Keys
1. In Razorpay dashboard, complete:
   - Business verification
   - Settlement account setup
2. Once approved, live keys will be available
3. Copy:
   - Key ID: `rzp_live_...`
   - Key Secret: `...`

### Step 2: Update Vercel Environment Variables
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Update:
   - `RAZORPAY_KEY_ID` → `rzp_live_...`
   - `RAZORPAY_KEY_SECRET` → your live secret
4. Click Save
5. Vercel will auto-redeploy

### Step 3: Verify
1. Visit your live site
2. Check `/api/health` → `"isTestMode": false`
3. Ready for real payments! 🎉

That's it. No code changes. No database migrations. Everything just works.

---

## Production Checklist

Before going live with real payments:

- [ ] Supabase database created and orders table set up
- [ ] Digital products uploaded to Supabase storage
- [ ] Resend domain verified
- [ ] Razorpay business verification complete
- [ ] All environment variables in Vercel
- [ ] Test payment successful locally
- [ ] Test payment successful on Vercel (with test mode)
- [ ] Email sent successfully to test customer
- [ ] Order stored in Supabase
- [ ] Razorpay live keys obtained
- [ ] Vercel environment variables updated with live keys
- [ ] Site tested on production URL
- [ ] Ready for real customers!

---

## Troubleshooting

### "Razorpay is not configured"
- Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables
- Make sure they don't have "placeholder" or "demo" in them

### "Supabase not configured"
- Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel
- Verify database connection

### "Email not sent"
- Check RESEND_API_KEY in Vercel
- Verify domain is verified in Resend dashboard
- Check EMAIL_FROM matches verified domain

### Payment verification fails
- Check signature validation - it's cryptographic, very sensitive
- Make sure RAZORPAY_KEY_SECRET is exactly correct (no extra spaces)
- Verify test mode/live mode keys match the payment

### Orders not appearing in Supabase
- Check database table exists (run SQL setup again if needed)
- Verify SUPABASE_SERVICE_ROLE_KEY is correct
- Check Supabase logs for errors

---

## Additional Resources

- Razorpay Docs: https://razorpay.com/docs/
- Supabase Docs: https://supabase.com/docs
- Resend Docs: https://resend.com/docs
- Vercel Docs: https://vercel.com/docs

---

**You're all set! Your payment system is production-ready and interconnected.** 🚀
