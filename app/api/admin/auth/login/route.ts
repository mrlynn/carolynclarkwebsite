import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { createSession } from '@/lib/auth';
import { LoginSchema } from '@/lib/models/admin-user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const { db } = await connectToDatabase();

    const adminUser = await db.collection('admin_users').findOne({ email });

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, adminUser.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await db.collection('admin_users').updateOne(
      { _id: adminUser._id },
      { $set: { last_login: new Date() } }
    );

    // Create session
    await createSession({
      adminId: adminUser._id.toString(),
      email: adminUser.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
