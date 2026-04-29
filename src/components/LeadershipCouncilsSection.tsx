import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LEADERSHIP_COUNCIL_CARD_IMAGE,
  LEADERSHIP_COUNCIL_CARD_TO,
  LEADERSHIP_COUNCILS_CARD_KEYS,
  LEADERSHIP_COUNCILS_I18N_DEFAULTS,
} from "@/locales/leadershipCouncilsDefaults";
import { cn } from "@/lib/utils";

function trCouncil(t: TFunction, key: keyof typeof LEADERSHIP_COUNCILS_I18N_DEFAULTS) {
  return t(key, { defaultValue: LEADERSHIP_COUNCILS_I18N_DEFAULTS[key] });
}

export function LeadershipCouncilsSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = trCouncil(t, "leadershipCouncilsIntro")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 max-w-none">
      <div className="space-y-4 text-body-article text-muted-foreground">
        {introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <ul
        className="mt-10 grid grid-cols-1 gap-[16px] md:grid-cols-3"
        role="list"
      >
        {LEADERSHIP_COUNCILS_CARD_KEYS.map((cardKey) => {
          const title = trCouncil(t, cardKey);
          const to = LEADERSHIP_COUNCIL_CARD_TO[cardKey];
          const imageSrc = LEADERSHIP_COUNCIL_CARD_IMAGE[cardKey];
          const cardClass = cn(
            "group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
            "transition-colors hover:border-primary/25 hover:shadow-md",
            to
              ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              : null,
          );

          const inner = (
            <>
              <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-muted">
                <img
                  src={imageSrc}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex min-h-0 flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                  {title}
                </h2>
              </div>
            </>
          );

          return (
            <li key={cardKey} className="flex min-h-0">
              {to ? (
                <Link to={to} className={cn(cardClass, "cursor-pointer")} aria-label={title}>
                  {inner}
                </Link>
              ) : (
                <div className={cardClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
