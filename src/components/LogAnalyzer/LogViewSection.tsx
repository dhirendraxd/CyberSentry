
import React from 'react';
import LogDisplay from '@/components/LogAnalyzer/LogDisplay';
import LogTable from '@/components/LogAnalyzer/LogTable';
import AiInsights from '@/components/LogAnalyzer/AiInsights';
import { LogAnalysisResult } from '@/types/logs';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Activity, RefreshCw, Download } from 'lucide-react';

interface LogViewSectionProps {
  isAnalyzing: boolean;
  analysisResult: LogAnalysisResult | null;
  viewMode: 'raw' | 'table';
  setViewMode: (mode: 'raw' | 'table') => void;
  onReanalyze: () => void;
  onExportReport: () => void;
  onMarkAsResolved: () => void;
  onSaveReport: () => void;
}

const LogViewSection: React.FC<LogViewSectionProps> = ({
  isAnalyzing,
  analysisResult,
  viewMode,
  setViewMode,
  onReanalyze,
  onExportReport,
  onMarkAsResolved,
  onSaveReport,
}) => {
  if (!analysisResult || isAnalyzing) {
    return null;
  }
  
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'raw' | 'table')}>
            <TabsList>
              <TabsTrigger value="raw" className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> Raw Log
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-1">
                <Activity className="h-4 w-4" /> Table View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onExportReport}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" /> Export
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onReanalyze}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" /> Re-Analyze
          </Button>
        </div>
      </div>
      
      <div className={viewMode === 'raw' ? 'block' : 'hidden'}>
        <LogDisplay 
          content={analysisResult.rawLogContent}
          highlightedLines={analysisResult.insights.flatMap(
            insight => insight.highlightedLines
          )}
        />
      </div>
      
      <div className={viewMode === 'table' ? 'block' : 'hidden'}>
        <LogTable 
          logs={analysisResult.logs || []}
          highlightedLines={analysisResult.insights.flatMap(
            insight => insight.highlightedLines
          )}
        />
      </div>
      
      <AiInsights 
        insights={analysisResult.insights}
        onMarkAsResolved={onMarkAsResolved}
        onSaveReport={onSaveReport}
        isResolved={analysisResult.resolved}
      />
    </>
  );
};

export default LogViewSection;
