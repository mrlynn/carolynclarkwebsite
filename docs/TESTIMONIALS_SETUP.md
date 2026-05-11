# Testimonials & Reviews System Setup Guide

## Overview

The testimonials system allows customers to leave reviews on your website and encourages them to also leave reviews on your Google Business Profile. The system includes:

- ✅ Public testimonials page at `/testimonials`
- ✅ Admin dashboard at `/admin/testimonials` for managing reviews
- ✅ Automatic review request emails after appointments
- ✅ Featured testimonials display on homepage
- ✅ Mobile-responsive design

## Quick Start

### 1. **Seed Test Data (Optional)**

To populate the site with 10 realistic mock testimonials for testing:

```bash
npm run seed:testimonials
```

This creates:
- 9 approved testimonials (3 featured)
- 1 pending testimonial (awaiting approval)
- Mix of 4-5 star ratings
- Both MFR and massage service reviews

**To clear mock data:**
Use MongoDB Compass or your MongoDB client to run:
```javascript
db.testimonials.deleteMany({})
```

### 2. **Start the Dev Server**

```bash
npm run dev
```

### 3. **Test the Features**

#### View Testimonials Page
- Visit: `http://localhost:3000/testimonials`
- See all approved testimonials displayed in a responsive grid
- Mock testimonials include featured badges and star ratings

#### Submit a Review
1. Click "Share Your Experience" button
2. Fill in the modal form (name, email, rating, title, message)
3. Select service type (optional)
4. Submit
5. Review goes to "Pending" status in admin dashboard

#### Admin Dashboard
1. Visit: `http://localhost:3000/admin` → "Manage Testimonials"
2. See three tabs: Pending, Approved, Rejected
3. For pending reviews:
   - ✅ Click checkmark to approve
   - ❌ Click X to reject
4. For approved reviews:
   - ⭐ Click star to feature/unfeature on homepage
   - 🗑️ Click trash to delete

## How It Works

### Customer Journey

1. **During Booking** → Customer books appointment
2. **After Appointment** → Admin marks appointment as "completed"
3. **Automatic Email** → Review request email sent (24-48 hours after, but can be customized)
4. **Customer Reviews** → They either:
   - Submit review on `/testimonials` page, OR
   - Leave review on Google Business Profile, OR
   - Both!
5. **Admin Approves** → Review appears on website

### Review Lifecycle

```
Customer Submits → Pending (Admin Reviews) → Approved (Public) → Featured (Optional)
                                          ↘ Rejected (Hidden)
```

## Configuration

### Email Customization

Edit `/website/lib/email-templates.ts` → `getReviewRequestEmailTemplate()`:

```typescript
export function getReviewRequestEmailTemplate(data: ReviewRequestEmailData): string {
  // Customize email copy, colors, links
}
```

**Key links to update:**
- Google Business Profile URL (currently placeholder)
- Testimonials page URL (auto-filled from SITE_URL env var)

### Database Schema

Testimonials collection structure:
```javascript
{
  _id: ObjectId,
  client_name: string,           // Required
  client_email: string,          // Required
  rating: 1-5,                   // Required
  title: string,                 // Required (headline)
  content: string,               // Required (min 20 chars)
  service: string,               // "myofascial_release" | "therapeutic_massage" | "other"
  source: string,                // "internal" | "google" | "imported"
  status: string,                // "pending" | "approved" | "rejected"
  is_featured: boolean,          // Pinned to homepage
  created_at: Date,
  updated_at: Date,
  approved_at: Date?,            // When approved
  approved_by: ObjectId?,        // Admin user who approved
}
```

## Features

### 🎯 Review Collection

- **In-App Form** → Direct submission on `/testimonials` page
- **Email Link** → Auto-sent after appointment completion
- **Google Reviews** → CTA to leave on Google Business Profile
- **Moderation** → Admin approval workflow before display

### 🎨 Display

