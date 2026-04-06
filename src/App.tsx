import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import PrayerGuide from "./pages/PrayerGuide";
import SurahsPage from "./pages/SurahsPage";
import AlphabetPage from "./pages/AlphabetPage";
import DuasPage from "./pages/DuasPage";
import BasicsPage from "./pages/BasicsPage";
import NotFound from "./pages/NotFound";
import InstallPage from "./pages/InstallPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pb-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/priere" element={<PrayerGuide />} />
              <Route path="/sourates" element={<SurahsPage />} />
              <Route path="/alphabet" element={<AlphabetPage />} />
              <Route path="/duas" element={<DuasPage />} />
              <Route path="/bases" element={<BasicsPage />} />
              {/* Ablutions now integrated in PrayerGuide */}
              <Route path="/installer" element={<InstallPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
