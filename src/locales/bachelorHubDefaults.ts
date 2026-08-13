/** English fallbacks: Education → Bachelor hub and tracks (`topNav` namespace). */

export const BACHELOR_HUB_PAGE_DEFAULTS = {
  bachelorHubPageIntro:
    "Choose how you plan to study at Termez University of Economics and Service: full-time on campus, correspondence (distance) baccalaureate, or the NCUK International Foundation Year pathway.",
  bachelorHubCardFullTimeTitle: "Bachelor's degree (Full-time)",
  bachelorHubCardCorrespondenceTitle: "Baccalaureate (correspondence education)",
  bachelorHubCardIfyTitle: "International Foundation Year (IFY)",
} as const;

export type BachelorHubCard = {
  titleKey: keyof typeof BACHELOR_HUB_PAGE_DEFAULTS;
  imageSrc: string;
  imageFit?: "cover" | "contain";
  to: string;
};

/** Same campus gallery as programme cards — avoids third-party CDN (Unsplash) blocking or slow loads. */
export const BACHELOR_HUB_CARDS: readonly BachelorHubCard[] = [
  {
    titleKey: "bachelorHubCardFullTimeTitle",
    imageSrc: "/tuesw-gallery/480/8.webp",
    to: "/education/bachelor/full-time",
  },
  {
    titleKey: "bachelorHubCardCorrespondenceTitle",
    imageSrc: "/tuesw-gallery/480/24.webp",
    to: "/education/bachelor/correspondence",
  },
  {
    titleKey: "bachelorHubCardIfyTitle",
    imageSrc: "/images/education/alvis-pathway-logo.png",
    imageFit: "contain",
    to: "/education/bachelor/international-foundation-year",
  },
] as const;

export const BACHELOR_TRACK_DEFAULTS = {
  fullTime: {
    bachelorTrackFullTimeTitle: "Bachelor's degree (Full-time)",
    bachelorTrackFullTimeBody:
      "Full-time bachelor’s study follows the on-campus timetable, combining lectures, seminars, and assessed work with access to libraries, laboratories, and student services. Admission and curriculum details are published for each intake; use the main admissions and programs sections for the latest requirements and deadlines.",
    bachelorFullTimeCardsHint:
      "Select a programme below to open its dedicated page with the full specification table.",
  },
  correspondence: {
    bachelorTrackCorrespondenceTitle: "Baccalaureate (correspondence education)",
    bachelorTrackCorrespondenceBody:
      "Correspondence (distance) baccalaureate is designed for learners who combine study with work or other commitments, using structured remote materials, scheduled consultations, and examination sessions. Refer to the official catalogue and admissions notices for the current list of programmes offered in this mode and how to apply.",
    bachelorCorrespondenceCardsHint:
      "Select a programme below to open its dedicated page with the full specification.",
  },
} as const;
