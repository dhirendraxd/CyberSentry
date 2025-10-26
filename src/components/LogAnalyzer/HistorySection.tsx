
import React from 'react';
import HistoryItem from '@/components/LogAnalyzer/HistoryItem';
import { LogAnalysisResult, ThreatLevel } from '@/types/logs';
import { Button } from '@/components/ui/button';
import { Activity, Trash2 } from 'lucide-react';

interface HistorySectionProps {
  analysisHistory: LogAnalysisResult[];
  onViewAnalysis: (timestamp: string) => void;
  onDeleteAnalysis: (timestamp: string) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  analysisHistory,
  onViewAnalysis,
  onDeleteAnalysis,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">
        View your previous log analysis results and track security issues over time.
      </p>
      
      <div className="grid gap-4">
        {analysisHistory.map((analysis, index) => {
          // Determine max threat level from insights
          const maxThreatLevel = analysis.insights.reduce(
            (highest, insight) => {
              const levels = {
                "low": 0,
                "medium": 1,
                "high": 2
              };
              return levels[insight.threatLevel] > levels[highest] 
                ? insight.threatLevel 
                : highest;
            },
            "low" as ThreatLevel
          );
          
          return (
            <div key={index} className="flex gap-2">
              <HistoryItem 
                analysis={{
                  id: index.toString(),
                  fileName: analysis.fileName,
                  timestamp: analysis.timestamp,
                  threatCount: analysis.insights.length,
                  maxThreatLevel: maxThreatLevel as ThreatLevel,
                  resolved: analysis.resolved
                }}
                onClick={() => onViewAnalysis(analysis.timestamp)}
              />
              
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 h-auto border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-500"
                onClick={() => onDeleteAnalysis(analysis.timestamp)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
        
        {analysisHistory.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <Activity className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-medium">No Analysis History</h3>
            <p>Your previous log analyses will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
