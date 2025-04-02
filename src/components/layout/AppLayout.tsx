
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  isAuthenticated?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ isAuthenticated = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onToggleSidebar={toggleSidebar} 
        isAuthenticated={isAuthenticated} 
      />
      
      <div className="flex flex-1">
        {isAuthenticated && (
          <Sidebar 
            isOpen={sidebarOpen}
            closeSidebar={closeSidebar}
          />
        )}
        
        <main className={`flex-1 transition-all duration-300 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <div className="container px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
