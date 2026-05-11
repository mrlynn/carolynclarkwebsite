import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getResourceBySlug } from '@/lib/resources';
import path from 'path';
import fs from 'fs';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const { db } = await connectToDatabase();

    const lead = await db.collection('leads').findOne({
      download_token: token,
      token_expires_at: { $gt: new Date() },
    });

    if (!lead) {
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      return NextResponse.redirect(
        `${baseUrl}/resources?expired=true`
      );
    }

    const resource = getResourceBySlug(lead.resource_slug);
    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      'private',
      'resources',
      resource.fileName
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    await db.collection('leads').updateOne(
      { _id: lead._id },
      {
        $set: {
          downloaded: true,
          downloaded_at: new Date(),
        },
      }
    );

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resource.fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
