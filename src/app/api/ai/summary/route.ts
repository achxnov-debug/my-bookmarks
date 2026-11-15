import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/ai';

/**
 * POST /api/ai/summary
 * Generate AI summary for a bookmark
 *
 * Body: { title: string, description?: string, platform?: string, contentType?: string }
 * Response: { summary: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { title, description, platform, contentType } = await req.json();

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const summary = await generateSummary(title, description, platform, contentType);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('AI summary error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
