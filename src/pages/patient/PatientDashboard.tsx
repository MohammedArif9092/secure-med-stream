import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Pill, Heart, Activity, Download, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Heart },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Activity },
    { label: 'Blood Sugar', value: '95 mg/dL', status: 'normal', icon: Activity },
    { label: 'BMI', value: '22.5', status: 'normal', icon: Activity },
  ];

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-03-20', time: '10:00 AM', type: 'Check-up' },
    { id: 2, doctor: 'Dr. Michael Lee', date: '2024-03-25', time: '2:30 PM', type: 'Follow-up' },
  ];

  const activePrescriptions = [
    { id: 1, medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', remaining: '15 days' },
    { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', remaining: '20 days' },
  ];

  const recentRecords = [
    { id: 1, type: 'Lab Report', date: '2024-03-10', doctor: 'Dr. Sarah Johnson' },
    { id: 2, type: 'X-Ray', date: '2024-03-05', doctor: 'Dr. Michael Lee' },
    { id: 3, type: 'Prescription', date: '2024-03-01', doctor: 'Dr. Sarah Johnson' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">Your health overview and recent activity</p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => navigate('/patient/appointments')}>
          <Calendar className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-medical transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="w-5 h-5 text-primary" />
                <Badge className="bg-success/10 text-success">
                  {metric.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient/appointments')}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 rounded-lg bg-gradient-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {appointment.date}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Prescriptions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Active Prescriptions</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient/prescriptions')}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activePrescriptions.map((prescription) => (
                <div key={prescription.id} className="p-4 rounded-lg bg-gradient-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        <Pill className="w-4 h-4 text-primary" />
                        {prescription.medication}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {prescription.dosage} - {prescription.frequency}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {prescription.remaining} remaining
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      Refill
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Medical Records */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Medical Records</CardTitle>
              <CardDescription>Your latest medical documents and reports</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/patient/records')}>
              View All Records <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{record.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.date} • {record.doctor}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;