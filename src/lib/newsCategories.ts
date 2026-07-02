/** Map CMS/API category strings (any locale) to i18n keys under news.categories.* */
const CATEGORY_KEY_BY_LABEL: Record<string, string> = {
  news: "news",
  yangiliklar: "news",
  yangilik: "news",
  новости: "news",
  events: "events",
  event: "events",
  tadbirlar: "events",
  tadbir: "events",
  события: "events",
  announcements: "announcements",
  announcement: "announcements",
  elonlar: "announcements",
  "e'lonlar": "announcements",
  "eʼlonlar": "announcements",
  объявления: "announcements",
  blog: "blog",
  блог: "blog",
};

function normalizeCategoryLabel(category: string): string {
  return category.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getNewsCategoryLabel(
  category: string,
  translate: (key: string, options?: { defaultValue?: string }) => string,
): string {
  const key = CATEGORY_KEY_BY_LABEL[normalizeCategoryLabel(category)];
  if (!key) return category;
  return translate(`categories.${key}`, { defaultValue: category });
}
