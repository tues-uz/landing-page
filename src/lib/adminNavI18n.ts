/** Map admin sidebar/header ids and titles to `admin.json` translation keys. */
const ADMIN_NAV_KEY_ALIASES: Record<string, string> = {
  dashboard: "dashboard",
  hero: "hero",
  "hero section": "herosection",
  herosection: "herosection",
  events: "events",
  news: "news",
  "news board": "newsboard",
  newsboard: "newsboard",
  articles: "articles",
  overview: "overview",
  "study-programs": "studyPrograms",
  studyprograms: "studyPrograms",
  studyPrograms: "studyPrograms",
  "study programs": "studyPrograms",
  programs: "studyPrograms",
  users: "users",
  admins: "admin",
  admin: "admin",
  newsletter: "newsletter",
  "newsletter subscribers": "newsletterSubscribers",
  newslettersubscribers: "newsletterSubscribers",
  "new article": "newarticle",
  newarticle: "newarticle",
  "edit article": "editarticle",
  editarticle: "editarticle",
  "add study program": "addStudyProgram",
  addstudyprogram: "addStudyProgram",
  "edit study program": "editStudyProgram",
  editstudyprogram: "editStudyProgram",
};

function kebabToCamel(value: string): string {
  return value.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

export function adminNavI18nKey(idOrTitle: string): string {
  const trimmed = idOrTitle.trim();
  if (!trimmed) return trimmed;

  if (ADMIN_NAV_KEY_ALIASES[trimmed]) return ADMIN_NAV_KEY_ALIASES[trimmed];

  const lower = trimmed.toLowerCase();
  if (ADMIN_NAV_KEY_ALIASES[lower]) return ADMIN_NAV_KEY_ALIASES[lower];

  const squashed = lower.replace(/\s+/g, "");
  if (ADMIN_NAV_KEY_ALIASES[squashed]) return ADMIN_NAV_KEY_ALIASES[squashed];

  if (lower.includes("-")) {
    const camel = kebabToCamel(lower);
    if (ADMIN_NAV_KEY_ALIASES[camel]) return ADMIN_NAV_KEY_ALIASES[camel];
    return camel;
  }

  return squashed;
}
