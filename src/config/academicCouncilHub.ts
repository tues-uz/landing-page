/** Academic Council hub: index at `/research/academic-council`, detail at `/research/academic-council/:cardId`. */

export const ACADEMIC_COUNCIL_CARD_IDS = ["comparative", "historical"] as const;
export type AcademicCouncilCardId = (typeof ACADEMIC_COUNCIL_CARD_IDS)[number];

/** Cards on the hub that link to standalone About pages (moved from Leadership & Councils). */
export const ACADEMIC_COUNCIL_LINKED_CARDS = [
  {
    id: "new-scientific-council",
    titleKey: "leadershipCouncilsCard3Title",
    image: "/images/about/new-scientific-council-hero.png",
    href: "/about/new-scientific-council",
  },
] as const;

export const ACADEMIC_COUNCIL_I18N: Record<
  AcademicCouncilCardId,
  { titleKey: string; bodyKey: string }
> = {
  comparative: {
    titleKey: "academicCouncilComparativeTitle",
    bodyKey: "academicCouncilComparativeBody",
  },
  historical: {
    titleKey: "academicCouncilHistoricalTitle",
    bodyKey: "academicCouncilHistoricalBody",
  },
};

/** Card hero images (existing campus media under `public/`). Swap paths when editorial assets are ready. */
export const ACADEMIC_COUNCIL_CARD_IMAGE: Record<AcademicCouncilCardId, string> = {
  comparative: "/tuesw-gallery/480/11.webp",
  historical: "/tuesw-gallery/480/22.webp",
};

export function isAcademicCouncilCardId(value: string | undefined): value is AcademicCouncilCardId {
  return value === "comparative" || value === "historical";
}

export function academicCouncilDetailPath(cardId: AcademicCouncilCardId): string {
  return `/research/academic-council/${cardId}`;
}
