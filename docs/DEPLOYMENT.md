# Deployment & Setup Guide

This guide walks through setting up the booking system from scratch and deploying to production.

## Prerequisites

- Node.js 18+ and npm installed
- MongoDB Atlas account (or self-hosted MongoDB)
- Gmail account (or other SMTP provider)
- Vercel account (for hosting)
- Git repository

## Step 1: Database Setup (MongoDB)

### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project and cluster
4. Create a database user with password
5. Add IP access (or use 0.0.0.0/0 for all)
6. Get the connection string: `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority`

### Option B: Self-Hosted MongoDB

Use Docker or install locally:
```bash
docker run -d -p 27017:27017 mongo:latest
# Connection string: mongodb://localhost:27017
```

## Step 2: SMTP Configuration (Email)

### Gmail Setup (Easiest)

1. Create a Gmail account or use existing: `bookings@yoursite.com`
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate app password (16 chars)
5. Save SMTP credentials (see below)

### Alternative SMTP Providers

- **SendGrid**: `smtp.sendgrid.net:587`
- **Mailgun**: `smtp.mailgun.org:587`
- **AWS SES**: `email-smtp.region.amazonaws.com:587`

## Step 3: Local Development Setup

### 1. Clone Repository & Install Dependencies

```bash
git clone <your-repo-url>
cd carolyn-clark-website
npm install
```

### 2. Create `.env.local`

Copy from `.env.local.example` and fill in:

```
# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/carolyn_booking

# SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=bookings@yoursite.com
SMTP_PASS=your-16-char-app-password

# Admin email
ADMIN_EMAIL=carolyn@yoursite.com

# JWT
JWT_SECRET=your-super-secret-key-at-least-32-chars-long

# Site URL (for local: http://localhost:3000)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cron Secret (for scheduled tasks)
CRON_SECRET=your-cron-secret-at-least-32-chars

# Google Calendar (optional, leave empty for now)
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
```

### 3. Seed Initial Data

```bash
npm run seed
```

This creates:
- Admin user: `admin@example.com` / `password123`
- Services: Myofascial Release (60min, $125) and Massage (90min, $150)
- Availability rules: Mon-Fri, 9am-5pm

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 4: Test Locally

### Admin Flow

1. Go to `/login`
2. Login with: `admin@example.com` / `password123`
3. Set availability rules (optional, already seeded)
4. Regenerate slots for next 3 months
5. Go to `/admin/appointments` (should be empty)

### Public Booking Flow

1. Go to `/booking/service`
2. Select a service
3. Pick a date and time
4. Enter your info
5. Confirm booking
6. Check emails received
7. Visit admin to see new appointment

### Admin Management

1. Go to `/admin/appointments`
2. View your test appointment
3. Click "View" to see detail page
4. Test updating status
5. Test resending emails
6. Test cancelling appointment

## Step 5: Vercel Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial booking system"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set environment variables (copy from `.env.local`)
4. Deploy

#### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Set Production Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
ADMIN_EMAIL=...
JWT_SECRET=... (generate new: openssl rand -base64 32)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
CRON_SECRET=... (generate new: openssl rand -base64 32)
```

### 4. Verify Deployment

1. Visit your production URL
2. Test admin login
3. Complete test booking
4. Verify confirmation email received

## Step 6: Setup Automated Reminders

### Option A: Vercel Crons (Recommended)

1. Create `/vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 8 * * *"
    }
  ]
}
```

2. Create `/app/api/cron/send-reminders/route.ts` (see EMAIL_SETUP.md)

3. Add `CRON_SECRET` to Vercel environment variables

### Option B: GitHub Actions

See EMAIL_SETUP.md for full configuration

### Option C: External Service (cron-job.org)

See EMAIL_SETUP.md for full configuration

## Step 7: Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records according to Vercel instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your domain

## Step 8: Data Backup

### MongoDB Backup

Enable automatic backups in MongoDB Atlas:
1. Go to Cluster → Backup
2. Enable daily backups
3. Keep backups for at least 30 days

### Export Appointments (Manual)

```bash
# Export to JSON
mongodump --uri "mongodb+srv://..." --db carolyn_booking

# Or use MongoDB Compass GUI
```

## Post-Launch Checklist

- [ ] Admin account password changed from default
- [ ] Test booking completed end-to-end
- [ ] Confirmation email sent and received
- [ ] Admin notification email sent
- [ ] Email domain/reputation setup (optional but recommended)
- [ ] Cron reminders working (wait 24 hours or test manually)
- [ ] Backups configured
- [ ] Custom domain set up (if applicable)
- [ ] Analytics setup (optional)
- [ ] Monitoring/alerts configured (optional)

## Troubleshooting

### Booking Not Saving

**Check:**
- MongoDB connection in logs
- Slot exists for selected date/time
- Service exists in database
- Network request successful (check browser DevTools)

### Emails Not Sending

**Check:**
- SMTP credentials correct
- Gmail app password (not regular password)
- Gmail 2FA enabled
- NEXT_PUBLIC_SITE_URL matches actual domain
- Email logs in database (collection: email_logs)

### Reminder Emails Not Sending

**Check:**
- Cron job logs (Vercel → Deployments → Logs)
- Appointments have status='confirmed' and reminder_sent=false
- Scheduled time is 24 hours in future
- Database connection working

### Admin Login Not Working

**Check:**
- JWT_SECRET matches production
- Admin user exists in database
- Session cookie being set (browser DevTools → Application → Cookies)
- HTTPS not blocking cookies (localhost is exception)

## Scaling Considerations

### Database

For 100+ monthly appointments, current setup is fine. Monitor:
- Query performance (MongoDB Atlas → Performance)
- Index usage
- Storage size

### Email

For bulk emails, consider:
- SendGrid or Mailgun (better rates)
- Batch sending instead of one-at-a-time
- Email validation (check email validity before sending)

### Performance

Monitor:
- Page load times (Vercel Analytics)
- Database query times
- Largest endpoints (slots generation on large date ranges)

## Production Monitoring

### Application Monitoring

Set up Sentry, Datadog, or similar:
1. Create account
2. Add SDK to `next.js` config
3. Monitor errors and performance

### Email Monitoring

Track sends/failures:
```javascript
// Check email logs periodically
db.email_logs.find({ status: 'failed' })
```

### Database Monitoring

Monitor MongoDB Atlas:
1. Connections
2. Query performance
3. Storage usage
4. Backup status

## Support & Maintenance

### Monthly Tasks

- [ ] Review failed emails
- [ ] Check backup status
- [ ] Monitor storage usage
- [ ] Review user feedback

### Quarterly Tasks

- [ ] Update dependencies: `npm update`
- [ ] Check for security patches
- [ ] Review error logs
- [ ] Performance optimization review

### Annually

- [ ] Full system audit
- [ ] Disaster recovery test
- [ ] Security penetration testing
- [ ] Cost analysis and optimization
