import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, Download, Calendar, Clock, AlertCircle } from 'lucide-react';

const PatientPrescriptions: React.FC = () => {
  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      clinic: 'City Medical Center',
      date: '2024-03-15',
      status: 'Active',
      medications: [
        { name: 'Amoxicillin 500mg', dosage: '1 tablet 3 times daily', duration: '7 days' },
        { name: 'Paracetamol 500mg', dosage: 'As needed for pain', duration: '5 days' }
      ]
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      clinic: 'Downtown Clinic',
      date: '2024-03-05',
      status: 'Active',
      medications: [
        { name: 'Metformin 500mg', dosage: '1 tablet twice daily', duration: '30 days' },
        { name: 'Vitamin D3', dosage: '1 tablet daily', duration: '30 days' }
      ]
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      clinic: 'Health Plus Clinic',
      date: '2024-02-20',
      status: 'Completed',
      medications: [
        { name: 'Ibuprofen 400mg', dosage: '1 tablet 3 times daily', duration: '5 days' }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Prescriptions</h1>
          <p className="text-muted-foreground mt-1">Manage and view your prescriptions</p>
        </div>
      </div>

      {/* Active Prescriptions Alert */}
      <Card className="border-warning bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-warning" />
            <div>
              <p className="font-medium">You have 2 active prescriptions</p>
              <p className="text-sm text-muted-foreground">Remember to take your medications as prescribed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="hover:shadow-medical transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{prescription.doctor}</CardTitle>
                  <CardDescription>{prescription.clinic}</CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {prescription.date}
                    </span>
                    <Badge variant={prescription.status === 'Active' ? 'default' : 'secondary'}>
                      {prescription.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Pill className="w-4 h-4" />
                  Medications
                </h4>
                {prescription.medications.map((med, index) => (
                  <div key={index} className="p-3 bg-gradient-card rounded-lg">
                    <p className="font-medium">{med.name}</p>
                    <div className="text-sm text-muted-foreground mt-1">
                      <p>Dosage: {med.dosage}</p>
                      <p className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Duration: {med.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientPrescriptions;