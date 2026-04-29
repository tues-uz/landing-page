/** English fallbacks — University → Mission (`topNav`). */

export const UNIVERSITY_MISSION_PAGE_DEFAULTS = {
  universityMissionPageTitle: "University mission",
  universityMissionPdfPlaceholderNote:
    "PDF downloads for the strategic development strategy and green development strategy will be linked here when files are published.",
} as const;

/** Set to a path under `public/` (e.g. `/documents/university-mission/strategy.pdf`) when files exist. */
export const UNIVERSITY_MISSION_STRATEGY_PDF_HREF: string | null = null;
export const UNIVERSITY_MISSION_GREEN_STRATEGY_PDF_HREF: string | null = null;
