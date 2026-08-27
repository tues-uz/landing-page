import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/api/adminClient";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { useTranslation } from "react-i18next";

import { usePermissions } from "@/hooks/usePermissions";

export default function AdminDashboard() {
  const { t, i18n } = useTranslation("admin");
  const { canAccessApplications } = usePermissions();
  const [counts, setCounts] = useState({ hero: 0, news: 0, events: 0, applications: 0 });

  useEffect(() => {
    const promises: Promise<unknown>[] = [
      adminApi.heroSlides.list(i18n.language).then((slides) => ({ hero: slides.length })),
      adminApi.news.list(i18n.language).then((articles) => ({ news: articles.length })),
      adminApi.events.list(i18n.language).then((events) => ({ events: events.length })),
    ];

    if (canAccessApplications) {
      promises.push(
        adminApi.applications.list().then((apps) => ({ applications: apps.length })).catch(() => ({ applications: 0 }))
      );
    }

    Promise.allSettled(promises).then((results) => {
      const nextCounts = { hero: 0, news: 0, events: 0, applications: 0 };
      results.forEach((res) => {
        if (res.status === "fulfilled" && res.value && typeof res.value === "object") {
          Object.assign(nextCounts, res.value);
        }
      });
      setCounts(nextCounts);
    });
  }, [i18n.language, canAccessApplications]);

  const total = counts.hero + counts.news + counts.events;

  const statCards = [
    { to: "/admin/hero", label: t("heroSlides"), value: counts.hero },
    { to: "/admin/news", label: t("newsArticles"), value: counts.news },
    { to: "/admin/events", label: t("upcomingEvents"), value: counts.events },
    ...(canAccessApplications
      ? [{ to: "/admin/applications", label: t("applications", "Applications"), value: counts.applications }]
      : [{ label: t("totalContent"), value: total }]),
  ];

  const quickActions = [
    { to: "/admin/hero", title: t("manageHero"), description: t("carouselDesc") },
    { to: "/admin/news", title: t("manageNews"), description: t("articlesDesc") },
    { to: "/admin/events", title: t("manageEvents"), description: t("eventsDesc") },
    ...(canAccessApplications
      ? [{ to: "/admin/applications", title: t("applications", "Applications"), description: t("applicationsDesc", "Study program applications") }]
      : []),
  ];

  return (
    <AdminPageShell title={t("dashboard")} description={t("welcome")}>
      <Card className={ADMIN_CARD_CLASS}>
        <CardContent className="flex flex-row flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <h3 className="font-semibold text-slate-900">{t("needHelp")}</h3>
            <p className="text-sm text-slate-500">{t("viewDocsDesc")}</p>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer" className="gap-2">
              <FileText className="h-4 w-4" />
              {t("viewDocs")}
            </a>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) =>
          item.to ? (
            <Link key={item.label} to={item.to}>
              <Card className={`h-full transition-colors hover:shadow ${ADMIN_CARD_CLASS}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold tabular-nums text-slate-900">{item.value}</span>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card key={item.label} className={ADMIN_CARD_CLASS}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold tabular-nums text-slate-900">{item.value}</span>
              </CardContent>
            </Card>
          )
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          placeholder={t("searchContent", "Search content...")}
          className="max-w-xs border-slate-200 text-sm"
        />
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/admin/news" className="gap-1">
            + {t("new", "New")}
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map(({ to, title, description }) => (
          <Link key={to} to={to}>
            <Card className={`group h-full transition-shadow hover:shadow ${ADMIN_CARD_CLASS}`}>
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900 group-hover:text-blue-600">
                    {title}
                  </CardTitle>
                  <CardDescription className="mt-0.5 text-slate-500">
                    {description}
                  </CardDescription>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">{t("recentContent", "Recent content")}</CardTitle>
          <CardDescription className="text-slate-500">
            {t("recentContentDesc", "Latest updates across hero, news, and events.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">
            {t("noRecentActivity", "No recent activity. Add hero slides, news, or events to see them here.")}
          </p>
        </CardContent>
      </Card>

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">{t("quickActions", "Quick actions")}</CardTitle>
          <CardDescription className="text-slate-500">{t("jumpToSections", "Jump to content sections.")}</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100">
          {quickActions.map(({ to, title, description }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col gap-0.5 rounded-lg p-3 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{title}</p>
                <p className="text-sm text-slate-500">{description}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-900">
              {t("rolesTitle", "Roles registered by super admin")}
            </CardTitle>
            <CardDescription className="text-slate-500">
              {t("rolesDesc", "Roles created and assigned to platforms.")}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200" disabled>
            {t("addRole", "Add role")}
          </Button>
        </CardHeader>
      </Card>
    </AdminPageShell>
  );
}
