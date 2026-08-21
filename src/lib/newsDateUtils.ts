/** Format for `<input type="date">` (YYYY-MM-DD). */
export function toDateInputValue(raw: string | undefined | null): string {
  if (!raw?.trim()) return "";
  const trimmed = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) return trimmed.slice(0, 10);
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return "";
}

/** Normalize date for API payloads (YYYY-MM-DD). Falls back to today when empty. */
export function toApiDateValue(raw: string | undefined | null): string {
  const input = toDateInputValue(raw);
  if (input) return input;
  return new Date().toISOString().slice(0, 10);
}

export type NewsDateSortOrder = "newest" | "oldest";

type NewsItemDateRaw = {
  date?: string | null;
  publishedAt?: string | null;
  published_at?: string | null;
  createdAt?: string | null;
  created_at?: string | null;
};

/** Resolve publication date from common API field names to YYYY-MM-DD. */
export function normalizeNewsItemDate(raw: NewsItemDateRaw): string {
  const dateSource =
    raw.date ?? raw.publishedAt ?? raw.published_at ?? raw.createdAt ?? raw.created_at ?? "";
  return toDateInputValue(dateSource) || toDateInputValue(raw.date) || "";
}

/** Parse news date to epoch ms for sorting; unknown dates sort last when descending. */
export function getNewsDateTimestamp(raw: string | undefined | null): number {
  const input = toDateInputValue(raw);
  if (!input) return 0;
  const ts = Date.parse(`${input}T00:00:00`);
  return Number.isNaN(ts) ? 0 : ts;
}

export function sortNewsByDate<T extends { date: string }>(
  items: T[],
  order: NewsDateSortOrder = "newest",
): T[] {
  return [...items].sort((a, b) => {
    const diff = getNewsDateTimestamp(b.date) - getNewsDateTimestamp(a.date);
    return order === "newest" ? diff : -diff;
  });
}
