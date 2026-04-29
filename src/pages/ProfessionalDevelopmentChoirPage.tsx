import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  CalendarDays,
  Globe,
  GraduationCap,
  Home,
  Landmark,
  Plane,
  Presentation,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD1_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD1_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD2_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD2_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD3_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD3_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD4_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD4_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD5_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD5_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD6_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD6_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD7_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD7_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD8_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD8_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD_KEYS,
  PROFESSIONAL_DEVELOPMENT_CHOIR_PAGE_DEFAULTS,
} from "@/locales/professionalDevelopmentChoirDefaults";
import { cn } from "@/lib/utils";

function trChoir(t: TFunction, key: keyof typeof PROFESSIONAL_DEVELOPMENT_CHOIR_PAGE_DEFAULTS) {
  return t(key, { defaultValue: PROFESSIONAL_DEVELOPMENT_CHOIR_PAGE_DEFAULTS[key] });
}

const CARD_ICONS: LucideIcon[] = [
  Globe,
  Stethoscope,
  Presentation,
  GraduationCap,
  Landmark,
  Plane,
  CalendarDays,
  BookOpen,
];

const CARD_DETAIL_HREFS: (string | undefined)[] = [
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD1_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD2_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD3_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD4_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD5_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD6_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD7_PATH,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD8_PATH,
];

const CARD_PREVIEW_SRCS: (string | undefined)[] = [
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD1_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD2_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD3_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD4_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD5_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD6_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD7_HERO_SRC,
  PROFESSIONAL_DEVELOPMENT_CHOIR_CARD8_HERO_SRC,
];

export default function ProfessionalDevelopmentChoirPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const leafTitle = trChoir(t, "professionalDevelopmentChoirPageTitle");
  const internationalizationLabel = th("secondNav.internationalization");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">
                    {internationalizationLabel}
                  </span>
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
              <ChoirArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ChoirArticle({ t }: { t: TFunction }) {
  const title = trChoir(t, "professionalDevelopmentChoirPageTitle");
  const introRaw = trChoir(t, "professionalDevelopmentChoirPageIntro");
  const introParagraphs = introRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <div className="mt-4 space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-3" role="list">
        {PROFESSIONAL_DEVELOPMENT_CHOIR_CARD_KEYS.map((cardKey, index) => {
          const Icon = CARD_ICONS[index] ?? Globe;
          const cardTitle = trChoir(t, cardKey);
          const detailHref = CARD_DETAIL_HREFS[index];
          const previewSrc = CARD_PREVIEW_SRCS[index];

          const cardClass = cn(
            "group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
            "transition-colors hover:border-primary/25 hover:shadow-md",
            detailHref
              ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              : null,
          );

          const media = previewSrc ? (
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
              <img
                src={previewSrc}
                alt=""
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <div
              className={cn(
                "relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden",
                "bg-gradient-to-br from-sky-50 to-muted dark:from-primary/15 dark:to-muted",
              )}
            >
              <Icon
                className="h-14 w-14 text-primary/85 dark:text-primary"
                strokeWidth={1.25}
                aria-hidden
              />
            </div>
          );

          const inner = (
            <>
              {media}
              <div className="flex min-h-0 flex-1 flex-col p-4">
                <h2
                  className="line-clamp-2 min-h-[2.75rem] break-words text-lg font-semibold leading-snug tracking-tight text-foreground md:min-h-[3.25rem] md:text-xl"
                  title={cardTitle}
                >
                  {cardTitle}
                </h2>
              </div>
            </>
          );

          return (
            <li key={cardKey} className="flex min-h-0">
              {detailHref ? (
                <Link to={detailHref} className={cardClass} aria-label={cardTitle}>
                  {inner}
                </Link>
              ) : (
                <div className={cardClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
