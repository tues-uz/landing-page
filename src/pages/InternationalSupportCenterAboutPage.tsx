import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  INTERNATIONAL_SUPPORT_CENTER_CARD1_HERO_SRC,
  INTERNATIONAL_SUPPORT_CENTER_PAGE_DEFAULTS,
} from "@/locales/internationalSupportCenterDefaults";
import { cn } from "@/lib/utils";

const HUB_PATH = "/internationalization/international-support-center";

function trIsc(t: TFunction, key: keyof typeof INTERNATIONAL_SUPPORT_CENTER_PAGE_DEFAULTS) {
  return t(key, { defaultValue: INTERNATIONAL_SUPPORT_CENTER_PAGE_DEFAULTS[key] });
}

const URL_ONLY = /^https?:\/\/\S+$/i;

export default function InternationalSupportCenterAboutPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const internationalizationLabel = th("secondNav.internationalization");
  const hubTitle = trIsc(t, "internationalSupportCenterPageTitle");
  const leafLabel = trIsc(t, "internationalSupportCenterCard1BreadcrumbLabel");

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
              <IscAboutArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function IscAboutArticle({ t }: { t: TFunction }) {
  const title = trIsc(t, "internationalSupportCenterCard1PageTitle");
  const alt = trIsc(t, "internationalSupportCenterCard1HeroAlt");
  const bodyRaw = trIsc(t, "internationalSupportCenterCard1DetailBody");
  const paragraphs = bodyRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[16/9]">
        <img
          src={INTERNATIONAL_SUPPORT_CENTER_CARD1_HERO_SRC}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain object-center p-6 sm:p-8"
          decoding="async"
          loading="eager"
        />
      </figure>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <div className="mt-6 flex flex-col gap-5 text-body-article text-muted-foreground">
        {paragraphs.map((p, i) => renderBodyBlock(p, i))}
      </div>
    </article>
  );
}

function renderBodyBlock(p: string, i: number) {
  const trimmed = p.trim();
  if (trimmed.startsWith("## ")) {
    return (
      <h2
        key={i}
        className="text-balance text-xl font-semibold tracking-tight text-foreground"
      >
        {trimmed.slice(3).trim()}
      </h2>
    );
  }
  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={i} className="text-lg font-semibold tracking-tight text-foreground">
        {trimmed.slice(4).trim()}
      </h3>
    );
  }
  if (URL_ONLY.test(trimmed)) {
    return (
      <p key={i}>
        <a
          href={trimmed}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
        >
          {trimmed}
        </a>
      </p>
    );
  }
  return (
    <p key={i} className={cn("whitespace-pre-line")}>
      {trimmed}
    </p>
  );
}
