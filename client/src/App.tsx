import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
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

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/applications" component={Applications} />
      <ProtectedRoute path="/applications/new" component={ApplicationForm} />
      <ProtectedRoute path="/applications/:id" component={ApplicationDetails} />
      <ProtectedRoute path="/documents" component={Documents} />
      <ProtectedRoute path="/appointments" component={Appointments} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/admin/settings" component={AdminSettings} />
      <ProtectedRoute path="/admin/users" component={AdminUsers} />
      <ProtectedRoute path="/officer" component={OfficerDashboard} />
      <Route component={NotFound} />
    </Switch>
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
