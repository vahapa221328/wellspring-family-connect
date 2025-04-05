
import { Link } from "react-router-dom";
import { LucideHome, Users, Award, Calendar, Map, Heart } from "lucide-react";

export const FamilyNavigation = () => {
  return (
    <div className="bg-white shadow-sm dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between overflow-x-auto">
          <NavItem icon={<LucideHome className="w-5 h-5" />} label="Dashboard" to="/" active />
          <NavItem icon={<Users className="w-5 h-5" />} label="Family" to="/family" />
          <NavItem icon={<Calendar className="w-5 h-5" />} label="Tasks" to="/tasks" />
          <NavItem icon={<Award className="w-5 h-5" />} label="Challenges" to="/challenges" />
          <NavItem icon={<Map className="w-5 h-5" />} label="Trips" to="/trips" />
          <NavItem icon={<Heart className="w-5 h-5" />} label="Wellbeing" to="/wellbeing" />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, to, active = false }: { 
  icon: React.ReactNode; 
  label: string; 
  to: string;
  active?: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center py-3 px-5 ${
        active 
        ? "text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400" 
        : "text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};
