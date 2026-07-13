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
  title: string;
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
