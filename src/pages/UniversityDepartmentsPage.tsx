import type { TFunction } from "i18next";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  UNIVERSITY_DEPARTMENTS_HIERARCHY,
  type DepartmentHierarchyLink,
} from "@/data/universityDepartmentsHierarchy";
import { UNIVERSITY_DEPARTMENTS_PAGE_DEFAULTS } from "@/locales/universityDepartmentsPageDefaults";
import { cn } from "@/lib/utils";

/** Same connector colour as tues.uz `structure/view/2` (`.orgchart` rules: rgb(20, 82, 196)). */
const TUES_ORGCHART_OFFICIAL =
  "https://tues.uz/structure/view/2" as const;
const LINE = "bg-[rgb(20,82,196)] dark:bg-blue-400";
const LINE_W = "w-[2px]";
const LINE_H = "h-[2px]";

function ChartV({ className }: { className?: string }) {
  return <div className={cn("mx-auto shrink-0", LINE_W, LINE, className)} aria-hidden />;
}

/** Horizontal bar: full width on mobile; middle segment between column centres on lg. */
function ChartH3() {
  return (
    <div className={cn("relative col-span-1 w-full shrink-0 lg:col-span-3", LINE_H)}>
      <div className={cn("absolute inset-0 lg:hidden", LINE, LINE_H)} />
      <div
        className={cn(
          "pointer-events-none absolute top-0 hidden h-[2px] lg:block",
          LINE,
        )}
        style={{
          left: "16.666%",
          width: "66.668%",
        }}
      />
      {/* Join tabs force a physical merge with each top stem (prevents tiny seams on some DPRs). */}
      <div className={cn("pointer-events-none absolute left-[16.666%] top-0 hidden h-[4px] w-[2px] -translate-x-1/2 lg:block", LINE)} />
      <div className={cn("pointer-events-none absolute left-1/2 top-0 hidden h-[4px] w-[2px] -translate-x-1/2 lg:block", LINE)} />
      <div className={cn("pointer-events-none absolute left-[83.334%] top-0 hidden h-[4px] w-[2px] -translate-x-1/2 lg:block", LINE)} />
    </div>
  );
}

function trDept(t: TFunction, key: keyof typeof UNIVERSITY_DEPARTMENTS_PAGE_DEFAULTS) {
  return t(key, { defaultValue: UNIVERSITY_DEPARTMENTS_PAGE_DEFAULTS[key] });
}

function LeaderLink({ item, className }: { item: DepartmentHierarchyLink; className?: string }) {
  const internalPath = `/university-departments/profile/${item.leaderViewId}`;
  return (
    <Link
      to={internalPath}
      className={
        className ??
        "inline-flex items-center gap-1 font-bold text-foreground underline-offset-4 hover:underline"
      }
    >
      {item.label}
    </Link>
  );
}

/** Root / faculty node — matches tues.uz `.orgchart .node .title` (max 180px, #ccc border, 12px). */
function OrgParentNode({
  children,
  className,
  focused,
}: {
  children: ReactNode;
  className?: string;
  focused?: boolean;
}) {
  return (
    <div
      className={cn(
        "org_item title w-full max-w-[180px] rounded-lg border bg-white p-2.5 text-center text-[#333] dark:bg-card dark:text-foreground",
        focused
          ? "border-[3px] border-amber-400 dark:border-amber-500"
          : "border border-border",
        className,
      )}
    >
      <div className="text-[12px] font-bold leading-[1.2]">{children}</div>
    </div>
  );
}

function OrgDepartmentLeaf({ item }: { item: DepartmentHierarchyLink }) {
  return (
    <div className="node relative z-[2] w-full max-w-[180px] rounded-lg border border-border bg-white p-2.5 text-center text-[#333] dark:bg-card dark:text-foreground">
      <LeaderLink
        item={item}
        className="inline-flex w-full items-center justify-center gap-1 text-[12px] font-bold leading-[1.2] text-inherit hover:text-primary"
      />
    </div>
  );
}

/**
 * Vertical spine + horizontal elbows on one centered axis.
 * `extendUpPx` lets the spine bridge upward to touch the faculty node above.
 */
