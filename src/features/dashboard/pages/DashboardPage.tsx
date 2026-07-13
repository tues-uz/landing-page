import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ImageIcon, Newspaper, Calendar, FileText, Search } from "lucide-react";
import { adminApi } from "@/api/adminClient";
import { Input } from "@/components/ui/input";
import { heroKeys } from "@/api/queryKeys";
import { newsKeys } from "@/api/queryKeys";
import { eventsKeys } from "@/api/queryKeys";
import { useTranslation } from "react-i18next";
import { DashboardMetricCard } from "../components/DashboardMetricCard";

const B = "/admin";

export function DashboardPage() {
  const { t } = useTranslation("admin");
  const { data: heroSlides = [] } = useQuery({ queryKey: heroKeys.list(), queryFn: () => adminApi.heroSlides.list() });
  const { data: news = [] } = useQuery({ queryKey: newsKeys.list(), queryFn: () => adminApi.news.list() });
  const { data: events = [] } = useQuery({ queryKey: eventsKeys.list(), queryFn: () => adminApi.events.list() });

  const totalContent = heroSlides.length + news.length + events.length;

  const metrics = [
    { id: "heroSlides", value: heroSlides.length, icon: ImageIcon, to: `${B}/hero` },
    { id: "newsArticles", value: news.length, icon: Newspaper, to: `${B}/news` },
    { id: "upcomingEvents", value: events.length, icon: Calendar, to: `${B}/events` },
    { id: "totalContent", value: totalContent, icon: FileText, to: B },
  ] as const;

  const quickActions = [
    { to: `${B}/hero`, title: t("manageHero"), description: t("carouselDesc") },
    { to: `${B}/news`, title: t("manageNews"), description: t("articlesDesc") },
    { to: `${B}/events`, title: t("manageEvents"), description: t("eventsDesc") },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ id, value, icon, to }) => (
          <DashboardMetricCard
            key={id}
            to={to}
            label={t(id)}
            value={value}
            icon={icon}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-semibold text-foreground">{t("recentContent")}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{t("recentContentDesc")}</p>
          </div>
          <div className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder={t("searchContent")} className="pl-9 h-9" />
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t("noRecentActivity")}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-semibold text-foreground">{t("quickActions")}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{t("jumpToSections")}</p>
          </div>
          <div className="p-6">
            <div className="grid gap-2">
              {quickActions.map(({ to, title, description }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                  <span className="text-muted-foreground">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
