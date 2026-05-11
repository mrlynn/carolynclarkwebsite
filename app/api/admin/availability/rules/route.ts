import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { z } from 'zod';

const CreateRuleSchema = z.object({
  day_of_week: z.number().min(0).max(6),
  time_start: z.string().regex(/^\d{2}:\d{2}$/),
  time_end: z.string().regex(/^\d{2}:\d{2}$/),
  buffer_minutes: z.number().int().default(30),
  is_active: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const rules = await db
      .collection('availability_rules')
      .find({})
      .sort({ day_of_week: 1 })
      .toArray();

    return NextResponse.json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = CreateRuleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const insertResult = await db.collection('availability_rules').insertOne({
      ...parsed.data,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json(
      { _id: insertResult.insertedId, ...parsed.data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
