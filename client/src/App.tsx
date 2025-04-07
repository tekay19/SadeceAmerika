import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import AuthVerifyCode from "@/pages/auth-verify-code";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import Dashboard from "@/pages/dashboard";
import Applications from "@/pages/applications";
import Documents from "@/pages/documents";
import Appointments from "@/pages/appointments";
import ApplicationForm from "@/pages/application-form";
import ApplicationDetails from "@/pages/application-details";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminSettings from "./pages/admin-settings";
import AdminUsers from "./pages/admin-users";
import OfficerDashboard from "@/pages/officer-dashboard";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import PrivacyPolicy from "./pages/privacy-policy";
import { AnimatePresence } from "framer-motion";

// Public pages
import HomePage from "./pages/public/home";
import ServicesPage from "./pages/public/services";
import AboutPage from "./pages/public/about";
import ContactPage from "./pages/public/contact";

function Router() {
  const [location] = useLocation();
  
  // Tüm rotaları tek bir bileşene koymak yerine, yalnızca gösterilen rotayı gösteriyoruz
  return (
    <>
      <Switch>
        {/* Public Routes */}
        <Route path="/">
          <AnimatePresence mode="sync" initial={false}>
            <HomePage key="home" />
          </AnimatePresence>
        </Route>
        <Route path="/services">
          <AnimatePresence mode="sync" initial={false}>
            <ServicesPage key="services" />
          </AnimatePresence>
        </Route>
        <Route path="/about">
          <AnimatePresence mode="sync" initial={false}>
            <AboutPage key="about" />
          </AnimatePresence>
        </Route>
        <Route path="/contact">
          <AnimatePresence mode="sync" initial={false}>
            <ContactPage key="contact" />
          </AnimatePresence>
        </Route>
        <Route path="/privacy-policy">
          <AnimatePresence mode="sync" initial={false}>
            <PrivacyPolicy key="privacy" />
          </AnimatePresence>
        </Route>
        
        {/* Auth Routes */}
        <Route path="/auth">
          <AnimatePresence mode="sync" initial={false}>
            <AuthPage key="auth" />
          </AnimatePresence>
        </Route>
        <Route path="/forgot-password">
          <AnimatePresence mode="sync" initial={false}>
            <ForgotPassword key="forgot-password" />
          </AnimatePresence>
        </Route>
        <Route path="/reset-password">
          <AnimatePresence mode="sync" initial={false}>
            <ResetPassword key="reset-password" />
          </AnimatePresence>
        </Route>
        <Route path="/auth-verify-code">
          <AnimatePresence mode="sync" initial={false}>
            <AuthVerifyCode key="auth-verify-code" />
          </AnimatePresence>
        </Route>
        
        {/* Protected Routes */}
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/applications" component={Applications} />
        <ProtectedRoute path="/applications/new" component={ApplicationForm} />
        <ProtectedRoute path="/applications/:id" component={ApplicationDetails} />
        <ProtectedRoute path="/documents" component={Documents} />
        <ProtectedRoute path="/appointments" component={Appointments} />
        <ProtectedRoute path="/admin" component={AdminDashboard} />
        <ProtectedRoute path="/admin/settings" component={AdminSettings} />
        <ProtectedRoute path="/admin/users" component={AdminUsers} />
        <ProtectedRoute path="/officer" component={OfficerDashboard} />
        <Route path="/:rest*" component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
