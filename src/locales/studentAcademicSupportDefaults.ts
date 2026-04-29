/** English fallbacks: Student life → Student Academic Support hub (`topNav` namespace). */

export const STUDENT_ACADEMIC_SUPPORT_PAGE_DEFAULTS = {
  studentAcademicSupportPageIntro:
    "At Termez University of Economics and Service, the resources below bring together academic guidance, official student policies, and student union governance. Use the cards to explore each topic.",
} as const;

export type StudentAcademicSupportCard = {
  title: string;
  imageSrc: string;
  /** When set, the whole card links to this route. */
  to?: string;
};

/** Hub cards (same visual layout as Community clubs). */
export const STUDENT_ACADEMIC_SUPPORT_CARDS: readonly StudentAcademicSupportCard[] = [
  {
    title: "Student Academic Support",
    imageSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=533&fit=crop&q=80",
    to: "/student-life/student-academic-support/support-services",
  },
  {
    title: "Student Handbook",
    imageSrc:
      "https://images.unsplash.com/photo-1456513080510-7bf3a720b63f?w=800&h=533&fit=crop&q=80",
    to: "/student-life/student-academic-support/student-handbook",
  },
  {
    title: "Student Union Regulation",
    imageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=533&fit=crop&q=80",
    to: "/student-life/student-academic-support/student-union-regulation",
  },
];
