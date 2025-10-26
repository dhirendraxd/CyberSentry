import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Mail, 
  Key, 
  Bell, 
  RefreshCw, 
  Settings,
  User,
  Home,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { navLinks } from '@/config/navigation';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { useState as useReactState } from 'react';

// Get the site URL dynamically based on environment
const getSiteUrl = () => {
  return window.location.origin;
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useReactState<any>(null);
  const [loading, setLoading] = useReactState(true);

  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in",
            description: "You have successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      // Clean up auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      // Force redirect to auth page
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out.",
        variant: "destructive"
      });
    }
  };

  const logoSection = (
    <Link to="/" className="flex items-center gap-3 px-2 py-4 hover:opacity-80 transition-opacity">
      <div className="p-2 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30 flex-shrink-0">
        <Shield className={cn("text-cyber-purple", collapsed ? "h-6 w-6" : "h-8 w-8")} />
      </div>
      {!collapsed && <h1 className="text-xl font-bold text-white tracking-tight">CyberSentry</h1>}
    </Link>
  );

  return (
    <SidebarComponent>
      <SidebarHeader className="px-4 py-2">
        <div className="flex items-center justify-between">
          {logoSection}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)} 
            className="hidden md:flex text-gray-400 hover:bg-cyber-purple/10 hover:text-cyber-purple"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <SidebarMenuItem key={link.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  tooltip={collapsed ? link.name : undefined}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 w-full",
                      isActive
                        ? "text-cyber-purple"
                        : "text-gray-300"
                    )}
                  >
                    <Icon className={cn("flex-shrink-0", collapsed ? "h-5 w-5" : "h-5 w-5")} />
                    {!collapsed && <span className="text-sm font-medium">{link.name}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto p-4">
        <Separator className="my-2 bg-cyber-purple/10" />
        {!loading && (
          <>
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30">
                  <div className="rounded-full bg-cyber-purple/20 p-2 flex-shrink-0">
                    <User className="h-4 w-4 text-cyber-purple" />
                  </div>
                  {!collapsed && (
                    <span className="text-sm font-medium text-gray-200 truncate">
                      {user.email ? user.email.split('@')[0] : 'User'}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-gray-300 hover:bg-cyber-purple/10 hover:text-cyber-purple"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {!collapsed && <span>Sign Out</span>}
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {!collapsed && <span>Sign In</span>}
                </Button>
              </Link>
            )}
          </>
        )}
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
