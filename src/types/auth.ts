export type UserRole = 'patient' | 'doctor' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  isApproved?: boolean;
  licenseNumber?: string;
  clinicId?: string;
  pharmacyId?: string;
  avatar?: string;
  createdAt: Date;
}