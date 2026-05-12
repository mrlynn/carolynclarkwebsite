import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { CreateServiceSchema } from '@/lib/schemas/serviceSchema';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const { db } = await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const filter: Record<string, any> = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const services = await db
      .collection('services')
      .find(filter)
      .sort({ name: 1 })
      .toArray();

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const body = await request.json();

    const parsed = CreateServiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || 'Validation failed',
        },
        { status: 422 }
      );
    }

    const { db } = await connectToDatabase();

    const slug = generateSlug(parsed.data.name);

    const existing = await db.collection('services').findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A service with this name already exists' },
        { status: 409 }
      );
    }

    const service = {
      name: parsed.data.name,
      description: parsed.data.description,
      category: parsed.data.category,
      slug,
      status: 'active',
      featured: parsed.data.featured ?? false,
      durations: parsed.data.durations,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.adminId,
    };

    const result = await db.collection('services').insertOne(service);

    return NextResponse.json(
      {
        success: true,
        service: { _id: result.insertedId, ...service },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
