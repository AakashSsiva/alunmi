import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
// Main Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Events from "./pages/Events";
import Directory from "./pages/Directory";
import News from "./pages/News";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
// About Module
import Mission from "./pages/about/Mission";
import Terms from "./pages/about/Terms";
// Network Module
import NetworkDirectory from "./pages/network/Directory";
import Reunions from "./pages/network/Reunions";
// Events Module
import UpcomingEvents from "./pages/events/UpcomingEvents";
import Photos from "./pages/events/gallery/Photos";
import Videos from "./pages/events/gallery/Videos";
import EventsAwards from "./pages/events/Awards";
// Achievements Module
import NotableAlumni from "./pages/achievements/NotableAlumni";
import Awards from "./pages/achievements/Awards";
// Contribute Module
import Donate from "./pages/contribute/Donate";
import Volunteer from "./pages/contribute/Volunteer";
// Career Module
import CareerJobs from "./pages/career/Jobs";
import Mentorship from "./pages/career/Mentorship";
// Contact Module
import ContactInfo from "./pages/contact/ContactInfo";
import Feedback from "./pages/contact/Feedback";
// Alumni Platform - Additional Pages
import Messaging from "./pages/Messaging";
import Connections from "./pages/Connections";
import AdminDashboardPage from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/upcoming" element={<UpcomingEvents />} />
            <Route path="/events/gallery/photos" element={<Photos />} />
            <Route path="/events/gallery/videos" element={<Videos />} />
            <Route path="/events/awards" element={<EventsAwards />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/news" element={<News />} />
            <Route path="/settings" element={<Settings />} />
            {/* About Routes */}
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/terms" element={<Terms />} />
            {/* Network Routes */}
            <Route path="/network/directory" element={<NetworkDirectory />} />
            <Route path="/network/reunions" element={<Reunions />} />
            {/* Achievements Routes */}
            <Route path="/achievements/alumni" element={<NotableAlumni />} />
            <Route path="/achievements/awards" element={<Awards />} />
            {/* Contribute Routes */}
            <Route path="/contribute/donate" element={<Donate />} />
            <Route path="/contribute/volunteer" element={<Volunteer />} />
            {/* Career Routes */}
            <Route path="/career/jobs" element={<CareerJobs />} />
            <Route path="/career/mentorship" element={<Mentorship />} />
            {/* Contact Routes */}
            <Route path="/contact/info" element={<ContactInfo />} />
            <Route path="/contact/feedback" element={<Feedback />} />
            {/* Alumni Platform Routes - Use /dashboard for role-based routing */}
            <Route path="/messages" element={<Messaging />} />
            <Route path="/connections" element={<Connections />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            {/* Catch-all - ADD ALL CUSTOM ROUTES ABOVE THIS */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

