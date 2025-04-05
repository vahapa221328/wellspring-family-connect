
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Heart, Calendar, LucideHome, Users, Award, Map, MessageSquare, LogOut } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const FamilyNavigation = () => {
  const location = useLocation();
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const items = [
    { name: "Home", path: "/", icon: LucideHome },
    { name: "Family", path: "/family", icon: Users },
    { name: "Tasks", path: "/tasks", icon: Calendar },
    { name: "Wellbeing", path: "/wellbeing", icon: Heart },
    { name: "Challenges", path: "/challenges", icon: Award },
    { name: "Trips", path: "/trips", icon: Map },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <div className="flex space-x-1 md:space-x-2 py-3 min-w-max">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium md:px-3 md:py-2",
                    isActive(item.path)
                      ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              );
            })}
            
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium md:px-3 md:py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 ml-auto"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
