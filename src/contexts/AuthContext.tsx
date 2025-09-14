import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User & { password: string }> = {
  'patient@demo.com': {
    id: 'pat_001',
    name: 'John Smith',
    email: 'patient@demo.com',
    mobile: '+1234567890',
    role: 'patient',
    password: 'patient123',
    createdAt: new Date('2024-01-15'),
  },
  'doctor@demo.com': {
    id: 'doc_001',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@demo.com',
    mobile: '+1234567891',
    role: 'doctor',
    isApproved: true,
    licenseNumber: 'MD12345',
    clinicId: 'clinic_001',
    password: 'doctor123',
    createdAt: new Date('2024-01-10'),
  },
  'pharmacist@demo.com': {
    id: 'pharm_001',
    name: 'Michael Chen',
    email: 'pharmacist@demo.com',
    mobile: '+1234567892',
    role: 'pharmacist',
    isApproved: true,
    licenseNumber: 'PH54321',
    pharmacyId: 'pharmacy_001',
    password: 'pharmacist123',
    createdAt: new Date('2024-01-12'),
  },
  'admin@demo.com': {
    id: 'admin_001',
    name: 'Admin User',
    email: 'admin@demo.com',
    mobile: '+1234567893',
    role: 'admin',
    password: 'admin123',
    createdAt: new Date('2024-01-01'),
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email];
    
    if (mockUser && mockUser.password === password && mockUser.role === role) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};