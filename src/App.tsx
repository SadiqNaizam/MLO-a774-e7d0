import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import ProductsManagementPage from "./pages/ProductsManagementPage";
import CustomersManagementPage from "./pages/CustomersManagementPage";
import AnalyticsPage from "./pages/AnalyticsPage";

const queryClient = new QueryClient();

// Placeholder for a Login Page - In a real app, this would be a separate component
const LoginPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="p-8 bg-white shadow-md rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="mb-4">This is a placeholder login page.</p>
      <p className="mb-4">
        In a real application, you would authenticate here. <br/>
        For now, we will redirect to the dashboard.
      </p>
      <Button onClick={() => (window.location.href = "/dashboard")}>
        Proceed to Dashboard
      </Button>
    </div>
  </div>
);

// Placeholder for Authentication check
const isAuthenticated = () => {
  // Replace with actual auth check logic (e.g., check for token in localStorage)
  // For this example, we'll assume the user is authenticated if they are not on the login page.
  // This is a very basic check and should be replaced with a robust solution.
  return sessionStorage.getItem("isLoggedIn") === "true" || true; // Default to true for example purposes
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // Store intended location to redirect after login
    // Or simply redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login Page Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboard Routes - Protected */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardOverviewPage /></ProtectedRoute>} />
          <Route path="/dashboard/orders" element={<ProtectedRoute><OrdersManagementPage /></ProtectedRoute>} />
          <Route path="/dashboard/products" element={<ProtectedRoute><ProductsManagementPage /></ProtectedRoute>} />
          <Route path="/dashboard/customers" element={<ProtectedRoute><CustomersManagementPage /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          
          {/* Default redirect to dashboard if authenticated, or login if not */}
          <Route 
            path="/" 
            element={
              isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } 
          />

          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;