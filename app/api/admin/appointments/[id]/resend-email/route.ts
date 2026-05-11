import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { getConfirmationEmailTemplate, getReminderEmailTemplate } from '@/lib/email-templates';
import { sendEmail } from '@/lib/email-service';
import { ObjectId } from 'mongodb';

type EmailType = 'confirmation' | 'reminder';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const { id: appointmentId } = await params;
    const body = await request.json();
    const emailType: EmailType = body.emailType || 'confirmation';

    if (!ObjectId.isValid(appointmentId)) {
      return NextResponse.json({ error: 'Invalid appointment ID' }, { status: 400 });
    }

    const appointment = await db.collection('appointments').findOne({
      _id: new ObjectId(appointmentId),
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    const service = await db.collection('services').findOne({
      _id: appointment.service_id,
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    let emailHtml: string;
    let subject: string;

    if (emailType === 'confirmation') {
      const cancelLink = `${process.env.NEXT_PUBLIC_SITE_URL}/booking/cancel/${appointment.cancel_token}`;
      emailHtml = getConfirmationEmailTemplate({
        clientName: appointment.client_name,
        serviceName: service.name,
        scheduledAt: appointment.scheduled_at,
        duration: appointment.duration_minutes,
        price: appointment.total_price,
        cancelLink,
      });
      subject = `Appointment Confirmed - ${service.name}`;
    } else if (emailType === 'reminder') {
      emailHtml = getReminderEmailTemplate({
        clientName: appointment.client_name,
        serviceName: service.name,
        scheduledAt: appointment.scheduled_at,
        duration: appointment.duration_minutes,
      });
      subject = `Reminder: Your appointment with Carolyn Clark`;
    } else {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    const result = await sendEmail({
      to: appointment.client_email,
      subject,
      html: emailHtml,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${emailType} email sent to ${appointment.client_email}`,
    });
  } catch (error) {
    console.error('Error resending email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
