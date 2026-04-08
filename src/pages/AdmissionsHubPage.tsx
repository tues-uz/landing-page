import { TopNavHubPage } from "@/components/TopNavHubPage";
import { admissionsHubSections } from "@/config/topNavHubData";

export default function AdmissionsHubPage() {
  return (
    <TopNavHubPage
      pageTitleKey="nav.admissions"
      pageIntroKey="admissionsIntro"
      sections={admissionsHubSections}
      group="admissions"
    />
  );
}
