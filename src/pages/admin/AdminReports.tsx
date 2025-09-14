import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, TrendingUp, Users, Activity, DollarSign } from 'lucide-react';

const AdminReports: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Reports</h1>
          <p className="text-muted-foreground mt-1">Generate and download comprehensive reports</p>
        </div>
        <Button className="bg-gradient-primary">
          <FileText className="w-4 h-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <Users className="w-8 h-8 text-primary mb-2" />
            <p className="text-2xl font-bold">1,248</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Activity className="w-8 h-8 text-secondary mb-2" />
            <p className="text-2xl font-bold">3,421</p>
            <p className="text-sm text-muted-foreground">Appointments This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <FileText className="w-8 h-8 text-info mb-2" />
            <p className="text-2xl font-bold">8,752</p>
            <p className="text-sm text-muted-foreground">Prescriptions Issued</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="w-8 h-8 text-success mb-2" />
            <p className="text-2xl font-bold">+23%</p>
            <p className="text-sm text-muted-foreground">Growth Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Select and download system reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'User Activity Report', desc: 'Detailed user engagement and activity metrics', icon: Users },
            { title: 'Medical Records Report', desc: 'Overview of all medical records and prescriptions', icon: FileText },
            { title: 'Financial Report', desc: 'Revenue and transaction analysis', icon: DollarSign },
            { title: 'System Performance Report', desc: 'Technical metrics and system health', icon: Activity },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <report.icon className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-muted-foreground">{report.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="this-month">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;