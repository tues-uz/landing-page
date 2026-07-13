import { Navigate, useLocation, useParams } from "react-router-dom";

/** Legacy admin program URLs → study programs CMS. */
export default function AdminProgramsRedirect() {
  const { slug } = useParams<{ slug?: string }>();
  const { pathname } = useLocation();

  if (pathname.endsWith("/programs/new")) {
    return <Navigate to="/admin/study-programs/new/edit" replace />;
  }
  if (slug) {
    return <Navigate to={`/admin/study-programs/${slug}/edit`} replace />;
  }
  return <Navigate to="/admin/study-programs" replace />;
}
