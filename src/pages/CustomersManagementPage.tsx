import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, ShoppingCart, Users, PackageSearch, BarChart3, Settings, LogOut, Search, UserPlus, Mail, Phone, MapPin } from 'lucide-react';

const dummyCustomers = [
  { id: 'CUST001', name: 'Alice Wonderland', email: 'alice@example.com', phone: '555-0101', city: 'New York', totalOrders: 5, totalSpent: '$750.00', status: 'Active' },
  { id: 'CUST002', name: 'Bob The Builder', email: 'bob@example.com', phone: '555-0102', city: 'Los Angeles', totalOrders: 2, totalSpent: '$150.20', status: 'Active' },
  { id: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0103', city: 'Chicago', totalOrders: 10, totalSpent: '$1200.50', status: 'VIP' },
  { id: 'CUST004', name: 'Diana Prince', email: 'diana@example.com', phone: '555-0104', city: 'Washington D.C.', totalOrders: 1, totalSpent: '$99.99', status: 'New' },
  { id: 'CUST005', name: 'Edward Scissorhands', email: 'edward@example.com', phone: '555-0105', city: 'San Francisco', totalOrders: 0, totalSpent: '$0.00', status: 'Inactive' },
];

type CustomerStatus = 'Active' | 'VIP' | 'New' | 'Inactive';

const getCustomerStatusBadgeVariant = (status: CustomerStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Active': return 'default';
    case 'VIP': return 'secondary'; // Could be gold/purple like in some themes
    case 'New': return 'outline';
    case 'Inactive': return 'destructive';
    default: return 'default';
  }
};

const CustomersManagementPage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof dummyCustomers[0] | null>(null);
  console.log('CustomersManagementPage loaded');
  
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <BarChart3 className="h-4 w-4" /> },
    { href: "/dashboard/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { href: "/dashboard/products", label: "Products", icon: <PackageSearch className="h-4 w-4" /> },
    { href: "/dashboard/customers", label: "Customers", icon: <Users className="h-4 w-4" /> },
    { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
    // { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        navItems={navItems}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center border-b dark:border-gray-700">
           <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search customers by name or email..." className="pl-10 w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" /> Add Customer</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full"><Bell className="h-5 w-5" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"><DropdownMenuItem>No new notifications</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Admin User" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 <DropdownMenuLabel>My Account</DropdownMenuLabel><DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem><DropdownMenuItem>Settings</DropdownMenuItem><DropdownMenuSeparator />
                <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <ScrollArea className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Customers Management</h1>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[80px]">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dummyCustomers.map((customer) => (
                    <TableRow key={customer.id} onClick={() => setSelectedCustomer(customer)} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${customer.name.split(' ')[0]}`} alt={customer.name} />
                                <AvatarFallback>{customer.name.substring(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.city}</TableCell>
                        <TableCell><Badge variant={getCustomerStatusBadgeVariant(customer.status as CustomerStatus)}>{customer.status}</Badge></TableCell>
                        <TableCell className="text-right">{customer.totalSpent}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                <Pagination className="mt-4 p-4 border-t dark:border-gray-700">
                    <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="lg:col-span-1">
                {selectedCustomer ? (
                    <Card>
                        <CardHeader className="flex flex-row items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${selectedCustomer.name.split(' ')[0]}`} alt={selectedCustomer.name} />
                                <AvatarFallback>{selectedCustomer.name.substring(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{selectedCustomer.name}</CardTitle>
                                <CardDescription>ID: {selectedCustomer.id} - <Badge variant={getCustomerStatusBadgeVariant(selectedCustomer.status as CustomerStatus)}>{selectedCustomer.status}</Badge></CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="flex items-center text-sm"><Mail className="mr-2 h-4 w-4 text-muted-foreground" /> {selectedCustomer.email}</p>
                            <p className="flex items-center text-sm"><Phone className="mr-2 h-4 w-4 text-muted-foreground" /> {selectedCustomer.phone}</p>
                            <p className="flex items-center text-sm"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> {selectedCustomer.city}</p>
                            <div className="border-t dark:border-gray-700 pt-3 mt-3">
                                <p className="text-sm">Total Orders: {selectedCustomer.totalOrders}</p>
                                <p className="text-sm">Total Spent: {selectedCustomer.totalSpent}</p>
                            </div>
                             <Button className="w-full mt-2">View Full Profile</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="flex flex-col items-center justify-center h-full text-center">
                        <CardHeader>
                            <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                            <CardTitle>Select a Customer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Click on a customer from the list to view their details here.</CardDescription>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CustomersManagementPage;