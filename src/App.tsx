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
import AccreditationRegistryDetailPage from "./pages/AccreditationRegistryDetailPage";
import WomensAffairsCommitteePage from "./pages/WomensAffairsCommitteePage";
import StudentCouncilPage from "./pages/StudentCouncilPage";
import NewScientificCouncilPage from "./pages/NewScientificCouncilPage";
import ScientificArticlesPage from "./pages/ScientificArticlesPage";
import EntrepreneurialClubsPage from "./pages/EntrepreneurialClubsPage";
import ScienceCertificatesPage from "./pages/ScienceCertificatesPage";
import ScienceCertificateDetailPage from "./pages/ScienceCertificateDetailPage";
import ResearchSustainableCenterPage from "./pages/ResearchSustainableCenterPage";
import ResearchSustainableCenterDetailPage from "./pages/ResearchSustainableCenterDetailPage";
import BachelorHubPage from "./pages/BachelorHubPage";
import BachelorTrackPage from "./pages/BachelorTrackPage";
import BachelorFullTimeProgramDetailPage from "./pages/BachelorFullTimeProgramDetailPage";
import QualificationRequirementsPage from "./pages/QualificationRequirementsPage";
import RegulationSecondaryEducationPage from "./pages/RegulationSecondaryEducationPage";
import InformationTransferEducationPage from "./pages/InformationTransferEducationPage";
import ContractAmountsTuitionPage from "./pages/ContractAmountsTuitionPage";
import Admission2025MenuPage from "./pages/Admission2025MenuPage";
import PresidentOrderAdmissionParametersPage from "./pages/PresidentOrderAdmissionParametersPage";
import ContactingAdmissionPage from "./pages/ContactingAdmissionPage";
import UniversityMissionPage from "./pages/UniversityMissionPage";
import UniversityRequisitesPage from "./pages/UniversityRequisitesPage";
import FamousGraduatesPage from "./pages/FamousGraduatesPage";
import FamousGraduateDetailPage from "./pages/FamousGraduateDetailPage";
import UniversityFacultiesPage from "./pages/UniversityFacultiesPage";
import FacultyOfMedicineDetailPage from "./pages/FacultyOfMedicineDetailPage";
import FacultyOfPedagogyDetailPage from "./pages/FacultyOfPedagogyDetailPage";
import FacultyOfEconomicsDetailPage from "./pages/FacultyOfEconomicsDetailPage";
import UniversityDepartmentsPage from "./pages/UniversityDepartmentsPage";
import FirstViceRectorAcademicAffairsPage from "./pages/FirstViceRectorAcademicAffairsPage";
import DeanEconomicsITPage from "./pages/DeanEconomicsITPage";
import DeanPedagogySocialHumanitiesPage from "./pages/DeanPedagogySocialHumanitiesPage";
import DeanMedicinePage from "./pages/DeanMedicinePage";
import UniversityDepartmentsLeaderProfilePage from "./pages/UniversityDepartmentsLeaderProfilePage";
import InformationTransferCabinetResolution578Page from "./pages/InformationTransferCabinetResolution578Page";
import MastersDegreePage from "./pages/MastersDegreePage";
import MastersDegreeProgramDetailPage from "./pages/MastersDegreeProgramDetailPage";
import CareerCentrePage from "./pages/CareerCentrePage";
import Help247Page from "./pages/Help247Page";
import HealthSupportPage from "./pages/HealthSupportPage";
import SocialLifePage from "./pages/SocialLifePage";
import SocialRoomsPage from "./pages/SocialRoomsPage";
import MinoritySupportCenterPage from "./pages/MinoritySupportCenterPage";
import DormitoryPage from "./pages/DormitoryPage";
import SportFacilitiesPage from "./pages/SportFacilitiesPage";
import CafeteriasPage from "./pages/CafeteriasPage";
import BookstorePage from "./pages/BookstorePage";
import StudentOpinionPage from "./pages/StudentOpinionPage";
import FacilitiesForDisabledPage from "./pages/FacilitiesForDisabledPage";
import StudentAcademicSupportPage from "./pages/StudentAcademicSupportPage";
import StudentAcademicSupportServicesPage from "./pages/StudentAcademicSupportServicesPage";
import StudentHandbookPage from "./pages/StudentHandbookPage";
import StudentUnionRegulationPage from "./pages/StudentUnionRegulationPage";
import CommunityClubsPage from "./pages/CommunityClubsPage";
import QizlarjonCharityEventPage from "./pages/QizlarjonCharityEventPage";
import StudentTheaterStudioContestPage from "./pages/StudentTheaterStudioContestPage";
import MushoiraClubHonoredPage from "./pages/MushoiraClubHonoredPage";
import CommunityClubsOverviewPage from "./pages/CommunityClubsOverviewPage";
import InterfacultyStudentTheatreStudioContestPage from "./pages/InterfacultyStudentTheatreStudioContestPage";
import QalqonShieldsPage from "./pages/QalqonShieldsPage";
import QizlarjonClubPage from "./pages/QizlarjonClubPage";
import LeaderGirlsClubPage from "./pages/LeaderGirlsClubPage";
import FineAppliedArtsClubPage from "./pages/FineAppliedArtsClubPage";
import YouthLeadersPage from "./pages/YouthLeadersPage";
import ResearchHubPage from "./pages/ResearchHubPage";
import AdmissionsHubPage from "./pages/AdmissionsHubPage";
import MediaPage from "./pages/MediaPage";
import AboutUniversityPage from "./pages/AboutUniversityPage";
import DepartmentInternationalRelationsEmployeesPage from "./pages/DepartmentInternationalRelationsEmployeesPage";
import InternationalGrantsPage from "./pages/InternationalGrantsPage";
import InternationalSupportCenterAboutPage from "./pages/InternationalSupportCenterAboutPage";
import InternationalSupportCenterPage from "./pages/InternationalSupportCenterPage";
import AdvancedTrainingForeignTeachersPage from "./pages/AdvancedTrainingForeignTeachersPage";
import AdvancedTrainingForeignTeachersFzuPage from "./pages/AdvancedTrainingForeignTeachersFzuPage";
import AdvancedTrainingForeignTeachersSouthKoreaPage from "./pages/AdvancedTrainingForeignTeachersSouthKoreaPage";
import AdvancedTrainingForeignTeachersGuangzhouPage from "./pages/AdvancedTrainingForeignTeachersGuangzhouPage";
import InternationalGrantJapanMatsumaePage from "./pages/InternationalGrantJapanMatsumaePage";
import InternationalGrantUsaHumphreyPage from "./pages/InternationalGrantUsaHumphreyPage";
import InternationalGrantMext2026Page from "./pages/InternationalGrantMext2026Page";
import InternationalConferencesPage from "./pages/InternationalConferencesPage";
import ProfessionalDevelopmentChoirPage from "./pages/ProfessionalDevelopmentChoirPage";
import ProfessionalDevelopmentChoirExchangeMedipolPage from "./pages/ProfessionalDevelopmentChoirExchangeMedipolPage";
import ProfessionalDevelopmentChoirMedipolClinicPage from "./pages/ProfessionalDevelopmentChoirMedipolClinicPage";
import ProfessionalDevelopmentChoirMedipolLaboratoryPage from "./pages/ProfessionalDevelopmentChoirMedipolLaboratoryPage";
import ProfessionalDevelopmentChoirPhysiotherapyPage from "./pages/ProfessionalDevelopmentChoirPhysiotherapyPage";
import ProfessionalDevelopmentChoirTurkeyHistoricSitesPage from "./pages/ProfessionalDevelopmentChoirTurkeyHistoricSitesPage";
import ProfessionalDevelopmentChoirIndonesiaInternshipDeparturePage from "./pages/ProfessionalDevelopmentChoirIndonesiaInternshipDeparturePage";
import ProfessionalDevelopmentChoirIndonesiaSummerProgramPage from "./pages/ProfessionalDevelopmentChoirIndonesiaSummerProgramPage";
import ProfessionalDevelopmentChoirIndonesiaMedicalInternshipPage from "./pages/ProfessionalDevelopmentChoirIndonesiaMedicalInternshipPage";
import InternationalScientificConferenceTuesPage from "./pages/InternationalScientificConferenceTuesPage";
import InternationalConferenceTourismSectorPage from "./pages/InternationalConferenceTourismSectorPage";
import InternationalConferencePreventiveMedicinePage from "./pages/InternationalConferencePreventiveMedicinePage";
import InternationalConferenceLinguisticsLanguageEducationPage from "./pages/InternationalConferenceLinguisticsLanguageEducationPage";
import InternationalConferenceGlobalInnovationsLanguageEducationPage from "./pages/InternationalConferenceGlobalInnovationsLanguageEducationPage";
import InternationalConferenceLinguisticsLiteraryStudiesPage from "./pages/InternationalConferenceLinguisticsLiteraryStudiesPage";
import InternationalCongressSustainabilityGreenTransformationPage from "./pages/InternationalCongressSustainabilityGreenTransformationPage";
import InternationalMedicalOlympiadTermez2026Page from "./pages/InternationalMedicalOlympiadTermez2026Page";
import InternationalCooperationRolePage from "./pages/InternationalCooperationRolePage";
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
            <Route path="/science/scientific-articles" element={<ScientificArticlesPage />} />
            <Route path="/science/certificates" element={<ScienceCertificatesPage />} />
            <Route path="/science/certificates/:certificateId" element={<ScienceCertificateDetailPage />} />
            <Route path="/science/entrepreneurial-clubs" element={<EntrepreneurialClubsPage />} />
            <Route
              path="/science/center-research-sustainable-innovation"
              element={<ResearchSustainableCenterPage />}
            />
            <Route
              path="/science/center-research-sustainable-innovation/:centerId"
              element={<ResearchSustainableCenterDetailPage />}
            />
            <Route path="/search" element={<SiteSearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/university-mission" element={<UniversityMissionPage />} />
            <Route path="/university-requisites" element={<UniversityRequisitesPage />} />
            <Route path="/university-famous-graduates" element={<FamousGraduatesPage />} />
            <Route path="/university-famous-graduates/:graduateId" element={<FamousGraduateDetailPage />} />
            <Route path="/university-faculties" element={<UniversityFacultiesPage />} />
            <Route path="/university-departments" element={<UniversityDepartmentsPage />} />
            <Route
              path="/university-departments/first-vice-rector-academic-affairs"
              element={<FirstViceRectorAcademicAffairsPage />}
            />
            <Route
              path="/university-departments/dean-economics-information-technology"
              element={<DeanEconomicsITPage />}
            />
            <Route
              path="/university-departments/dean-pedagogy-social-humanities"
              element={<DeanPedagogySocialHumanitiesPage />}
            />
            <Route
              path="/university-departments/dean-medicine"
              element={<DeanMedicinePage />}
            />
            <Route
              path="/university-departments/profile/:leaderId"
              element={<UniversityDepartmentsLeaderProfilePage />}
            />
            <Route path="/university-faculties/medicine" element={<FacultyOfMedicineDetailPage />} />
            <Route
              path="/university-faculties/pedagogy-social-humanities"
              element={<FacultyOfPedagogyDetailPage />}
            />
            <Route
              path="/university-faculties/economics-information-technologies"
              element={<FacultyOfEconomicsDetailPage />}
            />
            <Route path="/about/inteas" element={<AccreditationRegistryDetailPage registry="inteas" />} />
            <Route path="/about/wdoms" element={<AccreditationRegistryDetailPage registry="wdoms" />} />
            <Route path="/about/womens-affairs-advisory-committee" element={<WomensAffairsCommitteePage />} />
            <Route path="/about/student-council" element={<StudentCouncilPage />} />
            <Route path="/about/new-scientific-council" element={<NewScientificCouncilPage />} />
            <Route path="/education/bachelor" element={<BachelorHubPage />} />
            <Route
              path="/education/masters/programs/:programNo"
              element={<MastersDegreeProgramDetailPage />}
            />
            <Route path="/education/masters" element={<MastersDegreePage />} />
            <Route
              path="/education/qualification-requirements"
              element={<QualificationRequirementsPage />}
            />
            <Route
              path="/admission-2025/regulation-secondary-education"
              element={<RegulationSecondaryEducationPage />}
            />
            <Route
              path="/admission-2025/information-transfer-of-education/cabinet-resolution-578"
              element={<InformationTransferCabinetResolution578Page />}
            />
            <Route
              path="/admission-2025/information-transfer-of-education"
              element={<InformationTransferEducationPage />}
            />
            <Route path="/admission-2025/contacting-admission" element={<ContactingAdmissionPage />} />
            <Route path="/admission-2025/contract-amounts" element={<ContractAmountsTuitionPage />} />
            <Route path="/admission-2025/menu" element={<Admission2025MenuPage />} />
            <Route
              path="/admission-2025/menu/state-order-parameters-2024-2025"
              element={<PresidentOrderAdmissionParametersPage />}
            />
            <Route
              path="/education/bachelor/:track/programs/:programNo"
              element={<BachelorFullTimeProgramDetailPage />}
            />
            <Route path="/education/bachelor/:track" element={<BachelorTrackPage />} />
            <Route path="/student-life/career-centre" element={<CareerCentrePage />} />
            <Route path="/student-life/24-7-help" element={<Help247Page />} />
            <Route path="/student-life/health-support" element={<HealthSupportPage />} />
            <Route path="/student-life/social-life" element={<SocialLifePage />} />
            <Route path="/student-life/social-rooms" element={<SocialRoomsPage />} />
            <Route
              path="/student-life/support-center-minority-groups"
              element={<MinoritySupportCenterPage />}
            />
            <Route path="/student-life/dormitory" element={<DormitoryPage />} />
            <Route path="/student-life/sport-facilities" element={<SportFacilitiesPage />} />
            <Route path="/student-life/cafeterias" element={<CafeteriasPage />} />
            <Route path="/student-life/bookstore" element={<BookstorePage />} />
            <Route path="/student-life/student-opinion" element={<StudentOpinionPage />} />
            <Route path="/student-life/facilities-for-disabled" element={<FacilitiesForDisabledPage />} />
            <Route
              path="/student-life/student-academic-support/support-services"
              element={<StudentAcademicSupportServicesPage />}
            />
            <Route path="/student-life/student-academic-support/student-handbook" element={<StudentHandbookPage />} />
            <Route
              path="/student-life/student-academic-support/student-union-regulation"
              element={<StudentUnionRegulationPage />}
            />
            <Route path="/student-life/student-academic-support" element={<StudentAcademicSupportPage />} />
            <Route path="/student-life/community-clubs/qizlarjon-charity" element={<QizlarjonCharityEventPage />} />
            <Route
              path="/student-life/community-clubs/student-theater-studio-contest"
              element={<StudentTheaterStudioContestPage />}
            />
            <Route path="/student-life/community-clubs/mushoira-club-honored" element={<MushoiraClubHonoredPage />} />
            <Route path="/student-life/community-clubs/clubs-and-circles" element={<CommunityClubsOverviewPage />} />
            <Route
              path="/student-life/community-clubs/interfaculty-student-theatre-studio-contest"
              element={<InterfacultyStudentTheatreStudioContestPage />}
            />
            <Route path="/student-life/community-clubs/qalqon-shields" element={<QalqonShieldsPage />} />
            <Route path="/student-life/community-clubs/qizlarjon-club" element={<QizlarjonClubPage />} />
            <Route path="/student-life/community-clubs/leader-girls-club" element={<LeaderGirlsClubPage />} />
            <Route path="/student-life/community-clubs/fine-and-applied-arts-club" element={<FineAppliedArtsClubPage />} />
            <Route path="/student-life/community-clubs/youth-leaders" element={<YouthLeadersPage />} />
            <Route path="/student-life/community-clubs" element={<CommunityClubsPage />} />
            <Route path="/about/:slug" element={<TopNavSubPage group="about" />} />
            <Route path="/research" element={<ResearchHubPage />} />
            <Route path="/research/academic-council/:councilSlug" element={<TopNavSubPage group="research" />} />
            <Route path="/research/:slug" element={<TopNavSubPage group="research" />} />
            <Route path="/admissions" element={<AdmissionsHubPage />} />
            <Route path="/admissions/:slug" element={<TopNavSubPage group="admissions" />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/media/:slug" element={<TopNavSubPage group="media" />} />
            <Route path="/information-services/about-university" element={<AboutUniversityPage />} />
            <Route
              path="/internationalization/department-international-relations-employees/:roleSlug"
              element={<InternationalCooperationRolePage />}
            />
            <Route
              path="/internationalization/department-international-relations-employees"
              element={<DepartmentInternationalRelationsEmployeesPage />}
            />
            <Route
              path="/internationalization/international-grants/japan-matsumae-foundation"
              element={<InternationalGrantJapanMatsumaePage />}
            />
            <Route
              path="/internationalization/international-grants/hubert-h-humphrey-fellowship"
              element={<InternationalGrantUsaHumphreyPage />}
            />
            <Route
              path="/internationalization/international-grants/mext-japan-2026"
              element={<InternationalGrantMext2026Page />}
            />
            <Route path="/internationalization/international-grants" element={<InternationalGrantsPage />} />
            <Route
              path="/internationalization/international-support-center/about"
              element={<InternationalSupportCenterAboutPage />}
            />
            <Route
              path="/internationalization/international-support-center"
              element={<InternationalSupportCenterPage />}
            />
            <Route
              path="/internationalization/advanced-training-foreign-teachers/fzu-institute-physics"
              element={<AdvancedTrainingForeignTeachersFzuPage />}
            />
            <Route
              path="/internationalization/advanced-training-foreign-teachers/south-korea-universities"
              element={<AdvancedTrainingForeignTeachersSouthKoreaPage />}
            />
            <Route
              path="/internationalization/advanced-training-foreign-teachers/guangzhou-industrial-visit"
              element={<AdvancedTrainingForeignTeachersGuangzhouPage />}
            />
            <Route
              path="/internationalization/advanced-training-foreign-teachers"
              element={<AdvancedTrainingForeignTeachersPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/indonesia-medical-internship-upi"
              element={<ProfessionalDevelopmentChoirIndonesiaMedicalInternshipPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/indonesia-summer-education-program"
              element={<ProfessionalDevelopmentChoirIndonesiaSummerProgramPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/indonesia-internship-departure"
              element={<ProfessionalDevelopmentChoirIndonesiaInternshipDeparturePage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/turkey-historic-sites"
              element={<ProfessionalDevelopmentChoirTurkeyHistoricSitesPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/medipol-physiotherapy-practice"
              element={<ProfessionalDevelopmentChoirPhysiotherapyPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/medipol-laboratory"
              element={<ProfessionalDevelopmentChoirMedipolLaboratoryPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/istanbul-medipol-clinic-conditions-opportunities"
              element={<ProfessionalDevelopmentChoirMedipolClinicPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir/exchange-experience-medipol-cooperation"
              element={<ProfessionalDevelopmentChoirExchangeMedipolPage />}
            />
            <Route
              path="/internationalization/professional-development-education-choir"
              element={<ProfessionalDevelopmentChoirPage />}
            />
            <Route
              path="/internationalization/international-conferences"
              element={<InternationalConferencesPage />}
            />
            <Route
              path="/internationalization/international-conferences/international-scientific-conference-tues"
              element={<InternationalScientificConferenceTuesPage />}
            />
            <Route
              path="/internationalization/international-conferences/tourism-sector-international-experience-2025"
              element={<InternationalConferenceTourismSectorPage />}
            />
            <Route
              path="/internationalization/international-conferences/preventive-medicine-conference"
              element={<InternationalConferencePreventiveMedicinePage />}
            />
            <Route
              path="/internationalization/international-conferences/innovations-linguistics-language-education"
              element={<InternationalConferenceLinguisticsLanguageEducationPage />}
            />
            <Route
              path="/internationalization/international-conferences/global-innovations-language-education"
              element={<InternationalConferenceGlobalInnovationsLanguageEducationPage />}
            />
            <Route
              path="/internationalization/international-conferences/current-issues-linguistics-literary-studies"
              element={<InternationalConferenceLinguisticsLiteraryStudiesPage />}
            />
            <Route
              path="/internationalization/international-conferences/sustainability-green-transformation-congress"
              element={<InternationalCongressSustainabilityGreenTransformationPage />}
            />
            <Route
              path="/internationalization/international-conferences/international-medical-olympiad-termiz-2026"
              element={<InternationalMedicalOlympiadTermez2026Page />}
            />

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
