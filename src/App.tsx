
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FamilyProvider } from "@/context/FamilyContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FamilyPage from "./pages/FamilyPage";
import TasksPage from "./pages/TasksPage";
import ChallengesPage from "./pages/ChallengesPage";
import TripsPage from "./pages/TripsPage";
import WellbeingPage from "./pages/WellbeingPage";
import OnboardingPage from "./pages/OnboardingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FamilyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/family" element={<FamilyPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/wellbeing" element={<WellbeingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FamilyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
