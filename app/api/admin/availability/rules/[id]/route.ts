import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

const UpdateRuleSchema = z.object({
  day_of_week: z.number().min(0).max(6).optional(),
  time_start: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  time_end: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  buffer_minutes: z.number().int().optional(),
  is_active: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: ruleId } = await params;
    const body = await request.json();
    const parsed = UpdateRuleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('availability_rules').findOneAndUpdate(
      { _id: new ObjectId(ruleId) },
      { $set: { ...parsed.data, updated_at: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error('Error updating rule:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: ruleId } = await params;
    const { db } = await connectToDatabase();
    const result = await db.collection('availability_rules').deleteOne({
      _id: new ObjectId(ruleId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting rule:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
