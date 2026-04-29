/** English fallbacks for Internationalization → Employees of the Department of International Relations. */

import {
  internationalCooperationRolePath,
  type InternationalCooperationRoleSlug,
} from "@/locales/internationalCooperationRoleDefaults";

const ROLE_SLUGS_IN_CARD_ORDER: InternationalCooperationRoleSlug[] = [
  "vice-rector-international-cooperation",
  "head-department-international-cooperation",
  "lead-specialist-international-cooperation",
];

/** Hub card link targets (same order as `DEPARTMENT_INTL_REL_EMPLOYEES_CARD_KEYS`). */
export const DEPARTMENT_INTL_REL_EMPLOYEES_CARD_HREFS = ROLE_SLUGS_IN_CARD_ORDER.map(
  internationalCooperationRolePath,
);

/** Optional preview image on the hub card (same order; undefined = icon). */
export const DEPARTMENT_INTL_REL_EMPLOYEES_CARD_IMAGES: (string | undefined)[] = [
  "/images/internationalization/vice-rector-international-cooperation.png",
  "/images/internationalization/head-department-international-cooperation.png",
  "/images/internationalization/lead-specialist-international-cooperation.png",
];

export const DEPARTMENT_INTL_REL_EMPLOYEES_DEFAULTS = {
  departmentIntlRelEmployeesPageTitle: "Employees of the Department of International Relations",
  departmentIntlRelEmployeesIntro:
    "The following positions represent the main leadership and specialist roles in international cooperation at Termez University of Economics and Service.",
  departmentIntlRelEmployeesCard1Title: "Vice-rector for international cooperation",
  departmentIntlRelEmployeesCard2Title: "Head of the Department of international cooperation of the University",
  departmentIntlRelEmployeesCard3Title: "Lead specialist of the university's international cooperation department",
} as const;

export const DEPARTMENT_INTL_REL_EMPLOYEES_CARD_KEYS = [
  "departmentIntlRelEmployeesCard1Title",
  "departmentIntlRelEmployeesCard2Title",
  "departmentIntlRelEmployeesCard3Title",
] as const satisfies readonly (keyof typeof DEPARTMENT_INTL_REL_EMPLOYEES_DEFAULTS)[];

export const DEPARTMENT_INTL_REL_EMPLOYEES_CARD_ICONS = [
  "viceRector",
  "head",
  "specialist",
] as const;
