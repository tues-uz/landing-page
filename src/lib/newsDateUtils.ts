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
