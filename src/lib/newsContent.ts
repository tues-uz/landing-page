import type { NewsItem, NewsSection } from "@/api/client";

export function isNewsImageParagraph(para: string): boolean {
  return para === "[Image]" || (para.startsWith("[Image: ") && para.endsWith("]"));
}

export function getNewsImageSrc(para: string): string | null {
  if (para === "[Image]") return null;
  if (!para.startsWith("[Image: ") || !para.endsWith("]")) return null;
  const src = para.slice(8, -1).trim();
  return src || null;
}

export function getNewsBodyImageUrls(body: NewsSection[]): string[] {
  const urls: string[] = [];
  for (const section of body) {
    for (const para of section.paragraphs) {
      const src = getNewsImageSrc(para);
      if (src) urls.push(src);
    }
  }
  return urls;
}

/** Featured image first, then body images in article order; duplicates removed. */
export function getNewsHeroImages(item: Pick<NewsItem, "imageUrl" | "body">): string[] {
  const seen = new Set<string>();
  const images: string[] = [];
  const add = (url: string | undefined | null) => {
    const trimmed = url?.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    images.push(trimmed);
  };

  add(item.imageUrl);
  const body = Array.isArray(item.body) ? item.body : [];
  for (const url of getNewsBodyImageUrls(body)) add(url);
  return images;
}

function isTextParagraph(para: string): boolean {
  return Boolean(para && !isNewsImageParagraph(para) && !para.startsWith("[Link: "));
}

export function getFirstNewsParagraph(body: NewsSection[]): string | null {
  for (const section of body) {
    for (const para of section.paragraphs) {
      if (isTextParagraph(para)) return para;
    }
  }
  return null;
}

/** Card/list preview: prefer a distinct excerpt, otherwise the first body paragraph. */
export function getNewsPreviewText(item: Pick<NewsItem, "title" | "excerpt" | "body">): string {
  const title = item.title.trim();
  const excerpt = item.excerpt.trim();

  if (excerpt && excerpt.toLowerCase() !== title.toLowerCase()) {
    return excerpt;
  }

  const body = Array.isArray(item.body) ? item.body : [];
  return getFirstNewsParagraph(body)?.trim() ?? "";
}