- **Testimonials Page** (`/testimonials`)
  - Grid layout (1 col mobile, 2 col tablet, 3 col desktop)
  - Star ratings and client names
  - Featured badge highlighting
  - Service type badges (MFR, Massage)
  - Social proof messaging

- **Homepage**
  - New "What Our Clients Say" section
  - Link to full testimonials page
  - Drive traffic to reviews

- **Admin Dashboard** (`/admin/testimonials`)
  - Tab-based filtering (Pending, Approved, Rejected)
  - Quick action buttons
  - Batch management capability

### 📧 Email Integration

When an appointment is marked as "completed":
1. System checks if review email was already sent
2. Sends branded review request email
3. Marks `review_requested = true` on appointment
4. Prevents duplicate emails

## API Endpoints

### Public
- `POST /api/testimonials` — Submit new testimonial
- `GET /api/testimonials?limit=20&page=1` — Get approved testimonials

### Admin
- `GET /api/admin/testimonials?status=pending` — Get testimonials by status
- `PATCH /api/admin/testimonials` — Update status/featured
- `DELETE /api/admin/testimonials?id=...` — Delete testimonial

## Best Practices

### ✅ Do

- Moderate reviews before displaying (maintain quality control)
- Feature your best testimonials on homepage
- Send review request emails at right time (post-session)
- Include Google Business review link prominently
- Respond to reviews (build community trust)

### ❌ Don't

- Display unmoderated reviews publicly
- Feature low-star reviews (filter by rating)
- Collect reviews without customer consent
- Make review submission mandatory
- Forget to update Google Business Profile URL

## Troubleshooting

### No testimonials showing?
1. Check if they're approved in admin dashboard
2. Run seed script: `npm run seed:testimonials`
3. Verify MongoDB connection with `npm run seed`

### Modal not submitting?
1. Check browser console for errors
2. Verify form validation (name, email, 20+ char message)
3. Check admin email is configured for notification

### Email not sending?
1. Verify `ADMIN_EMAIL` env var is set
2. Check Nodemailer SMTP config in `.env.local`
3. Review server logs for email service errors

### Featured badge not showing?
1. Must be approved first
2. Then click star icon in admin dashboard
3. Refresh `/testimonials` page

## Next Steps

1. **Add Google Business Profile Widget**
   - Get your Business Profile URL
   - Update testimonials page to embed widget
   - Add link in review request email

2. **Add CTAs to Other Pages**
   - Service pages (`/mfr`, `/massage`)
   - About page (`/about`)
   - Contact page (`/contact`)
   - Follow same pattern as homepage section

3. **Customize Styling**
   - Edit brand colors in `/lib/theme.ts`
   - Adjust testimonial card styling
   - Customize modal appearance

4. **Collect Real Reviews**
   - Start with 5-star customers
   - Encourage detailed stories (not just praise)
   - Gradually build social proof
   - Feature diverse experiences

## Files Modified/Created

### New Files
- `/app/testimonials/page.tsx` — Public testimonials page
- `/app/admin/testimonials/page.tsx` — Admin management dashboard
- `/app/api/testimonials/route.ts` — Testimonial API endpoints
- `/app/api/admin/testimonials/route.ts` — Admin API endpoints
- `/components/TestimonialCard.tsx` — Review display component
- `/components/TestimonialModal.tsx` — Review submission form
- `/lib/models/testimonial.ts` — Database schema
- `/scripts/seed-testimonials.ts` — Test data generator

### Modified Files
- `/app/page.tsx` — Added testimonials section
- `/app/admin/page.tsx` — Added testimonials dashboard link
- `/lib/email-templates.ts` — Added review request template
- `/app/api/admin/appointments/[id]/route.ts` — Integrated review email
- `/package.json` — Added seed:testimonials script

## Support

For issues with the testimonial system, check:
1. MongoDB connection and `testimonials` collection
2. Admin user authentication (`/admin/login`)
3. Environment variables (ADMIN_EMAIL, SITE_URL)
4. Email service configuration
5. Browser console for client-side errors
