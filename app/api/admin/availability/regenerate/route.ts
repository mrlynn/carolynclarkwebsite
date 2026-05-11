import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { generateSlotsFromRules } from '@/lib/date-utils';
import type { AvailabilityRule } from '@/lib/models/availability';
import { startOfDay, addDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { startDate, endDate } = await request.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Get availability rules
    const rulesData = await db
      .collection('availability_rules')
      .find({ is_active: true })
      .toArray();

    const rules = rulesData as unknown as AvailabilityRule[];

    // Generate slots for 60-min and 90-min services
    const slots60 = generateSlotsFromRules(
      rules,
      new Date(startDate),
      new Date(endDate),
      60,
      30
    );

    const slots90 = generateSlotsFromRules(
      rules,
      new Date(startDate),
      new Date(endDate),
      90,
      30
    );

    // Delete existing slots in the date range
    await db.collection('availability_slots').deleteMany({
      date: {
        $gte: startOfDay(new Date(startDate)),
        $lte: startOfDay(addDays(new Date(endDate), 1)),
      },
    });

    // Insert new slots (combine both service durations)
    const allSlots = [...slots60, ...slots90];

    if (allSlots.length > 0) {
      await db.collection('availability_slots').insertMany(allSlots);
    }

    return NextResponse.json({
      success: true,
      slotsGenerated: allSlots.length,
    });
  } catch (error) {
    console.error('Error regenerating slots:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
