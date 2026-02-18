import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AppLayout } from "@/components/AppLayout";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "@/pages/Home";
import { Search } from "@/pages/Search";
import { Topic } from "@/pages/Topic";
import { TopicCompare } from "@/pages/TopicCompare";
import { Trending } from "@/pages/Trending";
import { Profile } from "@/pages/Profile";
import { SignUp } from "@/pages/SignUp";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/topic/:id" element={<Topic />} />
            <Route path="/topic/:id/compare" element={<TopicCompare />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
