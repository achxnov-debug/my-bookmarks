import { NextRequest, NextResponse } from 'next/server';
import { parseUrl } from '@/lib/parser';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const parsed = await parseUrl(url);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Parse URL error:', error);
    return NextResponse.json(
      { error: 'Failed to parse URL' },
      { status: 500 }
    );
  }
}
