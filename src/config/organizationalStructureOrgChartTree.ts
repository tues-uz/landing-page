import { organizationalLeaderProfilePath } from "@/data/organizationalLeaderProfiles";

export type OrgChartTreeNode = {
  readonly id: string;
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
    isParent: true,
    children: [
      { id: "university-council" },
      {
        id: "rector",
        isParent: true,
        to: organizationalLeaderProfilePath(3),
        children: [
          {
            id: "vice-rector-youth",
            isParent: true,
            to: organizationalLeaderProfilePath(22),
            verticalChildren: true,
            children: [
              {
                id: "youth-dept",
                to: organizationalLeaderProfilePath(33),
              },
              { id: "press-dept", to: organizationalLeaderProfilePath(34) },
              { id: "vice-dean-youth" },
            ],
          },
          {
            id: "vice-rector-academic",
            isParent: true,
            to: organizationalLeaderProfilePath(23),
            verticalChildren: true,
            children: [
              {
                id: "academic-methodical",
                to: organizationalLeaderProfilePath(35),
              },
              {
                id: "digital-edtech",
                to: organizationalLeaderProfilePath(7),
              },
              {
                id: "masters-dept",
                to: organizationalLeaderProfilePath(36),
              },
              { id: "vice-dean-academic" },
            ],
          },
          {
            id: "vice-rector-international",
            isParent: true,
            to: organizationalLeaderProfilePath(25),
            verticalChildren: true,
            children: [
              {
                id: "intl-relations",
                to: organizationalLeaderProfilePath(69),
              },
              { id: "foreign-language-center" },
              {
                id: "strategic-development",
                to: organizationalLeaderProfilePath(68),
              },
            ],
          },
          {
            id: "vice-rector-research",
            isParent: true,
            to: organizationalLeaderProfilePath(26),
            verticalChildren: true,
            children: [
              {
                id: "research-innovation",
                to: organizationalLeaderProfilePath(38),
              },
              {
                id: "info-resource-center",
                to: organizationalLeaderProfilePath(27),
              },
            ],
          },
          {
            id: "assistant-rector",
            isParent: true,
            to: organizationalLeaderProfilePath(28),
            verticalChildren: true,
            children: [
              {
                id: "hr-dept",
                to: organizationalLeaderProfilePath(29),
              },
            ],
          },
        ],
      },
      {
        id: "advisor",
        isParent: true,
        verticalChildren: true,
        children: [
          { id: "legal-dept", to: organizationalLeaderProfilePath(30) },
          {
            id: "secretariat-archive",
            to: organizationalLeaderProfilePath(31),
          },
          {
            id: "admissions-office",
            to: organizationalLeaderProfilePath(32),
          },
          {
            id: "technical-services",
            to: organizationalLeaderProfilePath(70),
          },
        ],
      },
      {
        id: "public-council",
        isParent: true,
        verticalChildren: true,
        children: [
          {
            id: "quality-accreditation",
            to: organizationalLeaderProfilePath(39),
          },
          {
            id: "anti-corruption",
            to: organizationalLeaderProfilePath(66),
          },
          {
            id: "student-affairs",
            to: organizationalLeaderProfilePath(40),
          },
          {
            id: "accounting-audit",
            to: organizationalLeaderProfilePath(67),
          },
          {
            id: "marketing-dept",
            to: organizationalLeaderProfilePath(37),
          },
        ],
      },
    ],
  };
}
