import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { FloatingLanguageSwitcher } from "./components/FloatingLanguageSwitcher";
import { FloatingAccessibilityButton } from "./components/FloatingAccessibilityButton";
import Index from "./pages/Index";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import NewsEventsPage from "./pages/NewsEventsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import VirtualTourPage from "./pages/VirtualTourPage";
import SiteSearchPage from "./pages/SiteSearchPage";
import AboutPage from "./pages/AboutPage";
import ResearchHubPage from "./pages/ResearchHubPage";
import AdmissionsHubPage from "./pages/AdmissionsHubPage";
import MediaPage from "./pages/MediaPage";
import { TopNavSubPage } from "./pages/TopNavSubPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/features/auth/context";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import AdminHero from "./pages/admin/AdminHero";
import AdminNews from "./pages/admin/AdminNews";
import AdminNewsBoard from "./pages/admin/AdminNewsBoard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminProgramEdit from "./pages/admin/AdminProgramEdit";
import AdminsPage from "@/features/admin/pages/AdminsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <FloatingAccessibilityButton />
          <FloatingLanguageSwitcher />
          <Routes>
            {/* Public landing routes */}
            <Route path="/" element={<Index />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:slug" element={<ProgramDetailPage />} />
            <Route path="/news" element={<NewsEventsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/virtual-tour" element={<VirtualTourPage />} />
            <Route path="/search" element={<SiteSearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:slug" element={<TopNavSubPage group="about" />} />
            <Route path="/research" element={<ResearchHubPage />} />
            <Route path="/research/academic-council/:councilSlug" element={<TopNavSubPage group="research" />} />
            <Route path="/research/:slug" element={<TopNavSubPage group="research" />} />
            <Route path="/admissions" element={<AdmissionsHubPage />} />
            <Route path="/admissions/:slug" element={<TopNavSubPage group="admissions" />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/media/:slug" element={<TopNavSubPage group="media" />} />

            {/* CMS login (public) */}
            <Route path="/login" element={<LoginPage />} />

            {/* CMS: protected, same layout as reference (AppLayout + Sidebar + MainHeader) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/admin" element={<DashboardPage />} />
                <Route path="/admin/hero" element={<AdminHero />} />
                <Route path="/admin/news" element={<AdminNewsBoard />} />
                <Route path="/admin/news/articles" element={<AdminNews />} />
                <Route path="/admin/events" element={<AdminEvents />} />
                <Route path="/admin/programs" element={<AdminPrograms />} />
                <Route path="/admin/programs/new" element={<AdminProgramEdit />} />
                <Route path="/admin/programs/:slug/edit" element={<AdminProgramEdit />} />
                <Route path="/admin/users" element={<AdminsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
