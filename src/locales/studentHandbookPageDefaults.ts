/** English fallbacks: Student Handbook downloads (`topNav` namespace). */

export type StudentHandbookDownloadCard = {
  title: string;
  description: string;
  fileHref: string;
  imageSrc: string;
};

export const STUDENT_HANDBOOK_PAGE_DEFAULTS = {
  studentHandbookPageTitle: "Student Handbook",
  studentHandbookPageIntro:
    "Download the official student handbook for your language of study. Each PDF contains academic policies, student rights and responsibilities, and practical guidance for life at Termez University of Economics and Service.",
} as const;

export const STUDENT_HANDBOOK_DOWNLOAD_CARDS: readonly StudentHandbookDownloadCard[] = [
  {
    title: "Student Handbook (English)",
    description: "Complete handbook for international and English-medium programmes.",
    fileHref: "/documents/tues-student-handbook-en.pdf",
    imageSrc:
      "https://images.unsplash.com/photo-1456513080510-7bf3a720b63f?w=800&h=533&fit=crop&q=80",
  },
  {
    title: "Student Handbook (Uzbek)",
    description: "Official handbook in Uzbek for native-language reference.",
    fileHref: "/documents/tues-student-handbook-uz.pdf",
    imageSrc:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=533&fit=crop&q=80",
  },
];
