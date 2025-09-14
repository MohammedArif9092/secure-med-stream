import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, Plus, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientAppointments: React.FC = () => {
  const navigate = useNavigate();
  
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      clinic: 'City Medical Center',
      date: '2024-03-25',
      time: '10:00 AM',
      type: 'In-Person',
      status: 'Confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      clinic: 'Downtown Clinic',
      date: '2024-03-28',
      time: '2:30 PM',
      type: 'Video Call',
      status: 'Confirmed'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      specialty: 'Dermatology',
      clinic: 'Health Plus Clinic',
      date: '2024-04-02',
      time: '11:15 AM',
      type: 'In-Person',
      status: 'Pending'
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      doctor: 'Dr. Robert Wilson',
      specialty: 'Orthopedics',
      date: '2024-03-10',
      time: '3:00 PM',
      status: 'Completed'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your upcoming and past appointments</p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => navigate('/patient/book-appointment')}>
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-medical transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <Badge variant={appointment.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                      {appointment.type === 'Video Call' && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          {appointment.type}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{appointment.specialty}</p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {appointment.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {appointment.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {appointment.clinic}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {appointment.type === 'Video Call' ? (
                      <Button size="sm" className="bg-gradient-primary">
                        Join Call
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-destructive">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
        <div className="grid gap-4">
          {pastAppointments.map((appointment) => (
            <Card key={appointment.id} className="opacity-75">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {appointment.date}
                      </span>
                      <span className="text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">{appointment.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;