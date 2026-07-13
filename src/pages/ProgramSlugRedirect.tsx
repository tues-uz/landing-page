import { Navigate, useParams } from "react-router-dom";
import { studyProgramDetailPath } from "@/data/studyProgramsCurriculum";

/** Redirect legacy `/programs/:slug` URLs to canonical study program detail pages. */
export default function ProgramSlugRedirect() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/programs" replace />;
  return <Navigate to={studyProgramDetailPath(slug)} replace />;
}
