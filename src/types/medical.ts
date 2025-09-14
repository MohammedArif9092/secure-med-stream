export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  mobile: string;
  email: string;
  address: string;
  emergencyContact: string;
  medicalHistory?: string[];
  allergies?: string[];
  createdAt: Date;
  lastVisit?: Date;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  clinicName: string;
  date: Date;
  diagnosis: string;
  medications: Medication[];
  tests?: string[];
  notes?: string;
  nextVisitDate?: Date;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: 'prescription' | 'lab_report' | 'scan' | 'mri' | 'other';
  title: string;
  date: Date;
  doctorId: string;
  doctorName: string;
  fileUrl?: string;
  summary?: string;
  findings?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'consultation' | 'follow-up' | 'emergency';
  notes?: string;
  duration: number;
}