/**
 * Labels follow the approved organizational chart (Termez University of Economics and Service).
 * Edit this file when the official structure changes.
 */

export type OrgColumn = {
  readonly title: string;
  readonly items: readonly string[];
  /** Highlight a child by index (e.g. Scientific Work dept. — blue border on chart). */
  readonly highlightItemIndex?: number;
};

export const ORG_TOP = {
  left: "TUES Med HUB LLC",
  founder: "FOUNDER",
  right: "TUES SCHOOL NTM",
} as const;

export const ORG_RECTOR_ROW = {
  council: "University Council",
  rector: "Rector",
  advisor: "Rector's Advisor",
} as const;

export const ORG_PRO_RECTOR_COLUMNS: readonly OrgColumn[] = [
  {
    title: "First Pro-Rector for Youth Affairs & Spiritual-Educational Work",
    items: [
      "Youth Affairs, Spirituality and Enlightenment Dept.",
      "Press Department",
      "Deputy Deans for Spiritual and Youth Affairs",
    ],
  },
  {
    title: "Pro-Rector for Academic Affairs",
    items: [
      "Academic-Methodical Department",
      "Digital Educational Technologies Center",
      "Master's Department",
      "Deputy Deans for Academic Affairs",
      "Academic-Methodical Support Department",
      "Students' Internship and Career Dept.",
    ],
  },
  {
    title: "Strategic Development Department",
    items: [],
  },
  {
    title: "Pro-Rector for International Relations",
    items: ['International Relations Department', '"TISU EDUHUB" Training Center'],
  },
  {
    title: "Pro-Rector for Scientific Work and Innovations",
    items: ["Scientific Work and Innovations Department", "Information Resource Center"],
    highlightItemIndex: 0,
  },
  {
    title: "Administrative support",
    items: [
      "Rector's Assistant",
      "HR Department",
      "Legal Department",
      "Chancellery and Archive Department",
      "Admissions Office",
      "Technical Maintenance and Economy Dept.",
    ],
  },
] as const;

export const ORG_FACULTIES: readonly OrgColumn[] = [
  {
    title: "Faculty of Economics and IT",
    items: [
      "Dept. of Economics",
      "Dept. of Accounting and Statistics",
      "Dept. of IT and Exact Sciences",
      "Dept. of Finance and Tourism",
    ],
  },
  {
    title: "Faculty of Pedagogy & Social-Humanitarian Sciences",
    items: [
      "Dept. of Pedagogy and Technological Education",
      "Dept. of Social Sciences",
      "Dept. of Foreign Language and Literature",
      "Dept. of English Philology",
      "Dept. of Russian Language and Literature",
      "Dept. of History",
      "Dept. of Preschool and Primary Education Theory",
      "Dept. of Primary Education Methodology",
      "Dept. of Uzbek Language and Literature",
      "Dept. of Physical Education",
    ],
  },
  {
    title: "Faculty of Medicine",
    items: [
      "Dept. of Natural Sciences",
      "Dept. of Medical Preventive Sciences",
      "Dept. of Stomatological Sciences",
      "Dept. of Morphological Sciences",
      "Dept. of Clinical Medical Sciences",
      "Dept. of Medical Fundamental Sciences",
      "Dept. of Therapeutic Sciences",
      "Dept. of Surgical Sciences",
    ],
  },
] as const;

export const ORG_AUXILIARY_COLUMN: readonly string[] = [
  "Public Council",
  "Education Quality and Monitoring Dept.",
  'Anti-Corruption "Compliance-Control" System Mgmt. Dept.',
  "Student Affairs Department",
  "Accounting and Audit Department",
  "Marketing Department",
] as const;

export const ORG_CHART_TITLE =
  "Organizational Structure of Termez Economics and Service University" as const;
