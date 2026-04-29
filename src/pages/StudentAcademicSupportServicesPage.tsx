import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { ACADEMIC_SUPPORT_SERVICES_DEFAULTS } from "@/locales/academicSupportServicesDefaults";

function trServices(t: TFunction, key: keyof typeof ACADEMIC_SUPPORT_SERVICES_DEFAULTS) {
  return t(key, { defaultValue: ACADEMIC_SUPPORT_SERVICES_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";

const HUB_PATH = "/student-life/student-academic-support";

function splitParagraphs(raw: string): string[] {
  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function splitLines(raw: string): string[] {
  return raw
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function ContactPanel({ title, linesRaw }: { title?: string; linesRaw: string }) {
  const lines = splitLines(linesRaw);
  return (
    <div className="mt-4 rounded-xl border border-border bg-muted/40 px-4 py-4 md:px-5 md:py-5">
      {title ? (
        <h3 className="text-base font-semibold text-foreground md:text-lg">{title}</h3>
      ) : null}
      <ul
        className={`m-0 list-none space-y-2 p-0 text-sm leading-relaxed text-muted-foreground md:text-base ${title ? "mt-3" : ""}`}
      >
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

function SectionBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{title}</h2>
      <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
        {splitParagraphs(body).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  );
}

export default function StudentAcademicSupportServicesPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const studentLifeLabel = th("secondNav.studentLife");
  const hubLabel = th("secondNavStudentLife.studentAcademicSupport");
  const leafLabel = trServices(t, "academicSupportServicesBreadcrumbLeaf");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
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
                <li className="flex min-w-0 items-center">
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to={HUB_PATH}
                    className="font-medium leading-none transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {hubLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{leafLabel}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <StudentAcademicSupportServicesArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StudentAcademicSupportServicesArticle({ t }: { t: TFunction }) {
  const title = trServices(t, "academicSupportServicesPageTitle");
  const heroSrc = trServices(t, "academicSupportServicesHeroSrc");
  const intro = trServices(t, "academicSupportServicesIntro");

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
      <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
        {splitParagraphs(intro).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <SectionBlock title={trServices(t, "academicSupportServicesS1Title")} body={trServices(t, "academicSupportServicesS1Body")} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {trServices(t, "academicSupportServicesAdvisingOfficeTitle")}
        </h2>
        <ContactPanel linesRaw={trServices(t, "academicSupportServicesAdvisingOfficeLines")} />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {trServices(t, "academicSupportServicesHandbookTitle")}
        </h2>
        <div className={`mt-3 text-justify ${bodyClass}`}>
          <p>{trServices(t, "academicSupportServicesHandbookBody")}</p>
        </div>
      </section>

      <SectionBlock title={trServices(t, "academicSupportServicesS2Title")} body={trServices(t, "academicSupportServicesS2Body")} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {trServices(t, "academicSupportServicesEnrolmentContactsTitle")}
        </h2>
        <ContactPanel linesRaw={trServices(t, "academicSupportServicesEnrolmentContactsLines")} />
      </section>

      <SectionBlock title={trServices(t, "academicSupportServicesS3Title")} body={trServices(t, "academicSupportServicesS3Body")} />
    </article>
  );
}
