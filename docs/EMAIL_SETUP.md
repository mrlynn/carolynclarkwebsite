# Email System & Cron Job Setup

This document explains how to set up the email system and automated reminder emails for the booking system.

## Email Configuration

### 1. Gmail SMTP Setup (Recommended)

The system uses Nodemailer with SMTP. Gmail is the easiest option:

1. **Create a Gmail account** or use an existing one
   - For business: Create a new email like `bookings@yourdomain.com` (requires custom domain)
   - For personal: Use your existing Gmail address

2. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

3. **Generate an App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password

4. **Update `.env.local`**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ADMIN_EMAIL=carolyn@example.com
   ```

5. **Test the connection** (optional)
   ```bash
   npm run test-smtp
   ```

### 2. Custom SMTP (SendGrid, Mailgun, etc.)

If using another provider, update the SMTP credentials:

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxx...
```

Refer to your provider's documentation for correct settings.

## Email Templates

The system includes four email templates:

1. **Confirmation Email** - Sent immediately after booking
   - Service details, date/time, price
   - Link to cancel appointment

2. **Reminder Email** - Sent 24 hours before appointment
   - Service name, time, and duration
   - Encourages client to reach out with questions

3. **Cancellation Email** - Sent when client cancels
   - Confirmation of cancellation
   - Refund information
   - Encouragement to rebook

4. **Admin Notification** - Sent to Carolyn when booking is created
   - Full client information
   - Service details and pricing
   - Link to admin dashboard

All templates use brand colors and professional HTML formatting.

## Automated Reminders (Cron Job)

Reminder emails are sent **24 hours** before each appointment.

### Option 1: Vercel Crons (Recommended for Vercel Deployment)

1. Create `/app/api/cron/send-reminders/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getReminderEmailTemplate } from '@/lib/email-templates';
import { sendEmail } from '@/lib/email-service';

export async function GET(request: NextRequest) {
  // Verify cron secret
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();

    // Find appointments scheduled for 24-25 hours from now
    const now = new Date();
    const tomorrow24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrow25h = new Date(now.getTime() + 25 * 60 * 60 * 1000);

    const appointmentsToRemind = await db
      .collection('appointments')
      .find({
        status: 'confirmed',
        reminder_sent: false,
        scheduled_at: { $gte: tomorrow24h, $lte: tomorrow25h },
      })
      .toArray();

    for (const appointment of appointmentsToRemind) {
      const service = await db.collection('services').findOne({
        _id: appointment.service_id,
      });

      const reminderHtml = getReminderEmailTemplate({
        clientName: appointment.client_name,
        serviceName: service?.name || 'Service',
        scheduledAt: appointment.scheduled_at,
        duration: appointment.duration_minutes,
      });

      const result = await sendEmail({
        to: appointment.client_email,
        subject: `Reminder: Your appointment with Carolyn Clark tomorrow`,
        html: reminderHtml,
      });

      if (result.success) {
        await db.collection('appointments').updateOne(
          { _id: appointment._id },
          { $set: { reminder_sent: true, reminder_sent_at: new Date() } }
        );
      }
    }

    return NextResponse.json({ success: true, sent: appointmentsToRemind.length });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

2. Add to `vercel.json`:

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

3. Add `CRON_SECRET` to Vercel environment variables

### Option 2: GitHub Actions (For Any Deployment)

1. Create `.github/workflows/send-reminders.yml`:

```yaml
name: Send Reminder Emails

on:
  schedule:
    - cron: '0 8 * * *'  # Daily at 8 AM UTC

jobs:
  send-reminders:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run send-reminders
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          SMTP_HOST: ${{ secrets.SMTP_HOST }}
          SMTP_PORT: ${{ secrets.SMTP_PORT }}
          SMTP_USER: ${{ secrets.SMTP_USER }}
          SMTP_PASS: ${{ secrets.SMTP_PASS }}
          ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
```

### Option 3: External Cron Service

Use [cron-job.org](https://cron-job.org/) or similar:

1. Sign up at cron-job.org
2. Create new cron job
3. URL: `https://your-site.com/api/cron/send-reminders`
4. Schedule: `0 8 * * *` (Daily at 8 AM)
5. Add `CRON_SECRET` header with your secret value

### Option 4: Manual Testing

Run reminders manually:

```bash
npm run send-reminders
```

This processes all appointments scheduled for 24-25 hours from now.

## Testing Email Delivery

### Test Email Sending

1. Create a test booking in the admin dashboard
2. Check email received in client inbox
3. Check admin notification email

### Check Email Logs

Monitor email delivery in MongoDB:

```javascript
db.email_logs.find({ appointment_id: ObjectId("...") })
```

### Troubleshooting

**Emails not sending:**
- Verify SMTP credentials in `.env.local`
- Check MongoDB connection
- Review browser console and server logs for errors
- Ensure NEXT_PUBLIC_SITE_URL is set correctly

**Gmail app password issues:**
- Regenerate app password
- Verify 2FA is enabled
- Use specific app password (not regular Gmail password)

**Reminder emails not sent:**
- Check cron job logs
- Verify appointment status is 'confirmed' and reminder_sent is false
- Ensure scheduled_at time is correctly formatted

## Email Content Customization

Edit email templates in `/lib/email-templates.ts`:

1. Update greeting or closing message
2. Change brand colors or fonts
3. Add additional information (location, directions, etc.)
4. Customize subject lines

All templates use the same styling pattern for consistency.

## Email Frequency

- **Confirmation:** Immediately after booking
- **Reminder:** 24 hours before appointment
- **Cancellation:** When client cancels (any time)
- **Admin Notification:** Immediately after booking

Note: A client will only receive one reminder email per appointment. If a reminder fails, manual resend is available in admin dashboard.
