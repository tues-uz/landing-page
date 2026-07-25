/** Static paths under `public/downloads/official-documents/`. */

export type OfficialDocument = {
  readonly id: string;
  readonly href: string;
  readonly detailPath?: string;
  readonly thumbSrc?: string;
  readonly titleKey:
    | "officialDocAcademicFreedomTitle"
    | "officialDocAnnualReport2025Title"
    | "officialDocAntiBriberyTitle";
  readonly descriptionKey:
    | "officialDocAcademicFreedomDescription"
    | "officialDocAnnualReport2025Description"
    | "officialDocAntiBriberyDescription";
};

export const OFFICIAL_DOCUMENTS: readonly OfficialDocument[] = [
  {
    id: "academic-freedom-policy",
    href: "/downloads/official-documents/academic-freedom-policy.pdf",
    detailPath: "/information-services/official-documents/academic-freedom-policy",
    thumbSrc: "/images/official-documents/academic-freedom-policy-thumb.webp",
    titleKey: "officialDocAcademicFreedomTitle",
    descriptionKey: "officialDocAcademicFreedomDescription",
  },
  {
    id: "annual-report-2025",
    href: "/downloads/official-documents/annual-report-2025.pdf",
    detailPath: "/information-services/official-documents/annual-report-2025",
    thumbSrc: "/images/official-documents/annual-report-2025-thumb.webp",
    titleKey: "officialDocAnnualReport2025Title",
    descriptionKey: "officialDocAnnualReport2025Description",
  },
  {
    id: "anti-bribery-corruption-policy",
    href: "/downloads/official-documents/anti-bribery-corruption-policy.pdf",
    detailPath: "/information-services/official-documents/anti-bribery-corruption-policy",
    thumbSrc: "/images/official-documents/anti-bribery-corruption-policy-thumb.webp",
    titleKey: "officialDocAntiBriberyTitle",
    descriptionKey: "officialDocAntiBriberyDescription",
  },
] as const;
