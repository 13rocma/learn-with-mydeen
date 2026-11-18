import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet, useSearchParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import PrayerGuide from "./pages/PrayerGuide";
import SurahsPage from "./pages/SurahsPage";
import AlphabetPage from "./pages/AlphabetPage";
import DuasPage from "./pages/DuasPage";
import BasicsPage from "./pages/BasicsPage";
import NotFound from "./pages/NotFound";
import InstallPage from "./pages/InstallPage";
import AblutionsPage from "./pages/AblutionsPage";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PrivacyPage from "./pages/PrivacyPage";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { safeDestination } from "@/lib/auth";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const hideNav = location.pathname === "/installer";

  return (
    <div className="flex flex-col min-h-screen">
      <main className={`flex-1 ${hideNav ? "" : "pb-16"}`}>
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};

const FirstPage = () => {
  const [params] = useSearchParams();
  return <Navigate to={safeDestination(params.get("next"))} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<FirstPage />} />
                <Route path="/priere" element={<PrayerGuide />} />
                <Route path="/sourates" element={<SurahsPage />} />
                <Route path="/alphabet" element={<AlphabetPage />} />
                <Route path="/duas" element={<DuasPage />} />
                <Route path="/bases" element={<BasicsPage />} />
                <Route path="/ablutions" element={<AblutionsPage />} />
                <Route path="/installer" element={<InstallPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
