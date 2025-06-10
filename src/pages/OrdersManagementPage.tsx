import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Assuming form context setup if using react-hook-form
import { Badge } from '@/components/ui/badge';
import { Bell, ShoppingCart, Users, PackageSearch, BarChart3, Settings, LogOut, Search, PlusCircle, FileText, Filter, Edit3 } from 'lucide-react';
import { useForm } from 'react-hook-form'; // For Dialog Form

const dummyOrders = [
  { id: 'ORD001', customer: 'Alice Wonderland', date: '2024-07-28', total: '$150.00', status: 'Processing', items: 3 },
  { id: 'ORD002', customer: 'Bob The Builder', date: '2024-07-28', total: '$75.50', status: 'Shipped', items: 1 },
  { id: 'ORD003', customer: 'Charlie Brown', date: '2024-07-27', total: '$220.00', status: 'Delivered', items: 5 },
  { id: 'ORD004', customer: 'Diana Prince', date: '2024-07-27', total: '$99.99', status: 'Pending', items: 2 },
  { id: 'ORD005', customer: 'Edward Scissorhands', date: '2024-07-26', total: '$45.20', status: 'Cancelled', items: 1 },
];

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Pending' | 'Cancelled';

const getStatusBadgeVariant = (status: OrderStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Delivered': return 'default'; // Greenish in many themes default
    case 'Shipped': return 'secondary'; // Bluish/grayish
    case 'Processing': return 'outline'; // Yellowish/orangish with outline
    case 'Pending': return 'outline'; // Grayish/yellowish with outline
    case 'Cancelled': return 'destructive';
    default: return 'default';
  }
};


const OrdersManagementPage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const form = useForm(); // For potential dialog forms

  console.log('OrdersManagementPage loaded');
  
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
            <Input placeholder="Search orders..." className="pl-10 w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full"><Bell className="h-5 w-5" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Admin User" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <ScrollArea className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Orders Management</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Order</DialogTitle>
                        <DialogDescription>
                            Manually create a new order. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Basic Form Example - use react-hook-form for real applications */}
                    <div className="grid gap-4 py-4">
                        <Form {...form}> {/* Pass form instance */}
                           <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Customer Name</FormLabel>
                                        <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="orderTotal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Order Total</FormLabel>
                                        <FormControl><Input type="number" placeholder="e.g., 99.99" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Form>
                    </div>
                    <DialogFooter>
                        <Button type="submit" form="order-form">Save Order</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Input placeholder="Filter by Customer..." className="max-w-xs" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Apply Filters</Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right">{order.total}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status as OrderStatus)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center space-x-1">
                      <Button variant="ghost" size="icon"><FileText className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Edit3 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </ScrollArea>
      </div>
    </div>
  );
};

export default OrdersManagementPage;