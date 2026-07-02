export type DepartmentStaffMember = {
  name: string;
  role: string;
  phone?: string;
  imageSrc: string;
};

export type DepartmentCourseGroup = {
  title: string;
  listItems: readonly string[];
};

export type DepartmentSubsection = {
  title: string;
  groups?: readonly DepartmentCourseGroup[];
  orderedListItems?: readonly string[];
};

export type DepartmentSection = {
  title: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
  orderedListItems?: readonly string[];
  trailingParagraphs?: readonly string[];
  subsections?: readonly DepartmentSubsection[];
};

export type DepartmentProfile = {
  leaderViewId: number;
  pageTitle: string;
  roleShort: string;
  name: string;
  credentials: string;
  imageSrc: string;
  phone: string;
  email: string;
  telegram: string;
  reception: string;
  sections: readonly DepartmentSection[];
  staffMembers: readonly DepartmentStaffMember[];
};
