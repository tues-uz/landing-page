import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ImageIcon,
  Newspaper,
  Calendar,
  Bell,
  Search,
  ChevronDown,
  Settings,
  FolderOpen,
  CalendarDays,
  Shield,
  Users,
  LayoutGrid,
  List,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/context";

const CMS_BASE = "/admin";

const nav = [
  { to: CMS_BASE, label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: `${CMS_BASE}/hero`, label: "Hero section", icon: ImageIcon, end: false },
  { to: `${CMS_BASE}/events`, label: "Events", icon: Calendar, end: false },
];

const newsSubNav = [
  { to: `${CMS_BASE}/news`, label: "News board", icon: LayoutGrid, end: true },
  { to: `${CMS_BASE}/news/articles`, label: "Articles", icon: List, end: true },
];

const adminMenu = [{ to: `${CMS_BASE}/users`, label: "Admins", icon: Users }];

const favorites = [
  { to: `${CMS_BASE}/hero`, label: "Hero slides", icon: ImageIcon },
  { to: `${CMS_BASE}/news`, label: "News", icon: Newspaper },
  { to: `${CMS_BASE}/events`, label: "Events", icon: CalendarDays },
];

const footerLinks = [{ label: "Settings", icon: Settings }];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const isNewsActive = location.pathname.startsWith(`${CMS_BASE}/news`);
  const [newsOpen, setNewsOpen] = useState(isNewsActive);
  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isNewsActive) setNewsOpen(true);
  }, [isNewsActive]);

  return (
    <aside className="fixed left-0 top-0 z-30 w-64 h-[100dvh] flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="font-semibold text-lg text-foreground">TUES CMS</h1>
        <p className="text-xs text-muted-foreground">Content management</p>
      </div>
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 rounded-lg bg-muted/50 text-sm"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground">
          <Bell className="h-3.5 w-3.5" />
          Notifications
        </div>
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setNewsOpen(!newsOpen)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isNewsActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-3">
              <Newspaper className="h-4 w-4 shrink-0" />
              News
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
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setAdminOpen(!adminOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <span className="flex items-center gap-3">
              <Shield className="h-4 w-4 shrink-0" />
              Admin
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", adminOpen && "rotate-180")} />
          </button>
          {adminOpen && (
            <div className="mt-0.5 space-y-0.5 pl-1">
              {adminMenu.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === `${CMS_BASE}/users`}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setFavoritesOpen(!favoritesOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <span className="flex items-center gap-3">
              <FolderOpen className="h-4 w-4 shrink-0" />
              Favorites
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", favoritesOpen && "rotate-180")} />
          </button>
          {favoritesOpen && (
            <div className="mt-0.5 space-y-0.5 pl-1">
              {favorites.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-foreground">Need help?</p>
          <p className="text-xs text-muted-foreground mt-0.5">View docs and guides for the CMS.</p>
          <Button variant="outline" size="sm" className="mt-3 w-full rounded-lg" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              View docs
            </a>
          </Button>
        </div>
      </nav>
      <div className="p-3 border-t border-sidebar-border space-y-0.5">
        {footerLinks.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}
