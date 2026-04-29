import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  ORG_AUXILIARY_COLUMN,
  ORG_CHART_TITLE,
  ORG_FACULTIES,
  ORG_PRO_RECTOR_COLUMNS,
  ORG_RECTOR_ROW,
  ORG_TOP,
  type OrgColumn,
} from "@/config/organizationalStructureTreeData";
import { ORGANIZATIONAL_STRUCTURE_I18N_DEFAULTS } from "@/locales/organizationalStructureDefaults";
import { cn } from "@/lib/utils";

const line = "bg-amber-700 dark:bg-amber-500";
const lineWidth = "h-[2px]";

function tr(t: TFunction, key: keyof typeof ORGANIZATIONAL_STRUCTURE_I18N_DEFAULTS) {
  return t(key, { defaultValue: ORGANIZATIONAL_STRUCTURE_I18N_DEFAULTS[key] });
}

function V({ className }: { className?: string }) {
  return <div className={cn("mx-auto w-[2px] shrink-0", line, className)} aria-hidden />;
}

/** 3 equal columns, gap-0: bar from 1st to 3rd column centre (16⅔% … 83⅓%). */
function H3() {
  return (
    <div className={cn("relative col-span-3 w-full shrink-0", lineWidth)}>
      <div className={cn("absolute left-[16.666%] top-0 w-[66.668%]", line, lineWidth)} />
    </div>
  );
}

/** Responsive 3-col spine: full-width bar on 1-col layout; precise bar from sm when 3 tracks exist. */
function H3Responsive() {
  return (
    <div className={cn("relative col-span-1 w-full shrink-0 sm:col-span-3", lineWidth)}>
      <div className={cn("absolute inset-0 sm:hidden", line, lineWidth)} />
      <div className={cn("absolute left-[16.666%] top-0 hidden w-[66.668%] sm:block", line, lineWidth)} />
    </div>
  );
}

/** 6-col (lg): bar 8⅓% … 91⅔%. &lt;lg: solid full-width bar so 2/3-column layouts still connect. */
function H6() {
  return (
    <div className={cn("relative col-span-2 w-full shrink-0 sm:col-span-3 lg:col-span-6", lineWidth)}>
      <div className={cn("absolute inset-0 lg:hidden", line, lineWidth)} />
      <div className={cn("absolute left-[8.333%] top-0 hidden w-[83.334%] lg:block", line, lineWidth)} />
    </div>
  );
}

function OrgNode({
  children,
  className,
  variant = "gold",
  emphasize,
}: {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "blue";
  emphasize?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border-2 bg-background px-1.5 py-1.5 text-center text-[7px] font-semibold leading-tight text-foreground shadow-sm sm:px-2 sm:py-1.5 sm:text-[8px]",
        variant === "blue"
          ? "border-blue-600 dark:border-blue-400"
          : "border-amber-600/90 dark:border-amber-500/80",
        emphasize && "text-[8px] sm:px-2 sm:py-2 sm:text-[9px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Med — Founder — School → three stems → merge → trunk → merge → Council | Rector | Advisor → centre trunk. */
function BlockFounderThroughOfficers() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-3 gap-x-0 gap-y-0">
        <div className="flex min-w-0 justify-center">
          <OrgNode className="w-full max-w-[11rem]">{ORG_TOP.left}</OrgNode>
        </div>
        <div className="flex min-w-0 justify-center">
          <OrgNode emphasize className="w-full max-w-[9rem] px-2">
            {ORG_TOP.founder}
          </OrgNode>
        </div>
        <div className="flex min-w-0 justify-center">
          <OrgNode className="w-full max-w-[11rem]">{ORG_TOP.right}</OrgNode>
        </div>

        <div className="flex justify-center pt-0.5">
          <V className="h-3 sm:h-3.5" />
        </div>
        <div className="flex justify-center pt-0.5">
          <V className="h-3 sm:h-3.5" />
        </div>
        <div className="flex justify-center pt-0.5">
          <V className="h-3 sm:h-3.5" />
        </div>

        <H3 />

        <div className="col-span-3 flex justify-center">
          <V className="h-5 sm:h-6" />
        </div>

        <H3 />

        <div className="flex justify-center pt-0">
          <V className="h-3 sm:h-3.5" />
        </div>
        <div className="flex justify-center pt-0">
          <V className="h-3 sm:h-3.5" />
        </div>
        <div className="flex justify-center pt-0">
          <V className="h-3 sm:h-3.5" />
        </div>

        <div className="flex min-w-0 justify-center">
          <OrgNode className="flex min-h-[2.5rem] w-full max-w-[11rem] items-center justify-center">
            {ORG_RECTOR_ROW.council}
          </OrgNode>
        </div>
        <div className="flex min-w-0 justify-center">
          <OrgNode emphasize className="flex min-h-[2.5rem] w-full max-w-[12rem] items-center justify-center px-2">
            {ORG_RECTOR_ROW.rector}
          </OrgNode>
        </div>
        <div className="flex min-w-0 justify-center">
          <OrgNode className="flex min-h-[2.5rem] w-full max-w-[11rem] items-center justify-center">
            {ORG_RECTOR_ROW.advisor}
          </OrgNode>
        </div>

        <div className="col-span-3 flex justify-center">
          <V className="h-4.5 sm:h-5" />
        </div>
      </div>
    </div>
  );
}

