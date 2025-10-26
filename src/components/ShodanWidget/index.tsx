
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Shield, Globe, AlertTriangle, Server, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ShodanService {
  id: string;
  name: string;
  count: number;
  type: string;
  icon: React.ReactNode;
}

// This is a simulation of Shodan API data since we can't connect to the actual API without a key
const fetchShodanData = async (): Promise<ShodanService[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulated data - in a real app, you would connect to the Shodan API
  return [
    { 
      id: '1', 
      name: 'Exposed MongoDB Databases', 
      count: 47823, 
      type: 'database',
      icon: <Server className="h-6 w-6 text-cyber-alert" />
    },
    { 
      id: '2', 
      name: 'Unpatched Apache Servers', 
      count: 35291, 
      type: 'server',
      icon: <Globe className="h-6 w-6 text-cyber-alert" />
    },
    { 
      id: '3', 
      name: 'Open Elasticsearch', 
      count: 22409, 
      type: 'database',
      icon: <Server className="h-6 w-6 text-cyber-alert" />
    },
    { 
      id: '4', 
      name: 'Industrial Control Systems', 
      count: 15872, 
      type: 'ics',
      icon: <AlertTriangle className="h-6 w-6 text-cyber-alert" />
    },
    { 
      id: '5', 
      name: 'Open SSH Services', 
      count: 12435, 
      type: 'service',
      icon: <Shield className="h-6 w-6 text-cyber-alert" />
    }
  ];
};

const ShodanWidget = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data: exposedServices = [], isLoading, refetch } = useQuery({
    queryKey: ['shodanServices'],
    queryFn: fetchShodanData,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast({
        title: "Data refreshed",
        description: "Vulnerability data has been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Could not update vulnerability data.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="rounded-xl glass-card border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-white">Global Vulnerability Alert</CardTitle>
          {isLoading || isRefreshing ? (
            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
            <Globe className="h-5 w-5 text-cyber-blue" />
          )}
        </div>
        <CardDescription className="text-gray-400">
          Top exposed services worldwide
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          {exposedServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-black/40 p-2">
                  {service.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{service.name}</p>
                  <p className="text-xs text-gray-400">{service.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-cyber-alert">{service.count.toLocaleString()}</p>
                <p className="text-xs text-gray-400">instances</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="link" 
          className="text-cyber-blue p-0 h-auto text-sm"
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShodanWidget;
