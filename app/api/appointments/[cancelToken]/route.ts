import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCancellationEmailTemplate } from '@/lib/email-templates';
import { sendEmail } from '@/lib/email-service';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ cancelToken: string }> }
) {
  try {
    const { cancelToken } = await params;
    const { db } = await connectToDatabase();

    // Find appointment by cancel token
    const appointment = await db.collection('appointments').findOne({
      cancel_token: cancelToken,
      cancel_token_expires_at: { $gt: new Date() },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found or cancel link has expired' },
        { status: 404 }
      );
    }

    // Get service details
    const service = await db.collection('services').findOne({
      _id: appointment.service_id,
    });

    return NextResponse.json({
      _id: appointment._id,
      client_name: appointment.client_name,
      client_email: appointment.client_email,
      service_name: service?.name || 'Service',
      scheduled_at: appointment.scheduled_at,
      duration_minutes: appointment.duration_minutes,
      total_price: appointment.total_price,
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ cancelToken: string }> }
) {
  try {
    const { cancelToken } = await params;
    const { db } = await connectToDatabase();

    // Find appointment by cancel token
    const appointment = await db.collection('appointments').findOne({
      cancel_token: cancelToken,
      cancel_token_expires_at: { $gt: new Date() },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found or cancel link has expired' },
        { status: 404 }
      );
    }

    // Get service details
    const service = await db.collection('services').findOne({
      _id: appointment.service_id,
    });

    // Update appointment status to cancelled
    await db.collection('appointments').updateOne(
      { _id: appointment._id },
      {
        $set: {
          status: 'cancelled',
          updated_at: new Date(),
        }
      }
    );

    // Send cancellation email to client
    const cancellationHtml = getCancellationEmailTemplate({
      clientName: appointment.client_name,
      serviceName: service?.name || 'Service',
      scheduledAt: appointment.scheduled_at,
      refund: appointment.total_price,
    });

    await sendEmail({
      to: appointment.client_email,
      subject: 'Appointment Cancelled',
      html: cancellationHtml,
    });

    // Send admin notification
    const adminHtml = `
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #E8A87C; color: white; padding: 20px; text-align: center; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Appointment Cancelled</h2>
    </div>
    <p><strong>${appointment.client_name}</strong> cancelled their appointment for <strong>${service?.name}</strong> on <strong>${appointment.scheduled_at.toLocaleDateString()}</strong>.</p>
    <p>This time slot is now available for rebooking.</p>
  </div>
</body>
</html>
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL || '',
      subject: `Appointment Cancelled: ${service?.name} with ${appointment.client_name}`,
      html: adminHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Appointment cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
