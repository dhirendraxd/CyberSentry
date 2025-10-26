
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import SEOProvider from "@/components/SEO/SEOProvider";
import Index from "./pages/Index";
import BreachChecker from "./pages/BreachChecker";
import PasswordAnalyzer from "./pages/PasswordAnalyzer";
import PasswordGenerator from "./pages/PasswordGenerator";
import SecurityNews from "./pages/SecurityNews";
import DarkWeb from "./pages/DarkWeb";
import SecurityScanner from "./pages/SecurityScanner";
import LogAnalyzer from "./pages/LogAnalyzer";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ToolsDashboard from "./pages/ToolsDashboard";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import Explore from "./pages/Explore";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <SEOProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* All routes are public - no authentication required */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/tools" element={<ToolsDashboard />} />
                <Route path="/help" element={<Help />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/history" element={<History />} />
                <Route path="/breach-checker" element={<BreachChecker />} />
                <Route path="/password-analyzer" element={<PasswordAnalyzer />} />
                <Route path="/password-generator" element={<PasswordGenerator />} />
                <Route path="/security-news" element={<SecurityNews />} />
                <Route path="/dark-web" element={<DarkWeb />} />
                <Route path="/security-scanner" element={<SecurityScanner />} />
                <Route path="/log-analyzer" element={<LogAnalyzer />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </SEOProvider>
    </QueryClientProvider>
  );
}

export default App;
