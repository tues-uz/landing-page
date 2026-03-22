import { getProgramBySlug } from "@/components/Programs";
import { programDetailOverrides, type ProgramDetailOverride } from "@/data/programDetailConfig";
import { DEFAULT_PROGRAM_HERO_IMAGE, PROGRAM_HERO_IMAGES } from "@/data/programHeroImages";

export const DEFAULT_PROGRAM_DURATION = "2–4 years (varies by program)";
export const DEFAULT_PROGRAM_DEGREE_TYPE = "Bachelor, Master, Certificate";
export const DEFAULT_PROGRAM_STUDY_FORMAT = "On campus, Blended, Online";
export const DEFAULT_PROGRAM_LANGUAGES = "English";
export const DEFAULT_PROGRAM_PACE = "Full time, Part time";
export const DEFAULT_REQUEST_INFO = "Request info";

export type { ProgramDetailOverride };

type ProgramBase = NonNullable<ReturnType<typeof getProgramBySlug>>;
type ProgramRow = ProgramBase & ProgramDetailOverride;

function defaultIntroduction(longDescription: string) {
  return `${longDescription} Our programs combine rigorous theory with real-world application, supported by experienced faculty and strong industry connections.`;
}

function defaultCareerOutcomes(title: string) {
  return `Graduates of our ${title} programs pursue careers across industry, government, and academia. Typical roles include analysts, managers, consultants, and leadership positions.`;
}

function str(...candidates: (string | undefined)[]): string {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c;
  }
  return "";
}

/**
 * Single source of truth for program detail page + CMS edit form.
 * Merge order: optional fields on `programs[]` row → programDetailOverrides[slug] → site defaults.
 */
export function getProgramDetailViewModel(slug: string) {
  const base = getProgramBySlug(slug) as ProgramRow | undefined;
  if (!base) return null;

  const o = programDetailOverrides[slug] ?? {};
  const longDescription = base.longDescription;

  const introduction = str(base.introduction, o.introduction, defaultIntroduction(longDescription));
  const careerOutcomes = str(base.careerOutcomes, o.careerOutcomes, defaultCareerOutcomes(base.title));

  const degreeType = str(base.degreeType, o.degreeType, DEFAULT_PROGRAM_DEGREE_TYPE);
  const duration = str(base.duration, o.duration, DEFAULT_PROGRAM_DURATION);
  const languages = str(base.languages, o.languages, DEFAULT_PROGRAM_LANGUAGES);
  const pace = str(base.pace, o.pace, DEFAULT_PROGRAM_PACE);
  const studyFormat = str(base.studyFormat, o.studyFormat, DEFAULT_PROGRAM_STUDY_FORMAT);
  const applicationDeadline = str(base.applicationDeadline, o.applicationDeadline, DEFAULT_REQUEST_INFO);
  const startDate = str(base.startDate, o.startDate, DEFAULT_REQUEST_INFO);
  const tuition = str(base.tuition, o.tuition, DEFAULT_REQUEST_INFO);

  const heroImage = str(base.heroImageUrl, o.heroImageUrl, PROGRAM_HERO_IMAGES[slug], DEFAULT_PROGRAM_HERO_IMAGE);

  const brochurePdfHref =
    str(base.brochurePdfUrl, o.brochurePdfUrl) || `/program-brochures/${base.slug}.pdf`;
  const admissionsPdfHref =
    str(base.admissionsPdfUrl, o.admissionsPdfUrl) || `/program-brochures/${base.slug}-admissions.pdf`;
  const curriculumPdfHref =
    str(base.curriculumPdfUrl, o.curriculumPdfUrl) || `/program-brochures/${base.slug}-curriculum.pdf`;

  return {
    slug: base.slug,
    title: base.title,
    count: base.count,
    description: base.description,
    longDescription,
    highlights: base.highlights,
    introduction,
    careerOutcomes,
    degreeType,
    duration,
    languages,
    pace,
    studyFormat,
    applicationDeadline,
    startDate,
    tuition,
    heroImage,
    brochurePdfHref,
    admissionsPdfHref,
    curriculumPdfHref,
  };
}

export type ProgramDetailViewModel = NonNullable<ReturnType<typeof getProgramDetailViewModel>>;
