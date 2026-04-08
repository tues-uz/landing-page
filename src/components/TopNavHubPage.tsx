import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { HubSection, TopNavGroup } from "@/config/topNavHubData";
import { subPagePath } from "@/config/topNavHubData";

type Props = {
  pageTitleKey: string;
  /** Default: main nav labels live in `header` */
  titleNamespace?: "header" | "topNav";
  pageIntroKey: string;
  sections: HubSection[];
  group: TopNavGroup;
};

export function TopNavHubPage({
  pageTitleKey,
  titleNamespace = "header",
  pageIntroKey,
  sections,
  group,
}: Props) {
  const { t } = useTranslation("topNav");
  const { t: th } = useTranslation("header");
  const pageTitle = titleNamespace === "topNav" ? t(pageTitleKey) : th(pageTitleKey);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {pageTitle}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t(pageIntroKey)}</p>

          <nav aria-label={t("hubPagesList")} className="mt-10">
            <p className="mb-3 text-sm font-medium text-foreground">{t("hubPagesList")}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link
                    to={subPagePath(group, s.id)}
                    className="block rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {th(s.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
}
