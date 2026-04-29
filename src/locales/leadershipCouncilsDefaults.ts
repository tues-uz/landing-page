export const LEADERSHIP_COUNCILS_I18N_DEFAULTS = {
  leadershipCouncilsIntro:
    "The university hosts advisory councils and representative bodies that support governance, student voice, and scientific development. The following are key groups in the leadership and council structure at Termez University of Economics and Service.",
  leadershipCouncilsCard1Title:
    "Women's Affairs Advisory Committee at the University of Economics and Services in Termez",
  leadershipCouncilsCard2Title: "Termez University of Economics and Service Student Council",
  leadershipCouncilsCard3Title:
    "A new scientific council has been established at the Termez University of Economics and Service",
  leadershipCouncilsCardReadMore: "Read more",
} as const;

export const LEADERSHIP_COUNCILS_CARD_KEYS = [
  "leadershipCouncilsCard1Title",
  "leadershipCouncilsCard2Title",
  "leadershipCouncilsCard3Title",
] as const satisfies readonly (keyof typeof LEADERSHIP_COUNCILS_I18N_DEFAULTS)[];

/** Optional internal routes for leadership hub cards (add entries as detail pages are published). */
export const LEADERSHIP_COUNCIL_CARD_TO: Partial<
  Record<(typeof LEADERSHIP_COUNCILS_CARD_KEYS)[number], string>
> = {
  leadershipCouncilsCard1Title: "/about/womens-affairs-advisory-committee",
  leadershipCouncilsCard2Title: "/about/student-council",
  leadershipCouncilsCard3Title: "/about/new-scientific-council",
};

/** Hub card preview images (same assets as each council detail page hero). */
export const LEADERSHIP_COUNCIL_CARD_IMAGE: Record<
  (typeof LEADERSHIP_COUNCILS_CARD_KEYS)[number],
  string
> = {
  leadershipCouncilsCard1Title: "/images/about/womens-affairs-advisory-committee-hero.png",
  leadershipCouncilsCard2Title: "/images/about/student-council-hero.png",
  leadershipCouncilsCard3Title: "/images/about/new-scientific-council-hero.png",
};
