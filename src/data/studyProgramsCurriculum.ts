import type { StudyProgram, StudyProgramFaculty } from "@/types/studyPrograms";
import { ECONOMICS_FACULTY } from "@/data/studyPrograms/economicsFaculty";
import { MEDICINE_FACULTY } from "@/data/studyPrograms/medicineFaculty";
import { PEDAGOGY_FACULTY } from "@/data/studyPrograms/pedagogyFaculty";

export const STUDY_PROGRAMS_CURRICULUM: readonly StudyProgramFaculty[] = [
  MEDICINE_FACULTY,
  PEDAGOGY_FACULTY,
  ECONOMICS_FACULTY,
] as const;

/** Static fallback when the CMS API is unavailable or empty. */
export const FALLBACK_STUDY_PROGRAMS_CURRICULUM = STUDY_PROGRAMS_CURRICULUM;

/** Public listing page for all degree programs. */
export const STUDY_PROGRAMS_LIST_PATH = "/programs";

/** Online application form linked from program detail CTAs. */
export const STUDY_PROGRAM_APPLY_PATH = "/admission-2025/apply";

export function studyProgramApplyPath(programId?: string): string {
  if (!programId) return STUDY_PROGRAM_APPLY_PATH;
  return `${STUDY_PROGRAM_APPLY_PATH}?program=${encodeURIComponent(programId)}`;
}

export function studyProgramDetailPath(programId: string): string {
  return `/admissions/study-programs/${programId}`;
}

export function flattenStudyPrograms(
  faculties: readonly StudyProgramFaculty[],
): { faculty: StudyProgramFaculty; program: StudyProgram }[] {
  return faculties.flatMap((faculty) =>
    faculty.programs.map((program) => ({ faculty, program })),
  );
}

export function getStudyProgramCourseCount(program: StudyProgram): number {
  return program.courseGroups.reduce((n, group) => n + group.courses.length, 0);
}

export function getStudyProgramById(
  id: string,
  faculties: readonly StudyProgramFaculty[] = STUDY_PROGRAMS_CURRICULUM,
): { faculty: StudyProgramFaculty; program: StudyProgram; direction: StudyProgramFaculty } | undefined {
  for (const faculty of faculties) {
    const program = faculty.programs.find((p) => p.id === id);
    if (program) return { faculty, program, direction: faculty };
  }
  return undefined;
}
