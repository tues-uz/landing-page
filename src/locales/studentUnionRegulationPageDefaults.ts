/** English fallbacks: Student Union Regulation downloads (`topNav` namespace). */

export type StudentUnionDownloadCard = {
  title: string;
  description: string;
  fileHref: string;
  imageSrc: string;
};

export const STUDENT_UNION_REGULATION_PAGE_DEFAULTS = {
  studentUnionRegulationPageTitle: "Student Union Regulation",
  studentUnionRegulationPageIntro:
    "Download the governing documents for the student union at Termez University of Economics and Service. Files are provided in PDF format for offline reading and printing.",
} as const;

export const STUDENT_UNION_REGULATION_DOWNLOAD_CARDS: readonly StudentUnionDownloadCard[] = [
  {
    title: "Student Union Regulations",
    description: "Statutes, membership rules, and governance of the student union.",
    fileHref: "/documents/tues-student-union-regulations.pdf",
    imageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=533&fit=crop&q=80",
  },
  {
    title: "Electoral code & standing orders",
    description: "Rules for student union elections and plenary procedures.",
    fileHref: "/documents/tues-student-union-electoral-code.pdf",
    imageSrc:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=533&fit=crop&q=80",
  },
];
