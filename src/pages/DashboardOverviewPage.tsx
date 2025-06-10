import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DataWidgetCard from '@/components/DataWidgetCard';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bell, DollarSign, ShoppingCart, Users, PackageSearch, BarChartHorizontalBig, Settings, LogOut, Search } from 'lucide-react';

const chartData = [
  { month: 'Jan', sales: 4000, orders: 2400 },
  { month: 'Feb', sales: 3000, orders: 1398 },
  { month: 'Mar', sales: 2000, orders: 9800 },
  { month: 'Apr', sales: 2780, orders: 3908 },
  { month: 'May', sales: 1890, orders: 4800 },
  { month: 'Jun', sales: 2390, orders: 3800 },
];

const chartConfig = {
  sales: { label: 'Sales', color: 'hsl(var(--chart-1))' },
  orders: { label: 'Orders', color: 'hsl(var(--chart-2))' },
};

const DashboardOverviewPage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  console.log('DashboardOverviewPage loaded');

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <BarChartHorizontalBig className="h-4 w-4" /> },
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
            <Input placeholder="Search dashboard..." className="pl-10 w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>You have 3 new orders.</DropdownMenuItem>
                <DropdownMenuItem>Product "Toy Car" is low on stock.</DropdownMenuItem>
                <DropdownMenuItem>System update scheduled for tonight.</DropdownMenuItem>
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
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <ScrollArea className="flex-1 p-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Dashboard Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <DataWidgetCard title="Today's Sales" value="$1,250.75" icon={<DollarSign />} trend="up" trendText="+15% from yesterday" description="Total revenue today" />
            <DataWidgetCard title="New Orders" value="64" icon={<ShoppingCart />} trend="up" trendText="+5" description="Orders received today" />
            <DataWidgetCard title="Active Customers" value="320" icon={<Users />} trend="neutral" trendText="Same as yesterday" description="Customers online now" />
            <DataWidgetCard title="Low Stock Items" value="8" icon={<PackageSearch />} trend="down" trendText="-2 resolved" description="Items needing attention" />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Sales & Orders Trend (Last 6 Months)</h2>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                  <RechartsTooltip
                    cursor={{ fill: 'hsl(var(--muted))', radius: '4px' }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {/* Placeholder for other sections like recent activity, top products etc. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Recent Activity</h3>
                <ul className="space-y-3">
                    <li className="text-sm text-gray-600 dark:text-gray-300">Order #12345 placed by John D.</li>
                    <li className="text-sm text-gray-600 dark:text-gray-300">New product "Plush Bear" added.</li>
                    <li className="text-sm text-gray-600 dark:text-gray-300">Customer Jane S. registered.</li>
                </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">Quick Links</h3>
                 <div className="flex flex-col space-y-2">
                    <Button variant="outline" className="justify-start">View All Orders</Button>
                    <Button variant="outline" className="justify-start">Add New Product</Button>
                    <Button variant="outline" className="justify-start">Manage Customers</Button>
                 </div>
            </div>
          </div>

        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;