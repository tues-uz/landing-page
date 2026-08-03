import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { INTERNATIONAL_GRANTS_PAGE_DEFAULTS } from "@/locales/internationalGrantsDefaults";

function trGrants(t: TFunction, key: keyof typeof INTERNATIONAL_GRANTS_PAGE_DEFAULTS) {
  return t(key, { defaultValue: INTERNATIONAL_GRANTS_PAGE_DEFAULTS[key] });
}

function parseEnDashItems(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.replace(/^\s*[–—-]\s*/, "").trim())
    .filter(Boolean);
}

const HUB_GRANTS_PATH = "/internationalization/international-grants";
const HERO_SRC = "/images/internationalization/grant-usa-humphrey-fellowship.png";

export default function InternationalGrantUsaHumphreyPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const internationalizationLabel = th("secondNav.internationalization");
  const hubTitle = trGrants(t, "internationalGrantsPageTitle");
  const leafLabel = trGrants(t, "internationalGrantUsaBreadcrumbLabel");

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
                    to={HUB_GRANTS_PATH}
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
              <UsaHumphreyArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function UsaHumphreyArticle({ t }: { t: TFunction }) {
  const title = trGrants(t, "internationalGrantUsaPageTitle");
  const alt = trGrants(t, "internationalGrantUsaHeroAlt");
  const eligibility = trGrants(t, "internationalGrantUsaParagraphEligibility");
  const benefitsHeading = trGrants(t, "internationalGrantUsaBenefitsHeading");
  const benefitsRaw = trGrants(t, "internationalGrantUsaBenefitsItems");
  const benefits = parseEnDashItems(benefitsRaw);
  const deadline = trGrants(t, "internationalGrantUsaApplicationDeadline");

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[16/9]">
        <img
          src={HERO_SRC}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          loading="eager"
        />
      </figure>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <p className="mt-6 text-body-article text-muted-foreground">{eligibility}</p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {benefitsHeading}
      </h2>
      <ul className="mt-4 list-outside list-disc space-y-3 pl-6 text-body-article text-muted-foreground marker:text-foreground/70">
        {benefits.map((line, i) => (
          <li key={i} className="text-justify ps-1">
            {line}
          </li>
        ))}
      </ul>

      <p className="mt-10 text-body-article font-medium text-foreground">{deadline}</p>
    </article>
  );
}
