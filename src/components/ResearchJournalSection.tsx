import { Link } from "react-router-dom";
import { BookOpen, FlaskConical, FileSearch, ArrowRight, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

const researchItems = [
  { id: "research", icon: FileSearch, href: "/research" },
  { id: "journals", icon: BookOpen, href: "#" },
  { id: "labs", icon: FlaskConical, href: "#" },
  { id: "doctoral", icon: GraduationCap, href: "#" },
];

const ResearchJournalSection = () => {
  const { t } = useTranslation("home");
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
            {t("research.description")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {researchItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="group h-full flex flex-col rounded-2xl border border-border bg-background p-6 md:p-7 hover:border-foreground/15 hover:shadow-md transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0 mb-4 group-hover:bg-foreground/10 transition-colors">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`research.items.${item.id}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {t(`research.items.${item.id}.description`)}
                </p>
                {item.href && (
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                    <span>{t(`research.items.${item.id}.label`)}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </div>
                )}
              </div>
            );
            return item.href && item.href !== "#" ? (
              <Link key={item.id} to={item.href} className="block h-full">
                {content}
              </Link>
            ) : (
              <div key={item.id}>{content}</div>
            );
          })}
        </div>

        {/* Optional CTA strip */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl border border-border bg-background">
          <p className="text-foreground font-medium">
            {t("research.ctaText")}
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
