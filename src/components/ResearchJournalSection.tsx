import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookOpen, FlaskConical, FileSearch, ArrowRight, GraduationCap } from "lucide-react";

const ResearchJournalSection = () => {
  const { t } = useTranslation();

  const items = useMemo(
    () =>
      [
        {
          icon: FileSearch,
          title: t("research.card1t"),
          description: t("research.card1d"),
          href: "/research",
          label: t("research.card1l"),
        },
        {
          icon: BookOpen,
          title: t("research.card2t"),
          description: t("research.card2d"),
          href: "#",
          label: t("research.card2l"),
        },
        {
          icon: FlaskConical,
          title: t("research.card3t"),
          description: t("research.card3d"),
          href: "#",
          label: t("research.card3l"),
        },
        {
          icon: GraduationCap,
          title: t("research.card4t"),
          description: t("research.card4d"),
          href: "#",
          label: t("research.card4l"),
        },
      ] as const,
    [t]
  );

  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden" id="research-journal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            {t("research.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            {t("research.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {t("research.subtitle")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="group h-full flex flex-col rounded-2xl border border-border bg-background p-6 md:p-7 hover:border-foreground/15 hover:shadow-md transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0 mb-4 group-hover:bg-foreground/10 transition-colors">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.description}</p>
                {item.href && (
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                    <span>{item.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </div>
                )}
              </div>
            );
            return item.href && item.href !== "#" ? (
              <Link key={item.title} to={item.href} className="block h-full">
                {content}
              </Link>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>

        {/* Optional CTA strip */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl border border-border bg-background">
          <p className="text-foreground font-medium">
            {t("research.ctaPrompt")}
          </p>
          <Link
            to="#"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors shrink-0"
          >
            {t("research.ctaButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResearchJournalSection;
