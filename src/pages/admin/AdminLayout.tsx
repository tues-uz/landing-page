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
  ChevronDown,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/hero", label: "Hero section", icon: Image },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/news", label: "News", icon: Newspaper },
];

export default function AdminLayout() {
  return (
    <div className="admin-cms min-h-screen flex flex-col bg-slate-50">
      {/* Top bar - fixed so it always stays visible when scrolling */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <Input
            placeholder="Search..."
            className="max-w-xs border-0 bg-slate-50 text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-200"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <span className="sr-only">Account</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                A
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 border-slate-200">
            <DropdownMenuItem asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                View docs
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
              TUES CMS
            </Link>
            <p className="mt-0.5 text-xs text-slate-500">Content management</p>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-3">
            {mainNav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            ))}
            <div className="my-2 border-t border-slate-100" />
            <NavLink
              to="/admin/programs"
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
              Programs
            </NavLink>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <Users className="h-4 w-4 shrink-0" />
              Admins
              <ChevronDown className="ml-auto h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <Star className="h-4 w-4 shrink-0" />
              Favorites
            </button>
          </nav>
          <div className="border-t border-slate-100 p-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <FileText className="h-4 w-4 shrink-0" />
              View docs
            </a>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <Settings className="h-4 w-4 shrink-0" />
              Settings
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Log out
            </button>
          </div>
        </aside>

        {/* Mobile nav */}
        <nav className="flex flex-wrap gap-1 border-b border-slate-200 bg-white p-2 md:hidden">
          {mainNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                )
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/admin/programs"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium",
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
              )
            }
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Programs
          </NavLink>
        </nav>

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
