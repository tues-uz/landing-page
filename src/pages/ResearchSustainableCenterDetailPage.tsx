import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import {
  RESEARCH_SUSTAINABLE_CENTER_CARDS,
  getResearchSustainableCenterById,
} from "@/data/researchSustainableCenterCards";
import { bachelorFullTimeCardImageSrc } from "@/data/bachelorFullTimeCardImages";
import { getCardBodyParagraphs } from "@/lib/researchSustainableCardBody";

const HUB_PATH = "/science/center-research-sustainable-innovation";

export default function ResearchSustainableCenterDetailPage() {
  const { centerId } = useParams<{ centerId: string }>();
  const { t } = useTranslation("header");
  const { t: tCommon } = useTranslation("common");

  const card = getResearchSustainableCenterById(centerId);
  if (!card) {
    return <Navigate to={HUB_PATH} replace />;
  }

  const hubTitle = t("centerResearchSustainablePageTitle", {
    defaultValue: "Centers for research and sustainable innovation",
  });
  const title = t(card.titleKey);
  const paragraphs = getCardBodyParagraphs(t, card.bodyKey);
  const imgIndex = RESEARCH_SUSTAINABLE_CENTER_CARDS.findIndex((c) => c.id === card.id) + 1;
  const imgSrc = bachelorFullTimeCardImageSrc(imgIndex);

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
                    {t("secondNav.science")}
                  </span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="flex min-w-0">
                  <Link
                    to={HUB_PATH}
                    className="line-clamp-2 font-medium text-muted-foreground transition-colors hover:text-foreground sm:line-clamp-none"
                  >
                    {hubTitle}
                  </Link>
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

                <div className="mt-6 overflow-hidden rounded-2xl bg-muted/40">
                  <div className="relative aspect-[5/3] w-full overflow-hidden bg-muted">
                    <img
                      src={imgSrc}
                      alt=""
                      width={960}
                      height={576}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {paragraphs.length > 0 ? (
                  <div className="mt-8 flex flex-col gap-4 text-justify">
                    {paragraphs.map((para, pi) => (
                      <p
                        key={pi}
                        className="text-body-article text-muted-foreground"
                      >
                        {para}
                      </p>
                    ))}
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
