import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ImageIcon, Newspaper, Calendar, FileText, Search } from "lucide-react";
import { adminApi } from "@/api/adminClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { heroKeys } from "@/api/queryKeys";
import { newsKeys } from "@/api/queryKeys";
import { eventsKeys } from "@/api/queryKeys";

const B = "/admin";

export function DashboardPage() {
  const { data: heroSlides = [] } = useQuery({ queryKey: heroKeys.list(), queryFn: () => adminApi.heroSlides.list() });
  const { data: news = [] } = useQuery({ queryKey: newsKeys.list(), queryFn: () => adminApi.news.list() });
  const { data: events = [] } = useQuery({ queryKey: eventsKeys.list(), queryFn: () => adminApi.events.list() });

  const totalContent = heroSlides.length + news.length + events.length;

  const metrics = [
    { label: "Hero slides", value: heroSlides.length, icon: ImageIcon, to: `${B}/hero` },
    { label: "News articles", value: news.length, icon: Newspaper, to: `${B}/news` },
    { label: "Upcoming events", value: events.length, icon: Calendar, to: `${B}/events` },
    { label: "Total content", value: totalContent, icon: FileText, to: B },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-semibold text-foreground">Recent content</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Latest updates across hero, news, and events.</p>
          </div>
          <div className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search content..." className="pl-9 h-9" />
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>No recent activity. Add hero slides, news, or events to see them here.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-semibold text-foreground">Quick actions</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Jump to content sections.</p>
          </div>
          <div className="p-6">
            <div className="grid gap-2">
              {[
                { to: `${B}/hero`, label: "Manage hero slides", desc: "Carousel and announcements" },
                { to: `${B}/news`, label: "Manage news", desc: "Articles and updates" },
                { to: `${B}/events`, label: "Manage events", desc: "Upcoming events" },
              ].map(({ to, label, desc }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
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
