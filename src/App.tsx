import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorRecords from "./pages/doctor/DoctorRecords";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard";

// Pharmacist pages
import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Doctor Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/doctor/patients" element={<DoctorPatients />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/records" element={<DoctorRecords />} />
              <Route path="/doctor/prescriptions" element={<DoctorRecords />} />
              <Route path="/doctor/settings" element={<DoctorDashboard />} />
            </Route>

            {/* Patient Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/patient/records" element={<PatientDashboard />} />
              <Route path="/patient/prescriptions" element={<PatientDashboard />} />
              <Route path="/patient/appointments" element={<PatientDashboard />} />
              <Route path="/patient/health" element={<PatientDashboard />} />
              <Route path="/patient/settings" element={<PatientDashboard />} />
            </Route>

            {/* Pharmacist Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/pharmacist" element={<PharmacistDashboard />} />
              <Route path="/pharmacist/verify" element={<PharmacistDashboard />} />
              <Route path="/pharmacist/dispensed" element={<PharmacistDashboard />} />
              <Route path="/pharmacist/inventory" element={<PharmacistDashboard />} />
              <Route path="/pharmacist/settings" element={<PharmacistDashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/approvals" element={<AdminDashboard />} />
              <Route path="/admin/doctors" element={<AdminDashboard />} />
              <Route path="/admin/patients" element={<AdminDashboard />} />
              <Route path="/admin/pharmacists" element={<AdminDashboard />} />
              <Route path="/admin/clinics" element={<AdminDashboard />} />
              <Route path="/admin/reports" element={<AdminDashboard />} />
              <Route path="/admin/settings" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
