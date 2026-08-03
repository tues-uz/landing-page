import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

/** @type {Record<string, string>} */
const en = {
  universityRatingsPageTitle: "International Rankings",
  universityRatingsInstitution:
    "Termez University of Economics and Service — International Rankings",
  universityRatingsIntro:
    "In recent years, Termiz University of Economics and Service (TUES) has achieved significant results in two prestigious international rankings. Below is an overview of these accomplishments.",
  universityRatingsTheTitle: "Times Higher Education (THE) Impact Rankings 2026",
  universityRatingsTheBody:
    "TUES made a historic leap in this ranking, which assesses universities based on their contribution to the UN Sustainable Development Goals, education quality, and research activity.",
  universityRatingsTheBullet1: "Position: 301–400 band (up from 1501+ in 2024)",
  universityRatingsTheBullet2: "Global TOP 400",
  universityRatingsTheBullet3: "Uzbekistan ranking: 7th place",
  universityRatingsTheBullet4: "Regional universities: 1st place",
  universityRatingsTheBullet5: "Recognized as one of the fastest-rising universities internationally",
  universityRatingsGreenTitle: "UI GreenMetric World University Rankings 2025",
  universityRatingsGreenBody:
    "Based on campus infrastructure, energy efficiency, waste management, water resources, and sustainable education, TUES entered the list of the world’s top 1000 “green” universities.",
  universityRatingsGreenBullet1: "Global TOP 1000 green university",
  universityRatingsGreenBullet2: "Criteria: environmental infrastructure and management policies",
  universityRatingsGlanceTitle: "At a glance",
  universityRatingsGlance1Label: "THE Impact Rankings 2026",
  universityRatingsGlance1Value: "301–400",
  universityRatingsGlance2Label: "UI GreenMetric 2025",
  universityRatingsGlance2Value: "TOP 1000",
  universityRatingsGlance3Label: "Regional universities",
  universityRatingsGlance3Value: "1st",
  universityRatingsGlance4Label: "Nationwide",
  universityRatingsGlance4Value: "7th",
  universityRatingsClosing:
    "These achievements are the result of the dedicated work of TUES faculty, researchers, students, and the entire university community. TUES will continue to reach new milestones in education quality, science, and sustainable development.",
};

/** @type {Record<string, string>} */
const ru = {
  universityRatingsPageTitle: "Международные рейтинги",
  universityRatingsInstitution:
    "Термезский университет экономики и сервиса — Международные рейтинги",
  universityRatingsIntro:
    "В последние годы Термезский университет экономики и сервиса (TUES) добился значительных результатов в двух престижных международных рейтингах. Ниже — краткий обзор этих достижений.",
  universityRatingsTheTitle: "Times Higher Education (THE) Impact Rankings 2026",
  universityRatingsTheBody:
    "TUES совершил исторический прорыв в этом рейтинге, который оценивает университеты по вкладу в Цели устойчивого развития ООН, качеству образования и научной деятельности.",
  universityRatingsTheBullet1: "Позиция: группа 301–400 (рост с 1501+ в 2024 году)",
  universityRatingsTheBullet2: "Глобальный ТОП-400",
  universityRatingsTheBullet3: "Рейтинг по Узбекистану: 7-е место",
  universityRatingsTheBullet4: "Среди региональных университетов: 1-е место",
  universityRatingsTheBullet5: "Признан одним из наиболее быстрорастущих университетов в мире",
  universityRatingsGreenTitle: "UI GreenMetric World University Rankings 2025",
  universityRatingsGreenBody:
    "По критериям инфраструктуры кампуса, энергоэффективности, управления отходами, водных ресурсов и устойчивого образования TUES вошёл в список 1000 лучших «зелёных» университетов мира.",
  universityRatingsGreenBullet1: "Глобальный ТОП-1000 зелёных университетов",
  universityRatingsGreenBullet2: "Критерии: экологическая инфраструктура и политика управления",
  universityRatingsGlanceTitle: "Кратко",
  universityRatingsGlance1Label: "THE Impact Rankings 2026",
  universityRatingsGlance1Value: "301–400",
  universityRatingsGlance2Label: "UI GreenMetric 2025",
  universityRatingsGlance2Value: "ТОП 1000",
  universityRatingsGlance3Label: "Региональные университеты",
  universityRatingsGlance3Value: "1-е",
  universityRatingsGlance4Label: "По стране",
  universityRatingsGlance4Value: "7-е",
  universityRatingsClosing:
    "Эти достижения — результат самоотверженной работы преподавателей, исследователей, студентов и всего университетского сообщества TUES. Университет продолжит достигать новых рубежей в качестве образования, науке и устойчивом развитии.",
};

