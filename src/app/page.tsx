'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AddBookmarkBar from '@/components/AddBookmarkBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import { useAppStore } from '@/lib/store';

export default function Dashboard() {
  const selectedBoardId = useAppStore((s) => s.selectedBoardId);
  const boards = useAppStore((s) => s.boards);
  const filterPlatform = useAppStore((s) => s.filterPlatform);

  const currentBoard = boards.find((b) => b.id === selectedBoardId);
  const pageTitle = filterPlatform
    ? `Платформа: ${filterPlatform}`
    : currentBoard?.name || 'Все закладки';
  const pageEmoji = currentBoard?.emoji || '📚';

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>{pageEmoji}</span>
              {pageTitle}
            </h2>
            <p className="text-sm text-[var(--text-tertiary)] mt-1">
              Сохраняйте, организуйте и находите контент с помощью AI
            </p>
          </div>

          {/* Add Bookmark */}
          <AddBookmarkBar />

          {/* Bookmarks Grid */}
          <BookmarkGrid />
        </div>
      </main>
    </div>
  );
}
