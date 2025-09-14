import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Package, AlertTriangle, TrendingUp, Search, Plus } from 'lucide-react';

const PharmacistInventory: React.FC = () => {
  const inventory = [
    { id: 1, name: 'Amoxicillin 500mg', stock: 250, minStock: 100, expiry: '2025-06-30', status: 'In Stock' },
    { id: 2, name: 'Paracetamol 500mg', stock: 45, minStock: 50, expiry: '2024-12-31', status: 'Low Stock' },
    { id: 3, name: 'Metformin 500mg', stock: 180, minStock: 100, expiry: '2025-03-15', status: 'In Stock' },
    { id: 4, name: 'Lisinopril 10mg', stock: 15, minStock: 30, expiry: '2024-09-30', status: 'Critical' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage medication stock</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <Package className="w-8 h-8 text-primary mb-2" />
            <p className="text-2xl font-bold">487</p>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <AlertTriangle className="w-8 h-8 text-warning mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Low Stock Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="w-8 h-8 text-success mb-2" />
            <p className="text-2xl font-bold">95%</p>
            <p className="text-sm text-muted-foreground">Stock Availability</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medication Inventory</CardTitle>
          <div className="mt-4">
            <Input placeholder="Search medications..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Medication</th>
                  <th className="text-left p-2">Current Stock</th>
                  <th className="text-left p-2">Min Stock</th>
                  <th className="text-left p-2">Expiry Date</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2">{item.stock}</td>
                    <td className="p-2">{item.minStock}</td>
                    <td className="p-2">{item.expiry}</td>
                    <td className="p-2">
                      <Badge 
                        variant={item.status === 'In Stock' ? 'default' : item.status === 'Low Stock' ? 'secondary' : 'destructive'}
                        className={
                          item.status === 'In Stock' ? 'bg-success/10 text-success' : 
                          item.status === 'Low Stock' ? 'bg-warning/10 text-warning' : ''
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">Reorder</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacistInventory;