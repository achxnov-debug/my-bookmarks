import { create } from 'zustand';
import { Bookmark, Board, Tag, ParsedUrl } from './types';

// ===== Demo Data =====
const DEMO_BOOKMARKS: Bookmark[] = [
  {
    id: '1',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Лучший рецепт пасты карбонара от итальянского шефа',
    description: 'Аутентичный рецепт карбонары: гуанчале, пекорино романо, яйца и чёрный перец. Никаких сливок!',
    author: '@italianfoodacademy',
    thumbnailUrl: 'https://placehold.co/600x340/FF6B6B/fff?text=🍝+Carbonara',
    aiSummary: 'Видео-рецепт классической итальянской пасты карбонара от профессионального шефа. Основной акцент на аутентичности: только гуанчале и пекорино, без сливок.',
    platform: 'youtube',
    contentType: 'video',
    isPinned: true,
    savedAt: '2026-11-14T10:30:00Z',
    tags: [
      { id: 't1', name: '#рецепты', color: '#ff6b6b', isAiGenerated: true },
      { id: 't2', name: '#итальянская_кухня', color: '#ff922b', isAiGenerated: true },
      { id: 't3', name: '#кулинария', color: '#fcc419', isAiGenerated: true },
    ],
    boards: [{ id: 'b1', name: 'Рецепты', emoji: '🍽️', sortOrder: 0 }],
  },
  {
    id: '2',
    url: 'https://twitter.com/figma/status/123456789',
    title: 'Figma Config 2026: 10 новых фич, которые изменят ваш workflow',
    description: 'Подборка главных анонсов с конференции Figma Config: AI-ассистент, 3D-инструменты, новые компоненты.',
    author: '@figma',
    thumbnailUrl: 'https://placehold.co/600x340/845EF7/fff?text=🎨+Figma+Config',
    aiSummary: 'Обзор новинок Figma Config 2026: AI-ассистент для автоматической генерации макетов, встроенные 3D-инструменты и улучшенная работа с компонентами.',
    platform: 'twitter',
    contentType: 'thread',
    isPinned: false,
    savedAt: '2026-11-13T15:20:00Z',
    tags: [
      { id: 't4', name: '#дизайн', color: '#845ef7', isAiGenerated: true },
      { id: 't5', name: '#figma', color: '#cc5de8', isAiGenerated: true },
      { id: 't6', name: '#инструменты', color: '#5c7cfa', isAiGenerated: true },
    ],
    boards: [{ id: 'b2', name: 'Дизайн', emoji: '🎨', sortOrder: 1 }],
  },
  {
    id: '3',
    url: 'https://www.instagram.com/p/ABCdef123/',
    title: 'Минималистичный интерьер квартиры-студии 35 м²',
    author: '@minimalist_home',
    thumbnailUrl: 'https://placehold.co/600x600/20C997/fff?text=🏠+Interior',
    aiSummary: 'Фото минималистичного интерьера компактной студии: светлые тона, многофункциональная мебель, скрытые системы хранения.',
    platform: 'instagram',
    contentType: 'image',
    isPinned: false,
    savedAt: '2026-11-12T09:45:00Z',
    tags: [
      { id: 't7', name: '#интерьер', color: '#20c997', isAiGenerated: true },
      { id: 't8', name: '#минимализм', color: '#339af0', isAiGenerated: true },
    ],
    boards: [{ id: 'b3', name: 'Вдохновение', emoji: '✨', sortOrder: 2 }],
  },
  {
    id: '4',
    url: 'https://www.tiktok.com/@codingwithme/video/987654321',
    title: 'React хук, который заменит useEffect в 90% случаев',
    description: 'useSyncExternalStore — недооценённый хук React. Показываю 3 реальных кейса.',
    author: '@codingwithme',
    thumbnailUrl: 'https://placehold.co/600x400/5C7CFA/fff?text=⚛️+React+Hook',
    aiSummary: 'Короткое видео о React хуке useSyncExternalStore как альтернативе useEffect для подписки на внешние хранилища данных.',
    platform: 'tiktok',
    contentType: 'video',
    isPinned: true,
    savedAt: '2026-11-11T18:00:00Z',
    tags: [
      { id: 't9', name: '#react', color: '#5c7cfa', isAiGenerated: true },
      { id: 't10', name: '#программирование', color: '#339af0', isAiGenerated: true },
      { id: 't11', name: '#frontend', color: '#22b8cf', isAiGenerated: true },
    ],
    boards: [{ id: 'b4', name: 'Dev', emoji: '💻', sortOrder: 3 }],
  },
  {
    id: '5',
    url: 'https://t.me/designchannel/4521',
    title: 'Тренды веб-дизайна 2027: нейроморфизм 2.0 и AI-first интерфейсы',
    description: 'Большой обзор предстоящих трендов в дизайне интерфейсов на 2027 год.',
    author: 'Design Channel',
    thumbnailUrl: 'https://placehold.co/600x340/F06595/fff?text=🔮+Design+Trends',
    aiSummary: 'Подробный обзор трендов веб-дизайна на 2027 год: нейроморфизм 2.0, AI-адаптивные интерфейсы, spatial UI и glassmorphism.',
    platform: 'telegram',
    contentType: 'article',
    isPinned: false,
    savedAt: '2026-11-10T12:30:00Z',
    tags: [
      { id: 't12', name: '#дизайн', color: '#845ef7', isAiGenerated: true },
      { id: 't13', name: '#тренды', color: '#f06595', isAiGenerated: true },
      { id: 't14', name: '#ui_ux', color: '#cc5de8', isAiGenerated: true },
    ],
    boards: [{ id: 'b2', name: 'Дизайн', emoji: '🎨', sortOrder: 1 }],
  },
  {
    id: '6',
    url: 'https://www.linkedin.com/posts/elonmusk/startup-lessons',
    title: '5 уроков, которые я вынес из провалившегося стартапа',
    description: 'Личный опыт: почему мой первый стартап закрылся через 8 месяцев и что я сделал бы иначе.',
    author: '@entrepreneur_ru',
    thumbnailUrl: 'https://placehold.co/600x340/339AF0/fff?text=🚀+Startup',
    aiSummary: 'Пост-рефлексия о неудачном стартапе: ошибки в найме, продуктовая слепота, недооценка unit-экономики, и важность customer development.',
    platform: 'linkedin',
    contentType: 'text',
    isPinned: false,
    savedAt: '2026-11-09T08:15:00Z',
    tags: [
      { id: 't15', name: '#стартап', color: '#339af0', isAiGenerated: true },
      { id: 't16', name: '#бизнес', color: '#22b8cf', isAiGenerated: true },
      { id: 't17', name: '#саморазвитие', color: '#51cf66', isAiGenerated: true },
    ],
    boards: [{ id: 'b5', name: 'Бизнес', emoji: '💰', sortOrder: 4 }],
  },
];

