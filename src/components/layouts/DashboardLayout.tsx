import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Stethoscope,
  Pill,
  ClipboardList,
  Activity,
  UserCheck,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const getNavItems = (role: string): NavItem[] => {
  switch (role) {
    case 'doctor':
      return [
        { title: 'Dashboard', icon: Home, href: '/doctor' },
        { title: 'Patients', icon: Users, href: '/doctor/patients' },
        { title: 'Appointments', icon: Calendar, href: '/doctor/appointments' },
        { title: 'Medical Records', icon: FileText, href: '/doctor/records' },
        { title: 'Prescriptions', icon: ClipboardList, href: '/doctor/prescriptions' },
        { title: 'Settings', icon: Settings, href: '/doctor/settings' },
      ];
    case 'patient':
      return [
        { title: 'Dashboard', icon: Home, href: '/patient' },
        { title: 'My Records', icon: FileText, href: '/patient/records' },
        { title: 'Prescriptions', icon: Pill, href: '/patient/prescriptions' },
        { title: 'Appointments', icon: Calendar, href: '/patient/appointments' },
        { title: 'Health Overview', icon: Activity, href: '/patient/health' },
        { title: 'Settings', icon: Settings, href: '/patient/settings' },
      ];
    case 'pharmacist':
      return [
        { title: 'Dashboard', icon: Home, href: '/pharmacist' },
        { title: 'Verify Prescription', icon: ClipboardList, href: '/pharmacist/verify' },
        { title: 'Dispensed', icon: Pill, href: '/pharmacist/dispensed' },
        { title: 'Inventory', icon: Building2, href: '/pharmacist/inventory' },
        { title: 'Settings', icon: Settings, href: '/pharmacist/settings' },
      ];
    case 'admin':
      return [
        { title: 'Dashboard', icon: Home, href: '/admin' },
        { title: 'User Approvals', icon: UserCheck, href: '/admin/approvals', badge: 3 },
        { title: 'Doctors', icon: Stethoscope, href: '/admin/doctors' },
        { title: 'Patients', icon: Users, href: '/admin/patients' },
        { title: 'Pharmacists', icon: Pill, href: '/admin/pharmacists' },
        { title: 'Clinics', icon: Building2, href: '/admin/clinics' },
        { title: 'Reports', icon: FileText, href: '/admin/reports' },
        { title: 'Settings', icon: Settings, href: '/admin/settings' },
      ];
    default:
      return [];
  }
};

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    navigate('/login');
    return null;
  }

  const navItems = getNavItems(user.role);
  const initials = (user.fullName || user.email || '').split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">MediCare</h1>
                <p className="text-xs text-sidebar-foreground/60">Medical Records System</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                    )}
                    onClick={() => navigate(item.href)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                  {user.fullName || user.email}
                </p>
                <p className="text-xs text-sidebar-accent-foreground/60 capitalize">
                  {user.role}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-accent-foreground hover:text-destructive"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;