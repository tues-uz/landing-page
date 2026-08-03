import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  UNIVERSITY_RATINGS_DEFAULTS,
  type UniversityRatingsI18nKey,
} from "@/locales/universityRatingsDefaults";
import { cn } from "@/lib/utils";

const bodyClass = "text-body-article leading-relaxed text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";

function trRatings(t: TFunction, key: UniversityRatingsI18nKey) {
  return t(key, { defaultValue: UNIVERSITY_RATINGS_DEFAULTS[key] });
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className={h2Class}>{title}</h2>
      {children}
    </section>
  );
}

function GlanceStrip({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "min-w-0",
            index > 0 && "sm:pl-6",
            index < items.length - 1 && "sm:pr-6",
          )}
        >
          <dt className="text-sm text-muted-foreground">{item.label}</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight tabular-nums text-foreground md:text-[1.75rem] md:leading-none">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function UniversityRatingsPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const navLeafLabel = th("secondNavUniversity.ratings");

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
              <UniversityRatingsArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function UniversityRatingsArticle({ t }: { t: TFunction }) {
  const theBullets: UniversityRatingsI18nKey[] = [
    "universityRatingsTheBullet1",
    "universityRatingsTheBullet2",
    "universityRatingsTheBullet3",
    "universityRatingsTheBullet4",
    "universityRatingsTheBullet5",
  ];

  const greenBullets: UniversityRatingsI18nKey[] = [
    "universityRatingsGreenBullet1",
    "universityRatingsGreenBullet2",
  ];

  return (
    <article className="max-w-none">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
        {trRatings(t, "universityRatingsInstitution")}
      </p>
      <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {trRatings(t, "universityRatingsPageTitle")}
      </h1>
      <p className={`mt-5 max-w-3xl ${bodyClass}`}>{trRatings(t, "universityRatingsIntro")}</p>

      <SectionBlock title={trRatings(t, "universityRatingsTheTitle")}>
        <p className={`mt-4 max-w-3xl ${bodyClass}`}>{trRatings(t, "universityRatingsTheBody")}</p>
        <ul className={`mt-4 max-w-3xl list-disc space-y-2 pl-5 ${bodyClass}`}>
          {theBullets.map((key) => (
            <li key={key}>{trRatings(t, key)}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title={trRatings(t, "universityRatingsGreenTitle")}>
        <p className={`mt-4 max-w-3xl ${bodyClass}`}>{trRatings(t, "universityRatingsGreenBody")}</p>
        <ul className={`mt-4 max-w-3xl list-disc space-y-2 pl-5 ${bodyClass}`}>
          {greenBullets.map((key) => (
            <li key={key}>{trRatings(t, key)}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title={trRatings(t, "universityRatingsGlanceTitle")}>
        <div className="mt-6">
          <GlanceStrip
            items={[
              {
                label: trRatings(t, "universityRatingsGlance1Label"),
                value: trRatings(t, "universityRatingsGlance1Value"),
              },
              {
                label: trRatings(t, "universityRatingsGlance2Label"),
                value: trRatings(t, "universityRatingsGlance2Value"),
              },
              {
                label: trRatings(t, "universityRatingsGlance3Label"),
                value: trRatings(t, "universityRatingsGlance3Value"),
              },
              {
                label: trRatings(t, "universityRatingsGlance4Label"),
                value: trRatings(t, "universityRatingsGlance4Value"),
              },
            ]}
          />
        </div>
      </SectionBlock>

      <p className={`mt-10 max-w-3xl ${bodyClass}`}>{trRatings(t, "universityRatingsClosing")}</p>
    </article>
  );
}
