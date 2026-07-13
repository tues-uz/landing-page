import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Newspaper,
  Calendar,
  GraduationCap,
  Search,
  FileText,
  Settings,
  LogOut,
  Star,
  Users,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuth } from "@/features/auth/context";

const navConfig = [
  {
    id: "hero",
    to: "/admin/hero",
    label: "Hero section",
    icon: Image,
    permission: "canAccessHero",
  },
  {
    id: "events",
    to: "/admin/events",
    label: "Events",
    icon: Calendar,
    permission: "canAccessEvents",
  },
  {
    id: "news",
    to: "/admin/news",
    label: "News",
    icon: Newspaper,
    permission: "canAccessNews",
  },
] as const;

const languages = [
  { code: "uz", name: "Uz", flag: "🇺🇿" },
  { code: "en", name: "En", flag: "🇬🇧" },
  { code: "ru", name: "Ru", flag: "🇷🇺" },
];

export default function AdminLayout() {
  const { canAccessHero, canAccessNews, canAccessEvents } = usePermissions();
  const { user } = useAuth();
  const { t, i18n } = useTranslation("admin");

  const activeCode = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);
  const currentLanguage = languages.find((lang) => lang.code === activeCode) ?? languages[1];

  const isSuperAdmin = user?.role === "superadmin";

  console.debug("[AdminLayout] canAccessHero:", canAccessHero, "| canAccessNews:", canAccessNews, "| canAccessEvents:", canAccessEvents);
  console.debug("[AdminLayout] user.role:", user?.role, "| isSuperAdmin:", isSuperAdmin);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("loadingPage")}</p>
      </div>
    );
  }

  return (
    <div className="admin-cms min-h-screen flex flex-col bg-slate-50">
      {/* Top bar - fixed so it always stays visible when scrolling */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <Input
            type="search"
            placeholder={t("search")}
            className="max-w-xs border-0 bg-slate-50 text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 border-slate-200 bg-transparent text-slate-700 hover:bg-slate-100 px-2 flex items-center gap-1.5"
              >
                <span className="text-base leading-none block pt-0.5">{currentLanguage.flag}</span>
                <span className="hidden sm:inline-block text-sm font-medium">{currentLanguage.name}</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-slate-200" align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => i18n.changeLanguage(lang.code)}
                >
                  <span className="mr-2 text-base">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <span className="sr-only">{t("account")}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                {user?.name?.charAt(0).toUpperCase() ?? "A"}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 border-slate-200">
            <DropdownMenuItem asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                {t("viewDocs")}
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              {t("settings")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </header>

      {/* pt-14 so content starts below the fixed header */}
      <div className="flex flex-1 pt-14 md:pl-60">
        {/* Sidebar - fixed on desktop */}
        <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-60 flex-col border-r border-slate-200 bg-white md:flex">
          <div className="border-b border-slate-100 p-4">
            <Link
              to="/admin"
              className="text-lg font-semibold text-slate-900 hover:text-blue-600"
            >
              {t("title")}
            </Link>
            <p className="mt-0.5 text-xs text-slate-500">{t("subtitle")}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-3">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )
              }
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              {t("dashboard")}
            </NavLink>
            {canAccessHero && (
              <NavLink
                to="/admin/hero"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                <Image className="h-4 w-4 shrink-0" />
                {t("hero")}
              </NavLink>
            )}
            {canAccessEvents && (
              <NavLink
                to="/admin/events"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                <Calendar className="h-4 w-4 shrink-0" />
                {t("events")}
              </NavLink>
            )}
            {canAccessNews && (
              <NavLink
                to="/admin/news"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                <Newspaper className="h-4 w-4 shrink-0" />
                {t("news")}
              </NavLink>
            )}
            <div className="my-2 border-t border-slate-100" />
            {isSuperAdmin && (
              <>
                <NavLink
                  to="/admin/study-programs"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )
                  }
                >
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  {t("studyPrograms", "Study Programs")}
                </NavLink>
                <NavLink
                  to="/admin/admins"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )
                  }
                >
                  <Users className="h-4 w-4 shrink-0" />
                  {t("admins")}
                </NavLink>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Star className="h-4 w-4 shrink-0" />
                  {t("favorites")}
                </button>
              </>
            )}
          </nav>
          <div className="border-t border-slate-100 p-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <FileText className="h-4 w-4 shrink-0" />
              {t("viewDocs")}
            </a>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <Settings className="h-4 w-4 shrink-0" />
              {t("settings")}
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {t("logout")}
            </button>
          </div>
        </aside>

        {/* Mobile nav */}
        <nav className="flex flex-wrap gap-1 border-b border-slate-200 bg-white p-2 md:hidden">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium",
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
              )
            }
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            {t("dashboard")}
          </NavLink>
          {canAccessHero && (
            <NavLink
              to="/admin/hero"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium",
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                )
              }
            >
              <Image className="h-3.5 w-3.5" />
              {t("hero")}
            </NavLink>
          )}
          {canAccessEvents && (
            <NavLink
              to="/admin/events"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium",
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                )
              }
            >
              <Calendar className="h-3.5 w-3.5" />
              {t("events")}
            </NavLink>
          )}
          {canAccessNews && (
            <NavLink
              to="/admin/news"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium",
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                )
              }
            >
              <Newspaper className="h-3.5 w-3.5" />
              {t("news")}
            </NavLink>
          )}
          {isSuperAdmin && (
            <NavLink
              to="/admin/study-programs"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium",
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                )
              }
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {t("studyPrograms", "Study Programs")}
            </NavLink>
          )}
        </nav>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
