export type UiLang = "en" | "uz" | "ru" | "zh";

/** Locales stored in the CMS API (hero slides, news, events, …). */
export type CmsLocale = "en" | "uz" | "ru";

export function getUiLang(i18n: { resolvedLanguage?: string; language?: string }): UiLang {
  const code = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);
  if (code === "uz" || code === "ru" || code === "zh") return code;
  return "en";
}

/** Map UI language to a CMS locale. Chinese is not in CMS yet — use English as source text. */
export function getCmsLocale(lang: string): CmsLocale {
  const code = lang.slice(0, 2);
  if (code === "uz" || code === "ru") return code;
  return "en";
}
