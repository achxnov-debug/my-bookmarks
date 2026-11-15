import { NextRequest, NextResponse } from 'next/server';
import { analyzeContent } from '@/lib/ai';

/**
 * POST /api/ai/tags
 * Generate AI tags and summary for a bookmark
 *
 * Body: { title: string, description?: string, platform?: string, contentType?: string }
 * Response: { tags: string[], summary: string }
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

    const result = await analyzeContent(title, description, platform, contentType);
    return NextResponse.json(result);
  } catch (error) {
    console.error('AI tags error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI tags' },
      { status: 500 }
    );
  }
}
