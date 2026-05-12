import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

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

    // Use UTC-based date range for consistency
    const dayStart = new Date(dateObj);
    dayStart.setUTCHours(0, 0, 0, 0);
    const dayEnd = new Date(dateObj);
    dayEnd.setUTCHours(23, 59, 59, 999);

    // Get all slots for the requested date (using UTC)
    const allSlots = await db
      .collection('availability_slots')
      .find({
        date: {
          $gte: dayStart,
          $lte: dayEnd,
        },
        is_available: true,
        is_break: false,
      })
      .sort({ time_start: 1 })
      .toArray();

    // Get booked appointments for this date (using UTC)

    const bookedAppointments = await db
      .collection('appointments')
      .find({
        scheduled_at: {
          $gte: dayStart,
          $lte: dayEnd,
        },
        status: { $ne: 'cancelled' },
      })
      .toArray();

    // Get buffer time from availability rules
    const rules = await db.collection('availability_rules').find({}).toArray();
    const bufferMinutes = rules.length > 0 ? (rules[0].buffer_minutes || 0) : 0;

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

        // Only include if slot is long enough for the requested duration
        if (slotDurationMinutes < duration) {
          return false;
        }

        // Check if slot is booked (check for overlap including buffer time)
        const isBooked = bookedAppointments.some((apt) => {
          // slot.time_start is in LOCAL business time, so use setHours (not setUTCHours)
          const slotDateTime = new Date(slot.date);
          const [slotHour, slotMin] = slotStart.split(':').map(Number);
          slotDateTime.setHours(slotHour, slotMin, 0, 0);

          const slotEndDateTime = new Date(slotDateTime.getTime() + duration * 60000);

          // Appointment blocked time includes buffer before and after
          const aptStart = new Date(new Date(apt.scheduled_at).getTime() - bufferMinutes * 60000);
          const aptEnd = new Date(new Date(apt.scheduled_at).getTime() + (apt.duration_minutes + bufferMinutes) * 60000);

          // Check for time overlap
          return slotDateTime < aptEnd && slotEndDateTime > aptStart;
        });

        return !isBooked;
      })
      .reduce((unique: typeof allSlots, slot) => {
        // Deduplicate: keep only the first slot for each time_start
        if (!unique.find(s => s.time_start === slot.time_start)) {
          unique.push(slot);
        }
        return unique;
      }, []);

    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
