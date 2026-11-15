import { AiTagsResponse } from './types';

/**
 * AI Engine for SocialVault
 *
 * In production, this integrates with Gemini API or OpenAI API.
 * For demo purposes, we use intelligent heuristic-based tagging.
 */

// ===== Tag Knowledge Base =====
const TAG_RULES: Record<string, string[]> = {
  // Food & Cooking
  'рецепт':    ['#рецепты', '#кулинария'],
  'recipe':    ['#recipes', '#cooking'],
  'еда':       ['#еда', '#фудблог'],
  'food':      ['#food', '#foodie'],
  'cooking':   ['#cooking', '#recipes'],
  'pasta':     ['#рецепты', '#паста', '#итальянская_кухня'],
  'cake':      ['#рецепты', '#выпечка'],
  'торт':      ['#рецепты', '#выпечка'],

  // Design & Creative
  'design':    ['#дизайн', '#креатив'],
  'дизайн':    ['#дизайн', '#креатив'],
  'ui':        ['#ui_ux', '#дизайн'],
  'ux':        ['#ui_ux', '#дизайн'],
  'figma':     ['#дизайн', '#figma', '#инструменты'],
  'logo':      ['#дизайн', '#логотипы'],
  'branding':  ['#дизайн', '#брендинг'],

  // Tech & Programming
  'code':      ['#программирование', '#код'],
  'coding':    ['#программирование', '#код'],
  'react':     ['#react', '#frontend', '#программирование'],
  'python':    ['#python', '#программирование'],
  'javascript':['#javascript', '#frontend'],
  'tutorial':  ['#обучение', '#туториал'],
  'ai':        ['#искусственный_интеллект', '#технологии'],
  'machine':   ['#machine_learning', '#технологии'],

  // Lifestyle
  'travel':    ['#путешествия', '#лайфстайл'],
  'путешеств': ['#путешествия', '#лайфстайл'],
  'fitness':   ['#фитнес', '#здоровье'],
  'фитнес':    ['#фитнес', '#здоровье'],
  'fashion':   ['#мода', '#стиль'],
  'мода':      ['#мода', '#стиль'],

  // Entertainment
  'funny':     ['#юмор', '#развлечения'],
  'юмор':      ['#юмор', '#развлечения'],
  'мем':       ['#мемы', '#юмор'],
  'meme':      ['#memes', '#humor'],
  'music':     ['#музыка', '#развлечения'],
  'музык':     ['#музыка', '#развлечения'],
  'movie':     ['#кино', '#развлечения'],
  'фильм':     ['#кино', '#развлечения'],

  // Education
  'learn':     ['#обучение', '#саморазвитие'],
  'обучени':   ['#обучение', '#саморазвитие'],
  'книг':      ['#книги', '#обучение'],
  'book':      ['#книги', '#обучение'],
  'лекция':    ['#обучение', '#лекции'],

  // Business
  'startup':   ['#стартап', '#бизнес'],
  'бизнес':    ['#бизнес', '#предпринимательство'],
  'business':  ['#бизнес', '#предпринимательство'],
  'marketing': ['#маркетинг', '#бизнес'],
  'маркетинг': ['#маркетинг', '#бизнес'],
  'продукт':   ['#продукт', '#бизнес'],
};

/**
 * Generate AI tags from title and description
 * In production: calls Gemini/OpenAI API
 */
export async function generateTags(
  title: string,
  description?: string,
  platform?: string
): Promise<string[]> {
  const text = `${title} ${description || ''} ${platform || ''}`.toLowerCase();
  const tags = new Set<string>();

  // Match against knowledge base
  for (const [keyword, relatedTags] of Object.entries(TAG_RULES)) {
    if (text.includes(keyword)) {
      relatedTags.forEach((tag) => tags.add(tag));
    }
  }

  // Platform-based tags
  if (platform) {
    tags.add(`#${platform}`);
  }

  // If no tags matched, add generic ones
  if (tags.size <= 1) {
    tags.add('#сохраненное');
    tags.add('#интересное');
  }

  return Array.from(tags).slice(0, 5);
}

/**
 * Generate AI summary
 * In production: calls Gemini/OpenAI API for summarization
 */
export async function generateSummary(
  title: string,
  description?: string,
  platform?: string,
  contentType?: string
): Promise<string> {
  const contentLabel = contentType === 'video' ? 'Видео' :
                       contentType === 'image' ? 'Изображение' :
                       contentType === 'thread' ? 'Тред' :
                       contentType === 'article' ? 'Статья' : 'Пост';

  const platformLabel = platform || 'соцсети';

  if (description && description.length > 20) {
    // Truncate description as summary
    return description.length > 150
      ? description.substring(0, 147) + '...'
      : description;
  }

  return `${contentLabel} из ${platformLabel}: "${title}". Сохранено для быстрого доступа.`;
}

/**
 * Full AI analysis: tags + summary
 */
export async function analyzeContent(
  title: string,
  description?: string,
  platform?: string,
  contentType?: string
): Promise<AiTagsResponse> {
  const [tags, summary] = await Promise.all([
    generateTags(title, description, platform),
    generateSummary(title, description, platform, contentType),
  ]);

  return { tags, summary };
}

// ===== Production AI Integration (uncomment when API key is available) =====

/*
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateTagsWithAI(
  title: string,
  description?: string,
): Promise<string[]> {
  const prompt = `Analyze this social media post and generate 3-5 relevant tags in Russian.
Title: "${title}"
Description: "${description || 'N/A'}"

Return ONLY a JSON array of tag strings, each starting with #. Example: ["#рецепты", "#кулинария", "#итальянская_кухня"]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text);
}

export async function generateSummaryWithAI(
  title: string,
  description?: string,
): Promise<string> {
  const prompt = `Write a brief 1-2 sentence summary in Russian for this saved social media post.
Title: "${title}"
Description: "${description || 'N/A'}"

The summary should help the user remember what this post is about without opening it.
Return ONLY the summary text, no quotes or formatting.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
*/
