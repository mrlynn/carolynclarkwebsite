import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { sendEmail } from '@/lib/email-service';
import { TestimonialSchema } from '@/lib/models/testimonial';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = TestimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { client_name, client_email, rating, title, content, service, appointment_id } = parsed.data;

    const { db } = await connectToDatabase();

    // Create testimonial document
    const testimonialData = {
      client_name,
      client_email,
      rating,
      title,
      content,
      service,
      appointment_id: appointment_id ? new ObjectId(appointment_id) : null,
      source: 'internal' as const,
      status: 'pending' as const,
      is_featured: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection('testimonials').insertOne(testimonialData);

    // Update appointment if provided
    if (appointment_id) {
      await db.collection('appointments').updateOne(
        { _id: new ObjectId(appointment_id) },
        {
          $set: {
            review_submitted: true,
            review_submitted_at: new Date(),
          },
        }
      );
    }

    // Notify admin of pending review
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #E8A87C; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #F5F0EC; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { background: white; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #E8A87C; }
    .label { font-weight: 600; color: #555; font-size: 0.9rem; text-transform: uppercase; }
    .value { color: #333; margin-top: 5px; word-break: break-word; white-space: pre-wrap; }
    .stars { color: #E8A87C; font-size: 1.2rem; }
    .button { display: inline-block; background: #7B9B6E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ New Review Received</h1>
    </div>
    <div class="content">
      <p>A new testimonial has been submitted and is awaiting your approval:</p>

      <div class="field">
        <div class="label">Client Name</div>
        <div class="value">${client_name}</div>
      </div>

      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${client_email}">${client_email}</a></div>
      </div>

      <div class="field">
        <div class="label">Service</div>
        <div class="value">${service === 'myofascial_release' ? 'Myofascial Release' : service === 'therapeutic_massage' ? 'Therapeutic Massage' : 'Other'}</div>
      </div>

      <div class="field">
        <div class="label">Rating</div>
        <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
      </div>

      <div class="field">
        <div class="label">Title</div>
        <div class="value"><strong>${title}</strong></div>
      </div>

      <div class="field">
        <div class="label">Review</div>
        <div class="value">${content}</div>
      </div>

      <p>Please review and approve this testimonial in your admin dashboard when you have a chance.</p>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 0.9rem; color: #999; margin: 0;">
        This is an automated notification from your website.
      </p>
    </div>
  </div>
</body>
</html>
      `;

      await sendEmail({
        to: adminEmail,
        subject: `New Testimonial from ${client_name}`,
        html: emailHtml,
        replyTo: client_email,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your review! We appreciate your feedback.',
      testimonialId: result.insertedId,
    });
  } catch (error) {
    console.error('Testimonial submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET approved testimonials for public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const featured = searchParams.get('featured') === 'true';

    const filter: any = { status: 'approved' };
    if (featured) {
      filter.is_featured = true;
    }

    const { db } = await connectToDatabase();

    const skip = (page - 1) * limit;
    const testimonials = await db
      .collection('testimonials')
      .find(filter)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('testimonials').countDocuments(filter);

    return NextResponse.json({
      success: true,
      testimonials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
