
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navGroups } from './navigationConfig';

const NavGroups: React.FC = () => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const isActiveGroup = (group: any) => {
    if (group.path) {
      return isActivePath(group.path);
    }
    if (group.items) {
      return group.items.some((item: any) => isActivePath(item.path));
    }
    return false;
  };

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navGroups.map((group) => {
        const Icon = group.icon;
        const isActive = isActiveGroup(group);
        
        // Single link item
        if (!group.items) {
          return (
            <Link
              key={group.path}
              to={group.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-cyber-purple/20 text-cyber-purple"
                  : "text-gray-300 hover:bg-cyber-purple/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{group.name}</span>
            </Link>
          );
        }
        
        // Group with dropdown
        return (
          <DropdownMenu key={group.name}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 h-auto rounded-md transition-colors",
                  isActive
                    ? "bg-cyber-purple/20 text-cyber-purple"
                    : "text-gray-300 hover:bg-cyber-purple/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{group.name}</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48 bg-cyber-dark-purple border-cyber-purple/30">
              <DropdownMenuLabel className="text-xs text-gray-400">{group.description}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-cyber-purple/20" />
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isItemActive = isActivePath(item.path);
                
                return (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer",
                        isItemActive ? "text-cyber-purple" : "text-gray-300"
                      )}
                    >
                      <ItemIcon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
};

export default NavGroups;
