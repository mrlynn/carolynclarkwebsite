import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    const { db } = await connectToDatabase();

    const filter: Record<string, any> = { status: 'active' };
    if (featured) {
      filter.featured = true;
    }

    const services = await db
      .collection('services')
      .find(filter)
      .toArray();

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
