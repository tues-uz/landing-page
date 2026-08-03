import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { DORMITORY_DEFAULTS } from "@/locales/dormitoryDefaults";

function trDormitory(t: TFunction, key: keyof typeof DORMITORY_DEFAULTS) {
  return t(key, { defaultValue: DORMITORY_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const sectionTitleClass = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";

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

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className={sectionTitleClass}>{title}</h2>
      {children}
    </section>
  );
}

export default function DormitoryPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const studentLifeLabel = th("secondNav.studentLife");
  const navLeafLabel = th("secondNavStudentLife.dormitory");

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
              <DormitoryArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DormitoryArticle({ t }: { t: TFunction }) {
  const heroSrc = trDormitory(t, "dormitoryHeroSrc");
  const heroAlt = trDormitory(t, "dormitoryHeroAlt");
  const quickFacts = [
    { label: trDormitory(t, "dormitoryFactCapacityLabel"), value: trDormitory(t, "dormitoryFactCapacityValue") },
    { label: trDormitory(t, "dormitoryFactRoomsLabel"), value: trDormitory(t, "dormitoryFactRoomsValue") },
    { label: trDormitory(t, "dormitoryFactFloorsLabel"), value: trDormitory(t, "dormitoryFactFloorsValue") },
    { label: trDormitory(t, "dormitoryFactResidentsLabel"), value: trDormitory(t, "dormitoryFactResidentsValue") },
  ];

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
        <img
          src={heroSrc}
          alt={heroAlt}
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          loading="eager"
        />
      </figure>

      <h1 className="mt-6 text-balance text-3xl font-semibold uppercase tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {trDormitory(t, "dormitoryPageTitle")}
      </h1>
      <p className="mt-3 text-lg font-medium leading-snug text-foreground md:text-xl">
        {trDormitory(t, "dormitoryPageSubtitle")}
      </p>
      <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
        <p>{trDormitory(t, "dormitoryPageIntro")}</p>
      </div>

      <SectionBlock title={trDormitory(t, "dormitoryQuickFactsTitle")}>
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {quickFacts.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-muted/40 px-4 py-4 md:px-5 md:py-5"
            >
              <dt className="text-sm font-semibold text-foreground md:text-base">{label}</dt>
              <dd className={`mt-1 text-sm md:text-base ${bodyClass}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </SectionBlock>

      <SectionBlock title={trDormitory(t, "dormitoryWhatsInsideTitle")}>
        <p className={`mt-3 text-justify ${bodyClass}`}>{trDormitory(t, "dormitoryWhatsInsideIntro")}</p>
        <BulletList items={splitLines(trDormitory(t, "dormitoryWhatsInsideList"))} />
        <figure className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
          <img
            src={heroSrc}
            alt={heroAlt}
            className="absolute inset-0 h-full w-full object-cover"
            decoding="async"
            loading="lazy"
          />
        </figure>
      </SectionBlock>

      <SectionBlock title={trDormitory(t, "dormitoryStudyTitle")}>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          {splitParagraphs(trDormitory(t, "dormitoryStudyBody")).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={trDormitory(t, "dormitoryCultureTitle")}>
        <div className={`mt-3 text-justify ${bodyClass}`}>
          <p>{trDormitory(t, "dormitoryCultureBody")}</p>
        </div>
      </SectionBlock>

      <SectionBlock title={trDormitory(t, "dormitoryPriorityTitle")}>
        <p className={`mt-3 text-justify ${bodyClass}`}>{trDormitory(t, "dormitoryPriorityIntro")}</p>
        <BulletList items={splitLines(trDormitory(t, "dormitoryPriorityList"))} />
      </SectionBlock>

      <SectionBlock title={trDormitory(t, "dormitoryFeeTitle")}>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          {splitParagraphs(trDormitory(t, "dormitoryFeeBody")).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <BulletList items={splitLines(trDormitory(t, "dormitoryFeeExemptList"))} />
        <p className={`mt-4 text-justify ${bodyClass}`}>{trDormitory(t, "dormitoryFeeClosing")}</p>
      </SectionBlock>

      <SectionBlock title={trDormitory(t, "dormitorySportsTitle")}>
        <div className={`mt-3 text-justify ${bodyClass}`}>
          <p>{trDormitory(t, "dormitorySportsBody")}</p>
        </div>
      </SectionBlock>

      <SectionBlock title={trDormitory(t, "dormitorySafetyTitle")}>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          {splitParagraphs(trDormitory(t, "dormitorySafetyBody")).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </SectionBlock>
    </article>
  );
}
