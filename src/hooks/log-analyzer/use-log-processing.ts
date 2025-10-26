
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNotifications } from './use-notifications';
import { toast } from '@/hooks/use-toast';

export function useLogProcessing() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { showErrorToast } = useNotifications();
  
  const sendToBetterStack = async (logContent: string, fileName: string) => {
    try {
      // Get token from environment or localStorage for better access
      const BETTERSTACK_TOKEN = import.meta.env.VITE_BETTERSTACK_TOKEN || localStorage.getItem('BETTERSTACK_TOKEN');
      
      if (!BETTERSTACK_TOKEN) {
        console.warn("BetterStack token is not configured");
        return {
          success: false,
          status: 'not_configured',
          timestamp: new Date().toISOString(),
          message: 'BetterStack token is not configured'
        };
      }
      
      const payload = {
        dt: new Date().toISOString(),
        source: "CyberSentry Log Analyzer",
        fileName: fileName,
        message: logContent.substring(0, 1000) // Send first 1000 chars as sample
      };
      
      const response = await fetch('https://s1309632.eu-nbg-2.betterstackdata.com', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BETTERSTACK_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`BetterStack API error: ${response.status}`);
      }
      
      const result = await response.json();
      toast({
        title: "Logs sent to BetterStack",
        description: "Your logs are being monitored for threats",
      });
      
      return {
        success: true,
        status: 'success',
        timestamp: new Date().toISOString(),
        responseId: result.id || null,
        message: "Successfully sent logs to BetterStack"
      };
    } catch (error) {
      console.error("BetterStack integration error:", error);
      return {
        success: false,
        status: 'error',
        timestamp: new Date().toISOString(),
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };
  
  const sendToCustomApi = async (logContent: string, fileName: string, apiIntegrationId: string) => {
    try {
      // Get custom API integration details from localStorage
      const integrationsJson = localStorage.getItem('custom-api-integrations');
      if (!integrationsJson) {
        throw new Error("No custom API integrations found");
      }
      
      const integrations = JSON.parse(integrationsJson);
      const integration = integrations.find((i: any) => i.id === apiIntegrationId);
      
      if (!integration) {
        throw new Error("Selected API integration not found");
      }
      
      const payload = {
        timestamp: new Date().toISOString(),
        fileName: fileName,
        content: logContent,
        source: "CyberSentry"
      };
      
      const response = await fetch(integration.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${integration.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Custom API error: ${response.status}`);
      }
      
      const result = await response.json();
      
      toast({
        title: "Logs sent to Custom API",
        description: `Your logs are being processed by ${integration.name}`,
      });
      
      return {
        success: true,
        status: 'success',
        timestamp: new Date().toISOString(),
        responseId: result.id || null,
        message: `Successfully sent logs to ${integration.name}`,
        apiName: integration.name
      };
    } catch (error) {
      console.error("Custom API integration error:", error);
      return {
        success: false,
        status: 'error',
        timestamp: new Date().toISOString(),
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };
  
  const processLogFile = async (file: File, apiIntegrationId?: string) => {
    try {
      // Read file content
      const fileContent = await file.text();
      
      // Determine which service to use for processing
      let serviceIntegrationPromise;
      
      if (apiIntegrationId) {
        // Use custom API integration
        serviceIntegrationPromise = sendToCustomApi(fileContent, file.name, apiIntegrationId);
      } else {
        // Use BetterStack (default)
        serviceIntegrationPromise = sendToBetterStack(fileContent, file.name);
      }
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-logs', {
        body: {
          fileName: file.name,
          fileContent,
          apiIntegrationId // Pass this to the edge function so it knows which API was used
        }
      });
      
      if (error) {
        throw new Error(`Analysis failed: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('No data returned from analysis');
      }
      
      // Wait for service integration response
      const serviceResult = await serviceIntegrationPromise;
      
      // Add service integration result to the data
      return {
        ...data,
        betterStackIntegration: serviceResult,
        apiIntegrationId
      };
    } catch (error) {
      showErrorToast(error);
      console.error("Log analysis error:", error);
      throw error;
    }
  };
  
  return {
    isAnalyzing, 
    setIsAnalyzing,
    processLogFile
  };
}
