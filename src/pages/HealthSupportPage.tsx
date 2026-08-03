import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { HEALTH_SUPPORT_PAGE_DEFAULTS } from "@/locales/healthSupportDefaults";

function trHealthSupport(t: TFunction, key: keyof typeof HEALTH_SUPPORT_PAGE_DEFAULTS) {
  return t(key, { defaultValue: HEALTH_SUPPORT_PAGE_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";

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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={`mt-3 list-disc space-y-2 pl-5 ${bodyClass}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        loading="lazy"
      />
    </figure>
  );
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className={h2Class}>{title}</h2>
      {children}
    </section>
  );
}

export default function HealthSupportPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const studentLifeLabel = th("secondNav.studentLife");
  const navLeafLabel = th("secondNavStudentLife.healthSupportService");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
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
              <HealthSupportArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function HealthSupportArticle({ t }: { t: TFunction }) {
  const stats = [
    { value: trHealthSupport(t, "healthSupportStat1Value"), label: trHealthSupport(t, "healthSupportStat1Label") },
    { value: trHealthSupport(t, "healthSupportStat2Value"), label: trHealthSupport(t, "healthSupportStat2Label") },
  ];

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {trHealthSupport(t, "healthSupportPageTitle")}
      </h1>
      <p className="mt-3 text-lg font-medium leading-snug text-foreground md:text-xl">
        {trHealthSupport(t, "healthSupportPageSubtitle")}
      </p>
      <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportPageIntro")}</p>

      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-muted/40 px-5 py-5 md:px-6 md:py-6"
          >
            <dt className="text-2xl font-semibold tabular-nums tracking-tight text-foreground md:text-3xl">{value}</dt>
            <dd className={`mt-2 text-sm md:text-base ${bodyClass}`}>{label}</dd>
          </div>
        ))}
      </dl>

      <SectionBlock title={trHealthSupport(t, "healthSupportPhysicalHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportPhysicalIntro")}</p>
        <p className={`mt-4 font-medium text-foreground ${bodyClass}`}>
          {trHealthSupport(t, "healthSupportPhysicalListLabel")}
        </p>
        <BulletList items={splitLines(trHealthSupport(t, "healthSupportPhysicalList"))} />
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportPhysicalClosing")}</p>
        <ArticleImage
          src={trHealthSupport(t, "healthSupportImage1Src")}
          alt={trHealthSupport(t, "healthSupportImage1Alt")}
        />
      </SectionBlock>

      <SectionBlock title={trHealthSupport(t, "healthSupportReproductiveHeading")}>
        <div className={`mt-4 space-y-4 text-justify ${bodyClass}`}>
          {splitParagraphs(trHealthSupport(t, "healthSupportReproductiveBody")).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={trHealthSupport(t, "healthSupportMentalHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportMentalIntro")}</p>
        <p className={`mt-4 font-medium text-foreground ${bodyClass}`}>
          {trHealthSupport(t, "healthSupportMentalListLabel")}
        </p>
        <BulletList items={splitLines(trHealthSupport(t, "healthSupportMentalList"))} />
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportMentalClosing")}</p>
        <ArticleImage
          src={trHealthSupport(t, "healthSupportImage2Src")}
          alt={trHealthSupport(t, "healthSupportImage2Alt")}
        />
      </SectionBlock>

      <SectionBlock title={trHealthSupport(t, "healthSupportInclusiveHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportInclusiveIntro")}</p>
        <BulletList items={splitLines(trHealthSupport(t, "healthSupportInclusiveList"))} />
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportInclusiveClosing")}</p>
        <ArticleImage
          src={trHealthSupport(t, "healthSupportImage3Src")}
          alt={trHealthSupport(t, "healthSupportImage3Alt")}
        />
      </SectionBlock>

      <SectionBlock title={trHealthSupport(t, "healthSupportSummaryHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportSummaryIntro")}</p>
        <BulletList items={splitLines(trHealthSupport(t, "healthSupportSummaryList"))} />
        <p className={`mt-4 text-justify ${bodyClass}`}>{trHealthSupport(t, "healthSupportSummaryClosing")}</p>
      </SectionBlock>
    </article>
  );
}
