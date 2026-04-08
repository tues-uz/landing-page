import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const supportedLngs = ["uz", "en", "ru"] as const;
export type SupportedLanguage = (typeof supportedLngs)[number];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Supported languages
    supportedLngs,
    fallbackLng: "en",

    // Namespaces
    ns: [
      "common",
      "header",
      "topNav",
      "hero",
      "home",
      "news",
      "events",
      "programs",
      "footer",
      "notFound",
      "admin",
    ],
    defaultNS: "common",

    // Backend: load from public/locales/{lng}/{ns}.json
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    // Language detection order (localStorage → browser navigator)
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "app-language",
    },

    interpolation: {
      escapeValue: false, // React already escapes by default
    },

    // Set to false when using Suspense (translations load async)
    react: {
      useSuspense: true,
    },
  });

// Keep <html lang> in sync with the active language
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

// Set initial lang attribute
if (i18n.language) {
  document.documentElement.lang = i18n.language;
}

export default i18n;
