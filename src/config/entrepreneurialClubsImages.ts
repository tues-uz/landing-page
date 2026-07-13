export const ENTREPRENEURIAL_CLUBS_HUB_PATH = "/research/entrepreneurial-and-innovation-clubs";
export const ENTREPRENEURIAL_CLUBS_SCIENCE_PATH = "/science/entrepreneurial-clubs";

/** Hub cards only — Young Leaders & Startup Community live on the Innovation Club detail page. */
export const ENTREPRENEURIAL_CLUB_IDS = ["tues-innovation-club", "quantum-club"] as const;

export type EntrepreneurialClubId = (typeof ENTREPRENEURIAL_CLUB_IDS)[number];

export function isEntrepreneurialClubId(value: string): value is EntrepreneurialClubId {
  return (ENTREPRENEURIAL_CLUB_IDS as readonly string[]).includes(value);
}

export function entrepreneurialClubDetailPath(
  clubId: EntrepreneurialClubId,
  base: "research" | "science" = "research",
): string {
  const hub = base === "science" ? ENTREPRENEURIAL_CLUBS_SCIENCE_PATH : ENTREPRENEURIAL_CLUBS_HUB_PATH;
  return `${hub}/${clubId}`;
}

type ClubMeta = {
  titleKey: string;
  imageSrc: string;
  imageAltKey: string;
};

export const ENTREPRENEURIAL_CLUB_META: Record<EntrepreneurialClubId, ClubMeta> = {
  "tues-innovation-club": {
    titleKey: "entrepreneurialClubsS1Title",
    imageSrc: "/images/entrepreneurial-clubs/innovation.png",
    imageAltKey: "entrepreneurialClubsImage1Alt",
  },
  "quantum-club": {
    titleKey: "entrepreneurialClubsS4Title",
    imageSrc: "/images/entrepreneurial-clubs/quantum.png",
    imageAltKey: "entrepreneurialClubsImage4Alt",
  },
};

/** Sections shown on the TUES Innovation Club detail page (not hub cards). */
export const INNOVATION_CLUB_PAGE_SECTIONS = [
  {
    titleKey: "entrepreneurialClubsS1Title",
    bodyKey: "entrepreneurialClubsS1Body",
    imageSrc: "/images/entrepreneurial-clubs/innovation.png",
    imageAltKey: "entrepreneurialClubsImage1Alt",
  },
  {
    titleKey: "entrepreneurialClubsS2Title",
    bodyKey: "entrepreneurialClubsS2Body",
    imageSrc: "/images/entrepreneurial-clubs/leadership-collaboration.png",
    imageAltKey: "entrepreneurialClubsImage2Alt",
  },
  {
    titleKey: "entrepreneurialClubsS3Title",
    bodyKey: "entrepreneurialClubsS3Body",
    imageSrc: "/images/entrepreneurial-clubs/startup.png",
    imageAltKey: "entrepreneurialClubsImage3Alt",
  },
] as const;
