import React from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelRightClose, Settings, ShoppingCart, Users, BarChart3, LayoutDashboard } from 'lucide-react'; // Example icons

// This is a placeholder for actual navigation items.
// In a real app, this might come from a config or be passed as children.
const defaultNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
  { href: "/dashboard/products", label: "Products", icon: <Users className="h-4 w-4" /> }, // Placeholder icon
  { href: "/dashboard/customers", label: "Customers", icon: <Users className="h-4 w-4" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> }, // Placeholder icon
];

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  // children prop can be used to pass NavigationMenu or other content
  children?: React.ReactNode;
  navItems?: { href: string; label: string; icon?: React.ReactNode }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isCollapsed = false,
  onToggleCollapse,
  children,
  navItems = defaultNavItems
}) => {
  console.log("Rendering Sidebar, collapsed:", isCollapsed);

  return (
    <aside
      className={cn(
        "bg-gray-50 border-r flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-2 border-b h-16">
        {!isCollapsed && (
          <div className="font-semibold text-lg px-2 truncate">
            Dashboard
          </div>
        )}
        {onToggleCollapse && (
          <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="ml-auto">
            {isCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            <span className="sr-only">{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
          </Button>
        )}
      </div>

      <ScrollArea className="flex-grow">
        {children ? (
            <div className={cn("p-2", isCollapsed ? "space-y-1" : "space-y-1 p-2")}>{children}</div>
        ) : (
          <nav className={cn("flex flex-col gap-1 p-2", isCollapsed ? "items-center" : "")}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm",
                  isCollapsed ? "px-0 justify-center h-10 w-10" : "px-3"
                  // Add active link styling here based on current route
                )}
                asChild // To allow Link component from react-router-dom if used
              >
                <a href={item.href}> {/* Replace with <Link> from react-router-dom if available */}
                  {item.icon && React.cloneElement(item.icon as React.ReactElement, { className: cn("h-4 w-4", !isCollapsed && "mr-2") })}
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {isCollapsed && <span className="sr-only">{item.label}</span>}
                </a>
              </Button>
            ))}
          </nav>
        )}
      </ScrollArea>

      {!isCollapsed && (
        <div className="p-4 border-t mt-auto">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} YourApp</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;