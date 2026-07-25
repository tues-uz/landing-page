import type { LucideIcon } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import { cn } from "@/lib/utils";

export const downloadCardShellClass = cn(
  "group relative flex w-full flex-col overflow-hidden rounded-2xl",
  "border border-border bg-card",
  "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_20px_rgba(15,23,42,0.04)]",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-1 hover:border-primary/25",
  "hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]",
);

export const downloadCardCtaClass = cn(
  "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors",
  "bg-muted/60 text-foreground no-underline",
  "hover:bg-primary hover:text-primary-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const downloadCardCompactCtaClass = cn(
  "flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors",
  "bg-primary text-primary-foreground no-underline",
  "hover:bg-primary/90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const previewFrameClass =
  "relative mx-4 mt-5 overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.05] via-muted/40 to-[hsl(var(--oxford-cream))] p-3 ring-1 ring-border";

export type DownloadCardProps = {
  title: string;
  description: string;
  cta?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  PreviewIcon?: LucideIcon;
  previewBadge?: string;
  downloadFilename?: string;
  showDownloadCta?: boolean;
  /** Tighter layout with a full-bleed preview — suited to single document cards. */
  variant?: "default" | "compact";
};

export function DownloadCard({
  title,
  description,
  cta,
  href,
  imageSrc,
  imageAlt = "",
  PreviewIcon,
  previewBadge,
  downloadFilename,
  showDownloadCta = true,
  variant = "default",
}: DownloadCardProps) {
  const isCompact = variant === "compact";

  return (
    <article className={downloadCardShellClass}>
      <div
        className={
          isCompact
            ? "relative overflow-hidden border-b border-border bg-white"
            : previewFrameClass
        }
      >
        {isCompact && imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={cn(
              "relative overflow-hidden",
              isCompact ? "aspect-[3/4]" : "aspect-[4/3] rounded-lg",
            )}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            ) : PreviewIcon ? (
              <div className="flex h-full w-full items-center justify-center bg-muted/30">
                <PreviewIcon
                  className="h-16 w-16 text-primary/60 transition-transform duration-500 ease-out group-hover:scale-105"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </div>
            ) : null}
            {previewBadge ? (
              <span className="absolute right-2 top-2 rounded-md bg-background/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground shadow-sm backdrop-blur-sm">
                {previewBadge}
              </span>
            ) : null}
          </div>
        )}
        {isCompact && imageSrc && previewBadge ? (
          <span className="absolute right-2 top-2 rounded-md bg-background/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground shadow-sm backdrop-blur-sm">
            {previewBadge}
          </span>
        ) : null}
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          isCompact ? "gap-2 px-3 pb-3 pt-2.5" : "px-5 pb-5 pt-4",
        )}
      >
        <div className={isCompact ? "min-w-0" : undefined}>
          <h3
            className={cn(
              "font-semibold leading-snug tracking-tight text-foreground",
              isCompact ? "text-base" : "text-lg font-bold",
            )}
          >
            {title}
          </h3>
          {description ? (
            <p
              className={cn(
                "leading-relaxed text-muted-foreground",
                isCompact ? "mt-1 line-clamp-2 text-xs" : "mt-2 line-clamp-3 flex-1 text-sm",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        {showDownloadCta && href && cta ? (
          <div className={isCompact ? "pt-0.5" : "mt-5 pt-4"}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              download={downloadFilename ?? true}
              aria-label={`${title} — ${cta}`}
              className={isCompact ? downloadCardCompactCtaClass : downloadCardCtaClass}
            >
              <ArrowDownToLine className="h-4 w-4 opacity-90" strokeWidth={2} aria-hidden />
              {cta}
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
