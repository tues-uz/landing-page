import type { EventItem, NewsItem, ProgramItem } from "@/api/client";
import { staticPrograms } from "@/components/Programs";
import { FALLBACK_EVENTS, FALLBACK_NEWS } from "@/data/fallbackContent";

export type UiLang = "en" | "uz" | "ru";

export function getUiLang(i18n: { resolvedLanguage?: string; language?: string }): UiLang {
  const code = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);
  if (code === "uz" || code === "ru") return code;
  return "en";
}

/**
 * CMS may return Uzbek (or other) copy; map to English static catalog by slug.
 * Used for English UI and for the admin program list (always English labels).
 */
export function withEnglishProgramTitles(programs: ProgramItem[]): ProgramItem[] {
  return programs.map((p) => {
    const st = staticPrograms.find((s) => s.slug === p.slug);
    return st
      ? { ...p, title: st.title, description: st.description, count: st.count }
      : p;
  });
}

/** Overlay English fallback text on API news rows (keeps id, slug, dates, images). */
export function mergeNewsForEnglish(items: NewsItem[]): NewsItem[] {
  return items.map((item, i) => {
    const fb = FALLBACK_NEWS[i % FALLBACK_NEWS.length];
    return { ...item, title: fb.title, excerpt: fb.excerpt, category: fb.category };
  });
}

/** Overlay English event titles (keeps id, date, time, location). */
export function mergeEventTitlesForEnglish(items: EventItem[]): EventItem[] {
  return items.map((ev, i) => {
    const fb = FALLBACK_EVENTS[i % FALLBACK_EVENTS.length];
    return { ...ev, title: fb.title };
  });
}

/** Resolve English article body when CMS slug matches a fallback article. */
export function mergeNewsArticleForEnglish(
  article: NewsItem,
  slug: string | undefined
): NewsItem {
  const bySlug = slug ? FALLBACK_NEWS.find((n) => n.slug === slug) : undefined;
  if (bySlug) {
    return {
      ...article,
      title: bySlug.title,
      excerpt: bySlug.excerpt,
      category: bySlug.category,
      author: bySlug.author,
      readTime: bySlug.readTime,
      body: bySlug.body,
    };
  }
  const idx = FALLBACK_NEWS.findIndex((n) => n.slug === article.slug);
  const fb = FALLBACK_NEWS[idx >= 0 ? idx : 0];
  return {
    ...article,
    title: fb.title,
    excerpt: fb.excerpt,
    category: fb.category,
  };
}
