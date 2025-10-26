
import { useState } from 'react';
import { LogAnalysisResult } from '@/types/logs';
import { useToast } from '@/hooks/use-toast';

export function useAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<LogAnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<LogAnalysisResult[]>([]);
  const { toast } = useToast();
  
  const markAsResolved = () => {
    if (!analysisResult) return;
    
    setAnalysisResult({
      ...analysisResult,
      resolved: true
    });
    
    // Update in history
    setAnalysisHistory(prev => 
      prev.map(item => 
        item.fileName === analysisResult.fileName && 
        item.timestamp === analysisResult.timestamp
          ? { ...item, resolved: true }
          : item
      )
    );
    
    toast({
      title: "Issue Resolved",
      description: `${analysisResult.fileName} has been marked as resolved.`,
    });
  };
  
  const saveReport = () => {
    if (!analysisResult) return;
    
    toast({
      title: "Report Saved",
      description: `Analysis report for ${analysisResult.fileName} has been saved.`,
    });
  };
  
  const deleteAnalysis = (timestamp: string) => {
    setAnalysisHistory(prev => 
      prev.filter(item => item.timestamp !== timestamp)
    );
    
    // If the current result is being deleted, clear it
    if (analysisResult && analysisResult.timestamp === timestamp) {
      setAnalysisResult(null);
    }
    
    toast({
      title: "Analysis Deleted",
      description: "Analysis has been removed from history.",
    });
  };
  
  const viewAnalysis = (timestamp: string) => {
    const analysis = analysisHistory.find(item => item.timestamp === timestamp);
    
    if (analysis) {
      setAnalysisResult(analysis);
    }
  };
  
  return {
    analysisResult,
    setAnalysisResult,
    analysisHistory,
    setAnalysisHistory,
    markAsResolved,
    saveReport,
    deleteAnalysis,
    viewAnalysis
  };
}
