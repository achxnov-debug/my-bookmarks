'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  MoreHorizontal,
  Pin,
  PinOff,
  Trash2,
  Copy,
  FolderPlus,
  Sparkles,
} from 'lucide-react';
import { Bookmark, PLATFORM_META, CONTENT_TYPE_META } from '@/lib/types';
import { useAppStore } from '@/lib/store';

interface Props {
  bookmark: Bookmark;
  index: number;
}

export default function BookmarkCard({ bookmark, index }: Props) {
  const { togglePin, removeBookmark } = useAppStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const platformMeta = PLATFORM_META[bookmark.platform];
  const contentMeta = CONTENT_TYPE_META[bookmark.contentType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card group relative overflow-hidden"
    >
      {/* Pinned indicator */}
      {bookmark.isPinned && (
        <div className="absolute top-3 left-3 z-10">
          <div className="badge bg-amber-500/90 text-white backdrop-blur-sm">
            <Pin className="w-3 h-3" />
            <span>Закреплено</span>
          </div>
        </div>
      )}

      {/* Thumbnail */}
      {bookmark.thumbnailUrl && (
        <div className="relative overflow-hidden">
          <img
            src={bookmark.thumbnailUrl}
            alt={bookmark.title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Platform badge */}
          <div
            className="absolute bottom-2 right-2 badge backdrop-blur-md"
            style={{
              backgroundColor: platformMeta.bgColor,
              color: platformMeta.color,
              border: `1px solid ${platformMeta.color}20`,
            }}
          >
            <span>{platformMeta.icon}</span>
            <span>{platformMeta.label}</span>
          </div>
          {/* Content type */}
          <div className="absolute bottom-2 left-2 badge bg-black/50 text-white backdrop-blur-sm">
            <span>{contentMeta.icon}</span>
            <span>{contentMeta.label}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Author */}
        {bookmark.author && (
          <p className="text-xs text-[var(--text-tertiary)] mb-1.5 font-medium">
            {bookmark.author}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug mb-2 line-clamp-2">
          {bookmark.title}
        </h3>

        {/* AI Summary toggle */}
        {bookmark.aiSummary && (
          <div className="mb-3">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              {showSummary ? 'Скрыть AI-саммари' : 'AI-саммари'}
            </button>
            {showSummary && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 text-xs text-[var(--text-secondary)] leading-relaxed bg-brand-600/5 dark:bg-brand-500/10 rounded-lg p-2.5 border border-brand-600/10"
              >
                {bookmark.aiSummary}
              </motion.p>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {bookmark.tags.map((tag) => (
            <span
              key={tag.id}
              className="badge text-[10px] cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: `${tag.color}18`,
                color: tag.color,
              }}
            >
              {tag.name}
              {tag.isAiGenerated && (
                <Sparkles className="w-2.5 h-2.5 opacity-60" />
              )}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
          <time className="text-[10px] text-[var(--text-tertiary)]">
            {new Date(bookmark.savedAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </time>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              title="Открыть оригинал"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => togglePin(bookmark.id)}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:text-amber-500 transition-colors"
              title={bookmark.isPinned ? 'Открепить' : 'Закрепить'}
            >
              {bookmark.isPinned ? (
                <PinOff className="w-3.5 h-3.5" />
              ) : (
                <Pin className="w-3.5 h-3.5" />
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 bottom-full mb-1 w-44 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] z-20"
                  style={{ boxShadow: 'var(--shadow-lg)' }}
                >
                  <button
                    onClick={() => { navigator.clipboard.writeText(bookmark.url); setShowMenu(false); }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" /> Копировать ссылку
                  </button>
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                    <FolderPlus className="w-3.5 h-3.5" /> Добавить в борд
                  </button>
                  <hr className="my-1 border-[var(--border-color)]" />
                  <button
                    onClick={() => { removeBookmark(bookmark.id); setShowMenu(false); }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Удалить
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
