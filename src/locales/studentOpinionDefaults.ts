/** English fallbacks: Student life → Student opinion (`topNav` namespace). */

export const STUDENT_OPINION_DEFAULTS = {
  studentOpinionPageTitle: "Student opinion",
  studentOpinionIntro:
    "Share feedback or reach the university using the contact details below.",

  studentOpinionContactHeading: "Contact us",
  studentOpinionLabelAddress: "Address",
  studentOpinionLabelPhone: "Phone number",
  studentOpinionLabelEmail: "E-mail",

  studentOpinionValueAddress: "Termez, Farovon street 4-b",
  /** Display text; `tel` uses digits only for Uzbekistan Surkhandarya (55). */
  studentOpinionValuePhoneDisplay: "55 452 77 77",
  studentOpinionValuePhoneTel: "+998554527777",
  studentOpinionValueEmail: "university@tues.uz",
} as const;
