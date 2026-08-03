import { useCallback, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Check, Home, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { getMastersDegreeProgramByNo, type MastersDegreeProgram } from "@/data/mastersDegreePrograms";

/** Aligned with {@link BachelorFullTimeProgramDetailPage} `LABELS` for layout parity. */
const LABELS = {
  duration: "Duration",
  type: "Type of education",
  qualification: "Qualification",
  credits: "Total loan amount",
  languages: "Languages of instruction",
  form: "Form of education",
} as const;

function ShareProgramLinkButton({ title }: { title: string }) {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [title]);

  return (
    <button
      type="button"
      onClick={handleShare}
      className="shrink-0 rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={copied ? t("linkCopied") : t("shareLink")}
    >
      {copied ? <Check className="h-5 w-5" strokeWidth={2} aria-hidden /> : <Share2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
    </button>
  );
}

function MetaRows({ p }: { p: MastersDegreeProgram }) {
  const qualDisplay = p.qualification.trim() ? p.qualification : "—";
  const languages = p.languages
    .split(/\s*\/\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(", ");

  const rows: { term: string; value: string; numeric?: boolean }[] = [
    { term: LABELS.duration, value: p.duration },
    { term: LABELS.qualification, value: qualDisplay },
    { term: LABELS.type, value: p.typeOfEducation },
    { term: LABELS.form, value: p.formOfEducation },
    { term: LABELS.credits, value: p.totalCredits, numeric: true },
    { term: LABELS.languages, value: languages || "—" },
  ];

  return (
    <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {rows.map(({ term, value, numeric }) => (
        <div key={term} className="flex min-h-[4.25rem] flex-col justify-center py-3 sm:min-h-0 sm:py-4">
          <dt className="text-[0.8125rem] leading-tight text-muted-foreground">{term}</dt>
          <dd
            className={`mt-2 text-sm leading-snug text-foreground sm:text-[0.9375rem] ${numeric ? "tabular-nums" : ""}`}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function MastersDegreeProgramDetailPage() {
  const { programNo: programNoParam } = useParams<{ programNo: string }>();
  const no = programNoParam ? Number.parseInt(programNoParam, 10) : NaN;
  const program = Number.isFinite(no) ? getMastersDegreeProgramByNo(no) : undefined;

  const { t: th } = useTranslation("header");
  const { t: tCommon } = useTranslation("common");

  const backPath = "/education/masters";

  if (!program) {
    return <Navigate to={backPath} replace />;
  }

  const educationLabel = th("secondNav.education");
  const mastersLabel = th("secondNavEducation.mastersDegree");
  const leafTitle = program.specialtyName.trim() || `Programme №${program.index}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto flex max-w-[1348px] items-center px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label={tCommon("breadcrumbNav")} className="min-w-0 flex-1">
              <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm text-[#5A626C]">
                <li className="flex min-w-0 items-center">
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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{educationLabel}</span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0 items-center">
                  <Link
                    to={backPath}
                    className="font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline line-clamp-2 sm:line-clamp-none"
                  >
                    {mastersLabel}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{leafTitle}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <article className="max-w-3xl">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="min-w-0 flex-1 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                    {leafTitle}
                  </h1>
                  <ShareProgramLinkButton title={leafTitle} />
                </div>
                <p className="mt-3 font-mono text-sm tabular-nums text-muted-foreground">{program.specialtyCode}</p>

                <MetaRows p={program} />

                {program.description.trim() ? (
                  <div className="mt-12">
                    <h2 className="text-base font-semibold text-foreground">Overview</h2>
                    <div className="mt-4 space-y-4 text-justify text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                      <p>{program.description.trim()}</p>
                    </div>
                  </div>
                ) : null}
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
