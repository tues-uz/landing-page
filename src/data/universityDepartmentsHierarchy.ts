/** Academic affairs hierarchy — links target official profiles on tues.uz (`leader/view/:id`). */

export const TUES_LEADER_VIEW_BASE = "https://tues.uz/leader/view";

export type DepartmentHierarchyLink = {
  label: string;
  /** Numeric id for `https://tues.uz/leader/view/:id` */
  leaderViewId: number;
};

export type FacultyHierarchyBlock = {
  id: string;
  faculty: DepartmentHierarchyLink;
  departments: readonly DepartmentHierarchyLink[];
};

/** Vice Rector for Academic Affairs and faculties with departments (order matches official org chart). */
export const UNIVERSITY_DEPARTMENTS_HIERARCHY = {
  viceRectorAcademicAffairs: {
    label: "Vice Rector for Academic Affairs",
    leaderViewId: 23,
  },
  faculties: [
    {
      id: "economics-it",
      faculty: {
        label: "Faculty of Economics and Information Technology",
        leaderViewId: 41,
      },
      departments: [
        { label: "Department of Economics", leaderViewId: 44 },
        { label: "Department of Accounting and Statistics", leaderViewId: 45 },
        { label: "Department of Information Technology and Exact Sciences", leaderViewId: 46 },
        { label: "Department of Finance and Tourism", leaderViewId: 47 },
      ],
    },
    {
      id: "pedagogy-social-humanities",
      faculty: {
        label: "Faculty of Pedagogy and Social Humanities",
        leaderViewId: 42,
      },
      departments: [
        { label: "Department of Pedagogy and Technological Education", leaderViewId: 48 },
        { label: "Department of History", leaderViewId: 52 },
        { label: "Department of Social Sciences", leaderViewId: 49 },
        { label: "Department of Preschool and Primary Education Theory", leaderViewId: 53 },
        { label: "Department of Foreign Languages and Literature", leaderViewId: 50 },
        { label: "Department of English Philology", leaderViewId: 54 },
        { label: "Department of Russian Language and Literature", leaderViewId: 55 },
        { label: "Department of Physical Education", leaderViewId: 56 },
        { label: "Department of Uzbek Language and Literature", leaderViewId: 51 },
        { label: "Department of Primary Education Methodology", leaderViewId: 65 },
      ],
    },
    {
      id: "medicine",
      faculty: {
        label: "Faculty of Medicine",
        leaderViewId: 43,
      },
      departments: [
        { label: "Department of Medical Fundamental Sciences", leaderViewId: 61 },
        { label: "Department of Natural Sciences", leaderViewId: 58 },
        { label: "Department of Medical Clinical Sciences", leaderViewId: 60 },
        { label: "Department of Medical and Preventive Sciences", leaderViewId: 62 },
        { label: "Department of Dental Sciences", leaderViewId: 63 },
        { label: "Department of Morphological Sciences", leaderViewId: 57 },
        { label: "Department of Therapeutic Sciences", leaderViewId: 64 },
        { label: "Department of Surgical Sciences", leaderViewId: 59 },
      ],
    },
  ] as const satisfies readonly FacultyHierarchyBlock[],
} as const;

export function leaderProfileHref(leaderViewId: number): string {
  return `${TUES_LEADER_VIEW_BASE}/${leaderViewId}`;
}
