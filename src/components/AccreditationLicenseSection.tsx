import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { ACCREDITATION_REGISTRY_CARDS } from "@/config/accreditationRegistryData";
import { ACCREDITATION_LICENSE_I18N_DEFAULTS } from "@/locales/accreditationLicenseDefaults";
import { cn } from "@/lib/utils";

function trAcc(t: TFunction, key: keyof typeof ACCREDITATION_LICENSE_I18N_DEFAULTS) {
  return t(key, { defaultValue: ACCREDITATION_LICENSE_I18N_DEFAULTS[key] });
}

export function AccreditationLicenseSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = trAcc(t, "accreditationLicenseIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const cta = trAcc(t, "accreditationRegistryCta");

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <ul
        className="mt-10 grid grid-cols-1 gap-[16px] sm:grid-cols-2"
        role="list"
      >
        {ACCREDITATION_REGISTRY_CARDS.map(({ to, title, descKey }) => {
          const description = trAcc(t, descKey);
          return (
            <li key={to} className="flex min-h-0">
              <Link
                to={to}
                aria-label={`${title} — ${cta}`}
                className={cn(
                  "group flex min-h-[200px] w-full flex-col rounded-2xl border border-border bg-card p-[18px] shadow-sm transition-all duration-200",
                  "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                    {title}
                  </span>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                    aria-hidden
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={2} />
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>

                <div className="mt-6 border-t border-border/80 pt-4">
                  <span
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors",
                      "bg-muted/60 text-foreground",
                      "group-hover:bg-primary group-hover:text-primary-foreground",
                    )}
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
