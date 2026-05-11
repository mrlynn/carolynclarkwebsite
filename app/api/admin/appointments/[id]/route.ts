import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { sendEmail } from '@/lib/email-service';
import { getReviewRequestEmailTemplate } from '@/lib/email-templates';
import { ObjectId } from 'mongodb';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const { id: appointmentId } = await params;

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

    return NextResponse.json({
      _id: appointment._id,
      service_id: appointment.service_id,
      service_name: service?.name || 'Unknown',
      client_name: appointment.client_name,
      client_email: appointment.client_email,
      client_phone: appointment.client_phone,
      client_notes: appointment.client_notes,
      scheduled_at: appointment.scheduled_at,
      duration_minutes: appointment.duration_minutes,
      total_price: appointment.total_price,
      status: appointment.status,
      confirmation_sent: appointment.confirmation_sent,
      reminder_sent: appointment.reminder_sent,
      cancel_token: appointment.cancel_token,
      cancel_token_expires_at: appointment.cancel_token_expires_at,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
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

    if (!ObjectId.isValid(appointmentId)) {
      return NextResponse.json({ error: 'Invalid appointment ID' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};

    if (body.status) {
      const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
      updateData.status = body.status;
    }

    if (body.client_notes !== undefined) {
      updateData.client_notes = body.client_notes;
    }

    updateData.updated_at = new Date();

    // Get the appointment before updating to check current status
    const appointment = await db.collection('appointments').findOne({
      _id: new ObjectId(appointmentId),
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    const result = await db.collection('appointments').updateOne(
      { _id: new ObjectId(appointmentId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Send review request email if status changes to completed and review hasn't been requested
    if (body.status === 'completed' && !appointment.review_requested) {
      const service = await db.collection('services').findOne({
        _id: appointment.service_id,
      });

      const serviceName = service?.name || 'Your Service';

      // Send review request email
      const emailTemplate = getReviewRequestEmailTemplate({
        clientName: appointment.client_name,
        serviceName,
        appointmentDate: appointment.scheduled_at,
        testimonialLink: `${process.env.SITE_URL || 'https://carolynclarkmfr.com'}/testimonials`,
        googleReviewLink: 'https://www.google.com/maps', // Should be updated with actual Google Business profile URL
      });

      const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
      if (adminEmail) {
        await sendEmail({
          to: appointment.client_email,
          subject: 'Help Others Discover Healing - Share Your Experience',
          html: emailTemplate,
        });

        // Mark that review request has been sent
        await db.collection('appointments').updateOne(
          { _id: new ObjectId(appointmentId) },
          {
            $set: {
              review_requested: true,
              review_request_sent_at: new Date(),
            },
          }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const { id: appointmentId } = await params;

    if (!ObjectId.isValid(appointmentId)) {
      return NextResponse.json({ error: 'Invalid appointment ID' }, { status: 400 });
    }

    const appointment = await db.collection('appointments').findOne({
      _id: new ObjectId(appointmentId),
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Update status to cancelled instead of deleting
    await db.collection('appointments').updateOne(
      { _id: new ObjectId(appointmentId) },
      {
        $set: {
          status: 'cancelled',
          updated_at: new Date(),
        }
      }
    );

    // TODO: Send cancellation email to client
    // TODO: Remove from Google Calendar if synced

    return NextResponse.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
