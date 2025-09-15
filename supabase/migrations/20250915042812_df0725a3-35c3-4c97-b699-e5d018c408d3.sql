-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  blood_group TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  conditions TEXT[],
  last_visit DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Create policies for patients table
-- All authenticated users can view patients (doctors, pharmacists, patients)
CREATE POLICY "Authenticated users can view patients" 
ON public.patients 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Only doctors can create patients
CREATE POLICY "Doctors can create patients" 
ON public.patients 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Only doctors can update patients
CREATE POLICY "Doctors can update patients" 
ON public.patients 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Only doctors can delete patients
CREATE POLICY "Doctors can delete patients" 
ON public.patients 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_patients_updated_at
BEFORE UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.patients (patient_id, name, age, gender, blood_group, phone, email, address, conditions, last_visit) VALUES
('PAT001', 'John Doe', 45, 'Male', 'O+', '555-0101', 'john.doe@email.com', '123 Main St, City', ARRAY['Hypertension', 'Diabetes'], '2024-01-10'),
('PAT002', 'Jane Smith', 32, 'Female', 'A+', '555-0102', 'jane.smith@email.com', '456 Oak Ave, Town', ARRAY['Asthma'], '2024-01-12'),
('PAT003', 'Robert Johnson', 58, 'Male', 'B+', '555-0103', 'robert.j@email.com', '789 Pine Rd, Village', ARRAY['Heart Disease', 'High Cholesterol'], '2024-01-08'),
('PAT004', 'Maria Garcia', 29, 'Female', 'AB+', '555-0104', 'maria.g@email.com', '321 Elm St, Metro', ARRAY['Migraine'], '2024-01-11'),
('PAT005', 'William Brown', 67, 'Male', 'O-', '555-0105', 'william.b@email.com', '654 Maple Dr, Suburb', ARRAY['Arthritis', 'Diabetes'], '2024-01-09');