import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecommendedNewsSidebar } from "@/components/RecommendedNewsSidebar";
import { QIZLARJON_CLUB_DEFAULTS } from "@/locales/qizlarjonClubDefaults";

function trClub(t: TFunction, key: keyof typeof QIZLARJON_CLUB_DEFAULTS) {
  return t(key, { defaultValue: QIZLARJON_CLUB_DEFAULTS[key] });
}

const bodyClass = "text-body-article text-muted-foreground";
const listClass = `mt-2 list-disc space-y-1.5 pl-6 ${bodyClass}`;

const COMMUNITY_CLUBS_PATH = "/student-life/community-clubs";

function splitParagraphs(raw: string): string[] {
  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function splitLines(raw: string): string[] {
  return raw
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function QizlarjonClubPage() {
  const { t } = useTranslation("topNav");
  const { t: tCommon } = useTranslation("common");
  const { t: th } = useTranslation("header");

  const leafTitle = trClub(t, "qizlarjonClubPageTitle");
  const studentLifeLabel = th("secondNav.studentLife");
  const communityClubsLabel = th("secondNavStudentLife.communityClubs");

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
                <li className="flex min-w-0 items-center">
                  <Link
                    to={COMMUNITY_CLUBS_PATH}
                    className="font-medium leading-none transition-colors hover:text-foreground line-clamp-2 sm:line-clamp-none"
                  >
                    {communityClubsLabel}
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
              <QizlarjonClubArticle t={t} />
            </div>
            <RecommendedNewsSidebar className="order-2 lg:order-none lg:col-span-3" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function BodyParagraphs({ text }: { text: string }) {
  return (
    <div className={`space-y-4 text-justify ${bodyClass}`}>
      {splitParagraphs(text).map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

function QizlarjonClubArticle({ t }: { t: TFunction }) {
  const title = trClub(t, "qizlarjonClubPageTitle");
  const heroSrc = trClub(t, "qizlarjonClubHeroSrc");
  const intro = trClub(t, "qizlarjonClubIntro");

  return (
    <article className="max-w-none">
      <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
        <img
          src={heroSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          loading="eager"
        />
      </figure>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
        {title}
      </h1>

      <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
        {splitParagraphs(intro).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS1Title")}</h2>
        <div className="mt-3">
          <BodyParagraphs text={trClub(t, "qizlarjonClubS1Body")} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS2Title")}</h2>
        <div className="mt-3">
          <BodyParagraphs text={trClub(t, "qizlarjonClubS2Body")} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS3Title")}</h2>
        <div className="mt-3">
          <BodyParagraphs text={trClub(t, "qizlarjonClubS3Body")} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS4Title")}</h2>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          <p>{trClub(t, "qizlarjonClubS4BodyTop")}</p>
          <p className="font-medium text-foreground">{trClub(t, "qizlarjonClubS4ListLabel")}</p>
          <ul className={listClass}>
            {splitLines(trClub(t, "qizlarjonClubS4List")).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>{trClub(t, "qizlarjonClubS4BodyBottom")}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS5Title")}</h2>
        <div className="mt-3">
          <BodyParagraphs text={trClub(t, "qizlarjonClubS5Body")} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS6Title")}</h2>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          <p>{trClub(t, "qizlarjonClubS6BodyTop")}</p>
          <p className="font-medium text-foreground">{trClub(t, "qizlarjonClubS6ListLabel")}</p>
          <ul className={listClass}>
            {splitLines(trClub(t, "qizlarjonClubS6List")).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>{trClub(t, "qizlarjonClubS6BodyBottom")}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS7Title")}</h2>
        <div className={`mt-3 space-y-4 text-justify ${bodyClass}`}>
          <p>{trClub(t, "qizlarjonClubS7Body")}</p>
          <ul className={listClass}>
            {splitLines(trClub(t, "qizlarjonClubS7List")).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>{trClub(t, "qizlarjonClubS7Follow")}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{trClub(t, "qizlarjonClubS8Title")}</h2>
        <div className="mt-3">
          <BodyParagraphs text={trClub(t, "qizlarjonClubS8Body")} />
        </div>
      </section>

      <div className={`mt-10 text-justify ${bodyClass}`}>
        <p>{trClub(t, "qizlarjonClubOutro")}</p>
      </div>
    </article>
  );
}
