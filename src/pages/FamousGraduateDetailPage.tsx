import type { TFunction } from "i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { getFamousGraduateById } from "@/data/famousGraduates";
import {
  FAMOUS_GRADUATE_DETAIL_BIO_KEY_BY_ID,
  FAMOUS_GRADUATE_DETAIL_DEFAULTS,
  FAMOUS_GRADUATES_PAGE_DEFAULTS,
  type FamousGraduateDetailBioKey,
} from "@/locales/famousGraduatesDefaults";

function trFg(t: TFunction, key: keyof typeof FAMOUS_GRADUATES_PAGE_DEFAULTS) {
  return t(key, { defaultValue: FAMOUS_GRADUATES_PAGE_DEFAULTS[key] });
}

function trBio(t: TFunction, key: FamousGraduateDetailBioKey) {
  return t(key, { defaultValue: FAMOUS_GRADUATE_DETAIL_DEFAULTS[key] });
}

export default function FamousGraduateDetailPage() {
  const { graduateId } = useParams<{ graduateId: string }>();
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const graduate = getFamousGraduateById(graduateId);
  const bioKey = graduate ? FAMOUS_GRADUATE_DETAIL_BIO_KEY_BY_ID[graduate.id] : undefined;

  if (!graduate || !bioKey) {
    return <Navigate to="/university-famous-graduates" replace />;
  }

  const sectionLabel = th("secondNav.university");
  const listTitle = trFg(t, "famousGraduatesPageTitle");
  const bodyRaw = trBio(t, bioKey);
  const paragraphs = bodyRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

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
                <li className="flex min-w-0 items-center">
                  <Link
                    to="/university-famous-graduates"
                    className="font-medium text-muted-foreground transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {listTitle}
                  </Link>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{graduate.fullName}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <article className="max-w-none">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="relative aspect-[4/3] w-full max-w-2xl bg-muted sm:mx-auto sm:max-w-none">
                    <img
                      src={graduate.portraitSrc}
                      alt={graduate.fullName}
                      className="h-full w-full object-cover object-top"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {graduate.fullName}
                </h1>

                <div className="mt-6 max-w-3xl space-y-4">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
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
