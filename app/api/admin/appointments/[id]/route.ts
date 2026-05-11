import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const appointmentId = params.id;

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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const appointmentId = params.id;
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

    const result = await db.collection('appointments').updateOne(
      { _id: new ObjectId(appointmentId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const appointmentId = params.id;

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
