import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');

    const filter: any = {};

    if (startDate || endDate) {
      filter.scheduled_at = {};
      if (startDate) {
        filter.scheduled_at.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.scheduled_at.$lte = new Date(endDate);
      }
    }

    if (status) {
      filter.status = status;
    }

    const { db } = await connectToDatabase();
    const appointments = await db
      .collection('appointments')
      .find(filter)
      .sort({ scheduled_at: 1 })
      .toArray();

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
