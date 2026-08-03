import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ImageIcon,
  Newspaper,
  Calendar,
  MessageCircle,
  Download,
  Shield,
  GraduationCap,
  ChevronDown,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminNavI18nKey } from "@/lib/adminNavI18n";

const languages = [
  { code: "uz", name: "Uz", flag: "🇺🇿" },
  { code: "en", name: "En", flag: "🇬🇧" },
  { code: "ru", name: "Ru", flag: "🇷🇺" },
];

const B = "/admin";

const routeTitles: Record<string, { title: string; icon: typeof LayoutDashboard }> = {
  [B]: { title: "Dashboard", icon: LayoutDashboard },
  [`${B}/hero`]: { title: "Hero section", icon: ImageIcon },
  [`${B}/news`]: { title: "News board", icon: Newspaper },
  [`${B}/events`]: { title: "Events", icon: Calendar },
  [`${B}/study-programs`]: { title: "Study Programs", icon: GraduationCap },
  [`${B}/programs`]: { title: "Study Programs", icon: GraduationCap },
  [`${B}/users`]: { title: "Admins", icon: Shield },
  [`${B}/newsletter`]: { title: "Newsletter subscribers", icon: Mail },
};

export function MainHeader() {
  const path = useLocation().pathname;
  const derived =
    path === `${B}/news/new`
      ? { title: "New article", icon: Newspaper }
      : path.startsWith(`${B}/news/edit/`)
        ? { title: "Edit article", icon: Newspaper }
        : path === `${B}/news/articles`
          ? { title: "Articles", icon: Newspaper }
          : path === `${B}/study-programs/new/edit`
            ? { title: "Add study program", icon: GraduationCap }
            : /^\/admin\/study-programs\/[^/]+\/edit$/.test(path)
            ? { title: "Edit study program", icon: GraduationCap }
            : /^\/admin\/programs\/[^/]+\/edit$/.test(path)
              ? { title: "Edit study program", icon: GraduationCap }
              : null;
  const info = derived ?? routeTitles[path] ?? { title: "Dashboard", icon: LayoutDashboard };
  const Icon = info.icon;
  const { t, i18n } = useTranslation("admin");
  const activeCode = (i18n.resolvedLanguage ?? i18n.language ?? "en").slice(0, 2);
  const currentLanguage = languages.find((l) => l.code === activeCode) ?? languages[1];

  return (
    <header className="fixed top-0 left-64 right-0 z-40 flex h-[77px] shrink-0 items-center justify-between border-b border-sidebar-border bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">{t(adminNavI18nKey(info.title), info.title)}</h1>
      </div>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 border-border bg-transparent text-slate-700 hover:bg-slate-100 px-2 flex items-center gap-1.5"
            >
              <span className="text-base leading-none block pt-0.5">{currentLanguage.flag}</span>
              <span className="hidden sm:inline-block text-sm font-medium">{currentLanguage.name}</span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-border" align="end">
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
        <p className="text-sm text-muted-foreground hidden sm:inline">{t("welcomeBack")}</p>
        <Button variant="ghost" size="icon" className="rounded-lg">
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="rounded-lg gap-1.5">
          <Download className="h-4 w-4" />
          {t("export", "Export")}
        </Button>
      </div>
    </header>
  );
}