/** @type {Record<string, string>} */
const uz = {
  universityRatingsPageTitle: "Xalqaro reytinglar",
  universityRatingsInstitution:
    "Termiz iqtisodiyot va servis universiteti — Xalqaro reytinglar",
  universityRatingsIntro:
    "So‘nggi yillarda Termiz iqtisodiyot va servis universiteti (TUES) ikkita nufuzli xalqaro reytingda sezilarli natijalarga erishdi. Quyida ushbu yutuqlarning qisqacha sharhi keltirilgan.",
  universityRatingsTheTitle: "Times Higher Education (THE) Impact Rankings 2026",
  universityRatingsTheBody:
    "TUES BMT Barqaror rivojlanish maqsadlariga qo‘shgan hissasi, ta’lim sifati va ilmiy faoliyat asosida baholanadigan ushbu reytingda tarixiy sakrashni amalga oshirdi.",
  universityRatingsTheBullet1: "O‘rin: 301–400 guruhi (2024-yildagi 1501+ dan ko‘tarilgan)",
  universityRatingsTheBullet2: "Global TOP 400",
  universityRatingsTheBullet3: "O‘zbekiston reytingi: 7-o‘rin",
  universityRatingsTheBullet4: "Hududiy universitetlar: 1-o‘rin",
  universityRatingsTheBullet5: "Xalqaro miqyosda eng tez o‘sib borayotgan universitetlardan biri sifatida e’tirof etilgan",
  universityRatingsGreenTitle: "UI GreenMetric World University Rankings 2025",
  universityRatingsGreenBody:
    "Kampus infratuzilmasi, energiya samaradorligi, chiqindilarni boshqarish, suv resurslari va barqaror ta’lim mezonlari asosida TUES dunyoning eng yaxshi 1000 ta “yashil” universitetlari ro‘yxatiga kirdi.",
  universityRatingsGreenBullet1: "Global TOP 1000 yashil universitet",
  universityRatingsGreenBullet2: "Mezonlar: ekologik infratuzilma va boshqaruv siyosati",
  universityRatingsGlanceTitle: "Qisqacha",
  universityRatingsGlance1Label: "THE Impact Rankings 2026",
  universityRatingsGlance1Value: "301–400",
  universityRatingsGlance2Label: "UI GreenMetric 2025",
  universityRatingsGlance2Value: "TOP 1000",
  universityRatingsGlance3Label: "Hududiy universitetlar",
  universityRatingsGlance3Value: "1-o‘rin",
  universityRatingsGlance4Label: "Respublika bo‘yicha",
  universityRatingsGlance4Value: "7-o‘rin",
  universityRatingsClosing:
    "Bu yutuqlar TUES professor-o‘qituvchilari, tadqiqotchilari, talabalari va butun universitet jamoasining fidokorona mehnati natijasidir. TUES ta’lim sifati, fan va barqaror rivojlanishda yangi marralarni egallashda davom etadi.",
};

/**
 * @param {string} filePath
 * @param {Record<string, string>} patch
 */
function mergeTopNav(filePath, patch) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  Object.assign(data, patch);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

/**
 * @param {string} filePath
 * @param {string} label
 */
function mergeSearchRoute(filePath, label) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!data.searchRoutes) data.searchRoutes = {};
  data.searchRoutes.universityRatings = label;
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

mergeTopNav(path.join(root, "public/locales/en/topNav.json"), en);
mergeTopNav(path.join(root, "public/locales/ru/topNav.json"), ru);
mergeTopNav(path.join(root, "public/locales/uz/topNav.json"), uz);

mergeSearchRoute(path.join(root, "public/locales/en/header.json"), "International rankings");
mergeSearchRoute(path.join(root, "public/locales/ru/header.json"), "Международные рейтинги");
mergeSearchRoute(path.join(root, "public/locales/uz/header.json"), "Xalqaro reytinglar");

console.log("Merged university ratings locales.");
