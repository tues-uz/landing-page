export type StudyProgramCourse = {
  name: string;
  credits?: string;
};

export type StudyProgramCourseGroup = {
  title: string;
  courses: StudyProgramCourse[];
};

export type StudyProgram = {
  id: string;
  title: string;
  code: string;
  duration: string;
  qualification: string;
  tuitionFee: string;
  degreeLevel: string;
  applicationDeadline?: string;
  earliestStartDate?: string;
  courseGroups: StudyProgramCourseGroup[];
};

export type StudyProgramFaculty = {
  id: string;
  /** Title resolved server-side for the requested locale (falls back to the base uz title). */
  title: string;
  /** Titles stored in the CMS per locale: "uz" is always present (base record), other
   *  locales only when a translation exists. Locales missing here fall back to "uz". */
  titles?: Record<string, string>;
  programs: StudyProgram[];
};

export type StudyProgramDetailResult = {
  faculty: StudyProgramFaculty;
  program: StudyProgram;
};

export type StudyProgramAdminItem = StudyProgram & {
  facultyId: string;
  updatedAt?: string;
};

/** @deprecated Use StudyProgramFaculty */
export type StudyProgramDirection = StudyProgramFaculty;
