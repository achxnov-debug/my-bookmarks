import { Platform, ContentType, ParsedUrl, PLATFORM_META } from './types';

/**
 * Detect social platform from URL
 */
export function detectPlatform(url: string): Platform {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    for (const [platform, meta] of Object.entries(PLATFORM_META)) {
      if (meta.domains.some((domain) => hostname.includes(domain))) {
        return platform as Platform;
      }
    }
    return 'other';
  } catch {
    return 'other';
  }
}

/**
 * Infer content type from URL and platform
 */
export function inferContentType(url: string, platform: Platform): ContentType {
  const path = url.toLowerCase();

  // Video patterns
  if (
    platform === 'youtube' ||
    platform === 'tiktok' ||
    path.includes('/reel') ||
    path.includes('/video') ||
    path.includes('/watch')
  ) {
    return 'video';
  }

  // Thread patterns
  if (
    (platform === 'twitter' && path.includes('/status')) ||
    path.includes('/thread')
  ) {
    return 'thread';
  }

  // Image patterns
  if (
    (platform === 'instagram' && path.includes('/p/')) ||
    path.match(/\.(jpg|jpeg|png|gif|webp)/)
  ) {
    return 'image';
  }

  // Article patterns
  if (
    platform === 'linkedin' && path.includes('/pulse')
  ) {
    return 'article';
  }

  return 'text';
}

/**
 * Parse URL and extract metadata via Open Graph tags
 * In production, this would fetch the page and parse meta tags.
 * For demo, we simulate the parsing.
 */
export async function parseUrl(url: string): Promise<ParsedUrl> {
  const platform = detectPlatform(url);
  const contentType = inferContentType(url, platform);

  // In production: fetch the URL, parse HTML, extract OG tags
  // For now, we build metadata from URL structure
  let title = '';
  let author = '';
  let description = '';
  let thumbnailUrl = '';

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    // Extract author from URL patterns
    if (platform === 'twitter' || platform === 'instagram' || platform === 'tiktok') {
      author = pathParts[0]?.startsWith('@') ? pathParts[0] : `@${pathParts[0] || 'unknown'}`;
    } else if (platform === 'youtube') {
      if (pathParts[0] === 'watch') {
        author = 'YouTube Creator';
      } else if (pathParts[0]?.startsWith('@')) {
        author = pathParts[0];
      }
    } else if (platform === 'telegram') {
      author = pathParts[0] || 'Telegram Channel';
    }

    // Generate placeholder title
    const platformMeta = PLATFORM_META[platform];
    title = `${platformMeta.label} post by ${author || 'Unknown'}`;

    // Placeholder thumbnail (in production: extract og:image)
    thumbnailUrl = `https://placehold.co/600x400/EEE/999?text=${platformMeta.label}`;

  } catch {
    title = 'Untitled Bookmark';
  }

  return {
    url,
    title,
    description,
    author,
    thumbnailUrl,
    platform,
    contentType,
  };
}
