# Quick Start Guide for Carolyn

Welcome! This guide explains how to use your new booking system. You don't need to know technical details — just follow these steps.

## First Time Setup (Admin)

### 1. Login to Your Admin Dashboard

- Go to your website URL + `/login`
- Email: `admin@example.com`
- Password: `password123` (change this immediately!)

### 2. Change Your Password

First thing: change that default password to something secure.
- (Feature available in admin settings)

### 3. Set Your Working Hours

Go to **Availability > Rules**:

1. Click "Add Rule" for each day you work
2. Example:
   - Monday: 9:00 AM - 5:00 PM (buffer: 30 min)
   - Tuesday: 9:00 AM - 5:00 PM (buffer: 30 min)
   - ... etc

3. Click "Regenerate Slots" to create available time slots for the next 3 months

### 4. Block Out Time Off

Go to **Availability > Calendar**:

1. Click on dates you're NOT available
2. Can block out lunch breaks, vacation days, etc.

Done! You're ready to accept bookings.

---

## Daily Operations

### Checking New Bookings

1. Go to **Appointments**
2. You'll see all bookings with client details
3. New bookings get instant notification emails

### Responding to Clients

When a client books:

1. They get a confirmation email automatically ✓
2. You get notified by email ✓
3. They receive a reminder 24 hours before ✓
4. They can cancel themselves with a link in the email ✓

You don't need to do anything unless:

- Client has special requests → Check "Notes" section
- You need to reschedule them → Call/email them directly
- You need to cancel → Go to appointment detail page and click "Cancel"

### Managing Individual Appointments

Go to **Appointments**, find the appointment, click "View":

**You can:**
- ✓ See all client details and notes
- ✓ Change appointment status (pending → confirmed → completed)
- ✓ Add or edit internal notes
- ✓ Resend confirmation email if client didn't receive it
- ✓ Resend reminder if needed
- ✓ Cancel appointment (refund will be noted)

---

## Email Confirmations

### What Your Clients Receive

**When they book:**
- Confirmation email with appointment details
- Link to cancel appointment (good for 30 days)

**24 hours before appointment:**
- Reminder email with time and service details

**If they cancel:**
- Confirmation email showing cancellation
- Refund information

**You (admin) receive:**
- New booking notification email
- Full client contact info and notes
- Link to manage in admin dashboard

### If Email Doesn't Work

Emails can fail sometimes. If a client says they didn't get one:

1. Go to appointment detail page
2. Click "Resend Confirmation" or "Resend Reminder"
3. Can resend anytime

---

## Cancellations & Rescheduling

### Client Self-Cancellation (Preferred)

Clients get a cancellation link in their confirmation email:
- Valid for 30 days
- They can click anytime to cancel
- You get notified immediately
- Full refund applies

### Admin Cancellation

If client calls to cancel:
1. Go to **Appointments** → find booking
2. Click "View" 
3. Click "Cancel Appointment"
4. They get cancellation email automatically

### Rescheduling

If client wants to reschedule:
1. **Option A (Easy):** Have them cancel the old appointment (via email link or by contacting you) and book a new one
2. **Option B (Admin):** You can update the date/time directly if you add that feature later

---

## Understanding Your Dashboard

### Appointments Page

Shows all your bookings in a table:
- **Search** any client name, email, phone, or service
- **Filter** by status (confirmed, completed, cancelled, pending)
- **Sort** by clicking column headers (date, client name, status)
- **View** details by clicking the "View" button

### Availability Page

Visual calendar showing:
- 🟩 Green = Available time slots
- 🟥 Red = Booked appointments
- Click any day to see time slots
- Click time slot to block it (lunch, off, etc.)

### Rules Page

Where you set your regular working hours:
- Add/edit hours for each day
- Set buffer time between appointments (default 30 min)
- Click "Regenerate Slots" when you change hours

---

## Common Questions

**Q: How far ahead can clients book?**
A: 3 months in advance (configurable)

**Q: How far in advance do they get reminders?**
A: 24 hours before appointment

**Q: Can I have different hours each day?**
A: Yes! Set different times in the Rules

**Q: What if someone books the same time as someone else?**
A: Impossible! The system prevents double-booking automatically

**Q: Can I see past appointments?**
A: Yes, on the Appointments page. Filter by "completed" or "cancelled" status

**Q: What if a client doesn't show up?**
A: You can mark as "cancelled" or note it in the appointment

**Q: Can I give discount codes?**
A: Not yet, but can be added. For now, note in appointment and handle outside system

**Q: What about deposits/payments?**
A: Currently no payment processing. You handle payments outside this system (Venmo, cash, etc.)

---

## Backup & Data

**Your data is backed up automatically.** You don't need to do anything.

But you should:
- ✓ Check email confirmations are working
- ✓ Test the system monthly
- ✓ Review canceled/no-show appointments

---

## Need Help?

Check these docs:
- **Technical questions:** `docs/DEPLOYMENT.md`
- **Email issues:** `docs/EMAIL_SETUP.md`
- **Full system overview:** `docs/PHASE_PROGRESS.md`

For code/technical issues: Contact the developer (Michael)

---

## Pro Tips

1. **Backup your data:** No passwords or payment info stored, just appointment details
2. **Time zones:** All times shown in Eastern Time
3. **Client notes:** Add any notes for yourself about clients
4. **Test it:** Send yourself a test booking to see how emails look
5. **Review reminders:** Check that reminder emails are sending after 24 hours

---

## What's Next?

Current system is fully functional! Possible future enhancements:
- [ ] Online payment processing
- [ ] SMS reminders
- [ ] Calendar sync with your Google Calendar
- [ ] Testimonials/reviews
- [ ] Package deals (prepay for multiple sessions)
- [ ] Referral tracking

Let me know if you want any of these added!

---

## Questions While Using?

If something doesn't work as expected:

1. **Take a screenshot** of what you're seeing
2. **Note the time and date** of the issue
3. **Tell me:**
   - What you were trying to do
   - What happened instead
   - What you expected to happen

This helps fix issues quickly!

---

Enjoy your new booking system! 🎉
