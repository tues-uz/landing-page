import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { FACILITIES_FOR_DISABLED_DEFAULTS } from "@/locales/facilitiesForDisabledDefaults";

function trFacilities(t: TFunction, key: keyof typeof FACILITIES_FOR_DISABLED_DEFAULTS) {
  return t(key, { defaultValue: FACILITIES_FOR_DISABLED_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const listClass = `mt-2 list-disc space-y-2 pl-6 ${bodyClass}`;

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

export default function FacilitiesForDisabledPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const studentLifeLabel = th("secondNav.studentLife");
  const navLeafLabel = th("secondNavStudentLife.facilitiesForDisabled");

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
              <FacilitiesForDisabledArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FacilitiesForDisabledArticle({ t }: { t: TFunction }) {
  const title = trFacilities(t, "facilitiesForDisabledPageTitle");
  const deck = trFacilities(t, "facilitiesForDisabledDeck");
  const intro = trFacilities(t, "facilitiesForDisabledIntro");
  const heroSrc = trFacilities(t, "facilitiesForDisabledHeroSrc");

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
      <p className="mt-3 text-lg font-medium leading-snug text-muted-foreground md:text-xl">{deck}</p>
      <div className={`mt-6 text-justify ${bodyClass}`}>
        <p>{intro}</p>
      </div>

      <SectionBlock title={trFacilities(t, "facilitiesForDisabledS1Title")} body={trFacilities(t, "facilitiesForDisabledS1Body")} />
      <SectionBlock title={trFacilities(t, "facilitiesForDisabledS2Title")} body={trFacilities(t, "facilitiesForDisabledS2Body")} />
      <SectionBlock title={trFacilities(t, "facilitiesForDisabledS3Title")} body={trFacilities(t, "facilitiesForDisabledS3Body")} />
      <SectionBlock title={trFacilities(t, "facilitiesForDisabledS4Title")} body={trFacilities(t, "facilitiesForDisabledS4Body")} />
      <SectionBlock title={trFacilities(t, "facilitiesForDisabledS5Title")} body={trFacilities(t, "facilitiesForDisabledS5Body")} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {trFacilities(t, "facilitiesForDisabledS6Title")}
        </h2>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          <p>{trFacilities(t, "facilitiesForDisabledS6BodyTop")}</p>
          <p className="font-medium text-foreground">{trFacilities(t, "facilitiesForDisabledS6ListLabel")}</p>
          <ul className={listClass}>
            {splitLines(trFacilities(t, "facilitiesForDisabledS6List")).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>{trFacilities(t, "facilitiesForDisabledS6BodyBottom")}</p>
        </div>
      </section>

      <div className={`mt-10 text-justify ${bodyClass}`}>
        <p>{trFacilities(t, "facilitiesForDisabledOutro")}</p>
      </div>
    </article>
  );
}
