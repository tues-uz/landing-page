/** Card entries for the Science / research centers page (extensible if more units are added). */
export type ResearchSustainableCenterCard = { id: string; titleKey: string; bodyKey: string };

export const RESEARCH_SUSTAINABLE_CENTER_CARDS: ResearchSustainableCenterCard[] = [
  {
    id: "center-research-sustainable",
    titleKey: "secondNavScience.centerResearchSustainableInnovativeDevelopment",
    bodyKey: "centerResearchSustainableCardBody",
  },
];

export function getResearchSustainableCenterById(
  id: string | undefined,
): ResearchSustainableCenterCard | undefined {
  if (!id) return undefined;
  return RESEARCH_SUSTAINABLE_CENTER_CARDS.find((c) => c.id === id);
}
