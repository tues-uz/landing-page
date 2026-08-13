/** English fallbacks — Education → Bachelor → International Foundation Year (`topNav`). */

export const INTERNATIONAL_FOUNDATION_YEAR_DEFAULTS = {
  ifyPageTitle: "International Foundation Year (IFY)",
  ifyPageSubtitle: "Your Pathway to a World-Class University Degree",
  ifyIntro1:
    "Termez University of Economics and Service (TUES) is proud to offer the NCUK International Foundation Year (IFY) — a globally recognised foundation programme that prepares students for direct entry into the first year of undergraduate study at leading universities across the UK, Australia, New Zealand, Canada, and beyond.",
  ifyIntro2:
    "Delivered locally at TUES in partnership with Alvis Pathway, an official NCUK delivery partner, students benefit from world-class curriculum standards without leaving Uzbekistan — before progressing abroad to continue their degree.",

  ifyWhyTitle: "Why choose the NCUK International Foundation Year at TUES?",
  ifyWhyBullet1:
    "Globally Recognised Qualification — The IFY is benchmarked by Ecctis as equivalent to UK A-Levels, ensuring your qualification is respected and accepted by universities worldwide.",
  ifyWhyBullet2:
    "Guaranteed University Progression — Successful completion guarantees entry into one of NCUK's 80+ partner universities, offering over 6,000 degree courses across multiple countries.",
  ifyWhyBullet3:
    "Study Locally, Progress Globally — Begin your international education journey right here at TUES, with the same academic standards delivered at NCUK Study Centres worldwide.",
  ifyWhyBullet4:
    "English Proficiency Built In — The English for Academic Purposes module is accepted in place of IELTS by NCUK's partner universities, streamlining your path to admission.",
  ifyWhyBullet5:
    "Expert-Led Delivery — Taught by qualified instructors through Alvis Pathway's delivery model, ensuring rigorous academic preparation and consistent NCUK standards.",

  ifyOverviewTitle: "Programme overview",
  ifyOverviewQualificationLabel: "Qualification",
  ifyOverviewQualificationValue: "NCUK International Foundation Year (IFY)",
  ifyOverviewDeliveryPartnerLabel: "Delivery partner",
  ifyOverviewDeliveryPartnerValue: "Alvis Pathway",
  ifyOverviewHostLabel: "Host institution",
  ifyOverviewHostValue: "TUES, Uzbekistan",
  ifyOverviewDurationLabel: "Duration",
  ifyOverviewDurationValue: "9 months",
  ifyOverviewIntakeLabel: "Intake",
  ifyOverviewIntakeValue: "September 2026",
  ifyOverviewTuitionLabel: "Tuition fee",
  ifyOverviewTuitionValue: "$3,490",

  ifyStructureTitle: "Programme structure",
  ifyStructureBody:
    "Students complete three subject modules aligned with their intended degree, alongside the English for Academic Purposes module and an online Skills for Success course — building the academic knowledge, language proficiency, and independent study skills required for university-level study.",

  ifyJourneyTitle: "Your journey",
  ifyJourneyStep1: "Study at TUES",
  ifyJourneyStep2: "Complete the NCUK IFY",
  ifyJourneyStep3: "Progress to an NCUK partner university",
  ifyJourneyBody:
    "From TUES, successful graduates move on to continue their undergraduate degree at one of NCUK's partner universities — including institutions across the UK, Australia, New Zealand, and Canada.",

  ifyClosingTitle: "Begin your international education journey",
  ifyClosingBody:
    "The NCUK International Foundation Year at TUES offers a trusted, locally accessible route to a globally recognised degree. Take the first step toward studying at a top international university.",

  ifyCtaIntakeLabel: "SEPTEMBER 2026 INTAKE —",
  ifyCtaFee: "$3,490",
  ifyCtaApplyLabel: "APPLY NOW",

  ifyLogoAlt: "Alvis Pathway — NCUK delivery partner logo",
} as const;

export const IFY_APPLY_URL = "https://alvispathway.com/tues-program";

export type InternationalFoundationYearI18nKey = keyof typeof INTERNATIONAL_FOUNDATION_YEAR_DEFAULTS;
