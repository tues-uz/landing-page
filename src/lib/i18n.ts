import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { extraEn, extraRu, extraUz } from "@/locales/extraTranslations";

const supportedLngs = ["en", "uz", "ru"] as const;

function getInitialLng(): string {
  if (typeof window === "undefined") return "en";
  const raw = localStorage.getItem("app-language") ?? localStorage.getItem("i18nextLng") ?? "";
  const code = raw.slice(0, 2).toLowerCase();
  if (supportedLngs.includes(code as (typeof supportedLngs)[number])) return code;
  const browser = (navigator.language ?? "en").slice(0, 2).toLowerCase();
  if (supportedLngs.includes(browser as (typeof supportedLngs)[number])) return browser;
  return "en";
}

/** UI strings + section chrome. CMS body copy is swapped in components when UI lang is EN. */
const resources = {
  en: {
    translation: {
      hero: {
        announcement: "Announcement",
        learnMore: "Learn More",
        hideAnnouncement: "Hide announcement",
        showAnnouncement: "Show announcement",
        slideAria: "Slide {{number}}",
      },
      homePrograms: {
        title: "Browse programs by.",
        description:
          "This user-friendly tool offers options to filter programs by field of study, degree level, and even learning formats like online or on-campus.",
        exploreAll: "Explore All",
      },
      homeNews: {
        title: "News & Announcements",
        subtitle: "Stay up to date with the latest from TUES—research, campus updates, and stories.",
        noArticles: "No articles yet.",
        viewAll: "View All News",
      },
      homeEventsSection: {
        titleLine1: "Upcoming Events",
        titleLine2: "& Activities",
        viewAll: "View All Events",
        noUpcoming: "No upcoming events.",
      },
      ...extraEn,
    },
  },
  uz: {
    translation: {
      hero: {
        announcement: "E'lon",
        learnMore: "Batafsil",
        hideAnnouncement: "E'lonni yashirish",
        showAnnouncement: "E'lonni ko'rsatish",
        slideAria: "{{number}}-slayd",
      },
      homePrograms: {
        title: "Dasturlarni ko'rib chiqing.",
        description:
          "Ushbu qulay vosita dasturlarni yo'nalish, daraja va o'qish formatiga (masalan, onlayn yoki kampusda) qarab filtrlash imkonini beradi.",
        exploreAll: "Barchasini ko'rish",
      },
      homeNews: {
        title: "Yangiliklar va e'lonlar",
        subtitle: "TUESdagi so'nggi yangiliklar, kampus yangilanishlari va hikoyalardan xabardor bo'ling.",
        noArticles: "Hozircha maqolalar yo'q.",
        viewAll: "Barcha yangiliklar",
      },
      homeEventsSection: {
        titleLine1: "Yaqinlashayotgan tadbirlar",
        titleLine2: "va faoliyatlar",
        viewAll: "Barcha tadbirlar",
        noUpcoming: "Yaqinlashayotgan tadbirlar yo'q.",
      },
      ...extraUz,
    },
  },
  ru: {
    translation: {
      hero: {
        announcement: "Объявление",
        learnMore: "Подробнее",
        hideAnnouncement: "Скрыть объявление",
        showAnnouncement: "Показать объявление",
        slideAria: "Слайд {{number}}",
      },
      homePrograms: {
        title: "Подберите программу.",
        description:
          "Удобный инструмент для фильтрации программ по направлению, уровню и формату обучения — очно или онлайн.",
        exploreAll: "Все программы",
      },
      homeNews: {
        title: "Новости и объявления",
        subtitle: "Следите за новостями TUES: исследования, кампус и истории.",
        noArticles: "Пока нет статей.",
        viewAll: "Все новости",
      },
      homeEventsSection: {
        titleLine1: "Предстоящие события",
        titleLine2: "и активности",
        viewAll: "Все события",
        noUpcoming: "Нет предстоящих событий.",
      },
      ...extraRu,
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLng(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
}

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("app-language", lng);
  document.documentElement.lang = lng;
});

export default i18n;
