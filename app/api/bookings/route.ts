import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { generateCancelToken, getCancelTokenExpiry } from '@/lib/date-utils';
import { BookingFormSchema } from '@/lib/models/appointment';
import { getConfirmationEmailTemplate, getAdminNotificationTemplate } from '@/lib/email-templates';
import { sendEmail } from '@/lib/email-service';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = BookingFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { serviceId, clientName, clientEmail, clientPhone, clientNotes, scheduledAt, duration_minutes } = parsed.data;
    const { db } = await connectToDatabase();

    // Get service details
    const service = await db.collection('services').findOne({
      _id: new ObjectId(serviceId),
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Look up price for the selected duration
    const durationOption = service.durations.find((d: any) => d.durationMinutes === duration_minutes);
    if (!durationOption) {
      return NextResponse.json(
        { error: 'Selected duration is not available for this service' },
        { status: 400 }
      );
    }

    // Check if slot is still available
    const existingAppointment = await db.collection('appointments').findOne({
      scheduled_at: new Date(scheduledAt),
      status: { $ne: 'cancelled' },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This time slot is no longer available. Please select another time.' },
        { status: 409 }
      );
    }

    // Create appointment
    const cancelToken = generateCancelToken();
    const appointment = {
      service_id: new ObjectId(serviceId),
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      client_notes: clientNotes || '',
      scheduled_at: new Date(scheduledAt),
      duration_minutes: duration_minutes,
      total_price: durationOption.price,
      status: 'confirmed',
      confirmation_sent: false,
      reminder_sent: false,
      cancel_token: cancelToken,
      cancel_token_expires_at: getCancelTokenExpiry(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection('appointments').insertOne(appointment);

    // Send confirmation email to client
    const cancelLink = `${process.env.NEXT_PUBLIC_SITE_URL}/booking/cancel/${cancelToken}`;
    const confirmationHtml = getConfirmationEmailTemplate({
      clientName,
      serviceName: service.name,
      scheduledAt: new Date(scheduledAt),
      duration: duration_minutes,
      price: durationOption.price,
      cancelLink,
    });

    const confirmationResult = await sendEmail({
      to: clientEmail,
      subject: `Appointment Confirmed - ${service.name}`,
      html: confirmationHtml,
    });

    if (confirmationResult.success) {
      await db.collection('appointments').updateOne(
        { _id: result.insertedId },
        {
          $set: {
            confirmation_sent: true,
            confirmation_sent_at: new Date(),
          }
        }
      );
    }

    // Send admin notification email
    const adminHtml = getAdminNotificationTemplate({
      clientName,
      clientEmail,
      clientPhone,
      clientNotes,
      serviceName: service.name,
      scheduledAt: new Date(scheduledAt),
      duration: duration_minutes,
      price: durationOption.price,
    });

    await sendEmail({
      to: process.env.ADMIN_EMAIL || '',
      subject: `New Appointment: ${service.name} with ${clientName}`,
      html: adminHtml,
    });

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...appointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
