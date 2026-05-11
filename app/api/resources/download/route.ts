import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { sendEmail } from '@/lib/email-service';
import { getResourceBySlug, generateDownloadToken } from '@/lib/resources';
import { getLeadMagnetEmailTemplate } from '@/lib/lead-magnet-email-template';

const LeadCaptureSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  email: z
    .string()
    .email('Please enter a valid email')
    .transform((v) => v.toLowerCase().trim()),
  resourceSlug: z.string().min(1),
  turnstileToken: z.string().min(1),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not set, skipping verification');
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = LeadCaptureSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { firstName, email, resourceSlug, turnstileToken } = parsed.data;

    const isValid = await verifyTurnstile(turnstileToken);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }

    const resource = getResourceBySlug(resourceSlug);
    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    const { db } = await connectToDatabase();
    const downloadToken = generateDownloadToken();
    const tokenExpiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000);

    await db.collection('leads').updateOne(
      { email, resource_slug: resourceSlug },
      {
        $set: {
          first_name: firstName,
          download_token: downloadToken,
          token_expires_at: tokenExpiresAt,
          downloaded: false,
          downloaded_at: null,
          updated_at: new Date(),
        },
        $setOnInsert: {
          email,
          resource_slug: resourceSlug,
          created_at: new Date(),
        },
      },
      { upsert: true }
    );

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const downloadUrl = `${baseUrl}/api/resources/download/${downloadToken}`;

    const emailHtml = getLeadMagnetEmailTemplate({
      firstName,
      resourceTitle: resource.title,
      downloadUrl,
    });

    await sendEmail({
      to: email,
      subject: `Your Free Guide: ${resource.title}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Check your email for the download link!',
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