const DEMO_BOARDS: Board[] = [
  { id: 'all', name: 'Все закладки', emoji: '📚', sortOrder: -1, bookmarkCount: 6 },
  { id: 'b1', name: 'Рецепты', emoji: '🍽️', sortOrder: 0, bookmarkCount: 1 },
  { id: 'b2', name: 'Дизайн', emoji: '🎨', sortOrder: 1, bookmarkCount: 2 },
  { id: 'b3', name: 'Вдохновение', emoji: '✨', sortOrder: 2, bookmarkCount: 1 },
  { id: 'b4', name: 'Dev', emoji: '💻', sortOrder: 3, bookmarkCount: 1 },
  { id: 'b5', name: 'Бизнес', emoji: '💰', sortOrder: 4, bookmarkCount: 1 },
];

// ===== Store =====

interface AppState {
  // Data
  bookmarks: Bookmark[];
  boards: Board[];
  allTags: Tag[];

  // UI State
  selectedBoardId: string;
  searchQuery: string;
  filterPlatform: string | null;
  isAddingBookmark: boolean;
  parsedUrl: ParsedUrl | null;

  // Actions
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  togglePin: (id: string) => void;
  setSelectedBoard: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterPlatform: (platform: string | null) => void;
  setIsAddingBookmark: (value: boolean) => void;
  setParsedUrl: (parsed: ParsedUrl | null) => void;
  addBoard: (board: Board) => void;

  // Computed
  getFilteredBookmarks: () => Bookmark[];
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial data
  bookmarks: DEMO_BOOKMARKS,
  boards: DEMO_BOARDS,
  allTags: [],

  // UI State
  selectedBoardId: 'all',
  searchQuery: '',
  filterPlatform: null,
  isAddingBookmark: false,
  parsedUrl: null,

  // Actions
  addBookmark: (bookmark) =>
    set((state) => ({
      bookmarks: [bookmark, ...state.bookmarks],
    })),

  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    })),

  togglePin: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((b) =>
        b.id === id ? { ...b, isPinned: !b.isPinned } : b
      ),
    })),

  setSelectedBoard: (id) => set({ selectedBoardId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterPlatform: (platform) => set({ filterPlatform: platform }),
  setIsAddingBookmark: (value) => set({ isAddingBookmark: value }),
  setParsedUrl: (parsed) => set({ parsedUrl: parsed }),

  addBoard: (board) =>
    set((state) => ({
      boards: [...state.boards, board],
    })),

  // Computed: filtered & sorted bookmarks
  getFilteredBookmarks: () => {
    const { bookmarks, selectedBoardId, searchQuery, filterPlatform } = get();

    let filtered = [...bookmarks];

    // Filter by board
    if (selectedBoardId !== 'all') {
      filtered = filtered.filter((b) =>
        b.boards.some((board) => board.id === selectedBoardId)
      );
    }

    // Filter by platform
    if (filterPlatform) {
      filtered = filtered.filter((b) => b.platform === filterPlatform);
    }

    // Filter by search (simple text search - semantic search would use embeddings)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          b.aiSummary?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q) ||
          b.tags.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    // Sort: pinned first, then by date
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    });

    return filtered;
  },
}));
