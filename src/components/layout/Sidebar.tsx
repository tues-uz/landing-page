import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ImageIcon,
  Newspaper,
  Calendar,
  GraduationCap,
  Bell,
  Search,
  ChevronDown,
  Settings,
  Shield,
  Users,
  LayoutGrid,
  List,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/context";
import { adminApi, type MenuItem } from "@/api/auth";

const CMS_BASE = "/admin";

const nav = [
  { to: CMS_BASE, label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: `${CMS_BASE}/hero`, label: "Hero section", icon: ImageIcon, end: false },
  { to: `${CMS_BASE}/events`, label: "Events", icon: Calendar, end: false },
  { to: `${CMS_BASE}/programs`, label: "Programs", icon: GraduationCap, end: false },
];
const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "image": ImageIcon,
  "calendar": Calendar,
  "newspaper": Newspaper,
  "graduation-cap": GraduationCap,
  "users": Users,
};

const newsSubNav = [
  { to: `${CMS_BASE}/news`, label: "Overview", icon: LayoutGrid, end: true },
  { to: `${CMS_BASE}/news/articles`, label: "Articles", icon: List, end: true },
];

export function Sidebar() {
  const { t } = useTranslation("admin");
  const location = useLocation();
  const { logout } = useAuth();
  const isNewsActive = location.pathname.startsWith(`${CMS_BASE}/news`);
  const [newsOpen, setNewsOpen] = useState(isNewsActive);
  const [adminOpen, setAdminOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    adminApi.getMenu().then((res) => {
      setMenuItems(res.items ?? []);
    }).catch(() => {
      // silently fail — backend may be unavailable during dev
    });
  }, []);

  useEffect(() => {
    if (isNewsActive) setNewsOpen(true);
  }, [isNewsActive]);

  const regularItems = menuItems.filter(
    (item) => item.id !== "news" && item.id !== "admins"
  );
  const hasNews = menuItems.some((item) => item.id === "news");
  const adminItems = menuItems.filter((item) => item.id === "admins");

  return (
    <aside className="fixed left-0 top-0 z-30 w-64 h-[100dvh] flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="font-semibold text-lg text-foreground">{t("title")}</h1>
        <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-muted/50 text-sm"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground">
          <Bell className="h-3.5 w-3.5" />
          {t("notifications", "Notifications")}
        </div>

        {regularItems.map((item) => {
          const Icon = iconMap[item.icon] ?? LayoutDashboard;
          const isDashboard = item.id === "dashboard";
          return (
            <NavLink
              key={item.id}
              to={item.route}
              end={isDashboard}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {t(item.id, item.label)}
            </NavLink>
          );
        })}

        {hasNews && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setNewsOpen(!newsOpen)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isNewsActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-3">
                <Newspaper className="h-4 w-4 shrink-0" />
                {t("news")}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", newsOpen && "rotate-180")} />
            </button>
            {newsOpen && (
              <div className="mt-0.5 space-y-0.5 pl-1">
                {newsSubNav.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )
                    }
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {t(label.toLowerCase().replace(/\s+/g, ""), label)}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}

        {adminItems.length > 0 && (
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                <Shield className="h-4 w-4 shrink-0" />
                {t("admin")}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", adminOpen && "rotate-180")} />
            </button>
            {adminOpen && (
              <div className="mt-0.5 space-y-0.5 pl-1">
                {adminItems.map((item) => {
                  const Icon = iconMap[item.icon] ?? Users;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.route}
                      end
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )
                      }
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {t(item.id, item.label)}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-foreground">{t("needHelp")}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{t("viewDocsDesc")}</p>
          <Button variant="outline" size="sm" className="mt-3 w-full rounded-lg" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              {t("viewDocs")}
            </a>
          </Button>
        </div>
      </nav>
      <div className="p-3 border-t border-sidebar-border space-y-0.5">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          {t("settings")}
        </button>
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
