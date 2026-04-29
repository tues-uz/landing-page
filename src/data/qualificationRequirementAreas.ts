/** Education / qualification areas (by specialist cipher where applicable). */
export type QualificationRequirementArea = {
  title: string;
  /** Omitted for programme lines without a formal code in the source list. */
  cipher?: string;
};

export const QUALIFICATION_REQUIREMENT_AREAS: readonly QualificationRequirementArea[] = [
  { cipher: "60410500", title: "Finance and financial technologies" },
  { cipher: "60410600", title: "Banking" },
  { cipher: "60610100", title: "Information systems and technologies" },
  { cipher: "60410200", title: "Accounting" },
  { cipher: "60110900", title: "Foreign Language and Literature" },
  { cipher: "60110200", title: "Preschool Education" },
  { cipher: "60111200", title: "Physical Education" },
  { cipher: "60220300", title: "History" },
  { cipher: "60230100", title: "Philology and Language Teaching" },
  { cipher: "61010100", title: "Tourism and Hospitality" },
  { cipher: "60411900", title: "World economy and international economic relations" },
  { cipher: "60110400", title: "Primary Education" },
  { cipher: "60910200", title: "General Medicine" },
  { cipher: "60910100", title: "Dentistry" },
  { cipher: "70410506", title: "Public financial control and audit (master's degree)" },
  {
    title: "Theory and methodology of education and upbringing (primary education) (master's degree)",
  },
  { cipher: "70110901", title: "Foreign Language and Literature (master's degree)" },
  { cipher: "70410102", title: "Economics (master's degree)" },
  { cipher: "60310300", title: "Psychology" },
  { cipher: "60410300", title: "Taxes and Taxation" },
  { cipher: "60510100", title: "Biology" },
  { cipher: "60540100", title: "Mathematics" },
  { cipher: "60111300", title: "Technological Education" },
  { cipher: "60910800", title: "Pharmacy" },
  { cipher: "60910300", title: "Pediatrics" },
  { cipher: "70220301", title: "History (master's degree)" },
  { cipher: "70610101", title: "Computer systems and software engineering (master's degree)" },
  { cipher: "70540101", title: "Mathematics (master's degree)" },
  { cipher: "70910218", title: "Morphology (master's degree)" },
  { cipher: "70910101", title: "Dentistry (master's degree)" },
  { cipher: "70910217", title: "Urology (master's degree program)" },
  { cipher: "70910203", title: "Therapy (master's degree program)" },
  { cipher: "70910212", title: "Surgery (master's degree program)" },
  { cipher: "70910201", title: "Obstetrics and Gynecology (master's degree program specialty)" },
];
