import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TERMS_OF_USE_DEFAULTS, TERMS_OF_USE_SECTIONS } from "@/locales/termsOfUseDefaults";

function trTerms(t: TFunction, key: keyof typeof TERMS_OF_USE_DEFAULTS) {
  return t(key, { defaultValue: TERMS_OF_USE_DEFAULTS[key] });
}

export default function TermsOfUsePage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");

  const pageTitle = trTerms(t, "termsOfUsePageTitle");

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
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{pageTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <article className="mx-auto max-w-3xl">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
              {pageTitle}
            </h1>
            <p className="mt-3 text-sm font-medium text-muted-foreground">{trTerms(t, "termsOfUseLastUpdated")}</p>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              <p>{trTerms(t, "termsOfUseIntro1")}</p>
              <p>{trTerms(t, "termsOfUseIntro2")}</p>
            </div>

            <div className="mt-10 space-y-10">
              {TERMS_OF_USE_SECTIONS.map((section) => (
                <section key={section.titleKey} className="space-y-4">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {trTerms(t, section.titleKey)}
                  </h2>
                  {section.paragraphKeys.map((key) => (
                    <p key={key} className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                      {trTerms(t, key)}
                    </p>
                  ))}
                  {section.bulletKeys ? (
                    <ul className="list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-muted-foreground marker:text-primary/80 md:text-base">
                      {section.bulletKeys.map((key) => (
                        <li key={key}>{trTerms(t, key)}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                <span className="font-medium text-foreground">{trTerms(t, "termsOfUseSection9EmailLabel")} </span>
                <a
                  href={`mailto:${TERMS_OF_USE_DEFAULTS.termsOfUseSection9Email}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {trTerms(t, "termsOfUseSection9Email")}
                </a>
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
