import { NextRequest, NextResponse } from 'next/server';
// In production, import { prisma } from '@/lib/db';

// GET /api/bookmarks — List all bookmarks for current user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const platform = searchParams.get('platform');
    const boardId = searchParams.get('boardId');
    const search = searchParams.get('search');

    // In production:
    // const where: Prisma.BookmarkWhereInput = {
    //   userId: currentUser.id,
    //   ...(platform && { platform: platform as Platform }),
    //   ...(boardId && { boards: { some: { boardId } } }),
    //   ...(search && {
    //     OR: [
    //       { title: { contains: search, mode: 'insensitive' } },
    //       { description: { contains: search, mode: 'insensitive' } },
    //       { aiSummary: { contains: search, mode: 'insensitive' } },
    //       { tags: { some: { tag: { name: { contains: search, mode: 'insensitive' } } } } },
    //     ],
    //   }),
    // };
    //
    // const bookmarks = await prisma.bookmark.findMany({
    //   where,
    //   include: {
    //     tags: { include: { tag: true } },
    //     boards: { include: { board: true } },
    //   },
    //   orderBy: [
    //     { isPinned: 'desc' },
    //     { savedAt: 'desc' },
    //   ],
    //   skip: (page - 1) * limit,
    //   take: limit,
    // });

    return NextResponse.json({
      message: 'Connect database to enable this endpoint',
      page,
      limit,
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}

// POST /api/bookmarks — Create new bookmark
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, title, description, author, thumbnailUrl, aiSummary, platform, contentType, tags } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // In production:
    // const bookmark = await prisma.bookmark.create({
    //   data: {
    //     userId: currentUser.id,
    //     url,
    //     title,
    //     description,
    //     author,
    //     thumbnailUrl,
    //     aiSummary,
    //     platform,
    //     contentType,
    //     tags: {
    //       create: tags.map((tagName: string) => ({
    //         tag: {
    //           connectOrCreate: {
    //             where: { name: tagName },
    //             create: { name: tagName, isAiGenerated: true },
    //           },
    //         },
    //       })),
    //     },
    //   },
    //   include: {
    //     tags: { include: { tag: true } },
    //   },
    // });

    return NextResponse.json({
      message: 'Bookmark saved (demo mode)',
      data: body,
    });
  } catch (error) {
    console.error('Create bookmark error:', error);
    return NextResponse.json(
      { error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
}

// DELETE /api/bookmarks — Delete bookmark
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Bookmark ID is required' },
        { status: 400 }
      );
    }

    // In production:
    // await prisma.bookmark.delete({ where: { id } });

    return NextResponse.json({ message: 'Bookmark deleted (demo mode)' });
  } catch (error) {
    console.error('Delete bookmark error:', error);
    return NextResponse.json(
      { error: 'Failed to delete bookmark' },
      { status: 500 }
    );
  }
}
