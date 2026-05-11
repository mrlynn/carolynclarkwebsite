import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email-service';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional().default(''),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  turnstileToken: z.string(),
});

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not set, skipping verification');
    return true;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { name, email, phone, message, turnstileToken } = parsed.data;

    // Verify Turnstile
    const isValidCaptcha = await verifyTurnstile(turnstileToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (!adminEmail) {
      console.error('ADMIN_EMAIL not configured');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>

      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>

      ${phone ? `
      <div class="field">
        <div class="label">Phone</div>
        <div class="value"><a href="tel:${phone}">${phone}</a></div>
      </div>
      ` : ''}

      <div class="field">
        <div class="label">Message</div>
        <div class="value">${message}</div>
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 0.9rem; color: #999; margin: 0;">
        This message was sent from the contact form on your website.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const result = await sendEmail({
      to: adminEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (!result.success) {
      console.error('Failed to send contact email:', result.error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
