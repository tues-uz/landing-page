export const SECONDARY_EDUCATION_REQUIREMENTS_I18N_DEFAULTS = {
  secondaryEducationRequirementsIntro:
    "Frequently asked questions about secondary education documents and requirements for applicants to Termez University of Economics and Service.",
  secondaryEdFaqQ1: "What secondary education qualifications are accepted for admission to TUES?",
  secondaryEdFaqA1:
    "Applicants must be graduates of a general secondary school (11-year certificate), an academic lyceum, or a vocational college. The document must be issued in accordance with the legislation of the Republic of Uzbekistan.",
  secondaryEdFaqQ2: "What documents confirm completion of secondary education?",
  secondaryEdFaqA2:
    "Submit the original or a certified copy of your certificate of general secondary education, academic lyceum diploma, or vocational college diploma, together with your passport or ID card and other documents requested during the admission campaign.",
  secondaryEdFaqQ3: "Can I apply with a secondary education certificate obtained abroad?",
  secondaryEdFaqA3:
    "Yes. Foreign certificates and diplomas must be recognized (nostrified) or equated in the manner established by the legislation of the Republic of Uzbekistan before or during the admission process, as required by the admission regulations.",
  secondaryEdFaqQ4: "Can graduates of vocational colleges apply for a bachelor's degree?",
  secondaryEdFaqA4:
    "Yes. Holders of a vocational college diploma may apply for undergraduate (bachelor's) programmes in the fields of study opened for admission, subject to the requirements of the current admission rules.",
  secondaryEdFaqQ5: "Is there a minimum age for applicants?",
  secondaryEdFaqA5:
    "Applicants must meet the age requirements set in the official admission regulations for the relevant academic year. Check the current admission announcement for the exact date and age limit.",
  secondaryEdFaqQ6: "Where can I read the official regulation on secondary education?",
  secondaryEdFaqA6Before:
    "The Cabinet of Ministers resolution on the procedure for obtaining a second and subsequent higher education and related admission rules are published on the Admission 2026 section of this website. See",
  secondaryEdFaqA6Link: "Regulation on secondary education",
  secondaryEdFaqA6After: "for the full text.",
} as const;

export const SECONDARY_EDUCATION_REQUIREMENTS_FAQ = [
  { id: "accepted-qualifications", questionKey: "secondaryEdFaqQ1", answerKey: "secondaryEdFaqA1" },
  { id: "required-documents", questionKey: "secondaryEdFaqQ2", answerKey: "secondaryEdFaqA2" },
  { id: "foreign-certificates", questionKey: "secondaryEdFaqQ3", answerKey: "secondaryEdFaqA3" },
  { id: "vocational-college", questionKey: "secondaryEdFaqQ4", answerKey: "secondaryEdFaqA4" },
  { id: "age-requirement", questionKey: "secondaryEdFaqQ5", answerKey: "secondaryEdFaqA5" },
  {
    id: "official-regulation",
    questionKey: "secondaryEdFaqQ6",
    answerType: "link-regulation" as const,
  },
] as const;
