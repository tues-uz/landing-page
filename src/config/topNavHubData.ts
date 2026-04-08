/** Sections for top-nav hub pages (About, Research, Admissions, Media). */

export type HubSection = { id: string; labelKey: string };

export const aboutHubSections: HubSection[] = [
  { id: "who-we-are", labelKey: "nav.aboutMenu.whoWeAre" },
  { id: "regulation", labelKey: "nav.aboutMenu.regulation" },
  { id: "university-in-numbers", labelKey: "nav.aboutMenu.universityInNumbers" },
  { id: "organizational-structure", labelKey: "nav.aboutMenu.organizationalStructure" },
  { id: "leadership-and-councils", labelKey: "nav.aboutMenu.leadershipAndCouncils" },
  { id: "accreditation-and-license", labelKey: "nav.aboutMenu.accreditationAndLicense" },
  { id: "workers-union-committee", labelKey: "nav.aboutMenu.workersUnionCommittee" },
  { id: "why-tues", labelKey: "nav.aboutMenu.whyTues" },
];

export const researchHubSections: HubSection[] = [
  { id: "scientific-publications-journals", labelKey: "nav.researchMenu.scientificPublicationsJournals" },
  { id: "seminars-and-conferences", labelKey: "nav.researchMenu.seminarsConferences" },
  { id: "academic-council", labelKey: "nav.researchMenu.academicCouncil" },
  { id: "research-papers-and-publications", labelKey: "nav.researchMenu.researchPapersPublications" },
  { id: "entrepreneurial-and-innovation-clubs", labelKey: "nav.researchMenu.entrepreneurialInnovationClubs" },
];

export const admissionsHubSections: HubSection[] = [
  { id: "study-programs", labelKey: "nav.admissionsMenu.studyPrograms" },
  { id: "regulations-and-requirements", labelKey: "nav.admissionsMenu.regulationsAndRequirements" },
  { id: "secondary-education-requirements", labelKey: "nav.admissionsMenu.secondaryEducationRequirements" },
  { id: "contract-amounts-tuition", labelKey: "nav.admissionsMenu.contractAmountsTuition" },
];

export const mediaHubSections: HubSection[] = [
  { id: "video-gallery", labelKey: "nav.newsMenu.videoGallery" },
  { id: "photo-gallery", labelKey: "nav.newsMenu.photoGallery" },
];

export type TopNavGroup = "about" | "research" | "admissions" | "media";

const SECTIONS_BY_GROUP: Record<TopNavGroup, HubSection[]> = {
  about: aboutHubSections,
  research: researchHubSections,
  admissions: admissionsHubSections,
  media: mediaHubSections,
};

export function subPagePath(group: TopNavGroup, sectionId: string): string {
  return `/${group}/${sectionId}`;
}

function hrefMap(group: TopNavGroup, sections: HubSection[]): Record<string, string> {
  return Object.fromEntries(sections.map((s) => [s.labelKey, subPagePath(group, s.id)]));
}

/** i18n keys used in header dropdowns → router href */
export const topNavItemHref: Record<string, string> = {
  ...hrefMap("about", aboutHubSections),
  ...hrefMap("research", researchHubSections),
  ...hrefMap("admissions", admissionsHubSections),
  ...hrefMap("media", mediaHubSections),
  "nav.newsMenu.latestNews": "/news",
  "nav.newsMenu.upcomingEvents": "/events",
};

export function getTopNavItemHref(labelKey: string): string {
  return topNavItemHref[labelKey] ?? "#";
}

export function getTopNavSubPageMeta(
  group: TopNavGroup,
  slug: string | undefined,
): HubSection | undefined {
  if (!slug) return undefined;
  return SECTIONS_BY_GROUP[group].find((s) => s.id === slug);
}

export function getSectionsForGroup(group: TopNavGroup): HubSection[] {
  return SECTIONS_BY_GROUP[group];
}
