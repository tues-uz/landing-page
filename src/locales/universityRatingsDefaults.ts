/** English fallbacks — University → Ratings (`topNav`). */

export const UNIVERSITY_RATINGS_DEFAULTS = {
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
} as const;

export type UniversityRatingsI18nKey = keyof typeof UNIVERSITY_RATINGS_DEFAULTS;
