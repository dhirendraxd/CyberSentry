
import { useState } from 'react';
import { useAnalysis } from './use-analysis';
import { useLogProcessing } from './use-log-processing';
import { useNotifications } from './use-notifications';
import { UseLogAnalyzerReturn } from './types';
import { LogAnalysisResult } from '@/types/logs';
import { useToast } from '@/hooks/use-toast';

export function useLogAnalyzer(): UseLogAnalyzerReturn {
  const { 
    analysisResult, 
    setAnalysisResult,
    analysisHistory,
    setAnalysisHistory,
    markAsResolved,
    saveReport,
    deleteAnalysis,
    viewAnalysis
  } = useAnalysis();
  
  const {
    isAnalyzing,
    setIsAnalyzing,
    processLogFile
  } = useLogProcessing();
  
  const {
    showAnalysisCompletedToast,
    showBetterStackToast,
    showErrorToast
  } = useNotifications();
  
  const { toast } = useToast();
  
  // Track if new log modal is open
  const [isNewLogModalOpen, setIsNewLogModalOpen] = useState(false);
  
  // Track which API was used for analysis
  const [apiUsed, setApiUsed] = useState<string>("BetterStack");
  const [apiIntegrationId, setApiIntegrationId] = useState<string | undefined>(undefined);
  
  const analyzeLog = async (file: File, customApiId?: string): Promise<void> => {
    try {
      setIsAnalyzing(true);
      
      // Set the API being used for this analysis
      const api = customApiId ? "Custom API" : "BetterStack";
      setApiUsed(api);
      setApiIntegrationId(customApiId);
      
      const data = await processLogFile(file, customApiId);
      
      setAnalysisResult(data);
      
      // Update history with this new analysis
      setAnalysisHistory(prev => [data, ...prev]);
      
      // Show appropriate toast based on results
      showAnalysisCompletedToast(data);
      
      // If BetterStack integration was successful, show a toast
      if (data.betterStackIntegration) {
        showBetterStackToast(data.betterStackIntegration);
      }
      
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const openNewLogModal = () => {
    // Only allow new log if current log is resolved or there is no current log
    if (analysisResult && !analysisResult.resolved) {
      toast({
        title: "Current Log Not Resolved",
        description: "Please resolve the current log before uploading a new one.",
        variant: "default"
      });
    }
    setIsNewLogModalOpen(true);
  };
  
  const closeNewLogModal = () => {
    setIsNewLogModalOpen(false);
  };
  
  return {
    analyzeLog,
    isAnalyzing,
    analysisResult,
    analysisHistory,
    markAsResolved,
    saveReport,
    deleteAnalysis,
    viewAnalysis,
    isNewLogModalOpen,
    openNewLogModal,
    closeNewLogModal,
    apiUsed,
    apiIntegrationId
  };
}
