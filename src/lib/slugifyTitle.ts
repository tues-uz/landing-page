/** URL-safe slug from a display title (for program `slug` in Programs.tsx). */
export function slugifyFromTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/&/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
