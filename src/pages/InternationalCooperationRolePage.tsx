import type { TFunction } from "i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  INTERNATIONAL_COOPERATION_ROLE_DEFAULTS,
  isInternationalCooperationRoleSlug,
  type InternationalCooperationRoleSlug,
} from "@/locales/internationalCooperationRoleDefaults";
import { DEPARTMENT_INTL_REL_EMPLOYEES_DEFAULTS } from "@/locales/departmentInternationalRelationsEmployeesDefaults";

function trRole(t: TFunction, key: keyof typeof INTERNATIONAL_COOPERATION_ROLE_DEFAULTS) {
  return t(key, { defaultValue: INTERNATIONAL_COOPERATION_ROLE_DEFAULTS[key] });
}

function trHub(t: TFunction, key: keyof typeof DEPARTMENT_INTL_REL_EMPLOYEES_DEFAULTS) {
  return t(key, { defaultValue: DEPARTMENT_INTL_REL_EMPLOYEES_DEFAULTS[key] });
}

function parseMiddleDotLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.replace(/^\s*[·•]\s*/, "").trim())
    .filter(Boolean);
}

const BREADCRUMB_LEAF_KEY: Record<
  InternationalCooperationRoleSlug,
  keyof typeof INTERNATIONAL_COOPERATION_ROLE_DEFAULTS
> = {
  "vice-rector-international-cooperation": "intlRelRoleViceRectorPersonName",
  "head-department-international-cooperation": "intlRelRoleHeadPersonName",
  "lead-specialist-international-cooperation": "intlRelRoleLeadPersonName",
};

const HUB_PATH = "/internationalization/department-international-relations-employees";

export default function InternationalCooperationRolePage() {
  const { roleSlug } = useParams<{ roleSlug: string }>();
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  if (!roleSlug || !isInternationalCooperationRoleSlug(roleSlug)) {
    return <Navigate to={HUB_PATH} replace />;
  }

  const internationalizationLabel = th("secondNav.internationalization");
  const hubListTitle = trHub(t, "departmentIntlRelEmployeesPageTitle");
  const leafLabel = trRole(t, BREADCRUMB_LEAF_KEY[roleSlug]);

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
                    {hubListTitle}
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
              <RoleArticle slug={roleSlug} t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function RoleArticle({
  slug,
  t,
}: {
  slug: InternationalCooperationRoleSlug;
  t: TFunction;
}) {
  if (slug === "vice-rector-international-cooperation") {
    const name = trRole(t, "intlRelRoleViceRectorPersonName");
    const roleLabel = trRole(t, "intlRelRoleViceRectorRoleLabel");
    const heading = trRole(t, "intlRelRoleViceRectorResponsibilitiesHeading");
    const bulletsRaw = trRole(t, "intlRelRoleViceRectorResponsibilities");
    const bullets = parseMiddleDotLines(bulletsRaw);
    const alt = trRole(t, "intlRelRoleViceRectorHeroAlt");
    const heroSrc = "/images/internationalization/vice-rector-international-cooperation.png";

    return (
      <article className="max-w-none">
        <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[16/9]">
          <img
            src={heroSrc}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            decoding="async"
            loading="eager"
          />
        </figure>
        <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
          {name}
        </h1>
        <p className="mt-2 text-lg font-medium leading-relaxed text-muted-foreground">{roleLabel}</p>

        <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground md:text-2xl">{heading}</h2>
        <ul className="mt-4 list-outside list-disc space-y-3 pl-6 text-body-article text-muted-foreground marker:text-foreground/70">
          {bullets.map((line, i) => (
            <li key={i} className="text-justify ps-1">
              {line}
            </li>
          ))}
        </ul>
      </article>
    );
  }

  if (slug === "head-department-international-cooperation") {
    const name = trRole(t, "intlRelRoleHeadPersonName");
    const roleLabel = trRole(t, "intlRelRoleHeadRoleLabel");
    const heading = trRole(t, "intlRelRoleHeadResponsibilitiesHeading");
    const bodyRaw = trRole(t, "intlRelRoleHeadResponsibilities");
    const paragraphs = bodyRaw
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const alt = trRole(t, "intlRelRoleHeadHeroAlt");
    const heroSrc = "/images/internationalization/head-department-international-cooperation.png";

    return (
      <article className="max-w-none">
        <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[16/9]">
          <img
            src={heroSrc}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            decoding="async"
            loading="eager"
          />
        </figure>
        <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
          {name}
        </h1>
        <p className="mt-2 text-lg font-medium leading-relaxed text-muted-foreground">{roleLabel}</p>

        <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground md:text-2xl">{heading}</h2>
        <ul className="mt-4 list-outside list-disc space-y-3 pl-6 text-body-article text-muted-foreground marker:text-foreground/70">
          {paragraphs.map((para, i) => (
            <li key={i} className="text-justify ps-1">
              {para}
            </li>
          ))}
        </ul>
      </article>
    );
  }

  if (slug === "lead-specialist-international-cooperation") {
    const name = trRole(t, "intlRelRoleLeadPersonName");
    const roleLabel = trRole(t, "intlRelRoleLeadRoleLabel");
    const heading = trRole(t, "intlRelRoleLeadResponsibilitiesHeading");
    const bulletsRaw = trRole(t, "intlRelRoleLeadResponsibilities");
    const bullets = parseMiddleDotLines(bulletsRaw);
    const alt = trRole(t, "intlRelRoleLeadHeroAlt");
    const heroSrc = "/images/internationalization/lead-specialist-international-cooperation.png";

    return (
      <article className="max-w-none">
        <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:aspect-[16/9]">
          <img
            src={heroSrc}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            decoding="async"
            loading="eager"
          />
        </figure>
        <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
          {name}
        </h1>
        <p className="mt-2 text-lg font-medium leading-relaxed text-muted-foreground">{roleLabel}</p>

        <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground md:text-2xl">{heading}</h2>
        <ul className="mt-4 list-outside list-disc space-y-3 pl-6 text-body-article text-muted-foreground marker:text-foreground/70">
          {bullets.map((line, i) => (
            <li key={i} className="text-justify ps-1">
              {line}
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return null;
}
