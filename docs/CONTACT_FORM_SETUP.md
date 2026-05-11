# Contact Form Setup Guide

The contact form is integrated with **Cloudflare Turnstile** for spam protection and sends submissions to Carolyn's admin email.

## Features

- ✅ Form validation (name, email, message required)
- ✅ Cloudflare Turnstile spam protection
- ✅ Email notification sent to admin
- ✅ Reply-to address set to sender's email
- ✅ Error handling and user feedback
- ✅ Loading states and success messages
- ✅ No project limits (unlike reCAPTCHA)
- ✅ Privacy-friendly

## Setup Instructions

### Step 1: Get Cloudflare Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/sign-up/turnstile)
2. Sign up (or sign in if you have an account)
3. Go to **Turnstile** section
4. Click **Create Site**
5. Fill in the form:
   - **Site Name:** Carolyn Clark Website (or your choice)
   - **Domain:** Add your domain(s)
     - For local: `localhost`
     - For production: `your-domain.com`
   - **Mode:** Managed (recommended) or Challenge
6. Click **Create**
7. Copy your keys:
   - **Site Key** (public) → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Secret Key** (private) → `TURNSTILE_SECRET_KEY`

### Step 2: Configure Environment Variables

Add to `.env.local`:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key-from-cloudflare
TURNSTILE_SECRET_KEY=your-secret-key-from-cloudflare
```

**Important:** 
- Site Key is public (shown in HTML) - safe to expose
- Secret Key is private - never commit to git, only in .env files

### Step 3: Verify Admin Email

The form sends to `ADMIN_EMAIL` from your `.env.local`:

```
ADMIN_EMAIL=carolyn@example.com
```

Make sure this is set before deploying.

## How It Works

### Client Side (Browser)

1. Page loads Turnstile script
2. User fills out form
3. Turnstile widget appears (can be in "managed" mode which shows nothing, or "challenge" for a visual puzzle)
4. On submit, token is generated
5. Form data + token sent to API

### Server Side

1. API receives form submission
2. Validates form fields (name, email, message)
3. Sends token to Cloudflare for verification
4. If valid, composes email and sends via Nodemailer
5. Returns success/error to client

### Email

When form is submitted, Carolyn receives an email with:
- Sender name
- Sender email (with reply-to set)
- Sender phone (if provided)
- Full message
- Nice HTML formatting

## Testing Locally

1. Make sure `.env.local` has both keys set
2. Make sure `localhost` is registered in Cloudflare Turnstile settings
3. Start dev server: `npm run dev`
4. Go to http://localhost:3000/contact
5. Fill out form and submit
6. Check your admin email

## Troubleshooting

### Form doesn't submit / "Verification is not ready"

**Causes:**
- Turnstile script didn't load
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` not set
- Browser console blocked script loading

**Fix:**
- Check browser console for errors (F12 → Console tab)
- Verify site key in `.env.local`
- Make sure localhost is registered in Cloudflare Turnstile settings
- Clear browser cache and reload (Ctrl+Shift+R)

### Turnstile widget not showing

**Causes:**
- Script loading error
- Site key mismatch
- Container not rendering

**Fix:**
- Check browser console for errors
- Verify site key matches Cloudflare dashboard
- Make sure `div#turnstile-container` exists in form
- Check Network tab to see if Turnstile script loaded

### Email not received

**Causes:**
- `ADMIN_EMAIL` not set
- SMTP credentials wrong
- Email marked as spam

**Fix:**
- Verify `ADMIN_EMAIL` in `.env.local`
- Check SMTP credentials are correct (see EMAIL_SETUP.md)
- Check spam folder in email
- Check email logs in database: `db.email_logs.find()`

### Turnstile shows error "Invalid site key"

**Cause:** Site key doesn't match domain

**Fix:**
1. Go to Cloudflare Turnstile dashboard
2. Check that your domain is registered
3. For localhost development, make sure `localhost` is in the domains list
4. Copy correct site key from dashboard

### Email fails with "Invalid address"

**Cause:** `ADMIN_EMAIL` is not a valid email format

**Fix:**
- Make sure `ADMIN_EMAIL=user@domain.com` (not just `user`)
- Check for extra spaces: `ADMIN_EMAIL=carolyn@example.com` not `ADMIN_EMAIL= carolyn@example.com `

## Why Cloudflare Turnstile?

Advantages over reCAPTCHA:
- ✅ No Google project limits
- ✅ No complex setup
- ✅ Privacy-first (Cloudflare doesn't use tracking)
- ✅ Works worldwide
- ✅ Invisible by default
- ✅ Free tier is generous

## Customization

### Change Turnstile Widget Mode

Edit `/app/contact/page.tsx` around line 100:

```typescript
// Current: 'light' theme
window.turnstile.render('#turnstile-container', {
  sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
  theme: 'light',  // can be 'light', 'dark', or 'auto'
});
```

### Customize Email Template

Edit the `emailHtml` variable in `/app/api/contact/route.ts` starting around line 72.

### Add More Form Fields

1. Add to contact form state in `/app/contact/page.tsx`
2. Add input field (TextField)
3. Add to ContactSchema in `/app/api/contact/route.ts`
4. Add to email template HTML

## Production Deployment

1. In Cloudflare Turnstile dashboard, add your production domain
2. Update `.env` on production with the production site key and secret
3. Redeploy to production
4. Test form submission on production

For Vercel:
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (can be different per env)
3. Add `TURNSTILE_SECRET_KEY` (keep secret)
4. Redeploy

## Monitoring Form Submissions

Check email logs in database:
```javascript
db.email_logs.find({ email_type: 'contact' })
```

Monitor Turnstile analytics in Cloudflare dashboard:
- Success rate
- Block rate
- Geographic breakdown

## Support

For issues:
1. Check this guide's troubleshooting section
2. See EMAIL_SETUP.md for email-specific issues
3. Check Cloudflare Turnstile dashboard for domain/key issues
4. Check browser console (F12) and server logs for errors
5. Visit [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/) for more info
