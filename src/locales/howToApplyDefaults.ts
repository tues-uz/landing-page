/** English fallbacks — Vacancies → How to Apply (`topNav` namespace). */

export const HOW_TO_APPLY_PAGE_DEFAULTS = {
  howToApplyPageTitle: "How to Apply",
  howToApplyPageIntro:
    "Follow the steps below to apply for a position at Termez University of Economics and Service.",
  howToApplyContactHeading: "Get in touch",
  howToApplyContactIntro: "Send your application or reach out with any questions.",
  howToApplyStep1Title: "Submit your CV",
  howToApplyStep1Body: "Send us your most recent Curriculum Vitae (PDF format preferred).",
  howToApplyStep2Title: "Interview invitation",
  howToApplyStep2Body: "If you are a good candidate, we will invite you for an initial interview.",
  howToApplyStep3Title: "Further interviews",
  howToApplyStep3Body: "Additional interview rounds depend on the role and are tailored accordingly.",
  howToApplyEmailLabel: "Email",
  howToApplyPhoneLabel: "Phone",
} as const;

export const HOW_TO_APPLY_CONTACT = {
  email: "university@tues.uz",
  phones: [
    { display: "+998 90 074 74 74", tel: "+998900747474" },
    { display: "+998 95 412 07 07", tel: "+998954120707" },
  ],
} as const;

export const HOW_TO_APPLY_STEPS = [
  { titleKey: "howToApplyStep1Title", bodyKey: "howToApplyStep1Body" },
  { titleKey: "howToApplyStep2Title", bodyKey: "howToApplyStep2Body" },
  { titleKey: "howToApplyStep3Title", bodyKey: "howToApplyStep3Body" },
] as const;
