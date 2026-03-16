import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/api/adminClient";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ hero: 0, news: 0, events: 0 });

  useEffect(() => {
    Promise.all([
      adminApi.heroSlides.list(),
      adminApi.news.list(),
      adminApi.events.list(),
    ])
      .then(([slides, articles, events]) => {
        setCounts({
          hero: slides.length,
          news: articles.length,
          events: events.length,
        });
      })
      .catch(() => {});
  }, []);

  const total = counts.hero + counts.news + counts.events;

  const statCards = [
    { to: "/admin/hero", label: "Hero slides", value: counts.hero },
    { to: "/admin/news", label: "News articles", value: counts.news },
    { to: "/admin/events", label: "Upcoming events", value: counts.events },
    { label: "Total content", value: total },
  ];

  const quickActions = [
    { to: "/admin/hero", title: "Manage hero slides", description: "Carousel and announcements" },
    { to: "/admin/news", title: "Manage news", description: "Articles and updates" },
    { to: "/admin/events", title: "Manage events", description: "Upcoming events" },
  ];

  return (
    <AdminPageShell title="Dashboard" description="Welcome back, Admin 👋">
      <Card className={ADMIN_CARD_CLASS}>
        <CardContent className="flex flex-row flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <h3 className="font-semibold text-slate-900">Need help?</h3>
            <p className="text-sm text-slate-500">View docs and guides for the CMS.</p>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer" className="gap-2">
              <FileText className="h-4 w-4" />
              View docs
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
          placeholder="Search content..."
          className="max-w-xs rounded-lg border-slate-200 text-sm"
        />
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/admin/news" className="gap-1">
            + New
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
          <CardTitle className="text-lg text-slate-900">Recent content</CardTitle>
          <CardDescription className="text-slate-500">
            Latest updates across hero, news, and events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">
            No recent activity. Add hero slides, news, or events to see them here.
          </p>
        </CardContent>
      </Card>

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Quick actions</CardTitle>
          <CardDescription className="text-slate-500">Jump to content sections.</CardDescription>
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
              Roles registered by super admin
            </CardTitle>
            <CardDescription className="text-slate-500">
              Roles created and assigned to platforms.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200" disabled>
            Add role
          </Button>
        </CardHeader>
      </Card>
    </AdminPageShell>
  );
}
