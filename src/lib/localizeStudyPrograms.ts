import type { TFunction } from "i18next";
import { studyProgramI18nKey } from "@/lib/studyProgramI18nKey";
import type {
  StudyProgram,
  StudyProgramDetailResult,
  StudyProgramFaculty,
} from "@/types/studyPrograms";

/** CMS faculty ids → header.json keys under searchRoutes. */
const FACULTY_HEADER_KEYS: Record<string, string> = {
  "faculty-medicine": "searchRoutes.facultyOfMedicine",
  "fac-medicine": "searchRoutes.facultyOfMedicine",
  "fac-econ-it": "searchRoutes.facultyOfEconomics",
  "faculty-economics-information-technologies": "searchRoutes.facultyOfEconomics",
  "fac-pedagogy": "searchRoutes.facultyOfPedagogy",
  "faculty-pedagogy-social-humanities": "searchRoutes.facultyOfPedagogy",
};

type CurriculumT = TFunction<"studyProgramCurriculum">;

function localizeCurriculumText(value: string, bucket: "groupTitles" | "courses" | "metaValues", t: CurriculumT) {
  if (!value.trim()) return value;
  const key = `${bucket}.${studyProgramI18nKey(value)}`;
  return t(key, { defaultValue: value });
}

function localizeStudyProgram(program: StudyProgram, thome: TFunction<"home">, t: CurriculumT): StudyProgram {
  return {
    ...program,
    title: thome(`studyProgramTitles.programs.${program.id}`, { defaultValue: program.title }),
    degreeLevel: localizeCurriculumText(program.degreeLevel, "metaValues", t),
    duration: localizeCurriculumText(program.duration, "metaValues", t),
    qualification: localizeCurriculumText(program.qualification, "metaValues", t),
    tuitionFee: localizeCurriculumText(program.tuitionFee, "metaValues", t),
    courseGroups: program.courseGroups.map((group) => ({
      ...group,
      title: localizeCurriculumText(group.title, "groupTitles", t),
      courses: group.courses.map((course) => ({
        ...course,
        name: localizeCurriculumText(course.name, "courses", t),
      })),
    })),
  };
}

function localizeFacultyTitle(
  faculty: StudyProgramFaculty,
  th: TFunction<"header">,
  thome: TFunction<"home">,
): string {
  const headerKey = FACULTY_HEADER_KEYS[faculty.id];
  if (headerKey) return th(headerKey, { defaultValue: faculty.title });
  return thome(`studyProgramTitles.faculties.${faculty.id}`, { defaultValue: faculty.title });
}

export function localizeStudyProgramFaculties(
  faculties: readonly StudyProgramFaculty[],
  th: TFunction<"header">,
  thome: TFunction<"home">,
  t?: CurriculumT,
): StudyProgramFaculty[] {
  return faculties.map((faculty) => ({
    ...faculty,
    title: localizeFacultyTitle(faculty, th, thome),
    programs: faculty.programs.map((program) =>
      t ? localizeStudyProgram(program, thome, t) : {
        ...program,
        title: thome(`studyProgramTitles.programs.${program.id}`, { defaultValue: program.title }),
      },
    ),
  }));
}

export function localizeStudyProgramDetail(
  result: StudyProgramDetailResult,
  th: TFunction<"header">,
  thome: TFunction<"home">,
  t: CurriculumT,
): StudyProgramDetailResult {
  return {
    faculty: {
      ...result.faculty,
      title: localizeFacultyTitle(result.faculty, th, thome),
    },
    program: localizeStudyProgram(result.program, thome, t),
  };
}
