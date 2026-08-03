export const ORGANIZATIONAL_STRUCTURE_I18N_DEFAULTS = {
  organizationalStructureIntro:
    "The diagram below follows the approved organizational structure of Termez University of Economics and Service. It shows how leadership, pro-rectorates, faculties, departments, and support units relate to one another.\n\nOn smaller screens, scroll horizontally if needed to see every column. For the latest titles or unit names, please contact the university chancellery.",
  organizationalStructureCaption:
    "Approved organizational scheme. For the latest line-up of offices or titles, please contact the university chancellery.",
  organizationalStructureProRectorsLabel: "Pro-rectors & administration",
  organizationalStructureFacultiesLabel: "Faculties & departments",
  organizationalStructureAuxiliaryLabel: "Oversight & services",
} as const;

/** English fallbacks — organizational structure org chart node labels (`topNav`). */

export const ORG_CHART_NODE_DEFAULTS = {
  "orgChart.establisher": "Founder",
  "orgChart.university-council": "University council",
  "orgChart.rector": "Rector",
  "orgChart.vice-rector-youth":
    "First Vice-Rector for Youth Affairs and Spiritual-Educational Work",
  "orgChart.youth-dept": "Department of Spiritual and Moral Development in Youth Work",
  "orgChart.press-dept": "Press department",
  "orgChart.vice-dean-youth": "Vice Dean for Spiritual and Youth Affairs",
  "orgChart.vice-rector-academic": "Vice Rector for Academic Affairs",
  "orgChart.academic-methodical": "Academic and Methodological Department",
  "orgChart.digital-edtech": "Digital Educational Technologies",
  "orgChart.masters-dept": "Master's Degree Department",
  "orgChart.vice-dean-academic": "Vice Dean for Academic Affairs",
  "orgChart.vice-rector-international": "Vice Rector for International Relations",
  "orgChart.intl-relations": "International Relations Department",
  "orgChart.foreign-language-center": "Foreign Language Teaching Center",
  "orgChart.strategic-development": "Department of Strategic Development",
  "orgChart.vice-rector-research": "Vice Rector for Research and Innovation",
  "orgChart.research-innovation": "Research and Innovation Department",
  "orgChart.info-resource-center": "Information Resource Center",
  "orgChart.assistant-rector": "Assistant to the Rector",
  "orgChart.hr-dept": "Human Resources Department",
  "orgChart.advisor": "Advisor to the rector",
  "orgChart.legal-dept": "Legal Department",
  "orgChart.secretariat-archive": "Secretariat and Archive Department",
  "orgChart.admissions-office": "University Admissions Office",
  "orgChart.technical-services": "Technical Services and Maintenance Department",
  "orgChart.public-council": "Public council",
  "orgChart.quality-accreditation": "Department of Quality Control and Accreditation",
  "orgChart.anti-corruption":
    "Department for Managing Anti-Corruption Compliance and Monitoring System",
  "orgChart.student-affairs": "Student Affairs Department",
  "orgChart.accounting-audit": "Department of Accounting and Audit",
  "orgChart.marketing-dept": "Department of Marketing",
} as const;

export function orgChartLabelKey(id: string): keyof typeof ORG_CHART_NODE_DEFAULTS {
  return `orgChart.${id}` as keyof typeof ORG_CHART_NODE_DEFAULTS;
}
