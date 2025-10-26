
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Shield, User, Key, Database, Settings as SettingsIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User as UserType } from '@/types/user';
import ProfileForm from '@/components/Settings/ProfileForm';
import SecuritySettings from '@/components/Settings/SecuritySettings';
import AlertSettings from '@/components/Settings/AlertSettings';
import ApiIntegration from '@/components/Settings/ApiIntegration';
import DataManagement from '@/components/Settings/DataManagement';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // For anonymous users, we still show settings but with limited functionality
          setUser(null);
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
  }, [navigate]);

  const SettingsHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-cyber-purple/20 flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6 pb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30">
              <SettingsIcon className="h-6 w-6 text-cyber-purple" />
            </div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
          <ThemeToggle />
        </div>
        
        <Tabs defaultValue="data" className="w-full">
          <div className="bg-black/20 backdrop-blur-sm rounded-t-lg border border-cyber-purple/20 p-1">
            <TabsList className="bg-black/30 grid grid-cols-5 gap-1">
              <TabsTrigger 
                value="data" 
                className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-white rounded-md"
              >
                <Database className="h-4 w-4 mr-2" />
                Data
              </TabsTrigger>
              
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-white rounded-md"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              
              <TabsTrigger 
                value="security"
                className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-white rounded-md"
              >
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              
              <TabsTrigger 
                value="notifications"
                className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-white rounded-md"
              >
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
              
              <TabsTrigger 
                value="api"
                className="data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-white rounded-md"
              >
                <Key className="h-4 w-4 mr-2" />
                API
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-b-lg border border-t-0 border-cyber-purple/20 p-6">
            <TabsContent value="data" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsHeader icon={<Database className="h-5 w-5 text-cyber-purple" />} title="Data Management" />
                <DataManagement />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="profile" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsHeader icon={<User className="h-5 w-5 text-cyber-purple" />} title="Profile Settings" />
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse rounded-md bg-cyber-purple/10 h-64 w-full"></div>
                  </div>
                ) : (
                  <ProfileForm user={user} />
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0 space-y-4 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsHeader icon={<Shield className="h-5 w-5 text-cyber-purple" />} title="Security Settings" />
                <SecuritySettings user={user} />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsHeader icon={<Bell className="h-5 w-5 text-cyber-purple" />} title="Alert Settings" />
                <AlertSettings />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="api" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsHeader icon={<Key className="h-5 w-5 text-cyber-purple" />} title="API Integration" />
                <ApiIntegration user={user} />
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
