import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDashboardData } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getDashboardData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
