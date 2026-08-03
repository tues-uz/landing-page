import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  ADVANCED_TRAINING_FOREIGN_TEACHERS_CARD2_HERO_SRC,
  ADVANCED_TRAINING_FOREIGN_TEACHERS_PAGE_DEFAULTS,
} from "@/locales/advancedTrainingForeignTeachersDefaults";

const HUB_PATH = "/internationalization/advanced-training-foreign-teachers";

function trAtt(t: TFunction, key: keyof typeof ADVANCED_TRAINING_FOREIGN_TEACHERS_PAGE_DEFAULTS) {
  return t(key, { defaultValue: ADVANCED_TRAINING_FOREIGN_TEACHERS_PAGE_DEFAULTS[key] });
}

export default function AdvancedTrainingForeignTeachersSouthKoreaPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const internationalizationLabel = th("secondNav.internationalization");
  const hubTitle = trAtt(t, "advancedTrainingForeignTeachersPageTitle");
  const leafLabel = trAtt(t, "advancedTrainingForeignTeachersCard2BreadcrumbLabel");

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
                    {internationalizationLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to={HUB_PATH}
                    className="font-medium leading-none transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {hubTitle}
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
              <SouthKoreaArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SouthKoreaArticle({ t }: { t: TFunction }) {
  const title = trAtt(t, "advancedTrainingForeignTeachersCard2PageTitle");
  const alt = trAtt(t, "advancedTrainingForeignTeachersCard2HeroAlt");
  const bodyRaw = trAtt(t, "advancedTrainingForeignTeachersCard2DetailBody");
  const paragraphs = bodyRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[16/9]">
        <img
          src={ADVANCED_TRAINING_FOREIGN_TEACHERS_CARD2_HERO_SRC}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          loading="eager"
        />
      </figure>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <div className="mt-6 flex flex-col gap-5 text-body-article text-muted-foreground">
        {paragraphs.map((p, i) => {
          if (p.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="text-balance text-xl font-semibold tracking-tight text-foreground"
              >
                {p.slice(3).trim()}
              </h2>
            );
          }
          return (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          );
        })}
      </div>
    </article>
  );
}
