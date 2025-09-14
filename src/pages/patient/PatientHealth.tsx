import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Heart, Droplets, Weight, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const PatientHealth: React.FC = () => {
  const vitals = [
    {
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'Normal',
      icon: Heart,
      color: 'text-success',
      trend: 'stable'
    },
    {
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'Normal',
      icon: Activity,
      color: 'text-success',
      trend: 'down'
    },
    {
      label: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      status: 'Normal',
      icon: Droplets,
      color: 'text-success',
      trend: 'stable'
    },
    {
      label: 'Weight',
      value: '75',
      unit: 'kg',
      status: 'Overweight',
      icon: Weight,
      color: 'text-warning',
      trend: 'up'
    }
  ];

  const healthGoals = [
    { goal: 'Daily Steps', current: 6500, target: 10000, unit: 'steps' },
    { goal: 'Water Intake', current: 1.8, target: 2.5, unit: 'liters' },
    { goal: 'Sleep Hours', current: 6.5, target: 8, unit: 'hours' },
    { goal: 'Exercise', current: 3, target: 5, unit: 'days/week' }
  ];

  const conditions = [
    { name: 'Hypertension', status: 'Controlled', since: '2022' },
    { name: 'Type 2 Diabetes', status: 'Pre-diabetic', since: '2023' }
  ];

  const allergies = ['Penicillin', 'Peanuts', 'Dust'];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-warning" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-success" />;
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Health Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your vital signs and health metrics</p>
      </div>

      {/* Vital Signs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Vital Signs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitals.map((vital, index) => (
            <Card key={index} className="hover:shadow-medical transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <vital.icon className={`w-8 h-8 ${vital.color} opacity-80`} />
                  {getTrendIcon(vital.trend)}
                </div>
                <p className="text-2xl font-bold">
                  {vital.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{vital.unit}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">{vital.label}</p>
                <Badge 
                  variant={vital.status === 'Normal' ? 'default' : 'secondary'}
                  className={`mt-2 ${vital.status === 'Normal' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}
                >
                  {vital.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Health Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Health Goals</CardTitle>
          <CardDescription>Track your daily health objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{goal.goal}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medical Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Conditions</CardTitle>
            <CardDescription>Active health conditions being monitored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={index} className="p-3 bg-gradient-card rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{condition.name}</p>
                      <p className="text-sm text-muted-foreground">Since {condition.since}</p>
                    </div>
                    <Badge variant={condition.status === 'Controlled' ? 'default' : 'secondary'}>
                      {condition.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Allergies
            </CardTitle>
            <CardDescription>Known allergies and sensitivities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <Badge key={index} variant="outline" className="py-2 px-3">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientHealth;