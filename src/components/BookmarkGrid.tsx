'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import BookmarkCard from './BookmarkCard';
import { Inbox } from 'lucide-react';

export default function BookmarkGrid() {
  const getFilteredBookmarks = useAppStore((s) => s.getFilteredBookmarks);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const bookmarks = getFilteredBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-[var(--text-tertiary)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
          {searchQuery ? 'Ничего не найдено' : 'Пока пусто'}
        </h3>
        <p className="text-sm text-[var(--text-tertiary)] max-w-sm">
          {searchQuery
            ? `По запросу «${searchQuery}» закладок не найдено. Попробуйте другие ключевые слова.`
            : 'Вставьте ссылку из социальной сети в поле выше, чтобы сохранить первую закладку.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[var(--text-tertiary)]">
          {bookmarks.length} {bookmarks.length === 1 ? 'закладка' : 
           bookmarks.length < 5 ? 'закладки' : 'закладок'}
          {searchQuery && (
            <span className="text-brand-500 ml-1">
              по запросу «{searchQuery}»
            </span>
          )}
        </p>
      </div>
      <div className="masonry-grid">
        {bookmarks.map((bookmark, index) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} index={index} />
        ))}
      </div>
    </div>
  );
}
