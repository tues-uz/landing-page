import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  INTERNATIONAL_FOUNDATION_YEAR_DEFAULTS,
  IFY_APPLY_URL,
  type InternationalFoundationYearI18nKey,
} from "@/locales/internationalFoundationYearDefaults";
import { cn } from "@/lib/utils";

const bodyClass = "text-body-article leading-relaxed text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";
const h3Class = "text-base font-semibold leading-snug text-foreground";

function trIfy(t: TFunction, key: InternationalFoundationYearI18nKey) {
  return t(key, { defaultValue: INTERNATIONAL_FOUNDATION_YEAR_DEFAULTS[key] });
}

function splitBullet(text: string): { title: string; body: string } {
  const parts = text.split(/\s+—\s+/);
  if (parts.length >= 2) {
    return { title: parts[0].trim(), body: parts.slice(1).join(" — ").trim() };
  }
  return { title: text.trim(), body: "" };
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className={h2Class}>{title}</h2>
      {children}
    </section>
  );
}

export default function InternationalFoundationYearPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const educationLabel = th("secondNav.education");
  const bachelorLabel = th("secondNavEducation.courseCatalogue");
  const pageTitle = trIfy(t, "ifyPageTitle");

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
                    {educationLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to="/education/bachelor"
                    className="font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline line-clamp-2 sm:line-clamp-none"
                  >
                    {bachelorLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{pageTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <InternationalFoundationYearArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InternationalFoundationYearArticle({ t }: { t: TFunction }) {
  const whyBullets: InternationalFoundationYearI18nKey[] = [
    "ifyWhyBullet1",
    "ifyWhyBullet2",
    "ifyWhyBullet3",
    "ifyWhyBullet4",
    "ifyWhyBullet5",
  ];

  const overviewRows: { labelKey: InternationalFoundationYearI18nKey; valueKey: InternationalFoundationYearI18nKey }[] =
    [
      { labelKey: "ifyOverviewQualificationLabel", valueKey: "ifyOverviewQualificationValue" },
      { labelKey: "ifyOverviewDeliveryPartnerLabel", valueKey: "ifyOverviewDeliveryPartnerValue" },
      { labelKey: "ifyOverviewHostLabel", valueKey: "ifyOverviewHostValue" },
      { labelKey: "ifyOverviewDurationLabel", valueKey: "ifyOverviewDurationValue" },
      { labelKey: "ifyOverviewIntakeLabel", valueKey: "ifyOverviewIntakeValue" },
      { labelKey: "ifyOverviewTuitionLabel", valueKey: "ifyOverviewTuitionValue" },
    ];

  const journeySteps = [
    trIfy(t, "ifyJourneyStep1"),
    trIfy(t, "ifyJourneyStep2"),
    trIfy(t, "ifyJourneyStep3"),
  ];

  const keyFacts = [
    { label: trIfy(t, "ifyOverviewDurationLabel"), value: trIfy(t, "ifyOverviewDurationValue") },
    { label: trIfy(t, "ifyOverviewIntakeLabel"), value: trIfy(t, "ifyOverviewIntakeValue") },
    { label: trIfy(t, "ifyOverviewTuitionLabel"), value: trIfy(t, "ifyOverviewTuitionValue") },
  ];

  return (
    <article className="max-w-none">
      <header className="border-b border-border pb-8">
        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
          {trIfy(t, "ifyPageTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg font-medium leading-snug text-foreground md:text-xl">
          {trIfy(t, "ifyPageSubtitle")}
        </p>
        <img
          src="/images/education/alvis-pathway-logo.png"
          alt={trIfy(t, "ifyLogoAlt")}
          className="mt-6 h-auto w-full max-w-[220px] object-contain object-left sm:max-w-[260px]"
          decoding="async"
          loading="eager"
        />
      </header>

      <div className={`mt-8 max-w-3xl space-y-4 text-justify ${bodyClass}`}>
        <p>{trIfy(t, "ifyIntro1")}</p>
        <p>{trIfy(t, "ifyIntro2")}</p>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-6 border-y border-border py-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
        {keyFacts.map((item, index) => (
          <div
            key={item.label}
            className={cn("min-w-0", index > 0 && "sm:pl-6", index < keyFacts.length - 1 && "sm:pr-6")}
          >
            <dt className="text-sm text-muted-foreground">{item.label}</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-foreground md:text-2xl md:leading-none">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <SectionBlock title={trIfy(t, "ifyWhyTitle")}>
        <ul className="mt-5 m-0 max-w-3xl list-none space-y-5 p-0">
          {whyBullets.map((key) => {
            const { title, body } = splitBullet(trIfy(t, key));
            return (
              <li key={key} className="border-l-2 border-primary/70 pl-4 sm:pl-5">
                <h3 className={h3Class}>{title}</h3>
                {body ? <p className={`mt-2 text-justify ${bodyClass}`}>{body}</p> : null}
              </li>
            );
          })}
        </ul>
      </SectionBlock>

      <SectionBlock title={trIfy(t, "ifyOverviewTitle")}>
        <dl className="mt-5 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {overviewRows.map(({ labelKey, valueKey }) => (
            <div key={labelKey} className="py-2">
              <dt className="text-[0.8125rem] leading-tight text-muted-foreground">{trIfy(t, labelKey)}</dt>
              <dd className="mt-2 text-sm leading-snug text-foreground sm:text-[0.9375rem]">
                {trIfy(t, valueKey)}
              </dd>
            </div>
          ))}
        </dl>
      </SectionBlock>

      <SectionBlock title={trIfy(t, "ifyStructureTitle")}>
        <p className={`mt-4 max-w-3xl text-justify ${bodyClass}`}>{trIfy(t, "ifyStructureBody")}</p>
      </SectionBlock>

      <SectionBlock title={trIfy(t, "ifyJourneyTitle")}>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 marker:font-semibold marker:text-foreground">
          {journeySteps.map((step) => (
            <li key={step} className={`pl-1 ${bodyClass}`}>
              <span className="font-medium text-foreground">{step}</span>
            </li>
          ))}
        </ol>
        <p className={`mt-4 max-w-3xl text-justify ${bodyClass}`}>{trIfy(t, "ifyJourneyBody")}</p>
      </SectionBlock>

      <SectionBlock title={trIfy(t, "ifyClosingTitle")}>
        <p className={`mt-4 max-w-3xl text-justify ${bodyClass}`}>{trIfy(t, "ifyClosingBody")}</p>
        <div className="mt-8 flex max-w-3xl flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d8cb15]">
            {trIfy(t, "ifyCtaIntakeLabel")} {trIfy(t, "ifyCtaFee")}
          </p>
          <a
            href={IFY_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {trIfy(t, "ifyCtaApplyLabel")}
          </a>
        </div>
      </SectionBlock>
    </article>
  );
}
