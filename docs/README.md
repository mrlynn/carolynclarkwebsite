# Booking System Documentation

Complete guides for the custom booking and scheduling system built for Carolyn Clark's massage therapy business.

## 📚 Documentation Files

### For Carolyn (Admin/Owner)
- **[QUICK_START_CAROLYN.md](./QUICK_START_CAROLYN.md)** ← Start here!
  - How to use the admin dashboard
  - Managing appointments and availability
  - Understanding email confirmations
  - FAQ and common tasks

### For Developers
- **[PHASE_PROGRESS.md](./PHASE_PROGRESS.md)** - Project status and architecture
  - Phases completed (1-4) and planned (5-7)
  - Database schema overview
  - API routes summary
  - Testing checklist

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Setup and launch guide
  - Local development setup
  - MongoDB and SMTP configuration
  - Vercel deployment
  - Production monitoring
  - Troubleshooting guide

- **[EMAIL_SETUP.md](./EMAIL_SETUP.md)** - Email system details
  - SMTP configuration (Gmail, SendGrid, etc.)
  - Email templates overview
  - Automated reminder cron job setup
  - Email troubleshooting

## 🎯 Quick Navigation

### I want to...

**...use the system as Carolyn**
→ Read [QUICK_START_CAROLYN.md](./QUICK_START_CAROLYN.md)

**...set it up locally for development**
→ Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Step 1-4

**...deploy to production**
→ Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Step 5-8

**...understand the architecture**
→ Read [PHASE_PROGRESS.md](./PHASE_PROGRESS.md)

**...fix email issues**
→ Read [EMAIL_SETUP.md](./EMAIL_SETUP.md) - Troubleshooting section

**...set up automated reminders**
→ Read [EMAIL_SETUP.md](./EMAIL_SETUP.md) - Automated Reminders section

## 📋 System Overview

### What's Included

✅ **Public Booking Flow**
- Service selection
- Calendar date/time picker
- Client information form
- Confirmation page

✅ **Email System**
- Confirmation emails on booking
- 24-hour reminder emails
- Cancellation emails
- Admin notifications

✅ **Admin Dashboard**
- Availability management (set hours, block time)
- Appointment listing with search/filter
- Appointment details and management
- Email resending
- Status management

✅ **Self-Service Cancellation**
- Unique cancellation links in emails
- 30-day expiry
- Client confirmation

✅ **Security**
- Session-based authentication
- HTTP-only cookies
- Password hashing
- Protected admin routes

### Database
- MongoDB (Atlas recommended)
- Automatic backups
- Collections: services, appointments, availability_rules, availability_slots, admin_users

### Hosting
- Vercel (recommended)
- Serverless functions
- Automatic scaling
- One-click deployment

## 🚀 Getting Started

### First Time?

1. **Carolyn:** Read [QUICK_START_CAROLYN.md](./QUICK_START_CAROLYN.md)
2. **Developer:** Follow [DEPLOYMENT.md](./DEPLOYMENT.md) Steps 1-4 for local setup
3. **For Production:** Follow [DEPLOYMENT.md](./DEPLOYMENT.md) Steps 5-8

### Testing the System

1. Start local dev server: `npm run dev`
2. Login to admin: http://localhost:3000/login
   - Email: `admin@example.com`
   - Password: `password123`
3. Set availability rules if not already done
4. Go to public booking: http://localhost:3000/booking/service
5. Complete a test booking
6. Check emails received

## 📦 Project Structure

```
/docs/
  ├── README.md                    (this file)
  ├── QUICK_START_CAROLYN.md       (for Carolyn)
  ├── PHASE_PROGRESS.md            (for developers)
  ├── DEPLOYMENT.md                (setup & launch)
  └── EMAIL_SETUP.md               (email configuration)

/app/
  ├── /admin/                      (admin routes - protected)
  │   ├── login/                   (admin login)
  │   ├── appointments/            (view/manage appointments)
  │   ├── availability/            (set hours, block time)
  │   └── page.tsx                 (dashboard)
  │
  ├── /booking/                    (public booking flow)
  │   ├── service/                 (select service)
  │   ├── calendar/                (pick date/time)
  │   ├── info/                    (enter client info)
  │   ├── confirmation/            (confirm booking)
  │   └── cancel/[token]/          (cancellation page)
  │
  ├── /api/
  │   ├── /admin/                  (protected endpoints)
  │   │   ├── auth/
  │   │   ├── appointments/
  │   │   └── availability/
  │   │
  │   ├── /bookings/               (public endpoints)
  │   ├── /appointments/[token]/   (cancellation)
  │   ├── /services/
  │   └── /availability/
  │
  └── /login/                      (login page)

/lib/
  ├── db.ts                        (MongoDB connection)
  ├── auth.ts                      (session management)
  ├── email-service.ts             (Nodemailer)
  ├── email-templates.ts           (email HTML)
  ├── date-utils.ts                (date/time helpers)
  ├── models/                      (Zod schemas)
  └── theme.ts                     (brand colors)

/scripts/
  └── send-reminders.ts            (24-hour reminder cron job)
```

## 🔧 Key Technologies

- **Framework:** Next.js 16 (App Router, TypeScript)
- **UI:** Material-UI v9
- **Database:** MongoDB
- **Authentication:** JWT + HTTP-only cookies
- **Email:** Nodemailer + SMTP
- **Hosting:** Vercel
- **Validation:** Zod schemas

## 📊 Current Status

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Foundation (Auth, DB) | ✅ Complete |
| 2 | Admin Availability | ✅ Complete |
| 3 | Public Booking | ✅ Complete |
| 4 | Email System | ✅ Complete |
| 5 | Google Calendar Sync | ⏳ Planned |
| 6 | Admin Management | ✅ Complete |
| 7 | Polish & Testing | 🚧 In Progress |

## 🐛 Known Limitations

- Timezone: Eastern Time only (configurable)
- No payment processing (cash/Venmo by default)
- No SMS confirmations (email only)
- No bulk operations (import/export)
- Google Calendar sync not yet integrated

See [PHASE_PROGRESS.md](./PHASE_PROGRESS.md) for full details.

## 📞 Support

### Technical Issues
- Check relevant documentation above
- See troubleshooting sections in deployment guides
- Contact Michael for code/deployment issues

### User Questions
- See [QUICK_START_CAROLYN.md](./QUICK_START_CAROLYN.md) FAQ section
- Email confirmations are automatic - no action needed
- Reminders sent 24 hours before appointments

### Feedback
- Want to add payment processing?
- Need SMS reminders?
- Want Google Calendar integration?
- Contact developer with requests

## 📝 Maintenance

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Monthly maintenance tasks
- Quarterly updates
- Annual security audit
- Data backup strategy

## 🎓 Learning More

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Material-UI Docs](https://mui.com/material-ui/getting-started/)
- [Zod Docs](https://zod.dev)

## 📄 License

MIT License

---

**Last Updated:** May 2026
**System Status:** Production Ready
**Next Phase:** Google Calendar Sync (Phase 5)

For questions or updates, contact Michael.
