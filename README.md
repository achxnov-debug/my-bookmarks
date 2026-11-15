# 🔐 SocialVault

> AI-powered social media bookmark manager

Единое пространство для сохранения, организации и умного поиска контента из социальных сетей (Instagram, TikTok, Twitter/X, YouTube, Telegram, LinkedIn и др.) с помощью искусственного интеллекта.

## ✨ Ключевые возможности

- **🔗 Умный парсинг URL** — автоматическое извлечение метаданных (превью, заголовок, автор, платформа)
- **🤖 AI-автотегирование** — ИИ присваивает релевантные теги на основе контента
- **📝 AI-саммари** — краткое описание поста без необходимости его открывать
- **🔍 Семантический поиск** — поиск по смыслу, а не только по ключевым словам
- **📁 Борды и коллекции** — организация закладок по папкам
- **📌 Закрепление** — Pin to top для важных закладок
- **🌙 Тёмная тема** — поддержка светлой и тёмной темы

## 🛠️ Стек технологий

| Слой | Технология |
|------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| State | Zustand |
| Backend | Next.js API Routes |
| ORM | Prisma |
| Database | PostgreSQL + pgvector |
| AI | Gemini API / OpenAI API |

## 🚀 Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать переменные окружения
cp .env.example .env

# 3. Настроить базу данных (в .env)
# DATABASE_URL="postgresql://user:password@localhost:5432/socialvault"

# 4. Инициализировать БД
npx prisma db push
npx prisma generate

# 5. Запустить dev-сервер
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
socialvault/
├── prisma/
│   └── schema.prisma          # Схема базы данных
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout с ThemeProvider
│   │   ├── page.tsx           # Dashboard — главная страница
│   │   ├── globals.css        # Глобальные стили + CSS-переменные
│   │   └── api/
│   │       ├── bookmarks/     # CRUD закладок
│   │       ├── boards/        # CRUD бордов
│   │       ├── parse-url/     # Парсинг URL
│   │       └── ai/
│   │           ├── tags/      # AI-автотегирование
│   │           ├── summary/   # AI-саммари
│   │           └── search/    # Семантический поиск
│   ├── components/
│   │   ├── AddBookmarkBar.tsx # Поле добавления закладки
│   │   ├── BookmarkCard.tsx   # Карточка закладки
│   │   ├── BookmarkGrid.tsx   # Masonry-сетка карточек
│   │   ├── Header.tsx         # Хедер с поиском и темой
│   │   └── Sidebar.tsx        # Боковая панель с бордами
│   ├── lib/
│   │   ├── ai.ts              # AI Engine (теги + саммари)
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── parser.ts          # URL parser (OG, platform detection)
│   │   ├── store.ts           # Zustand store + demo data
│   │   └── types.ts           # TypeScript типы
│   └── context/
│       └── ThemeContext.tsx    # Контекст темы (dark/light)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🤖 AI-интеграция

Приложение поставляется с встроенным эвристическим AI-движком для демо. Для подключения реального AI:

1. Получите API-ключ [Gemini](https://ai.google.dev/) или [OpenAI](https://platform.openai.com/)
2. Добавьте ключ в `.env`
3. Раскомментируйте production-функции в `src/lib/ai.ts`

## 📄 Лицензия

MIT
