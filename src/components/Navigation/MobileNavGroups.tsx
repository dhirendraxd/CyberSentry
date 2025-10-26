
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navGroups } from './navigationConfig';

interface MobileNavGroupsProps {
  onNavigate: () => void;
}

const MobileNavGroups: React.FC<MobileNavGroupsProps> = ({ onNavigate }) => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex flex-col space-y-1">
      {navGroups.map((group) => {
        const Icon = group.icon;
        
        // If it's a single link
        if (!group.items) {
          const isActive = isActivePath(group.path);
          return (
            <Link
              key={group.path}
              to={group.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                isActive
                  ? "bg-cyber-purple/20 text-cyber-purple"
                  : "text-gray-300 hover:bg-cyber-purple/10 hover:text-white"
              )}
              onClick={onNavigate}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{group.name}</span>
            </Link>
          );
        }
        
        // If it's a group, create a collapsible section
        const isActive = group.items.some((item: any) => isActivePath(item.path));
        return (
          <div key={group.name} className="space-y-1">
            <div 
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-md cursor-pointer",
                isActive ? "bg-cyber-purple/20 text-cyber-purple" : "text-gray-300"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{group.name}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            <div className="pl-6 space-y-1 border-l border-cyber-purple/20 ml-6">
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isItemActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                      isItemActive
                        ? "bg-cyber-purple/20 text-cyber-purple"
                        : "text-gray-300 hover:bg-cyber-purple/10 hover:text-white"
                    )}
                    onClick={onNavigate}
                  >
                    <ItemIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default MobileNavGroups;
