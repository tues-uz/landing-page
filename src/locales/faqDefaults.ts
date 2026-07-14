/** English fallbacks — Admission 2025 → FAQ (`topNav` namespace). */

export const FAQ_PAGE_DEFAULTS = {
  faqPageTitle: "Frequently Asked Questions",
  faqPageIntro:
    "Find quick answers to common questions about applying to Termez University of Economics and Service.",
  faqQ1: "When are applications accepted?",
  faqA1: "Monday–Friday until 14:00 (lunch break 12:00–13:00)",
  faqQ2: "What do I need to bring?",
  faqA2BeforeLink: "The answer to this question is available ",
  faqA2LinkLabel: "here",
  faqQ3: "Do you have a license?",
  faqA3BeforeLink: "Yes, of course we do. You can find it ",
  faqA3LinkLabel: "here",
  faqQ4: "Are your diplomas recognized throughout Uzbekistan?",
  faqA4: "Yes, absolutely.",
  faqQ5: "What documents are required for admission to the master's program?",
  faqA5: "For the first period of study: passport and bachelor's degree.",
} as const;

export const FAQ_ITEMS = [
  { id: "application-hours", questionKey: "faqQ1", answerKey: "faqA1", answerType: "text" },
  { id: "what-to-bring", questionKey: "faqQ2", answerType: "link-regulations" },
  { id: "license", questionKey: "faqQ3", answerType: "link-accreditation" },
  { id: "diploma-recognition", questionKey: "faqQ4", answerKey: "faqA4", answerType: "text" },
  { id: "masters-documents", questionKey: "faqQ5", answerKey: "faqA5", answerType: "text" },
] as const;

export const FAQ_LINK_PATHS = {
  regulationsAndRequirements: "/admissions/regulations-and-requirements",
  accreditationAndLicense: "/about/accreditation-and-license",
} as const;
