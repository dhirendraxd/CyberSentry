
import { useState, useEffect } from 'react';

export function useBetterStackConnection(analysisResult: any) {
  const [betterStackConnected, setBetterStackConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for BetterStack integration status
    const token = import.meta.env.VITE_BETTERSTACK_TOKEN || localStorage.getItem('BETTERSTACK_TOKEN');
    setBetterStackConnected(!!token);
    
    // If we have analysis results with BetterStack integration
    if (analysisResult?.betterStackIntegration && 
        analysisResult.betterStackIntegration.success === true &&
        analysisResult.betterStackIntegration.timestamp) {
      setLastSyncTime(analysisResult.betterStackIntegration.timestamp);
    }
  }, [analysisResult]);
  
  const handleBetterStackConfigSave = async (token: string): Promise<void> => {
    // In a production app, you would probably want to save this to the server
    // For now, we'll use localStorage for demonstration purposes
    localStorage.setItem('BETTERSTACK_TOKEN', token);
    setBetterStackConnected(true);
    
    // You could also update the environment variable at runtime
    // This is a hack and not recommended for production
    (window as any).BETTERSTACK_TOKEN = token;
  };
  
  return {
    betterStackConnected,
    lastSyncTime,
    handleBetterStackConfigSave
  };
}
