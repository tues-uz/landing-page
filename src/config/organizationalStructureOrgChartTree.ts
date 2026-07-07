import { organizationalLeaderProfilePath } from "@/data/organizationalLeaderProfiles";

export type OrgChartTreeNode = {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  /** Internal route (React Router). Takes precedence over href when set. */
  readonly to?: string;
  readonly isParent?: boolean;
  readonly verticalChildren?: boolean;
  readonly children?: readonly OrgChartTreeNode[];
};

/** Same node set as tues.uz organizational structure chart. */
export function buildOrganizationalStructureTree(): OrgChartTreeNode {
  return {
    id: "establisher",
    label: "Founder",
    isParent: true,
    children: [
      { id: "university-council", label: "University council" },
      {
        id: "rector",
        label: "Rector",
        isParent: true,
        to: organizationalLeaderProfilePath(3),
        children: [
          {
            id: "vice-rector-youth",
            label: "First Vice-Rector for Youth Affairs and Spiritual-Educational Work",
            isParent: true,
            to: organizationalLeaderProfilePath(22),
            verticalChildren: true,
            children: [
              {
                id: "youth-dept",
                label: "Department of Spiritual and Moral Development in Youth Work",
                to: organizationalLeaderProfilePath(33),
              },
              { id: "press-dept", label: "Press department", to: organizationalLeaderProfilePath(34) },
              { id: "vice-dean-youth", label: "Vice Dean for Spiritual and Youth Affairs" },
            ],
          },
          {
            id: "vice-rector-academic",
            label: "Vice Rector for Academic Affairs",
            isParent: true,
            to: organizationalLeaderProfilePath(23),
            verticalChildren: true,
            children: [
              {
                id: "academic-methodical",
                label: "Academic and Methodological Department",
                to: organizationalLeaderProfilePath(35),
              },
              {
                id: "digital-edtech",
                label: "Digital Educational Technologies",
                to: organizationalLeaderProfilePath(7),
              },
              {
                id: "masters-dept",
                label: "Master's Degree Department",
                to: organizationalLeaderProfilePath(36),
              },
              { id: "vice-dean-academic", label: "Vice Dean for Academic Affairs" },
            ],
          },
          {
            id: "vice-rector-international",
            label: "Vice Rector for International Relations",
            isParent: true,
            to: organizationalLeaderProfilePath(25),
            verticalChildren: true,
            children: [
              {
                id: "intl-relations",
                label: "International Relations Department",
                to: organizationalLeaderProfilePath(69),
              },
              { id: "foreign-language-center", label: "Foreign Language Teaching Center" },
              {
                id: "strategic-development",
                label: "Department of Strategic Development",
                to: organizationalLeaderProfilePath(68),
              },
            ],
          },
          {
            id: "vice-rector-research",
            label: "Vice Rector for Research and Innovation",
            isParent: true,
            to: organizationalLeaderProfilePath(26),
            verticalChildren: true,
            children: [
              {
                id: "research-innovation",
                label: "Research and Innovation Department",
                to: organizationalLeaderProfilePath(38),
              },
              {
                id: "info-resource-center",
                label: "Information Resource Center",
                to: organizationalLeaderProfilePath(27),
              },
            ],
          },
          {
            id: "assistant-rector",
            label: "Assistant to the Rector",
            isParent: true,
            to: organizationalLeaderProfilePath(28),
            verticalChildren: true,
            children: [
              {
                id: "hr-dept",
                label: "Human Resources Department",
                to: organizationalLeaderProfilePath(29),
              },
            ],
          },
        ],
      },
      {
        id: "advisor",
        label: "Advisor to the rector",
        isParent: true,
        verticalChildren: true,
        children: [
          { id: "legal-dept", label: "Legal Department", to: organizationalLeaderProfilePath(30) },
          {
            id: "secretariat-archive",
            label: "Secretariat and Archive Department",
            to: organizationalLeaderProfilePath(31),
          },
          {
            id: "admissions-office",
            label: "University Admissions Office",
            to: organizationalLeaderProfilePath(32),
          },
          {
            id: "technical-services",
            label: "Technical Services and Maintenance Department",
            to: organizationalLeaderProfilePath(70),
          },
        ],
      },
      {
        id: "public-council",
        label: "Public council",
        isParent: true,
        verticalChildren: true,
        children: [
          {
            id: "quality-accreditation",
            label: "Department of Quality Control and Accreditation",
            to: organizationalLeaderProfilePath(39),
          },
          {
            id: "anti-corruption",
            label: "Department for Managing Anti-Corruption Compliance and Monitoring System",
            to: organizationalLeaderProfilePath(66),
          },
          {
            id: "student-affairs",
            label: "Student Affairs Department",
            to: organizationalLeaderProfilePath(40),
          },
          {
            id: "accounting-audit",
            label: "Department of Accounting and Audit",
            to: organizationalLeaderProfilePath(67),
          },
          {
            id: "marketing-dept",
            label: "Department of Marketing",
            to: organizationalLeaderProfilePath(37),
          },
        ],
      },
    ],
  };
}
