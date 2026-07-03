import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { ArrowDownToLine, Presentation } from "lucide-react";
import { UNI_IN_NUMBERS_DECKS } from "@/config/universityInNumbersData";
import { UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS } from "@/locales/universityInNumbersDefaults";
import { cn } from "@/lib/utils";

function tr(t: TFunction, key: keyof typeof UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS) {
  return t(key, { defaultValue: UNIVERSITY_IN_NUMBERS_I18N_DEFAULTS[key] });
}

function fileNameFromHref(href: string): string {
  const last = href.split("/").pop();
  return last ?? href;
}

export function UniversityInNumbersSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = tr(t, "universityInNumbersIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const downloadLabel = tr(t, "uniNumbersDownloadCta");
  const formatLabel = tr(t, "uniNumbersPptxBadge");

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {tr(t, "universityInNumbersDownloadTitle")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {tr(t, "universityInNumbersDownloadLead")}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{formatLabel}</p>

        <ul
          className="mt-8 grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {UNI_IN_NUMBERS_DECKS.map(({ href, code, langKey }) => {
            const file = fileNameFromHref(href);
            const title = tr(t, langKey);
            return (
              <li key={href} className="flex min-h-0">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  aria-label={`${title} — ${downloadLabel}`}
                  className={cn(
                    "group flex min-h-[220px] w-full flex-col rounded-2xl border border-border bg-card p-[16px] shadow-sm transition-all duration-200",
                    "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center rounded-lg bg-muted px-2.5 py-1 text-xs font-bold tabular-nums tracking-wide text-foreground">
                      {code}
                    </span>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                      aria-hidden
                    >
                      <Presentation className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                  </div>

                  <div className="mt-5 min-w-0 flex-1">
                    <p className="text-lg font-semibold leading-snug tracking-tight text-foreground">
                      {title}
                    </p>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed text-muted-foreground">{file}</p>
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <span
                      className={cn(
                        "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors",
                        "bg-muted/60 text-foreground",
                        "group-hover:bg-primary group-hover:text-primary-foreground",
                      )}
                    >
                      <ArrowDownToLine className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
                      {downloadLabel}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
