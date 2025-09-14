import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Eye, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PatientRecords: React.FC = () => {
  const medicalRecords = [
    {
      id: 1,
      type: 'Lab Report',
      title: 'Complete Blood Count',
      doctor: 'Dr. Sarah Johnson',
      clinic: 'City Medical Center',
      date: '2024-03-10',
      status: 'Normal'
    },
    {
      id: 2,
      type: 'Prescription',
      title: 'General Checkup',
      doctor: 'Dr. Michael Chen',
      clinic: 'Downtown Clinic',
      date: '2024-03-05',
      status: 'Active'
    },
    {
      id: 3,
      type: 'X-Ray',
      title: 'Chest X-Ray',
      doctor: 'Dr. Emily Brown',
      clinic: 'City Medical Center',
      date: '2024-02-28',
      status: 'Normal'
    },
    {
      id: 4,
      type: 'MRI Scan',
      title: 'Brain MRI',
      doctor: 'Dr. Robert Wilson',
      clinic: 'Advanced Imaging Center',
      date: '2024-02-15',
      status: 'Review Required'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prescription': return 'bg-primary/10 text-primary';
      case 'Lab Report': return 'bg-secondary/10 text-secondary';
      case 'X-Ray': return 'bg-info/10 text-info';
      case 'MRI Scan': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Medical Records</h1>
          <p className="text-muted-foreground mt-1">View and download your medical history</p>
        </div>
        <Button className="bg-gradient-primary">
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Record Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="prescription">Prescriptions</SelectItem>
                <SelectItem value="lab">Lab Reports</SelectItem>
                <SelectItem value="xray">X-Rays</SelectItem>
                <SelectItem value="mri">MRI Scans</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="From Date" />
            <Input type="date" placeholder="To Date" />
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="grid gap-4">
        {medicalRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-medical transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getTypeColor(record.type)}>
                      {record.type}
                    </Badge>
                    <Badge variant="outline">
                      {record.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{record.title}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Doctor: {record.doctor}</p>
                    <p>Clinic: {record.clinic}</p>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {record.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientRecords;