import { TopNavHubPage } from "@/components/TopNavHubPage";
import { aboutHubSections } from "@/config/topNavHubData";

export default function AboutPage() {
  return (
    <TopNavHubPage
      pageTitleKey="nav.about"
      pageIntroKey="aboutIntro"
      sections={aboutHubSections}
      group="about"
    />
  );
}
