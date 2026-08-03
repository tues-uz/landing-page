import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { STUDENT_COUNCIL_PAGE_DEFAULTS } from "@/locales/studentCouncilDefaults";

function trCouncil(t: TFunction, key: keyof typeof STUDENT_COUNCIL_PAGE_DEFAULTS) {
  return t(key, { defaultValue: STUDENT_COUNCIL_PAGE_DEFAULTS[key] });
}

function splitParagraphs(raw: string): string[] {
  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function StudentCouncilPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const aboutHubLabel = th("nav.about");
  const leadershipSectionLabel = th("nav.aboutMenu.leadershipAndCouncils");
  const leadershipPath = "/about/leadership-and-councils";

  const leafTitle = trCouncil(t, "studentCouncilPageTitle");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label={tCommon("breadcrumbNav")} className="min-w-0 flex-1">
              <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm text-[#5A626C]">
                <li className="flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 font-medium leading-none transition-colors hover:text-foreground"
                  >
                    <Home className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden />
                    <span className="leading-none">{tCommon("breadcrumbHome")}</span>
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex items-center">
                  <Link to="/about" className="font-medium leading-none transition-colors hover:text-foreground">
                    {aboutHubLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex items-center">
                  <Link
                    to={leadershipPath}
                    className="font-medium leading-none transition-colors hover:text-foreground"
                  >
                    {leadershipSectionLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{leafTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <StudentCouncilArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SectionBlock({
  titleKey,
  bodyKey,
  t,
}: {
  titleKey: keyof typeof STUDENT_COUNCIL_PAGE_DEFAULTS;
  bodyKey: keyof typeof STUDENT_COUNCIL_PAGE_DEFAULTS;
  t: TFunction;
}) {
  const title = trCouncil(t, titleKey);
  const bodyRaw = trCouncil(t, bodyKey);
  const paragraphs = splitParagraphs(bodyRaw);

  return (
    <>
      <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-body-article text-muted-foreground">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-justify">
            {para}
          </p>
        ))}
      </div>
    </>
  );
}

function StudentCouncilArticle({ t }: { t: TFunction }) {
  const title = trCouncil(t, "studentCouncilPageTitle");
  const introRaw = trCouncil(t, "studentCouncilPageIntro");
  const introParagraphs = splitParagraphs(introRaw);
  const closing = trCouncil(t, "studentCouncilClosing");

  const heroSrc = "/images/about/student-council-hero.png";

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
        <img
          src={heroSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          loading="eager"
        />
      </figure>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <div className="mt-3 space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i} className="text-justify">
            {para}
          </p>
        ))}
      </div>

      <SectionBlock
        t={t}
        titleKey="studentCouncilOrganisationalStructureTitle"
        bodyKey="studentCouncilOrganisationalStructureBody"
      />
      <SectionBlock
        t={t}
        titleKey="studentCouncilDecisionMakingTitle"
        bodyKey="studentCouncilDecisionMakingBody"
      />
      <SectionBlock
        t={t}
        titleKey="studentCouncilMembershipTitle"
        bodyKey="studentCouncilMembershipBody"
      />
      <SectionBlock
        t={t}
        titleKey="studentCouncilCollaborationTitle"
        bodyKey="studentCouncilCollaborationBody"
      />

      <p className="mt-10 text-justify text-body-article text-muted-foreground">
        {closing}
      </p>
    </article>
  );
}
