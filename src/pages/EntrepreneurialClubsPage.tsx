import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";

const HERO_SRC = "/tuesw-gallery/480/16.webp";
const bodyClass = "text-justify text-body-article text-muted-foreground";

export default function EntrepreneurialClubsPage() {
  const { t } = useTranslation("header");
  const { t: tCommon } = useTranslation("common");
  const title = t("secondNavScience.entrepreneurialClubs");
  const intro = t("entrepreneurialClubsPageIntro");
  const phoneDisplay = t("entrepreneurialClubsPhone");
  const phoneHref = t("entrepreneurialClubsPhoneHref");

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
                <div className="overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-sm">
                  <div className="relative aspect-[21/9] w-full sm:aspect-[2.2/1]">
                    <img
                      src={HERO_SRC}
                      alt={t("entrepreneurialClubsHeroAlt")}
                      width={1348}
                      height={400}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
                  {title}
                </h1>
                {intro ? (
                  <p className={`mt-3 ${bodyClass}`}>{intro}</p>
                ) : null}

                <section className="mt-10">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {t("entrepreneurialClubsS1Title")}
                  </h2>
                  <p className={`mt-3 ${bodyClass}`}>{t("entrepreneurialClubsS1Body")}</p>
                </section>

                <section className="mt-10">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {t("entrepreneurialClubsS2Title")}
                  </h2>
                  <p className={`mt-3 ${bodyClass}`}>{t("entrepreneurialClubsS2Body")}</p>
                </section>

                <section className="mt-10">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {t("entrepreneurialClubsS3Title")}
                  </h2>
                  <p className={`mt-3 ${bodyClass}`}>{t("entrepreneurialClubsS3Body")}</p>
                </section>

                <section
                  className="mt-12 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6"
                  aria-labelledby="entrepreneurial-clubs-contacts"
                >
                  <h2
                    id="entrepreneurial-clubs-contacts"
                    className="text-lg font-semibold tracking-tight text-foreground"
                  >
                    {t("entrepreneurialClubsContactsTitle")}
                  </h2>
                  <p className={`mt-2 ${bodyClass}`}>{t("entrepreneurialClubsContactsLead")}</p>
                  <dl className="mt-4 space-y-3 text-sm sm:text-base">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.8125rem]">
                        {t("entrepreneurialClubsContactRole")}
                      </dt>
                      <dd className="mt-1 text-foreground">{t("entrepreneurialClubsContactName")}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.8125rem]">
                        {t("entrepreneurialClubsPhoneLabel")}
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${phoneHref}`}
                          className="inline-flex items-center gap-2 text-primary font-medium underline-offset-2 hover:underline"
                        >
                          <Phone className="h-4 w-4 shrink-0" aria-hidden />
                          {phoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </dl>
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
