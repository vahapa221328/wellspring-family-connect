
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, Droplets, Brain, BarChart3, MessageSquare, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <Home size={20} />
  },
  {
    label: 'Family',
    path: '/family',
    icon: <Users size={20} />
  },
  {
    label: 'Wellness',
    path: '/wellness',
    icon: <Droplets size={20} />
  },
  {
    label: 'Development',
    path: '/development',
    icon: <Brain size={20} />
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 size={20} />
  },
  {
    label: 'Chat',
    path: '/chat',
    icon: <MessageSquare size={20} />
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings size={20} />
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-16 bottom-0 left-0 w-64 border-r bg-background z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full py-4">
          <div className="flex-1 px-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="px-4 py-2">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-2">Family Premium</div>
              <p className="text-sm mb-3">Upgrade to connect with more family members</p>
              <Link to="/premium">
                <button className="bg-brand-blue hover:bg-brand-blue/90 text-white w-full py-1.5 px-3 text-sm rounded-md transition-colors">
                  Upgrade Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
