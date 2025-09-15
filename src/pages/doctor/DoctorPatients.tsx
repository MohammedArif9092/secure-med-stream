import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, UserPlus, Phone, Mail, Calendar, FileText, Edit, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DoctorPatients: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch patients from Supabase
  useEffect(() => {
    fetchPatients();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('patients-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'patients' },
        () => {
          fetchPatients();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('name');

      if (error) throw error;
      setPatients(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching patients",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const newPatient = {
        patient_id: formData.get('patient_id') as string,
        name: formData.get('name') as string,
        age: parseInt(formData.get('age') as string),
        gender: formData.get('gender') as string,
        blood_group: formData.get('blood_group') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        address: formData.get('address') as string,
        conditions: (formData.get('conditions') as string)?.split(',').map(c => c.trim()) || [],
        last_visit: new Date().toISOString().split('T')[0],
      };

      const { error } = await supabase
        .from('patients')
        .insert([newPatient]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Patient added successfully",
      });
      setIsAddDialogOpen(false);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: "Error adding patient",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const updatedPatient = {
        name: formData.get('name') as string,
        age: parseInt(formData.get('age') as string),
        gender: formData.get('gender') as string,
        blood_group: formData.get('blood_group') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        address: formData.get('address') as string,
        conditions: (formData.get('conditions') as string)?.split(',').map(c => c.trim()) || [],
      };

      const { error } = await supabase
        .from('patients')
        .update(updatedPatient)
        .eq('id', selectedPatient.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Patient updated successfully",
      });
      setIsUpdateDialogOpen(false);
      setSelectedPatient(null);
    } catch (error: any) {
      toast({
        title: "Error updating patient",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openUpdateDialog = (patient: any) => {
    setSelectedPatient(patient);
    setIsUpdateDialogOpen(true);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patient_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Patients</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the patient's information below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient_id">Patient ID</Label>
                  <Input id="patient_id" name="patient_id" placeholder="PAT006" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" type="number" placeholder="30" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood_group">Blood Group</Label>
                  <Select name="blood_group">
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="555-0100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conditions">Medical Conditions</Label>
                  <Input id="conditions" name="conditions" placeholder="Diabetes, Hypertension" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" placeholder="123 Main St, City" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Patient</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
          <CardDescription>Find patients by name or ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <CardDescription>ID: {patient.patient_id}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Age:</span>
                  <span>{patient.age} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Gender:</span>
                  <span>{patient.gender}</span>
                </div>
                {patient.blood_group && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Blood Group:</span>
                    <span>{patient.blood_group}</span>
                  </div>
                )}
                {patient.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span>{patient.phone}</span>
                  </div>
                )}
                {patient.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                )}
                {patient.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate">{patient.address}</span>
                  </div>
                )}
                {patient.conditions && patient.conditions.length > 0 && (
                  <div className="pt-2 border-t">
                    <span className="text-muted-foreground text-xs">Conditions:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.conditions.map((condition: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {patient.last_visit && (
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Last visit: {new Date(patient.last_visit).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openUpdateDialog(patient)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Update
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-3 w-3 mr-1" />
                  Records
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Update Patient Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Patient Information</DialogTitle>
            <DialogDescription>Edit the patient's information below.</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <form onSubmit={handleUpdatePatient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="update_name">Full Name</Label>
                  <Input id="update_name" name="name" defaultValue={selectedPatient.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update_age">Age</Label>
                  <Input id="update_age" name="age" type="number" defaultValue={selectedPatient.age} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update_gender">Gender</Label>
                  <Select name="gender" defaultValue={selectedPatient.gender} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update_blood_group">Blood Group</Label>
                  <Select name="blood_group" defaultValue={selectedPatient.blood_group || ""}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update_phone">Phone</Label>
                  <Input id="update_phone" name="phone" type="tel" defaultValue={selectedPatient.phone || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update_email">Email</Label>
                  <Input id="update_email" name="email" type="email" defaultValue={selectedPatient.email || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update_conditions">Medical Conditions</Label>
                  <Input id="update_conditions" name="conditions" defaultValue={selectedPatient.conditions?.join(', ') || ""} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="update_address">Address</Label>
                <Textarea id="update_address" name="address" defaultValue={selectedPatient.address || ""} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => {
                  setIsUpdateDialogOpen(false);
                  setSelectedPatient(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit">Update Patient</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorPatients;