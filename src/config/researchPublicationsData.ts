/** Scopus/WoS field distribution for Research → Research papers & Publications. */

export type ResearchPublicationFieldRow = {
  readonly no: number;
  readonly field: string;
  readonly count: number;
};

export const RESEARCH_PUBLICATION_FIELD_ROWS: readonly ResearchPublicationFieldRow[] = [
  { no: 1, field: "Computer Science", count: 437 },
  { no: 2, field: "Engineering Design (Construction/Design)", count: 314 },
  { no: 3, field: "Environmental Protection", count: 232 },
  { no: 4, field: "Business, Management and Accounting", count: 177 },
  { no: 5, field: "Medicine", count: 194 },
  { no: 6, field: "Biochemistry, Genetics and Molecular Biology", count: 145 },
  { no: 7, field: "Economics, Econometrics and Finance", count: 147 },
  { no: 8, field: "Sociology", count: 158 },
  { no: 9, field: "Agricultural and Biological Sciences", count: 146 },
  { no: 10, field: "Energy", count: 100 },
  { no: 11, field: "Mathematics", count: 99 },
  { no: 12, field: "Physics and Astronomy", count: 78 },
  { no: 13, field: "Decision Sciences", count: 95 },
  { no: 14, field: "Chemistry", count: 71 },
  { no: 15, field: "Materials Science", count: 75 },
  { no: 16, field: "Arts and Humanities", count: 38 },
  { no: 17, field: "Earth and Planetary Sciences", count: 29 },
  { no: 18, field: "Chemical Engineering", count: 40 },
  { no: 19, field: "Psychology", count: 11 },
  { no: 20, field: "Neuroscience", count: 15 },
  { no: 21, field: "Pharmacology, Toxicology and Pharmaceutics", count: 12 },
  { no: 22, field: "Nursing", count: 6 },
  { no: 23, field: "Immunology and Microbiology", count: 8 },
  { no: 24, field: "Multidisciplinary", count: 5 },
  { no: 25, field: "Veterinary", count: 52 },
  { no: 26, field: "Health Professions", count: 4 },
] as const;
