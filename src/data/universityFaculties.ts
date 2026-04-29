export type FacultyCardTitleKey =
  | "universityFacultyMedicineTitle"
  | "universityFacultyPedagogyTitle"
  | "universityFacultyEconomicsTitle";

export type UniversityFacultyCard = {
  id: string;
  imageSrc: string;
  titleKey: FacultyCardTitleKey;
  /** When set, the faculty card links to this path (e.g. detail page). */
  detailPath?: string;
};

export const UNIVERSITY_FACULTIES: readonly UniversityFacultyCard[] = [
  {
    id: "medicine",
    imageSrc: "/images/faculties/faculty-medicine-hero.png",
    titleKey: "universityFacultyMedicineTitle",
    detailPath: "/university-faculties/medicine",
  },
  {
    id: "pedagogy-social-humanities",
    imageSrc: "/images/faculties/faculty-pedagogy-hero.png",
    titleKey: "universityFacultyPedagogyTitle",
    detailPath: "/university-faculties/pedagogy-social-humanities",
  },
  {
    id: "economics-information-tech",
    imageSrc: "/images/faculties/faculty-economics-hero.png",
    titleKey: "universityFacultyEconomicsTitle",
    detailPath: "/university-faculties/economics-information-technologies",
  },
] as const;
