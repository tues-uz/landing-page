import type { NewsItem, NewsSection } from "@/api/client";

function isTextParagraph(para: string): boolean {
  return Boolean(
    para &&
      !para.startsWith("[Image: ") &&
      para !== "[Image]" &&
      !para.startsWith("[Link: "),
  );
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
