'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Loader2, Plus, Sparkles, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { parseUrl } from '@/lib/parser';
import { analyzeContent } from '@/lib/ai';
import { Bookmark, PLATFORM_META, CONTENT_TYPE_META, TAG_COLORS } from '@/lib/types';

export default function AddBookmarkBar() {
  const { addBookmark } = useAppStore();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<Bookmark | null>(null);
  const [error, setError] = useState('');

  const handleParse = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    setError('');
    setPreview(null);

    try {
      // Validate URL
      new URL(url);

      // Parse URL metadata
      const parsed = await parseUrl(url);

      // AI analysis
      const aiResult = await analyzeContent(
        parsed.title,
        parsed.description,
        parsed.platform,
        parsed.contentType
      );

      // Build bookmark preview
      const bookmark: Bookmark = {
        id: `bk-${Date.now()}`,
        url: parsed.url,
        title: parsed.title,
        description: parsed.description,
        author: parsed.author,
        thumbnailUrl: parsed.thumbnailUrl,
        aiSummary: aiResult.summary,
        platform: parsed.platform,
        contentType: parsed.contentType,
        isPinned: false,
        savedAt: new Date().toISOString(),
        tags: aiResult.tags.map((name, i) => ({
          id: `tag-${Date.now()}-${i}`,
          name,
          color: TAG_COLORS[i % TAG_COLORS.length],
          isAiGenerated: true,
        })),
        boards: [],
      };

      setPreview(bookmark);
    } catch (e) {
      setError('Некорректная ссылка. Проверьте URL и попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!preview) return;
    addBookmark(preview);
    setPreview(null);
    setUrl('');
  };

  const handleCancel = () => {
    setPreview(null);
    setUrl('');
    setError('');
  };

  return (
    <div className="mb-6">
      {/* URL Input */}
      <div className="card p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleParse()}
              placeholder="Вставьте ссылку из соцсетей (YouTube, Instagram, Twitter, TikTok...)"
              className="input-field pl-10"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleParse}
            disabled={isLoading || !url.trim()}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Парсинг...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Добавить
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-500">{error}</p>
        )}
      </div>

      {/* Preview Card */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-3"
          >
            <div className="card p-4 border-brand-500/30 bg-brand-600/5 dark:bg-brand-500/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Превью закладки
                  </h3>
                </div>
                <button onClick={handleCancel} className="p-1 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                  <X className="w-4 h-4 text-[var(--text-tertiary)]" />
                </button>
              </div>

              <div className="flex gap-4">
                {/* Thumbnail */}
                {preview.thumbnailUrl && (
                  <img
                    src={preview.thumbnailUrl}
                    alt=""
                    className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  {/* Platform & Type */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="badge text-[10px]"
                      style={{
                        backgroundColor: PLATFORM_META[preview.platform].bgColor,
                        color: PLATFORM_META[preview.platform].color,
                      }}
                    >
                      {PLATFORM_META[preview.platform].icon} {PLATFORM_META[preview.platform].label}
                    </span>
                    <span className="badge bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-[10px]">
                      {CONTENT_TYPE_META[preview.contentType].icon} {CONTENT_TYPE_META[preview.contentType].label}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {preview.title}
                  </h4>
                  {preview.author && (
                    <p className="text-xs text-[var(--text-tertiary)]">{preview.author}</p>
                  )}

                  {/* AI Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {preview.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="badge text-[10px]"
                        style={{ backgroundColor: `${tag.color}18`, color: tag.color }}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* AI Summary */}
                  {preview.aiSummary && (
                    <p className="mt-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-primary)] rounded-lg p-2 border border-[var(--border-color)]">
                      <span className="text-brand-500 font-medium">AI:</span> {preview.aiSummary}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-[var(--border-color)]">
                <button onClick={handleCancel} className="btn-ghost text-sm">
                  Отмена
                </button>
                <button onClick={handleSave} className="btn-primary text-sm flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Сохранить закладку
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
