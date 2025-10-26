
import { useToast } from '@/hooks/use-toast';
import { LogAnalysisResult, ThreatLevel } from '@/types/logs';

export function useNotifications() {
  const { toast } = useToast();
  
  const showAnalysisCompletedToast = (data: LogAnalysisResult) => {
    // Show appropriate toast based on results
    const insightCount = data.insights.length;
    const highestThreat = data.insights.reduce(
      (highest, insight) => {
        const levels = {
          "low": 0,
          "medium": 1,
          "high": 2
        };
        return levels[insight.threatLevel] > levels[highest] ? insight.threatLevel : highest;
      },
      "low" as ThreatLevel
    );
    
    if (highestThreat === "high") {
      toast({
        title: "Critical Security Issues Found",
        description: `Found ${insightCount} issues including HIGH severity threats.`,
        variant: "destructive"
      });
    } else if (highestThreat === "medium") {
      toast({
        title: "Security Issues Detected",
        description: `Found ${insightCount} issues with MEDIUM severity.`,
      });
    } else {
      toast({
        title: "Analysis Complete",
        description: insightCount > 1 
          ? `Found ${insightCount} minor issues with LOW severity.`
          : "No significant security issues detected.",
      });
    }
  };
  
  const showBetterStackToast = (integration: {success: boolean, status?: string, timestamp?: string, message: string}) => {
    if (integration.success) {
      toast({
        title: "Logs Sent to BetterStack",
        description: integration.message,
      });
    }
  };
  
  const showErrorToast = (error: unknown) => {
    toast({
      title: "Analysis Failed",
      description: `Error analyzing log file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      variant: "destructive"
    });
  };
  
  return {
    showAnalysisCompletedToast,
    showBetterStackToast,
    showErrorToast
  };
}
