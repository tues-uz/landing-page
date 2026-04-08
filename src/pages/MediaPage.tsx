import { TopNavHubPage } from "@/components/TopNavHubPage";
import { mediaHubSections } from "@/config/topNavHubData";

export default function MediaPage() {
  return (
    <TopNavHubPage
      pageTitleKey="mediaPageTitle"
      titleNamespace="topNav"
      pageIntroKey="mediaIntro"
      sections={mediaHubSections}
      group="media"
    />
  );
}
