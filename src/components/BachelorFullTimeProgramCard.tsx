import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { BachelorFullTimeProgram } from "@/types/bachelorFullTime";
import { bachelorFullTimeProgramDetailPath } from "@/data/bachelorFullTimePrograms";
import { bachelorCorrespondenceProgramDetailPath } from "@/data/bachelorCorrespondencePrograms";
import type { BachelorProgramTrack } from "@/data/bachelorProgramPaths";
import { bachelorFullTimeCardImageSrc } from "@/data/bachelorFullTimeCardImages";
import { cn } from "@/lib/utils";

const detailByTrack: Record<
  BachelorProgramTrack,
  (no: number) => string
> = {
  "full-time": bachelorFullTimeProgramDetailPath,
  correspondence: bachelorCorrespondenceProgramDetailPath,
};

export function BachelorFullTimeProgramCard({
  program,
  track = "full-time",
}: {
  program: BachelorFullTimeProgram;
  track?: BachelorProgramTrack;
}) {
  const { t } = useTranslation("header");
  const to = detailByTrack[track](program.no);
  const title = program.specialtyName.replace(/;\s*$/, "").trim() || `Programme №${program.no}`;
  const imgSrc = bachelorFullTimeCardImageSrc(program.no);
  const qual = program.qualification.trim();
  const label = qual
    ? `${title}, ${qual}, ${program.duration}, ${program.totalCredits} credits — open specification`
    : `${title}, ${program.duration}, ${program.totalCredits} credits — open specification`;

  return (
    <Link
      to={to}
      className={cn(
        "group flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl bg-muted/40 text-left transition-colors",
        "hover:bg-muted/55",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      aria-label={label}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt=""
          width={480}
          height={360}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 pb-4 pt-3.5 sm:gap-3.5 sm:pb-5 sm:pt-4">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
          <span className="w-fit max-w-full truncate rounded-md bg-muted px-2 py-1 font-mono text-[11px] font-medium tabular-nums leading-none text-muted-foreground">
            {program.cipher}
          </span>
          <p className="line-clamp-2 text-[0.9375rem] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-base">
            {title}
          </p>
        </div>
        <div className="mt-auto flex shrink-0 flex-col gap-2 border-t border-border/50 pt-3">
          <div className="flex justify-between gap-3 text-[0.8125rem] leading-none">
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">
                {t("bachelorProgramCardDurationLabel")}
              </span>
              <span className="min-w-0 font-medium text-foreground">{program.duration}</span>
            </div>
            {program.totalCredits ? (
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">
                  {t("bachelorProgramCardCreditsLabel")}
                </span>
                <span className="tabular-nums text-muted-foreground">{program.totalCredits} credits</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
