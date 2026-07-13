import type { TFunction } from "i18next";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StudyProgramApplicationForm } from "@/components/StudyProgramApplicationForm";
import { STUDY_PROGRAM_APPLY_PAGE_DEFAULTS } from "@/locales/studyProgramApplyDefaults";

function trApply(t: TFunction, key: keyof typeof STUDY_PROGRAM_APPLY_PAGE_DEFAULTS) {
  return t(key, { defaultValue: STUDY_PROGRAM_APPLY_PAGE_DEFAULTS[key] });
}

export default function StudyProgramApplyPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");
  const [searchParams] = useSearchParams();
  const programId = searchParams.get("program") ?? undefined;

  const admissionLabel = th("secondNav.admission2025");
  const title = trApply(t, "studyProgramApplyPageTitle");
  const intro = trApply(t, "studyProgramApplyPageIntro");

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
                    {admissionLabel}
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
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
          </div>

          <div className="mt-8">
            <StudyProgramApplicationForm initialProgramId={programId} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
