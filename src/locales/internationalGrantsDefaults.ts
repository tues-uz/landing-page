/** English fallbacks for Internationalization → International grants (`topNav`). */

export const INTERNATIONAL_GRANTS_JAPAN_MATSUMAE_PATH =
  "/internationalization/international-grants/japan-matsumae-foundation" as const;

export const INTERNATIONAL_GRANTS_USA_HUMPHREY_PATH =
  "/internationalization/international-grants/hubert-h-humphrey-fellowship" as const;

export const INTERNATIONAL_GRANTS_MEXT_2026_PATH =
  "/internationalization/international-grants/mext-japan-2026" as const;

export const MEXT_UZBEKISTAN_EMBASSY_PROGRAM_URL =
  "https://www.uz.emb-japan.go.jp/itpr_ru/programMEXT.html#s3" as const;

export const INTERNATIONAL_GRANTS_PAGE_DEFAULTS = {
  internationalGrantsPageTitle: "International grants",
  internationalGrantsPageIntro:
    "Explore funding and professional development opportunities linked to international cooperation at Termez University of Economics and Service. Select a topic below for highlights.",
  internationalGrantsCard1Title: "Research grant in Japan in any field of study",
  internationalGrantsCard2Title: "10-month fully funded professional development opportunity in the USA!",
  internationalGrantsCard3Title: "ANNOUNCEMENT!",

  internationalGrantJapanPageTitle:
    "Matsumae International Foundation: A fully funded research opportunity in Japan in any field of study!",
  internationalGrantJapanBreadcrumbLabel: "Matsumae Foundation — research grant in Japan",
  internationalGrantJapanHeroAlt:
    "Traditional Japanese castle with cherry blossoms, representing research opportunities in Japan",
  internationalGrantJapanParagraph1:
    "The program is open to candidates who hold a PhD degree and have a sufficient command of the English language.",
  internationalGrantJapanParagraph2:
    "The program allows researchers to conduct studies in Japan for a period of 3 to 6 months.",
  internationalGrantJapanBenefitsHeading: "Program benefits include:",
  internationalGrantJapanBenefitsItems:
    "– A monthly stipend of $1,432\n– Round-trip airfare\n– A settlement allowance of $781\n– Health insurance coverage",
  internationalGrantJapanApplicationPeriod: "Application period: from June 1 to June 30, 2025.",

  internationalGrantUsaPageTitle:
    "Humphrey Fellowship Program: A 10-month professional development opportunity in the United States — all expenses covered!",
  internationalGrantUsaBreadcrumbLabel: "Humphrey Fellowship — USA",
  internationalGrantUsaHeroAlt:
    "Hubert H. Humphrey Fellowship Program group at the U.S. Capitol, Fulbright Exchange Program sponsored by the U.S. Department of State",
  internationalGrantUsaParagraphEligibility:
    "Eligible applicants must have at least a bachelor's degree, a minimum of 5 years of work experience, and proficiency in English.",
  internationalGrantUsaBenefitsHeading: "Program benefits include:",
  internationalGrantUsaBenefitsItems:
    "– Coverage of university admission test fees\n– Assistance in obtaining a J-1 visa\n– Economy-class round-trip airfare to and from the U.S.\n– Health insurance\n– Monthly stipend\n– Professional development allowance\n– Tuition and other university-related fees covered",
  internationalGrantUsaApplicationDeadline: "Application deadline: July 4, 2025",

  internationalGrantMextPageTitle:
    "Japan (MEXT): Academic programs for study and professional development at Japanese universities — 2026 announcement",
  internationalGrantMextBreadcrumbLabel: "MEXT Japan — 2026 announcement",
  internationalGrantMextHeroAlt:
    "Japanese temple architecture with cherry blossoms — MEXT grant programs for Japanese language and culture",
  internationalGrantMextLead:
    "The Ministry of Education, Culture, Sports, Science and Technology of Japan (MEXT) announces the following academic programs for study and professional development at Japanese higher education institutions in 2026:",
  internationalGrantMextProgram1: "\u201cJapanese language and culture\u201d — for university students;",
  internationalGrantMextProgram2:
    "\u201cTraining program for primary and secondary school and lyceum teachers.\u201d",
  internationalGrantMextApplicationDeadline: "Application deadline: January 30, 2026.",
  internationalGrantMextEmbassyIntro:
    "Applicants wishing to participate in the selection process are required to review the application procedures and detailed information about the programs on the official website of the Embassy of Japan in Uzbekistan:",
  internationalGrantMextForMoreInfoLabel: "For more information:",
  internationalGrantMextApplicationInstructions:
    "Applicants must complete the designated application form and independently submit all required documents to the Embassy of Japan in Uzbekistan.",
  internationalGrantMextNote:
    "Note: strict adherence to the specified deadline is required when submitting documents.",
} as const;

export const INTERNATIONAL_GRANTS_CARD_KEYS = [
  "internationalGrantsCard1Title",
  "internationalGrantsCard2Title",
  "internationalGrantsCard3Title",
] as const satisfies readonly (keyof typeof INTERNATIONAL_GRANTS_PAGE_DEFAULTS)[];

export const INTERNATIONAL_GRANTS_CARD_HREFS: (string | undefined)[] = [
  INTERNATIONAL_GRANTS_JAPAN_MATSUMAE_PATH,
  INTERNATIONAL_GRANTS_USA_HUMPHREY_PATH,
  INTERNATIONAL_GRANTS_MEXT_2026_PATH,
];

export const INTERNATIONAL_GRANTS_CARD_IMAGES: (string | undefined)[] = [
  "/images/internationalization/grant-japan-matsumae.png",
  "/images/internationalization/grant-usa-humphrey-fellowship.png",
  "/images/internationalization/grant-mext-japan-2026.png",
];