function DepartmentBranchList({
  departments,
  extendUpPx,
}: {
  departments: readonly DepartmentHierarchyLink[];
  extendUpPx: number;
}) {
  const spine = "left-4";

  return (
    <div className="relative w-full pt-0">
      <div
        className={cn("absolute bottom-1 z-0 w-[2px]", LINE, spine)}
        style={{ top: -extendUpPx }}
        aria-hidden
      />
      <ul className="relative z-[1] m-0 list-none space-y-1.5 p-0" role="list">
        {departments.map((dept, index) => (
          <li key={`${dept.leaderViewId}-${dept.label}`} className="relative min-h-[2.75rem] py-0.5 pl-10 sm:pl-11">
            {index === departments.length - 1 ? (
              /* Hide spine tail below the last elbow so the vertical line ends at final branch point */
              <div className="absolute bottom-0 left-4 top-1/2 z-[1] w-[2px] bg-white dark:bg-card" aria-hidden />
            ) : null}
            <div
              className={cn(
                "absolute top-1/2 z-[1] h-[2px] w-6 -translate-y-1/2 sm:w-7",
                LINE,
                spine,
              )}
              aria-hidden
            />
            <OrgDepartmentLeaf item={dept} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FacultyColumn({
  block,
  focused,
}: {
  block: (typeof UNIVERSITY_DEPARTMENTS_HIERARCHY.faculties)[number];
  focused: boolean;
}) {
  const BRIDGE_UP = 6;

  return (
    <div className="flex min-h-0 w-full max-w-[180px] flex-col items-center gap-0">
      {/* Stem above faculty node: centered axis */}
      <div className="relative z-[2] -mt-[2px] flex w-full shrink-0 justify-center -mb-px">
        <ChartV className="h-5 sm:h-6" />
      </div>

      <div className="relative z-[2] w-full max-w-[180px]">
        <OrgParentNode focused={focused} className="w-full">
          {block.id === "economics-it" ? (
            <Link
              to="/university-departments/dean-economics-information-technology"
              className="inline-flex flex-wrap items-center justify-center gap-1 font-bold text-foreground hover:text-primary"
            >
              {block.faculty.label}
            </Link>
          ) : block.id === "pedagogy-social-humanities" ? (
            <Link
              to="/university-departments/dean-pedagogy-social-humanities"
              className="inline-flex flex-wrap items-center justify-center gap-1 font-bold text-foreground hover:text-primary"
            >
              {block.faculty.label}
            </Link>
          ) : (
            <Link
              to="/university-departments/dean-medicine"
              className="inline-flex flex-wrap items-center justify-center gap-1 font-bold text-foreground hover:text-primary"
            >
              {block.faculty.label}
            </Link>
          )}
        </OrgParentNode>
      </div>

      {/* Explicit drop line from faculty card to department branch */}
      <div className="flex w-full shrink-0 justify-start pl-4 -mt-px">
        <ChartV className="mx-0 h-4 sm:h-5" />
      </div>

      <div className="relative z-[1] -mt-px flex w-full justify-center">
        <div className="relative w-full max-w-[180px]">
          <DepartmentBranchList departments={block.departments} extendUpPx={BRIDGE_UP} />
        </div>
      </div>
    </div>
  );
}

function DepartmentsOrgChart({
  viceRector,
  faculties,
}: {
  viceRector: { label: string; leaderViewId: number };
  faculties: (typeof UNIVERSITY_DEPARTMENTS_HIERARCHY.faculties)[number][];
}) {
  return (
    <div
      id="structure_org"
      className="relative mx-2 mt-2 mb-[50px] min-h-[600px] w-full overflow-auto pb-20 text-center [-webkit-overflow-scrolling:touch]"
    >
      <div className="orgchart mx-auto min-w-0 max-w-5xl rounded-lg bg-white p-4 dark:bg-muted/20 sm:p-6">
        <div className="mx-auto grid w-full min-w-[min(100%,18rem)] grid-cols-1 gap-x-0 gap-y-0 lg:min-w-0 lg:max-w-[56rem] lg:grid-cols-3 lg:gap-x-0">
          <div className="col-span-1 flex justify-center lg:col-span-3">
            <div className="node flex w-full justify-center">
              <OrgParentNode className="w-full">
                <Link
                  to="/university-departments/first-vice-rector-academic-affairs"
                  className="inline-flex flex-wrap items-center justify-center gap-1 font-bold text-foreground hover:text-primary"
                >
                  {viceRector.label}
                </Link>
              </OrgParentNode>
            </div>
          </div>

          <div className="col-span-1 flex justify-center lg:col-span-3">
            <ChartV className="h-7 sm:h-8" />
          </div>

          <ChartH3 />

          <div className="col-span-1 flex justify-center py-1 lg:col-span-3 lg:hidden">
            <ChartV className="h-4" />
          </div>

          {faculties.map((block) => (
            <div
              key={block.id}
              className="col-span-1 mb-12 flex justify-center lg:col-span-1 lg:mb-0 lg:items-start lg:justify-center"
            >
              <FacultyColumn
                block={block}
                focused={block.id === "economics-it"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UniversityDepartmentsPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const sectionLabel = th("secondNav.university");
  const title = trDept(t, "departmentsPageTitle");
  const intro = trDept(t, "departmentsPageIntro");
  const officialChartLabel = trDept(t, "departmentsPageOfficialChartLink");

  const { viceRectorAcademicAffairs, faculties } = UNIVERSITY_DEPARTMENTS_HIERARCHY;

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
                    {sectionLabel}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <article className="max-w-none">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <a
                    href={TUES_ORGCHART_OFFICIAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {officialChartLabel}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                  </a>
                </p>

                <nav className="mt-2" aria-label={title}>
                  <DepartmentsOrgChart viceRector={viceRectorAcademicAffairs} faculties={[...faculties]} />
                </nav>
              </article>
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
