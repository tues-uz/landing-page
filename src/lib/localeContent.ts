export type UiLang = "en" | "uz" | "ru";

export function getUiLang(i18n: { resolvedLanguage?: string; language?: string }): UiLang {
  const code = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);
  if (code === "uz" || code === "ru") return code;
  return "en";
}

