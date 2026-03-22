/**
 * Optional fields for `/programs/:slug` — merged on top of `programs` in Programs.tsx + site defaults.
 * Edited in CMS → Programs → Edit details (copy JSON into this file under the matching slug).
 */
export type ProgramDetailOverride = Partial<{
  introduction: string;
  careerOutcomes: string;
  duration: string;
  degreeType: string;
  studyFormat: string;
  languages: string;
  pace: string;
  applicationDeadline: string;
  startDate: string;
  tuition: string;
  /** Replaces slug-based hero from programHeroImages when set */
  heroImageUrl: string;
  /** Full URL for each download card; empty = default /program-brochures/{slug}[…].pdf */
  brochurePdfUrl: string;
  admissionsPdfUrl: string;
  curriculumPdfUrl: string;
}>;

export const programDetailOverrides: Record<string, ProgramDetailOverride> = {};
