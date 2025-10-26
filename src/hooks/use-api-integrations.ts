
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ApiIntegration {
  id: string;
  name: string;
  endpoint: string;
  apiKey: string;
  isActive: boolean;
  lastTested: string | null;
}

export function useApiIntegrations() {
  const [integrations, setIntegrations] = useState<ApiIntegration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load integrations from localStorage on initial mount
  useEffect(() => {
    const savedIntegrations = localStorage.getItem('custom-api-integrations');
    if (savedIntegrations) {
      try {
        setIntegrations(JSON.parse(savedIntegrations));
      } catch (error) {
        console.error('Failed to parse saved integrations:', error);
      }
    }
  }, []);

  // Save integrations to localStorage whenever they change
  useEffect(() => {
    if (integrations.length > 0) {
      localStorage.setItem('custom-api-integrations', JSON.stringify(integrations));
    }
  }, [integrations]);

  const addIntegration = (integration: Omit<ApiIntegration, 'id' | 'lastTested'>) => {
    const newIntegration: ApiIntegration = {
      ...integration,
      id: crypto.randomUUID(),
      lastTested: null
    };
    
    setIntegrations(prev => [...prev, newIntegration]);
    toast({
      title: "API Integration Added",
      description: `${integration.name} has been added to your integrations.`
    });
    
    return newIntegration.id;
  };

  const updateIntegration = (id: string, data: Partial<ApiIntegration>) => {
    setIntegrations(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    );
    
    toast({
      title: "API Integration Updated",
      description: `Integration settings have been updated.`
    });
  };

  const deleteIntegration = (id: string) => {
    setIntegrations(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "API Integration Removed",
      description: `Integration has been removed from your account.`
    });
  };

  const testIntegration = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    const integration = integrations.find(i => i.id === id);
    
    if (!integration) {
      setIsLoading(false);
      toast({
        title: "Integration Not Found",
        description: "The selected integration could not be found.",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      // Simple ping test to the API endpoint
      const response = await fetch(integration.endpoint, {
        method: 'OPTIONS',
        headers: {
          'Authorization': `Bearer ${integration.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const success = response.ok;
      
      // Update the lastTested timestamp
      updateIntegration(id, { 
        lastTested: new Date().toISOString(),
        isActive: success
      });
      
      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success 
          ? `Successfully connected to ${integration.name}` 
          : `Failed to connect to ${integration.name}. Status: ${response.status}`,
        variant: success ? "default" : "destructive"
      });
      
      return success;
    } catch (error) {
      console.error('API test error:', error);
      
      updateIntegration(id, { 
        lastTested: new Date().toISOString(),
        isActive: false 
      });
      
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    integrations,
    isLoading,
    addIntegration,
    updateIntegration,
    deleteIntegration,
    testIntegration
  };
}
