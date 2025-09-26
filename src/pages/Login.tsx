import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Stethoscope, Users, Pill, Shield, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup, session } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password, fullName, role);
        setError('');
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <CardTitle>{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
            <CardDescription>
              {isSignUp ? 'Register for a new account' : 'Access your medical dashboard'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isSignUp && (
                <Tabs value={role} onValueChange={setRole}>
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
                </Tabs>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                )}

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
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
                  </Button>
                </div>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                {isSignUp ? (
                  <p>
                    Already have an account?{' '}
                    <button
                      onClick={() => {
                        setIsSignUp(false);
                        setError('');
                      }}
                      className="text-primary hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <button
                      onClick={() => {
                        setIsSignUp(true);
                        setError('');
                      }}
                      className="text-primary hover:underline"
                    >
                      Register
                    </button>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;