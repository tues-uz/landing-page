import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, MapPin, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { CAMPUS_CULTURE_DEFAULTS } from "@/locales/campusCultureDefaults";

function trCampusCulture(t: TFunction, key: keyof typeof CAMPUS_CULTURE_DEFAULTS) {
  return t(key, { defaultValue: CAMPUS_CULTURE_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";
const h3Class = "text-lg font-semibold tracking-tight text-foreground";

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

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className={h2Class}>{title}</h2>
      {children}
    </section>
  );
}

function contactInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ContactPersonCard({
  intro,
  name,
  roleLines,
  phoneDisplay,
  phoneTel,
  location,
}: {
  intro: string;
  name: string;
  roleLines: string[];
  phoneDisplay: string;
  phoneTel: string;
  location: string;
}) {
  const initials = contactInitials(name);

  return (
    <div className="border-l-2 border-primary/70 pl-4 sm:pl-5">
      <p className="text-sm leading-snug text-muted-foreground">{intro}</p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold tracking-wide text-sky-800 dark:bg-primary/15 dark:text-primary"
            aria-hidden
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-lg font-semibold tracking-tight text-foreground">{name}</p>
            <div className="mt-1 space-y-0.5 text-sm leading-snug text-muted-foreground">
              {roleLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground/80">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />
              <span>{location}</span>
            </p>
          </div>
        </div>
        <a
          href={`tel:${phoneTel}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:self-center"
        >
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
          <span className="tabular-nums tracking-tight">{phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}

export default function CampusCulturePage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const navLeafLabel = th("secondNavUniversity.campusCulture");

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
                <li className="flex min-w-0 items-center">
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">
                    {sectionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{navLeafLabel}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <CampusCultureArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CampusCultureArticle({ t }: { t: TFunction }) {
  const gallery = [
    {
      src: trCampusCulture(t, "campusCultureGallery1Src"),
      alt: trCampusCulture(t, "campusCultureGallery1Alt"),
    },
    {
      src: trCampusCulture(t, "campusCultureGallery2Src"),
      alt: trCampusCulture(t, "campusCultureGallery2Alt"),
    },
    {
      src: trCampusCulture(t, "campusCultureGallery3Src"),
      alt: trCampusCulture(t, "campusCultureGallery3Alt"),
    },
  ];

  const opportunities: {
    title: keyof typeof CAMPUS_CULTURE_DEFAULTS;
    body: keyof typeof CAMPUS_CULTURE_DEFAULTS;
  }[] = [
    { title: "campusCultureOpportunity1Title", body: "campusCultureOpportunity1Body" },
    { title: "campusCultureOpportunity2Title", body: "campusCultureOpportunity2Body" },
    { title: "campusCultureOpportunity3Title", body: "campusCultureOpportunity3Body" },
  ];

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
        <img
          src={trCampusCulture(t, "campusCultureHeroSrc")}
          alt={trCampusCulture(t, "campusCultureHeroAlt")}
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          loading="eager"
        />
      </figure>

      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {trCampusCulture(t, "campusCulturePageTitle")}
      </h1>
      <p className="mt-3 text-lg font-medium leading-snug text-foreground md:text-xl">
        {trCampusCulture(t, "campusCulturePageSubtitle")}
      </p>
      <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
        {splitParagraphs(trCampusCulture(t, "campusCulturePageIntro")).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <SectionBlock title={trCampusCulture(t, "campusCultureEthnoHeading")}>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          {splitParagraphs(trCampusCulture(t, "campusCultureEthnoBody")).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {gallery.map((item) => (
            <figure
              key={item.src}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 h-full w-full object-cover"
                decoding="async"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={trCampusCulture(t, "campusCultureArtGalleryHeading")}>
        <p className={`mt-3 text-justify ${bodyClass}`}>
          {trCampusCulture(t, "campusCultureArtGalleryIntro")}
        </p>
        <h3 className={`mt-6 ${h3Class}`}>{trCampusCulture(t, "campusCultureFineArtsHeading")}</h3>
        <p className={`mt-2 text-justify ${bodyClass}`}>
          {trCampusCulture(t, "campusCultureFineArtsBody")}
        </p>
        <h3 className={`mt-6 ${h3Class}`}>{trCampusCulture(t, "campusCultureTheatreClubHeading")}</h3>
        <p className={`mt-2 text-justify ${bodyClass}`}>
          {trCampusCulture(t, "campusCultureTheatreClubBody")}
        </p>
      </SectionBlock>

      <SectionBlock title={trCampusCulture(t, "campusCultureVenuesHeading")}>
        <p className={`mt-3 text-justify ${bodyClass}`}>
          {trCampusCulture(t, "campusCultureVenuesBody")}
        </p>
      </SectionBlock>

      <SectionBlock title={trCampusCulture(t, "campusCultureOpportunitiesHeading")}>
        <ul className="mt-4 m-0 list-none space-y-5 p-0">
          {opportunities.map((item) => (
            <li key={item.title}>
              <h3 className={h3Class}>{trCampusCulture(t, item.title)}</h3>
              <p className={`mt-2 text-justify ${bodyClass}`}>{trCampusCulture(t, item.body)}</p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title={trCampusCulture(t, "campusCultureCommunityHeading")}>
        <p className={`mt-3 text-justify ${bodyClass}`}>
          {trCampusCulture(t, "campusCultureCommunityBody")}
        </p>
      </SectionBlock>

      <SectionBlock title={trCampusCulture(t, "campusCultureCollaborationHeading")}>
        <p className={`mt-3 text-justify ${bodyClass}`}>
          {trCampusCulture(t, "campusCultureCollaborationBody")}
        </p>
      </SectionBlock>

      <SectionBlock title={trCampusCulture(t, "campusCultureContactHeading")}>
        <div className="mt-5 space-y-8 border-t border-border pt-6">
          <ContactPersonCard
            intro={trCampusCulture(t, "campusCultureContactIntro")}
            name={trCampusCulture(t, "campusCultureContact1Name")}
            roleLines={splitLines(trCampusCulture(t, "campusCultureContact1Role"))}
            phoneDisplay={trCampusCulture(t, "campusCultureContact1PhoneDisplay")}
            phoneTel={trCampusCulture(t, "campusCultureContact1PhoneTel")}
            location={trCampusCulture(t, "campusCultureContact1Location")}
          />
          <ContactPersonCard
            intro={trCampusCulture(t, "campusCultureContact2Intro")}
            name={trCampusCulture(t, "campusCultureContact2Name")}
            roleLines={splitLines(trCampusCulture(t, "campusCultureContact2Role"))}
            phoneDisplay={trCampusCulture(t, "campusCultureContact2PhoneDisplay")}
            phoneTel={trCampusCulture(t, "campusCultureContact2PhoneTel")}
            location={trCampusCulture(t, "campusCultureContact2Location")}
          />
        </div>
      </SectionBlock>
    </article>
  );
}
