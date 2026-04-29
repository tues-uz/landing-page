import { REGULATION_SECONDARY_EDUCATION_BODY_APPENDIX } from "./regulationSecondaryEducationBodyAppendix";
import { REGULATION_SECONDARY_EDUCATION_BODY_RESOLUTION } from "./regulationSecondaryEducationBodyResolution";

/** English fallbacks — Admission 2025 → Regulation on secondary education (`topNav`). */

export const REGULATION_SECONDARY_EDUCATION_HERO_SRC =
  "/images/admission-2025/regulation-secondary-education-hero.png" as const;

export const REGULATION_SECONDARY_EDUCATION_PAGE_DEFAULTS = {
  regulationSecondaryEducationPageTitle: "Regulation on secondary education",
  regulationSecondaryEducationHeroAlt:
    "Formal signing of documents: hands with a pen over papers on a desk, representing official regulations and agreements.",
  regulationSecondaryEducationBody: `${REGULATION_SECONDARY_EDUCATION_BODY_RESOLUTION}\n\n${REGULATION_SECONDARY_EDUCATION_BODY_APPENDIX}`,
} as const;
