// ===== Core Types =====

export type Platform =
  | 'instagram'
  | 'tiktok'
  | 'twitter'
  | 'youtube'
  | 'telegram'
  | 'linkedin'
  | 'reddit'
  | 'other';

export type ContentType = 'video' | 'image' | 'text' | 'thread' | 'article';

export interface Tag {
  id: string;
  name: string;
  color: string;
  isAiGenerated: boolean;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  sortOrder: number;
  bookmarkCount?: number;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  author?: string;
  thumbnailUrl?: string;
  aiSummary?: string;
  platform: Platform;
  contentType: ContentType;
  isPinned: boolean;
  savedAt: string;
  tags: Tag[];
  boards: Board[];
}

export interface ParsedUrl {
  url: string;
  title: string;
  description?: string;
  author?: string;
  thumbnailUrl?: string;
  platform: Platform;
  contentType: ContentType;
}

export interface AiTagsResponse {
  tags: string[];
  summary: string;
}

export interface SearchResult {
  bookmark: Bookmark;
  score: number;
}

// ===== Platform metadata =====

export const PLATFORM_META: Record<Platform, {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  domains: string[];
}> = {
  instagram: {
    label: 'Instagram',
    icon: '📸',
    color: '#E4405F',
    bgColor: '#E4405F15',
    domains: ['instagram.com', 'instagr.am'],
  },
  tiktok: {
    label: 'TikTok',
    icon: '🎵',
    color: '#000000',
    bgColor: '#00000010',
    domains: ['tiktok.com', 'vm.tiktok.com'],
  },
  twitter: {
    label: 'X / Twitter',
    icon: '𝕏',
    color: '#1DA1F2',
    bgColor: '#1DA1F215',
    domains: ['twitter.com', 'x.com', 't.co'],
  },
  youtube: {
    label: 'YouTube',
    icon: '▶️',
    color: '#FF0000',
    bgColor: '#FF000012',
    domains: ['youtube.com', 'youtu.be', 'youtube-nocookie.com'],
  },
  telegram: {
    label: 'Telegram',
    icon: '✈️',
    color: '#0088cc',
    bgColor: '#0088cc15',
    domains: ['t.me', 'telegram.me', 'telegram.org'],
  },
  linkedin: {
    label: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    bgColor: '#0A66C215',
    domains: ['linkedin.com', 'lnkd.in'],
  },
  reddit: {
    label: 'Reddit',
    icon: '🟠',
    color: '#FF4500',
    bgColor: '#FF450015',
    domains: ['reddit.com', 'redd.it'],
  },
  other: {
    label: 'Web',
    icon: '🌐',
    color: '#748ffc',
    bgColor: '#748ffc15',
    domains: [],
  },
};

export const CONTENT_TYPE_META: Record<ContentType, {
  label: string;
  icon: string;
}> = {
  video:   { label: 'Видео',       icon: '🎬' },
  image:   { label: 'Изображение', icon: '🖼️' },
  text:    { label: 'Текст',       icon: '📝' },
  thread:  { label: 'Тред',        icon: '🧵' },
  article: { label: 'Статья',      icon: '📰' },
};

export const TAG_COLORS = [
  '#ff6b6b', '#f06595', '#cc5de8', '#845ef7',
  '#5c7cfa', '#339af0', '#22b8cf', '#20c997',
  '#51cf66', '#94d82d', '#fcc419', '#ff922b',
];
