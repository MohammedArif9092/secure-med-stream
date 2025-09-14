import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Stethoscope, Users, Pill, Shield, Info } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, role);
      // Navigate based on role
      switch (role) {
        case 'patient':
          navigate('/patient');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'pharmacist':
          navigate('/pharmacist');
          break;
        case 'admin':
          navigate('/admin');
          break;
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = {
    patient: { email: 'patient@demo.com', password: 'patient123' },
    doctor: { email: 'doctor@demo.com', password: 'doctor123' },
    pharmacist: { email: 'pharmacist@demo.com', password: 'pharmacist123' },
    admin: { email: 'admin@demo.com', password: 'admin123' },
  };

  const setDemoCredentials = () => {
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen bg-gradient-medical flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
            <Stethoscope className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">MediCare Portal</h1>
          <p className="text-muted-foreground mt-2">Secure Medical Records Management</p>
        </div>

        <Card className="shadow-medical">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your medical dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="patient" className="gap-1">
                  <Users className="w-4 h-4" />
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="gap-1">
                  <Stethoscope className="w-4 h-4" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger value="pharmacist" className="gap-1">
                  <Pill className="w-4 h-4" />
                  Pharmacist
                </TabsTrigger>
                <TabsTrigger value="admin" className="gap-1">
                  <Shield className="w-4 h-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value={role} className="space-y-4">
                <Alert className="bg-primary-light border-primary">
                  <Info className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-sm">
                    <strong>Demo Credentials:</strong><br />
                    Email: {demoCredentials[role].email}<br />
                    Password: {demoCredentials[role].password}
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={setDemoCredentials}
                    >
                      Use Demo Credentials
                    </Button>
                  </div>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Don't have an account? <a href="#" className="text-primary hover:underline">Register</a></p>
                  <p className="mt-1">Forgot password? <a href="#" className="text-primary hover:underline">Reset</a></p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;