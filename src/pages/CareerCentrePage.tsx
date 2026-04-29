import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { CAREER_CENTRE_PAGE_DEFAULTS } from "@/locales/careerCentreDefaults";

function trCareer(t: TFunction, key: keyof typeof CAREER_CENTRE_PAGE_DEFAULTS) {
  return t(key, { defaultValue: CAREER_CENTRE_PAGE_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";
const h3Class = "text-lg font-semibold tracking-tight text-foreground";

export default function CareerCentrePage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const leafTitle = trCareer(t, "careerCentrePageTitle");
  const studentLifeLabel = th("secondNav.studentLife");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
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
              <CareerCentreArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CareerCentreArticle({ t }: { t: TFunction }) {
  const title = trCareer(t, "careerCentrePageTitle");
  const tagline = trCareer(t, "careerCentrePageTagline");
  const introHeading = trCareer(t, "careerCentreIntroHeading");
  const introBody = trCareer(t, "careerCentreIntroBody");
  const missionHeading = trCareer(t, "careerCentreMissionHeading");
  const missionBody = trCareer(t, "careerCentreMissionBody");
  const whatWeOfferHeading = trCareer(t, "careerCentreWhatWeOfferHeading");
  const contactHeading = trCareer(t, "careerCentreContactHeading");
  const contactBlock = trCareer(t, "careerCentreContactBlock");

  const offers: { title: keyof typeof CAREER_CENTRE_PAGE_DEFAULTS; body: keyof typeof CAREER_CENTRE_PAGE_DEFAULTS }[] = [
    { title: "careerCentreOfferCounselingTitle", body: "careerCentreOfferCounselingBody" },
    { title: "careerCentreOfferInternshipTitle", body: "careerCentreOfferInternshipBody" },
    { title: "careerCentreOfferPlacementTitle", body: "careerCentreOfferPlacementBody" },
    { title: "careerCentreOfferCvTitle", body: "careerCentreOfferCvBody" },
    { title: "careerCentreOfferWorkshopsTitle", body: "careerCentreOfferWorkshopsBody" },
  ];

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>
      <p className={`mt-3 text-lg font-medium leading-relaxed text-foreground/90`}>{tagline}</p>

      <h2 className={`mt-8 ${h2Class}`}>{introHeading}</h2>
      <p className={`mt-4 text-justify ${bodyClass}`}>{introBody}</p>

      <h2 className={`mt-10 ${h2Class}`}>{missionHeading}</h2>
      <p className={`mt-4 text-justify ${bodyClass}`}>{missionBody}</p>

      <h2 className={`mt-10 ${h2Class}`}>{whatWeOfferHeading}</h2>
      <ul className="mt-4 m-0 list-none space-y-6 p-0">
        {offers.map((offer) => (
          <li key={String(offer.title)}>
            <h3 className={h3Class}>{trCareer(t, offer.title)}</h3>
            <p className={`mt-2 text-justify ${bodyClass}`}>{trCareer(t, offer.body)}</p>
          </li>
        ))}
      </ul>

      <h2 className={`mt-10 ${h2Class}`}>{contactHeading}</h2>
      <address className={`mt-4 not-italic whitespace-pre-line text-justify ${bodyClass}`}>{contactBlock}</address>
    </article>
  );
}
