import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  COPYRIGHT_PAGE_DEFAULTS,
  COPYRIGHT_PARAGRAPH_KEYS,
} from "@/locales/copyrightDefaults";

function trCopyright(t: TFunction, key: keyof typeof COPYRIGHT_PAGE_DEFAULTS) {
  return t(key, { defaultValue: COPYRIGHT_PAGE_DEFAULTS[key] });
}

export default function CopyrightPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");

  const pageTitle = trCopyright(t, "copyrightPageTitle");

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
            <p className="mt-4 text-[15px] font-medium leading-relaxed text-foreground md:text-base">
              {trCopyright(t, "copyrightNotice")}
            </p>

            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              {COPYRIGHT_PARAGRAPH_KEYS.map((key) => (
                <p key={key}>{trCopyright(t, key)}</p>
              ))}
              <p>
                <span className="font-medium text-foreground">{trCopyright(t, "copyrightEmailLabel")} </span>
                <a
                  href={`mailto:${COPYRIGHT_PAGE_DEFAULTS.copyrightEmail}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {trCopyright(t, "copyrightEmail")}
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
