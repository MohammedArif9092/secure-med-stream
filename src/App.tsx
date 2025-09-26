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
import PatientRecords from "./pages/patient/PatientRecords";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientHealth from "./pages/patient/PatientHealth";
import PatientSettings from "./pages/patient/PatientSettings";
import BookAppointment from "./pages/patient/BookAppointment";

// Pharmacist pages
import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";
import PharmacistVerify from "./pages/pharmacist/PharmacistVerify";
import PharmacistInventory from "./pages/pharmacist/PharmacistInventory";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AdminReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
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
              <Route path="/patient/records" element={<PatientRecords />} />
              <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
              <Route path="/patient/appointments" element={<PatientAppointments />} />
              <Route path="/patient/book-appointment" element={<BookAppointment />} />
              <Route path="/patient/health" element={<PatientHealth />} />
              <Route path="/patient/settings" element={<PatientSettings />} />
            </Route>

            {/* Pharmacist Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/pharmacist" element={<PharmacistDashboard />} />
              <Route path="/pharmacist/verify" element={<PharmacistVerify />} />
              <Route path="/pharmacist/dispensed" element={<PharmacistDashboard />} />
              <Route path="/pharmacist/inventory" element={<PharmacistInventory />} />
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
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
