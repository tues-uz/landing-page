import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StudyProgramDetailView } from "@/components/StudyProgramDetailView";
import { useLocalizedStudyProgramDetailQuery } from "@/features/cms/hooks/useStudyProgramsQueries";

import { STUDY_PROGRAMS_LIST_PATH } from "@/data/studyProgramsCurriculum";

const BACK_PATH = STUDY_PROGRAMS_LIST_PATH;

export default function StudyProgramDetailPage() {
  const { programId } = useParams<{ programId: string }>();
  const { data: result, isLoading } = useLocalizedStudyProgramDetailQuery(programId ?? "");

  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="below-header flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden />
        </main>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return <Navigate to={BACK_PATH} replace />;
  }

  const { program } = result;
  const admissionsLabel = th("nav.admissions");
  const studyProgramsLabel = th("nav.admissionsMenu.studyPrograms");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="below-header">
        <div className="border-b border-border">
          <nav
            aria-label={tCommon("breadcrumbNav")}
            className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto whitespace-nowrap px-5 py-3 text-sm text-muted-foreground scrollbar-hide sm:px-8"
          >
            <Link to="/" className="transition-colors hover:text-foreground">
              {tCommon("breadcrumbHome")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
            <Link to="/admissions" className="transition-colors hover:text-foreground">
              {admissionsLabel}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
            <Link to={BACK_PATH} className="transition-colors hover:text-foreground">
              {studyProgramsLabel}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
            <span className="text-foreground">{program.title}</span>
          </nav>
        </div>

        <StudyProgramDetailView faculty={result.faculty} program={result.program} />
      </main>
      <Footer />
    </div>
  );
}
