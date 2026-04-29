import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { UNIVERSITY_DEPARTMENTS_HIERARCHY, leaderProfileHref } from "@/data/universityDepartmentsHierarchy";

type FlattenedLeader = {
  leaderViewId: number;
  label: string;
  groupLabel: string;
};

const FLAT_LEADERS: readonly FlattenedLeader[] = [
  {
    leaderViewId: UNIVERSITY_DEPARTMENTS_HIERARCHY.viceRectorAcademicAffairs.leaderViewId,
    label: UNIVERSITY_DEPARTMENTS_HIERARCHY.viceRectorAcademicAffairs.label,
    groupLabel: "University leadership",
  },
  ...UNIVERSITY_DEPARTMENTS_HIERARCHY.faculties.flatMap((faculty) => [
    {
      leaderViewId: faculty.faculty.leaderViewId,
      label: faculty.faculty.label,
      groupLabel: "Faculty leadership",
    },
    ...faculty.departments.map((dept) => ({
      leaderViewId: dept.leaderViewId,
      label: dept.label,
      groupLabel: faculty.faculty.label,
    })),
  ]),
];

export default function UniversityDepartmentsLeaderProfilePage() {
  const { leaderId } = useParams<{ leaderId: string }>();
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const parsedId = Number(leaderId);
  if (!Number.isInteger(parsedId)) {
    return <Navigate to="/university-departments" replace />;
  }

  const leader = FLAT_LEADERS.find((entry) => entry.leaderViewId === parsedId);
  if (!leader) {
    return <Navigate to="/university-departments" replace />;
  }

  const officialHref = leaderProfileHref(parsedId);

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
                    {th("secondNav.university")}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to="/university-departments"
                    className="font-medium text-muted-foreground transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    Departments
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{leader.label}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <article className="max-w-none">
                <section className="rounded-2xl bg-card p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {leader.groupLabel}
                  </p>
                  <h1 className="mt-1.5 text-balance text-[1.65rem] font-semibold tracking-tight text-foreground">
                    {leader.label}
                  </h1>
                  <p className="mt-3 text-sm text-muted-foreground">
                    This profile is available on the official university website. Use the link below to view complete
                    contact details and responsibilities.
                  </p>
                  <a
                    href={officialHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Open official profile
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </section>
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
