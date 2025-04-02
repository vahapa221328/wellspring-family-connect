
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell, Menu, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar,
  isAuthenticated = false 
}) => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
              <span className="font-bold text-white">FW</span>
            </div>
            <span className="font-heading font-semibold text-xl hidden sm:block">
              FamilyWell
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="ghost" size={isMobile ? "sm" : "default"}>Log in</Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size={isMobile ? "sm" : "default"}>Sign up</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
