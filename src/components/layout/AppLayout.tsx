import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MainHeader } from "./MainHeader";

const CMS_BASE = "/admin";

export function AppLayout() {
  const { pathname } = useLocation();
  const isNewsEditor =
    pathname === `${CMS_BASE}/news/new` || pathname.startsWith(`${CMS_BASE}/news/edit/`);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <div className="flex-1 overflow-auto p-0">
          {!isNewsEditor && <MainHeader />}
          <div className={!isNewsEditor ? "pt-[77px]" : ""}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
