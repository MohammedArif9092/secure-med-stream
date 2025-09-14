import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, FileText, Clock, TrendingUp, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { label: 'Today\'s Appointments', value: '8', icon: Calendar, color: 'text-primary' },
    { label: 'Total Patients', value: '156', icon: Users, color: 'text-secondary' },
    { label: 'Pending Reports', value: '12', icon: FileText, color: 'text-warning' },
    { label: 'Avg. Consultation Time', value: '15 min', icon: Clock, color: 'text-accent' },
  ];

  const todayAppointments = [
    { id: 1, time: '09:00 AM', patient: 'John Smith', type: 'Consultation' },
    { id: 2, time: '09:30 AM', patient: 'Sarah Johnson', type: 'Follow-up' },
    { id: 3, time: '10:00 AM', patient: 'Michael Chen', type: 'Check-up' },
    { id: 4, time: '10:30 AM', patient: 'Emily Davis', type: 'Consultation' },
  ];

  const recentPatients = [
    { id: 1, name: 'John Smith', lastVisit: '2024-03-15', diagnosis: 'Hypertension' },
    { id: 2, name: 'Sarah Johnson', lastVisit: '2024-03-14', diagnosis: 'Diabetes Type 2' },
    { id: 3, name: 'Michael Chen', lastVisit: '2024-03-13', diagnosis: 'Asthma' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">Here's your overview for today</p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => navigate('/doctor/patients')}>
          <Users className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Stats Grid */}
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
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Today's Appointments</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/doctor/appointments')}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {appointment.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Patients</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/doctor/patients')}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card hover:shadow-sm transition-shadow">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.diagnosis}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {patient.lastVisit}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Frequently used features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/doctor/prescriptions')}
            >
              <FileText className="w-6 h-6 mb-2" />
              <span>New Prescription</span>
            </Button>
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/doctor/records')}
            >
              <Activity className="w-6 h-6 mb-2" />
              <span>View Records</span>
            </Button>
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/doctor/appointments')}
            >
              <Calendar className="w-6 h-6 mb-2" />
              <span>Schedule</span>
            </Button>
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/doctor/patients')}
            >
              <Users className="w-6 h-6 mb-2" />
              <span>Patients</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;