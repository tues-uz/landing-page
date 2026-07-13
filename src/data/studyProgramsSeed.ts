/**
 * Backend seed payload for `/content/study-programs`.
 * Import this JSON in the CMS backend to populate faculties, programs, and course groups.
 */
import { STUDY_PROGRAMS_CURRICULUM } from "@/data/studyProgramsCurriculum";

export const STUDY_PROGRAMS_SEED = {
  faculties: STUDY_PROGRAMS_CURRICULUM,
} as const;

export type StudyProgramsSeedPayload = typeof STUDY_PROGRAMS_SEED;
