import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Download, Eye, Upload, Filter, Calendar } from 'lucide-react';

const DoctorRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const records = {
    prescriptions: [
      {
        id: 'RX001',
        patient: 'John Smith',
        date: '2024-03-15',
        diagnosis: 'Hypertension',
        medications: 3,
        status: 'active',
      },
      {
        id: 'RX002',
        patient: 'Sarah Johnson',
        date: '2024-03-14',
        diagnosis: 'Type 2 Diabetes',
        medications: 2,
        status: 'active',
      },
    ],
    labReports: [
      {
        id: 'LAB001',
        patient: 'Michael Chen',
        date: '2024-03-10',
        type: 'Blood Test',
        status: 'completed',
        critical: false,
      },
      {
        id: 'LAB002',
        patient: 'Emily Davis',
        date: '2024-03-08',
        type: 'Urine Analysis',
        status: 'pending',
        critical: false,
      },
    ],
    scans: [
      {
        id: 'SCAN001',
        patient: 'Robert Brown',
        date: '2024-03-05',
        type: 'X-Ray',
        bodyPart: 'Chest',
        status: 'reviewed',
      },
      {
        id: 'SCAN002',
        patient: 'Lisa Anderson',
        date: '2024-03-03',
        type: 'MRI',
        bodyPart: 'Brain',
        status: 'pending review',
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground mt-1">Access and manage patient medical records</p>
        </div>
        <Button className="bg-gradient-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Record
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by patient name or record ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records Tabs */}
      <Tabs defaultValue="prescriptions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
          <TabsTrigger value="scans">Scans & Imaging</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Prescriptions</CardTitle>
              <CardDescription>Prescriptions issued in the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {records.prescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 rounded-lg bg-gradient-card hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-medium">{prescription.id}</span>
                          <Badge className="bg-success/10 text-success">
                            {prescription.status}
                          </Badge>
                        </div>
                        <p className="font-medium">{prescription.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          Diagnosis: {prescription.diagnosis}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{prescription.date}</span>
                          <span>{prescription.medications} medications</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Reports</CardTitle>
              <CardDescription>Blood tests, urine analysis, and other lab results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {records.labReports.map((report) => (
                  <div key={report.id} className="p-4 rounded-lg bg-gradient-card hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-medium">{report.id}</span>
                          <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="font-medium">{report.patient}</p>
                        <p className="text-sm text-muted-foreground">Type: {report.type}</p>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scans & Imaging</CardTitle>
              <CardDescription>X-rays, MRI, CT scans, and other imaging reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {records.scans.map((scan) => (
                  <div key={scan.id} className="p-4 rounded-lg bg-gradient-card hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-medium">{scan.id}</span>
                          <Badge variant="outline">
                            {scan.status}
                          </Badge>
                        </div>
                        <p className="font-medium">{scan.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {scan.type} - {scan.bodyPart}
                        </p>
                        <p className="text-sm text-muted-foreground">{scan.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorRecords;