
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks } from '@/config/navigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MobileMenuProps {
  user: any;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, handleSignIn, handleSignOut }) => {
  const location = useLocation();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-cyber-purple/10 hover:text-cyber-purple">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-cyber-dark-purple border-cyber-purple/20 p-0 w-72">
          <div className="pt-6 pb-2 px-4 border-b border-cyber-purple/10">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-cyber-purple/20 p-2">
                  <User className="h-5 w-5 text-cyber-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user.email ? user.email.split('@')[0] : 'User'}</p>
                  <p className="text-xs text-gray-400">{user.email || 'Authenticated user'}</p>
                </div>
              </div>
            ) : (
              <Button 
                className="w-full bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                onClick={handleSignIn}
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign In with Google
              </Button>
            )}
          </div>
          
          <div className="px-2 py-4">
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-cyber-purple/20 text-cyber-purple"
                        : "text-gray-300 hover:bg-cyber-purple/10 hover:text-cyber-purple"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {user && (
            <div className="mt-auto border-t border-cyber-purple/10 p-4">
              <Button 
                variant="outline" 
                className="w-full justify-start border-cyber-purple/20 hover:bg-cyber-purple/10 text-gray-300"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
