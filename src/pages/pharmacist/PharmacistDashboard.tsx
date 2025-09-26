import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Pill, CheckCircle, Clock, FileText, Download, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const PharmacistDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [patientId, setPatientId] = useState('');
  const [prescriptionData, setPrescriptionData] = useState<any>(null);

  const stats = [
    { label: 'Prescriptions Today', value: '24', icon: FileText, color: 'text-primary' },
    { label: 'Verified', value: '18', icon: CheckCircle, color: 'text-success' },
    { label: 'Pending', value: '6', icon: Clock, color: 'text-warning' },
    { label: 'Total Dispensed', value: '342', icon: Pill, color: 'text-secondary' },
  ];

  const recentPrescriptions = [
    { 
      id: 'RX001', 
      patientName: 'John Smith', 
      doctor: 'Dr. Sarah Johnson',
      clinic: 'City Medical Center',
      date: '2024-03-15',
      status: 'dispensed',
      medications: 3
    },
    { 
      id: 'RX002', 
      patientName: 'Emily Davis', 
      doctor: 'Dr. Michael Lee',
      clinic: 'Healthcare Plus',
      date: '2024-03-15',
      status: 'pending',
      medications: 2
    },
    { 
      id: 'RX003', 
      patientName: 'Robert Brown', 
      doctor: 'Dr. Sarah Johnson',
      clinic: 'City Medical Center',
      date: '2024-03-14',
      status: 'dispensed',
      medications: 4
    },
  ];

  const handleVerifyPrescription = () => {
    if (!patientId) {
      toast({
        title: "Patient ID Required",
        description: "Please enter a patient ID to verify prescription",
        variant: "destructive",
      });
      return;
    }

    // Mock prescription data
    setPrescriptionData({
      id: 'RX' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      patientName: 'John Smith',
      patientId: patientId,
      doctor: 'Dr. Sarah Johnson',
      clinic: 'City Medical Center',
      date: new Date().toISOString().split('T')[0],
      medications: [
        { name: 'Metformin', dosage: '500mg', quantity: '60 tablets', instructions: 'Take twice daily with meals' },
        { name: 'Lisinopril', dosage: '10mg', quantity: '30 tablets', instructions: 'Take once daily' },
        { name: 'Atorvastatin', dosage: '20mg', quantity: '30 tablets', instructions: 'Take once daily at bedtime' },
      ],
      diagnosis: 'Type 2 Diabetes, Hypertension',
      notes: 'Patient should monitor blood sugar levels regularly',
    });

    toast({
      title: "Prescription Found",
      description: "Prescription details loaded successfully",
    });
  };

  const handleDispense = () => {
    toast({
      title: "Prescription Dispensed",
      description: "Medication has been successfully dispensed to the patient",
    });
    setPrescriptionData(null);
    setPatientId('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pharmacy Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.fullName || user?.email}</p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => navigate('/pharmacist/inventory')}>
          <Package className="w-4 h-4 mr-2" />
          Inventory Management
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medical transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prescription Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Verify Prescription</CardTitle>
            <CardDescription>Enter patient ID to retrieve prescription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="patient-id">Patient ID</Label>
                <Input
                  id="patient-id"
                  placeholder="Enter patient ID"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
              <Button 
                className="mt-auto bg-gradient-primary"
                onClick={handleVerifyPrescription}
              >
                <Search className="w-4 h-4 mr-2" />
                Verify
              </Button>
            </div>

            {prescriptionData && (
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Patient:</span>
                    <span className="font-medium">{prescriptionData.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Doctor:</span>
                    <span className="font-medium">{prescriptionData.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Clinic:</span>
                    <span className="font-medium">{prescriptionData.clinic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="font-medium">{prescriptionData.date}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Medications:</p>
                  {prescriptionData.medications.map((med: any, index: number) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">{med.name} - {med.dosage}</p>
                      <p className="text-sm text-muted-foreground">{med.quantity}</p>
                      <p className="text-sm text-muted-foreground">{med.instructions}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button className="flex-1 bg-success text-success-foreground" onClick={handleDispense}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Dispense
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
            <CardDescription>Latest prescriptions processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="p-3 rounded-lg bg-gradient-card hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{prescription.patientName}</p>
                        <Badge 
                          variant={prescription.status === 'dispensed' ? 'default' : 'secondary'}
                          className={prescription.status === 'dispensed' ? 'bg-success/10 text-success' : ''}
                        >
                          {prescription.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {prescription.doctor} • {prescription.clinic}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{prescription.date}</span>
                        <span className="flex items-center gap-1">
                          <Pill className="w-3 h-3" />
                          {prescription.medications} medications
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/pharmacist/dispensed')}
              >
                View All Prescriptions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacistDashboard;