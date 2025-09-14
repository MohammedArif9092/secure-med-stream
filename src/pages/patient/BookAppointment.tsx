import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar as CalendarIcon, Clock, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      clinic: 'City Medical Center',
      rating: 4.8,
      available: ['10:00 AM', '10:30 AM', '2:00 PM', '3:30 PM']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      clinic: 'Downtown Clinic',
      rating: 4.9,
      available: ['9:00 AM', '11:00 AM', '2:30 PM', '4:00 PM']
    },
    {
      id: '3',
      name: 'Dr. Emily Brown',
      specialty: 'Dermatology',
      clinic: 'Health Plus Clinic',
      rating: 4.7,
      available: ['9:30 AM', '11:15 AM', '1:00 PM', '3:00 PM']
    }
  ];

  const handleBooking = () => {
    // In a real app, this would submit to backend
    navigate('/patient/appointments');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
        <p className="text-muted-foreground mt-1">Schedule a consultation with our healthcare providers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Filters */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find a Doctor</CardTitle>
              <CardDescription>Search by name, specialty, or clinic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search doctors..." 
                      className="w-full"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Medicine</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor List */}
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <Card 
                key={doctor.id} 
                className={`cursor-pointer transition-all hover:shadow-medical ${
                  selectedDoctor === doctor.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{doctor.name}</h3>
                      <p className="text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {doctor.clinic}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-warning text-warning" />
                          {doctor.rating}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">Available Times:</p>
                        <div className="flex flex-wrap gap-2">
                          {doctor.available.map((time, index) => (
                            <Badge key={index} variant="outline">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={selectedDoctor === doctor.id ? 'default' : 'outline'}
                      size="sm"
                    >
                      {selectedDoctor === doctor.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Calendar and Booking */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              />
            </CardContent>
          </Card>

          {selectedDoctor && selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Reason for Visit</Label>
                  <Input placeholder="Brief description..." />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:30">3:30 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Consultation Type</Label>
                  <Select defaultValue="in-person">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="video">Video Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-gradient-primary" onClick={handleBooking}>
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;