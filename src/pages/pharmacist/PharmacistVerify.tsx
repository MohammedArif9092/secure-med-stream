import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Download, CheckCircle, AlertCircle, Pill } from 'lucide-react';

const PharmacistVerify: React.FC = () => {
  const [patientId, setPatientId] = useState('');
  const [prescription, setPrescription] = useState<any>(null);

  const handleSearch = () => {
    // Simulate fetching prescription
    setPrescription({
      id: 'RX-2024-001',
      patient: 'John Smith',
      doctor: 'Dr. Sarah Johnson',
      clinic: 'City Medical Center',
      date: '2024-03-15',
      status: 'Active',
      medications: [
        { name: 'Amoxicillin 500mg', quantity: '21 tablets', dosage: '1 tablet 3 times daily for 7 days' },
        { name: 'Paracetamol 500mg', quantity: '10 tablets', dosage: 'As needed for pain, max 4 times daily' }
      ]
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Verify Prescription</h1>
        <p className="text-muted-foreground mt-1">Enter patient ID to verify and dispense medications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Lookup</CardTitle>
          <CardDescription>Search by patient ID or prescription number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="patientId">Patient ID / Prescription Number</Label>
              <Input
                id="patientId"
                placeholder="Enter ID..."
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleSearch} className="mt-7 bg-gradient-primary">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {prescription && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Prescription Details</CardTitle>
                <CardDescription>ID: {prescription.id}</CardDescription>
              </div>
              <Badge className="bg-success/10 text-success">Verified</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Patient</p>
                <p className="font-medium">{prescription.patient}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prescribing Doctor</p>
                <p className="font-medium">{prescription.doctor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clinic</p>
                <p className="font-medium">{prescription.clinic}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date Issued</p>
                <p className="font-medium">{prescription.date}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4" />
                Medications
              </h4>
              <div className="space-y-3">
                {prescription.medications.map((med: any, index: number) => (
                  <div key={index} className="p-4 bg-gradient-card rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">Quantity: {med.quantity}</p>
                        <p className="text-sm text-muted-foreground">Dosage: {med.dosage}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-primary">
                <CheckCircle className="w-4 h-4 mr-2" />
                Dispense Medication
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PharmacistVerify;