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
  courseGroups: StudyProgramCourseGroup[];
};

export type StudyProgramDirection = {
  id: string;
  title: string;
  programs: StudyProgram[];
};
