import { TopNavHubPage } from "@/components/TopNavHubPage";
import { researchHubSections } from "@/config/topNavHubData";

export default function ResearchHubPage() {
  return (
    <TopNavHubPage
      pageTitleKey="nav.research"
      pageIntroKey="researchIntro"
      sections={researchHubSections}
      group="research"
    />
  );
}
