import type { ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { MINORITY_SUPPORT_CENTER_DEFAULTS } from "@/locales/minoritySupportCenterDefaults";

function trMinoritySupportCenter(t: TFunction, key: keyof typeof MINORITY_SUPPORT_CENTER_DEFAULTS) {
  return t(key, { defaultValue: MINORITY_SUPPORT_CENTER_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const h2Class = "text-xl font-semibold tracking-tight text-foreground md:text-2xl";
const h3Class = "text-lg font-semibold tracking-tight text-foreground";

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        loading="lazy"
      />
    </figure>
  );
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className={h2Class}>{title}</h2>
      {children}
    </section>
  );
}

export default function MinoritySupportCenterPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const studentLifeLabel = th("secondNav.studentLife");
  const navLeafLabel = th("secondNavStudentLife.supportCenterMinorityGroups");

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
                  <span className="font-medium text-muted-foreground line-clamp-2 sm:line-clamp-none">{studentLifeLabel}</span>
                </li>
                <li aria-hidden className="flex items-center text-muted-foreground/70">
                  <span className="leading-none">/</span>
                </li>
                <li className="min-w-0 flex-1 font-medium text-foreground">
                  <span className="line-clamp-2 sm:line-clamp-none">{navLeafLabel}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-[1348px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-none lg:col-span-9">
              <MinoritySupportCenterArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MinoritySupportCenterArticle({ t }: { t: TFunction }) {
  const whatWeDoItems: { title: keyof typeof MINORITY_SUPPORT_CENTER_DEFAULTS; body: keyof typeof MINORITY_SUPPORT_CENTER_DEFAULTS }[] = [
    { title: "minoritySupportCenterWhatWeDo1Title", body: "minoritySupportCenterWhatWeDo1Body" },
    { title: "minoritySupportCenterWhatWeDo2Title", body: "minoritySupportCenterWhatWeDo2Body" },
    { title: "minoritySupportCenterWhatWeDo3Title", body: "minoritySupportCenterWhatWeDo3Body" },
    { title: "minoritySupportCenterWhatWeDo4Title", body: "minoritySupportCenterWhatWeDo4Body" },
    { title: "minoritySupportCenterWhatWeDo5Title", body: "minoritySupportCenterWhatWeDo5Body" },
  ];

  const serviceItems: { title: keyof typeof MINORITY_SUPPORT_CENTER_DEFAULTS; body: keyof typeof MINORITY_SUPPORT_CENTER_DEFAULTS }[] = [
    { title: "minoritySupportCenterService1Title", body: "minoritySupportCenterService1Body" },
    { title: "minoritySupportCenterService2Title", body: "minoritySupportCenterService2Body" },
    { title: "minoritySupportCenterService3Title", body: "minoritySupportCenterService3Body" },
    { title: "minoritySupportCenterService4Title", body: "minoritySupportCenterService4Body" },
    { title: "minoritySupportCenterService5Title", body: "minoritySupportCenterService5Body" },
  ];

  return (
    <article className="max-w-none">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {trMinoritySupportCenter(t, "minoritySupportCenterPageTitle")}
      </h1>
      <p className="mt-3 text-lg font-medium leading-snug text-foreground md:text-xl">
        {trMinoritySupportCenter(t, "minoritySupportCenterPageSubtitle")}
      </p>
      <p className={`mt-4 text-justify ${bodyClass}`}>{trMinoritySupportCenter(t, "minoritySupportCenterPageIntro")}</p>

      <SectionBlock title={trMinoritySupportCenter(t, "minoritySupportCenterApproachHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trMinoritySupportCenter(t, "minoritySupportCenterApproachBody")}</p>
      </SectionBlock>

      <SectionBlock title={trMinoritySupportCenter(t, "minoritySupportCenterWhatWeDoHeading")}>
        <ol className="mt-4 m-0 list-none space-y-6 p-0">
          {whatWeDoItems.map((item, index) => (
            <li key={String(item.title)}>
              <h3 className={h3Class}>
                {index + 1}. {trMinoritySupportCenter(t, item.title)}
              </h3>
              <p className={`mt-2 text-justify ${bodyClass}`}>{trMinoritySupportCenter(t, item.body)}</p>
            </li>
          ))}
        </ol>
        <ArticleImage
          src={trMinoritySupportCenter(t, "minoritySupportCenterImage1Src")}
          alt={trMinoritySupportCenter(t, "minoritySupportCenterImage1Alt")}
        />
      </SectionBlock>

      <SectionBlock title={trMinoritySupportCenter(t, "minoritySupportCenterServicesHeading")}>
        <ol className="mt-4 m-0 list-none space-y-6 p-0">
          {serviceItems.map((item, index) => (
            <li key={String(item.title)}>
              <h3 className={h3Class}>
                {index + 1}. {trMinoritySupportCenter(t, item.title)}
              </h3>
              <p className={`mt-2 text-justify ${bodyClass}`}>{trMinoritySupportCenter(t, item.body)}</p>
            </li>
          ))}
        </ol>
        <ArticleImage
          src={trMinoritySupportCenter(t, "minoritySupportCenterImage2Src")}
          alt={trMinoritySupportCenter(t, "minoritySupportCenterImage2Alt")}
        />
      </SectionBlock>

      <SectionBlock title={trMinoritySupportCenter(t, "minoritySupportCenterPartnershipsHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trMinoritySupportCenter(t, "minoritySupportCenterPartnershipsBody")}</p>
      </SectionBlock>

      <SectionBlock title={trMinoritySupportCenter(t, "minoritySupportCenterEvaluationHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trMinoritySupportCenter(t, "minoritySupportCenterEvaluationBody")}</p>
      </SectionBlock>

      <SectionBlock title={trMinoritySupportCenter(t, "minoritySupportCenterImplementationHeading")}>
        <p className={`mt-4 text-justify ${bodyClass}`}>{trMinoritySupportCenter(t, "minoritySupportCenterImplementationBody")}</p>
      </SectionBlock>
    </article>
  );
}
