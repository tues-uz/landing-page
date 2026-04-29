/** English fallbacks — Admission 2025 → Information about transfer of education (`topNav`). */

export const INFORMATION_TRANSFER_EDUCATION_PAGE_DEFAULTS = {
  informationTransferEducationPageTitle: "Information about transfer of education",
  informationTransferEducationPageIntro:
    "Official references on transferring studies at Termez University of Economics and Service. Select a topic below.",
  informationTransferEducationCard1Title: "Resolution of the Cabinet of Ministers of the Republic of Uzbekistan",
  informationTransferCabinet578PageTitle:
    "Cabinet of Ministers resolution No. 578 — regulatory acts on admission to higher education (full text, Uzbek)",
  informationTransferCabinet578HeroAlt:
    "Illustration of a laptop, books, and official documents on a blue background — thematic graphic for education regulations.",
  informationTransferCabinet578Loading: "Loading document…",
  informationTransferCabinet578LoadError: "The document could not be loaded. Please try again later.",
  informationTransferCabinet578TabResolution: "Main resolution",
  informationTransferCabinet578TabApp1: "1. Bachelor admission",
  informationTransferCabinet578TabApp2: "2. Master’s admission",
  informationTransferCabinet578TabApp3: "3. Transfer & expulsion",
  informationTransferCabinet578TabApp4: "4. Academic mobility",
  informationTransferCabinet578TabApp5: "5. Government amendments",
  informationTransferCabinet578TabApp6: "6. Repealed decisions",
  informationTransferCabinet578OnThisPage: "On this page",
  informationTransferCabinet578NavPrevious: "Previous section",
  informationTransferCabinet578NavNext: "Next section",
  informationTransferCabinet578PageNavAria: "Previous and next section links",
  informationTransferCabinet578PaginationAria: "Document pages",
  informationTransferCabinet578PageIndicator: "Page {{current}} of {{total}}",
} as const;

/** Split `public/content/cabinet-resolution-578-uz.txt` at official appendix headers. */
export const CABINET_578_APPENDIX_SPLIT =
  /\n\n(?=Vazirlar Mahkamasining 2025-yil 13-sentabrdagi 578-son qaroriga [1-6]-ILOVA\n)/;

export const INFORMATION_TRANSFER_EDUCATION_CARD_KEYS = [
  "informationTransferEducationCard1Title",
] as const satisfies readonly (keyof typeof INFORMATION_TRANSFER_EDUCATION_PAGE_DEFAULTS)[];

export const INFORMATION_TRANSFER_EDUCATION_CARD_HREFS: (string | undefined)[] = [
  "/admission-2025/information-transfer-of-education/cabinet-resolution-578",
];

export const INFORMATION_TRANSFER_EDUCATION_CARD_IMAGES: (string | undefined)[] = [
  "/images/admission-2025/information-transfer-cabinet-578.png",
];
