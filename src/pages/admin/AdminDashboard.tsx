import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, Building2, FileText, TrendingUp, Shield, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { label: 'Total Users', value: '1,248', change: '+12%', icon: Users, color: 'text-primary' },
    { label: 'Pending Approvals', value: '8', change: '+3', icon: UserCheck, color: 'text-warning' },
    { label: 'Active Clinics', value: '42', change: '+2', icon: Building2, color: 'text-secondary' },
    { label: 'System Health', value: '99.9%', change: '↑', icon: Activity, color: 'text-success' },
  ];

  const pendingApprovals = [
    { id: 1, name: 'Dr. Amanda Wilson', type: 'Doctor', license: 'MD78901', date: '2024-03-15' },
    { id: 2, name: 'Dr. James Taylor', type: 'Doctor', license: 'MD78902', date: '2024-03-14' },
    { id: 3, name: 'PharmaCare Plus', type: 'Pharmacy', license: 'PH45678', date: '2024-03-13' },
  ];

  const systemActivity = [
    { id: 1, action: 'New doctor registration', user: 'Dr. Wilson', time: '2 hours ago', status: 'pending' },
    { id: 2, action: 'Pharmacy verified', user: 'MediPharm', time: '4 hours ago', status: 'completed' },
    { id: 3, action: 'Patient data exported', user: 'System', time: '6 hours ago', status: 'completed' },
    { id: 4, action: 'Backup completed', user: 'System', time: '12 hours ago', status: 'completed' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">System overview and management</p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => navigate('/admin/reports')}>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medical transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                <Badge variant="outline" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pending Approvals</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/approvals')}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <CardDescription>Review and approve new registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-3 rounded-lg bg-gradient-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{approval.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {approval.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          License: {approval.license}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Applied: {approval.date}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-7 px-2">
                        Review
                      </Button>
                      <Button size="sm" className="h-7 px-2 bg-success text-success-foreground">
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>System Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View Logs <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <CardDescription>Recent system events and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-success' : 'bg-warning'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.status === 'completed' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      activity.status === 'completed' ? 'bg-success/10 text-success' : ''
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>System Management</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Quick access to administrative functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/admin/doctors')}
            >
              <Users className="w-6 h-6 mb-2" />
              <span>Manage Users</span>
            </Button>
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/admin/clinics')}
            >
              <Building2 className="w-6 h-6 mb-2" />
              <span>Clinics</span>
            </Button>
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/admin/reports')}
            >
              <FileText className="w-6 h-6 mb-2" />
              <span>Reports</span>
            </Button>
            <Button 
              variant="secondary" 
              className="h-auto flex-col py-4"
              onClick={() => navigate('/admin/settings')}
            >
              <Shield className="w-6 h-6 mb-2" />
              <span>Security</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;