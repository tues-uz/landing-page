/** English fallbacks — Admission 2025 → Contacting about admission (`topNav`). */

export const CONTACTING_ADMISSION_PAGE_DEFAULTS = {
  contactingAdmissionPageTitle: "Contacting about admission",
  contactingAdmissionPageIntro:
    "To submit documents to the Termez University of Economics and Service, you may contact the following numbers:",
} as const;

/** Display strings and `tel:` href values (digits only after +). */
export const CONTACTING_ADMISSION_PHONES: readonly { display: string; tel: string }[] = [
  { display: "+998 55 452 77 77", tel: "+998554527777" },
  { display: "+998 95 412 07 07", tel: "+998954120707" },
];
