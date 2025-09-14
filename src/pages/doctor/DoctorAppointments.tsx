import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Clock, User, MapPin, Phone, Video, ChevronLeft, ChevronRight } from 'lucide-react';

const DoctorAppointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const appointments = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'John Smith',
      type: 'consultation',
      duration: 30,
      status: 'confirmed',
      location: 'Room 101',
      phone: '+1234567890',
    },
    {
      id: 2,
      time: '09:30 AM',
      patient: 'Sarah Johnson',
      type: 'follow-up',
      duration: 20,
      status: 'confirmed',
      location: 'Room 101',
      phone: '+1234567891',
    },
    {
      id: 3,
      time: '10:00 AM',
      patient: 'Michael Chen',
      type: 'video',
      duration: 30,
      status: 'pending',
      location: 'Virtual',
      phone: '+1234567892',
    },
    {
      id: 4,
      time: '11:00 AM',
      patient: 'Emily Davis',
      type: 'consultation',
      duration: 45,
      status: 'confirmed',
      location: 'Room 102',
      phone: '+1234567893',
    },
    {
      id: 5,
      time: '02:00 PM',
      patient: 'Robert Brown',
      type: 'check-up',
      duration: 30,
      status: 'confirmed',
      location: 'Room 101',
      phone: '+1234567894',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return '';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your schedule and appointments</p>
        </div>
        <Button className="bg-gradient-primary">
          Schedule Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>
                  {selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-lg bg-gradient-card hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {appointment.time.split(' ')[0].split(':')[0]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time.split(' ')[1]}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{appointment.patient}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            {getTypeIcon(appointment.type)}
                            {appointment.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {appointment.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {appointment.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {appointment.type === 'video' && (
                        <Button size="sm" className="bg-gradient-primary">
                          Join Call
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Today</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Calendar className="w-8 h-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <User className="w-8 h-8 text-success opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Clock className="w-8 h-8 text-warning opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Video Calls</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Video className="w-8 h-8 text-secondary opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorAppointments;