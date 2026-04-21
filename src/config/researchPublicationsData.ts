/** Scopus/WoS field distribution for Research → Research papers & Publications. */

export type ResearchPublicationFieldRow = {
  readonly no: number;
  readonly field: string;
  readonly count: number;
};

export const RESEARCH_PUBLICATION_FIELD_ROWS: readonly ResearchPublicationFieldRow[] = [
  { no: 1, field: "Computer Science", count: 151 },
  { no: 2, field: "Engineering Design (Construction/Design)", count: 132 },
  { no: 3, field: "Environmental Protection", count: 130 },
  { no: 4, field: "Business, Management and Accounting", count: 120 },
  { no: 5, field: "Medicine", count: 105 },
  { no: 6, field: "Biochemistry, Genetics and Molecular Biology", count: 100 },
  { no: 7, field: "Economics, Econometrics and Finance", count: 99 },
  { no: 8, field: "Sociology", count: 75 },
  { no: 9, field: "Agricultural and Biological Sciences", count: 73 },
  { no: 10, field: "Energy", count: 57 },
  { no: 11, field: "Mathematics", count: 52 },
  { no: 12, field: "Physics and Astronomy", count: 43 },
  { no: 13, field: "Decision Sciences", count: 41 },
  { no: 14, field: "Chemistry", count: 36 },
  { no: 15, field: "Materials Science", count: 36 },
  { no: 16, field: "Arts and Humanities", count: 25 },
  { no: 17, field: "Earth and Planetary Sciences", count: 16 },
  { no: 18, field: "Chemical Engineering", count: 15 },
  { no: 19, field: "Psychology", count: 8 },
  { no: 20, field: "Neuroscience", count: 7 },
  { no: 21, field: "Pharmacology, Toxicology and Pharmaceutics", count: 4 },
  { no: 22, field: "Nursing", count: 3 },
  { no: 23, field: "Immunology and Microbiology", count: 2 },
  { no: 24, field: "Multidisciplinary", count: 2 },
  { no: 25, field: "Veterinary", count: 2 },
  { no: 26, field: "Health Professions", count: 1 },
] as const;
