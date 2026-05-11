import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { startOfDay, endOfDay } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const serviceDurationMinutes = searchParams.get('serviceDurationMinutes');

    if (!date || !serviceDurationMinutes) {
      return NextResponse.json(
        { error: 'date and serviceDurationMinutes are required' },
        { status: 400 }
      );
    }

    const dateObj = new Date(date);
    const duration = parseInt(serviceDurationMinutes);

    const { db } = await connectToDatabase();

    // Get all slots for the requested date
    const allSlots = await db
      .collection('availability_slots')
      .find({
        date: {
          $gte: startOfDay(dateObj),
          $lte: endOfDay(dateObj),
        },
        is_available: true,
        is_break: false,
      })
      .sort({ time_start: 1 })
      .toArray();

    // Get booked appointments for this date
    const bookedAppointments = await db
      .collection('appointments')
      .find({
        scheduled_at: {
          $gte: startOfDay(dateObj),
          $lt: endOfDay(dateObj),
        },
        status: { $ne: 'cancelled' },
      })
      .toArray();

    // Filter slots to only include ones that fit the service duration
    const availableSlots = allSlots
      .filter((slot) => {
        // Check if this slot matches the requested service duration
        const slotStart = slot.time_start;
        const slotEnd = slot.time_end;

        // Parse times
        const [startHour, startMin] = slotStart.split(':').map(Number);
        const [endHour, endMin] = slotEnd.split(':').map(Number);

        const slotDurationMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);

        // Only include if slot is exactly the right duration
        if (slotDurationMinutes !== duration) {
          return false;
        }

        // Check if slot is booked
        const isBooked = bookedAppointments.some((apt) => {
          const aptDate = new Date(apt.scheduled_at);
          const aptStartHour = aptDate.getHours();
          const aptStartMin = aptDate.getMinutes();
          const aptStart = `${String(aptStartHour).padStart(2, '0')}:${String(aptStartMin).padStart(2, '0')}`;

          return aptStart === slotStart;
        });

        return !isBooked;
      });

    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
