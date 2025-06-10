import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bell, ShoppingCart, Users, PackageSearch, BarChart3, Settings, LogOut, Search, CalendarDays, Download, Filter } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";


const salesData = [
  { date: '2024-07-01', sales: 250, revenue: 2500 }, { date: '2024-07-02', sales: 310, revenue: 3100 },
  { date: '2024-07-03', sales: 280, revenue: 2800 }, { date: '2024-07-04', sales: 400, revenue: 4000 },
  { date: '2024-07-05', sales: 350, revenue: 3500 }, { date: '2024-07-06', sales: 420, revenue: 4200 },
  { date: '2024-07-07', sales: 380, revenue: 3800 },
];
const trafficSourcesData = [ { name: 'Organic Search', value: 400 }, { name: 'Direct', value: 300 }, { name: 'Referral', value: 200 }, { name: 'Social Media', value: 100 },];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const chartConfigSales = { revenue: { label: "Revenue", color: "hsl(var(--chart-1))" }, sales: { label: "Sales Count", color: "hsl(var(--chart-2))" } };
const chartConfigTraffic = { value: { label: "Visitors" } };


const AnalyticsPage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(2024, 6, 1), to: new Date(2024, 6, 7) });
  console.log('AnalyticsPage loaded');

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
            <Input placeholder="Search analytics reports..." className="pl-10 w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
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
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Business Analytics</h1>
            <div className="flex items-center space-x-2">
                <Select defaultValue="last_7_days">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sales_overview">Sales Overview</SelectItem>
                        <SelectItem value="customer_insights">Customer Insights</SelectItem>
                        <SelectItem value="product_performance">Product Performance</SelectItem>
                    </SelectContent>
                </Select>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className="w-[260px] justify-start text-left font-normal"
                    >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(dateRange.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date range</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
                <Button><Filter className="mr-2 h-4 w-4" /> Apply</Button>
            </div>
          </div>

          <Tabs defaultValue="sales_trends" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="sales_trends">Sales Trends</TabsTrigger>
              <TabsTrigger value="traffic_sources">Traffic Sources</TabsTrigger>
              <TabsTrigger value="customer_segments">Customer Segments</TabsTrigger>
            </TabsList>
            <TabsContent value="sales_trends">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Revenue & Volume</CardTitle>
                        <CardDescription>Showing data for the selected period.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfigSales} className="min-h-[400px] w-full">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={salesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <XAxis dataKey="date" tickFormatter={(str) => format(new Date(str), "MMM d")} stroke="hsl(var(--muted-foreground))"/>
                                    <YAxis yAxisId="left" label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} stroke="hsl(var(--muted-foreground))"/>
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Sales Count', angle: -90, position: 'insideRight' }} stroke="hsl(var(--muted-foreground))"/>
                                    <RechartsTooltip content={<ChartTooltipContent indicator="line" />}/>
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                                    <Line yAxisId="right" type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="traffic_sources">
                 <Card>
                    <CardHeader>
                        <CardTitle>Website Traffic Sources</CardTitle>
                        <CardDescription>Distribution of visitors by source.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ChartContainer config={chartConfigTraffic} className="min-h-[350px] w-full max-w-md">
                             <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <RechartsTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={trafficSourcesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                        {trafficSourcesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="customer_segments">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Segmentation</CardTitle>
                        <CardDescription>Placeholder for customer segmentation charts (e.g., by demographics, purchase behavior).</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center py-12">
                        <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Customer segmentation data will be displayed here.</p>
                        <p className="text-sm text-muted-foreground">This might include charts for new vs. returning customers, high-value customers, etc.</p>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AnalyticsPage;