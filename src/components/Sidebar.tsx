'use client';

import React, { useState } from 'react';
import {
  Bookmark,
  FolderPlus,
  Hash,
  LayoutDashboard,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { PLATFORM_META, Platform } from '@/lib/types';

export default function Sidebar() {
  const { boards, selectedBoardId, setSelectedBoard, filterPlatform, setFilterPlatform } =
    useAppStore();
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardEmoji, setNewBoardEmoji] = useState('📁');

  const handleAddBoard = () => {
    if (!newBoardName.trim()) return;
    useAppStore.getState().addBoard({
      id: `b${Date.now()}`,
      name: newBoardName.trim(),
      emoji: newBoardEmoji,
      sortOrder: boards.length,
      bookmarkCount: 0,
    });
    setNewBoardName('');
    setShowNewBoard(false);
  };

  const platforms: Platform[] = [
    'youtube', 'twitter', 'instagram', 'tiktok', 'telegram', 'linkedin', 'reddit',
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Bookmark className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[var(--text-primary)]">SocialVault</h1>
            <p className="text-[10px] text-[var(--text-tertiary)] tracking-wider uppercase">AI Bookmark Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {/* Main */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
            Навигация
          </p>
          <div
            className={`sidebar-item ${selectedBoardId === 'all' && !filterPlatform ? 'active' : ''}`}
            onClick={() => { setSelectedBoard('all'); setFilterPlatform(null); }}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Все закладки</span>
          </div>
          <div className="sidebar-item">
            <Sparkles className="w-4 h-4" />
            <span>AI-рекомендации</span>
            <span className="ml-auto badge bg-brand-600/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 text-[10px]">
              скоро
            </span>
          </div>
        </div>

        {/* Boards */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              Борды
            </p>
            <button
              onClick={() => setShowNewBoard(!showNewBoard)}
              className="p-1 rounded-md hover:bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FolderPlus className="w-3.5 h-3.5" />
            </button>
          </div>

          {showNewBoard && (
            <div className="mx-3 mb-2 p-2 rounded-lg bg-[var(--bg-tertiary)] animate-scale-in">
              <div className="flex gap-1.5 mb-1.5">
                <input
                  type="text"
                  value={newBoardEmoji}
                  onChange={(e) => setNewBoardEmoji(e.target.value)}
                  className="w-10 px-1 py-1.5 text-center rounded-md bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm"
                  maxLength={2}
                />
                <input
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="Название борда"
                  className="flex-1 px-2 py-1.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm placeholder-[var(--text-tertiary)]"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBoard()}
                  autoFocus
                />
              </div>
              <button onClick={handleAddBoard} className="w-full py-1.5 rounded-md bg-brand-600 text-white text-xs font-medium hover:bg-brand-700 transition-colors">
                Создать
              </button>
            </div>
          )}

          {boards.filter(b => b.id !== 'all').map((board) => (
            <div
              key={board.id}
              className={`sidebar-item ${selectedBoardId === board.id ? 'active' : ''}`}
              onClick={() => { setSelectedBoard(board.id); setFilterPlatform(null); }}
            >
              <span className="text-base">{board.emoji}</span>
              <span className="flex-1 truncate">{board.name}</span>
              {board.bookmarkCount !== undefined && (
                <span className="text-xs text-[var(--text-tertiary)]">{board.bookmarkCount}</span>
              )}
            </div>
          ))}
        </div>

        {/* Platforms filter */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
            Платформы
          </p>
          {platforms.map((p) => {
            const meta = PLATFORM_META[p];
            return (
              <div
                key={p}
                className={`sidebar-item ${filterPlatform === p ? 'active' : ''}`}
                onClick={() => {
                  setFilterPlatform(filterPlatform === p ? null : p);
                  setSelectedBoard('all');
                }}
              >
                <span className="text-base">{meta.icon}</span>
                <span>{meta.label}</span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-[var(--border-color)]">
        <div className="sidebar-item">
          <Settings className="w-4 h-4" />
          <span>Настройки</span>
        </div>
      </div>
    </aside>
  );
}
