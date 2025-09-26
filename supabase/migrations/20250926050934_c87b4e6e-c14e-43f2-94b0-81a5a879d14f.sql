-- Create users profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('patient', 'doctor', 'pharmacist', 'admin')),
  phone TEXT,
  license_number TEXT,
  clinic_id TEXT,
  pharmacy_id TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users,
  doctor_id UUID NOT NULL REFERENCES auth.users,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medical_records table
CREATE TABLE public.medical_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users,
  doctor_id UUID NOT NULL REFERENCES auth.users,
  diagnosis TEXT NOT NULL,
  treatment TEXT,
  medications TEXT[],
  test_results TEXT,
  visit_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users,
  doctor_id UUID NOT NULL REFERENCES auth.users,
  pharmacist_id UUID REFERENCES auth.users,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'dispensed', 'expired')),
  notes TEXT,
  prescribed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inventory table for pharmacy
CREATE TABLE public.inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medication_name TEXT NOT NULL UNIQUE,
  quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  batch_number TEXT,
  expiry_date DATE,
  supplier TEXT,
  minimum_stock INTEGER DEFAULT 10,
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by authenticated users" ON public.profiles
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Appointments policies
CREATE POLICY "Patients can view their appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

CREATE POLICY "Doctors can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Appointments can be updated by doctor or patient" ON public.appointments
  FOR UPDATE USING (auth.uid() = doctor_id OR auth.uid() = patient_id);

-- Medical records policies
CREATE POLICY "Patients can view their records" ON public.medical_records
  FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view and create records" ON public.medical_records
  FOR ALL USING (auth.uid() = doctor_id OR auth.uid() = patient_id);

-- Prescriptions policies
CREATE POLICY "View prescriptions" ON public.prescriptions
  FOR SELECT USING (
    auth.uid() = patient_id OR 
    auth.uid() = doctor_id OR 
    auth.uid() = pharmacist_id OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND role = 'pharmacist')
  );

CREATE POLICY "Doctors can create prescriptions" ON public.prescriptions
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Update prescriptions" ON public.prescriptions
  FOR UPDATE USING (
    auth.uid() = doctor_id OR 
    auth.uid() = pharmacist_id OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND role = 'pharmacist')
  );

-- Inventory policies
CREATE POLICY "Pharmacists and admins can manage inventory" ON public.inventory
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND role IN ('pharmacist', 'admin'))
  );

CREATE POLICY "All authenticated users can view inventory" ON public.inventory
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'role', 'patient')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamps triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON public.medical_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON public.prescriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample inventory data
INSERT INTO public.inventory (medication_name, quantity, unit, batch_number, expiry_date, supplier, minimum_stock, price) VALUES
('Paracetamol 500mg', 500, 'tablets', 'BATCH001', '2025-12-31', 'MedSupply Co', 50, 0.10),
('Amoxicillin 250mg', 200, 'capsules', 'BATCH002', '2025-06-30', 'PharmaWorld', 30, 0.25),
('Ibuprofen 400mg', 350, 'tablets', 'BATCH003', '2025-09-30', 'MedSupply Co', 40, 0.15),
('Metformin 500mg', 150, 'tablets', 'BATCH004', '2025-08-31', 'GlobalPharma', 25, 0.20),
('Aspirin 100mg', 400, 'tablets', 'BATCH005', '2025-11-30', 'MedSupply Co', 50, 0.08);