function ProColumn({ column }: { column: OrgColumn }) {
  const { title, items, highlightItemIndex } = column;
  const isSolo = items.length === 0;

  return (
    <div className="flex min-w-0 flex-col items-stretch gap-0">
      <OrgNode emphasize>{title}</OrgNode>
      {!isSolo ? (
        <ul className="mt-1 flex flex-col gap-1 border-t border-amber-700/25 pt-1 dark:border-amber-500/30">
          {items.map((item, i) => (
            <li key={item}>
              <OrgNode variant={highlightItemIndex === i ? "blue" : "gold"} className="font-medium">
                {item}
              </OrgNode>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Centre trunk → H-bar → N columns (same grid so stems line up). */
function BlockSpineN({
  columnCount,
  skipTrunk,
  children,
}: {
  columnCount: 6 | 3;
  skipTrunk?: boolean;
  children: (i: number) => ReactNode;
}) {
  const grid =
    columnCount === 6
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      : "grid-cols-1 sm:grid-cols-3";

  return (
    <div
      className={cn(
        "mx-auto grid w-full gap-x-0 gap-y-0",
        grid,
        columnCount === 6 && "min-w-[min(100%,52rem)] lg:min-w-0",
      )}
    >
      {!skipTrunk ? (
        <div className={cn("flex justify-center", columnCount === 6 ? "col-span-2 sm:col-span-3 lg:col-span-6" : "col-span-1 sm:col-span-3")}>
          <V className="h-4.5 sm:h-5" />
        </div>
      ) : null}

      {columnCount === 6 ? <H6 /> : <H3Responsive />}

      {Array.from({ length: columnCount }, (_, i) => (
        <div key={i} className="flex flex-col items-center gap-0 pt-0">
          <V className="h-3 sm:h-3.5" />
          <div className="w-full min-w-0">{children(i)}</div>
        </div>
      ))}
    </div>
  );
}

export function OrganizationalStructureSection() {
  const { t } = useTranslation("topNav");

  const introParagraphs = tr(t, "organizationalStructureIntro")
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

      <div className="mt-8 overflow-x-auto rounded-xl border border-amber-700/25 bg-[#fffdf8] p-3 shadow-sm ring-1 ring-amber-900/10 dark:border-amber-500/20 dark:bg-card dark:ring-amber-500/10 sm:p-4">
        <h3 className="mx-auto mb-5 max-w-4xl border-2 border-amber-600/90 bg-background px-2 py-2 text-center text-[8px] font-bold uppercase leading-tight tracking-wide text-foreground shadow-sm sm:px-2.5 sm:py-2 sm:text-[9px] dark:border-amber-500/80">
          {ORG_CHART_TITLE}
        </h3>

        <div className="mx-auto flex max-w-[100rem] flex-col gap-0">
          <BlockFounderThroughOfficers />

          <div className="mt-3 grid grid-cols-1 gap-0 lg:mt-2 lg:grid-cols-[minmax(0,1fr)_12.5rem] lg:items-start">
            <div className="min-w-0">
              <p className="mb-1.5 text-center text-[8px] font-semibold uppercase leading-normal tracking-wide text-muted-foreground sm:text-[9px]">
                {tr(t, "organizationalStructureProRectorsLabel")}
              </p>

              <BlockSpineN columnCount={6} skipTrunk>
                {(i) => <ProColumn column={ORG_PRO_RECTOR_COLUMNS[i]!} />}
              </BlockSpineN>

              <p className="mb-1.5 mt-6 text-center text-[8px] font-semibold uppercase leading-normal tracking-wide text-muted-foreground sm:text-[9px]">
                {tr(t, "organizationalStructureFacultiesLabel")}
              </p>

              <BlockSpineN columnCount={3}>
                {(i) => <ProColumn column={ORG_FACULTIES[i]!} />}
              </BlockSpineN>
            </div>

            <aside className="mt-6 shrink-0 border-t border-amber-700/30 pt-4 dark:border-amber-500/25 lg:relative lg:mt-0 lg:border-l-0 lg:border-t-0 lg:pl-5">
              <div className="hidden lg:block">
                <div className="absolute left-0 top-[0.95rem] h-[2px] w-5 bg-amber-700 dark:bg-amber-500" aria-hidden />
                <div className="absolute left-0 top-[0.95rem] h-[calc(100%-0.95rem)] w-[2px] bg-amber-700 dark:bg-amber-500" aria-hidden />
              </div>
              <p className="mb-1.5 text-center text-[8px] font-semibold uppercase leading-normal tracking-wide text-muted-foreground sm:text-[9px] lg:text-left">
                {tr(t, "organizationalStructureAuxiliaryLabel")}
              </p>
              <ul className="flex flex-col gap-1.5">
                {ORG_AUXILIARY_COLUMN.map((label) => (
                  <li key={label}>
                    <OrgNode className="font-medium">{label}</OrgNode>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-[8px] leading-relaxed text-muted-foreground sm:text-[9px]">
          {tr(t, "organizationalStructureCaption")}
        </p>
      </div>
    </div>
  );
}
