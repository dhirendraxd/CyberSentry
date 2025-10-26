
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Activity } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import LogAnalyzing from '@/components/LogAnalyzer/LogAnalyzing';
import FileUploadSection from '@/components/LogAnalyzer/FileUploadSection';
import LogViewSection from '@/components/LogAnalyzer/LogViewSection';
import AnalysisInfo from '@/components/LogAnalyzer/AnalysisInfo';
import HistorySection from '@/components/LogAnalyzer/HistorySection';
import { LogAnalysisResult, ThreatLevel } from '@/types/logs';

interface TabsContainerProps {
  isAnalyzing: boolean;
  analysisResult: LogAnalysisResult | null;
  analyzeLog: (file: File) => Promise<void>;
  viewMode: 'raw' | 'table';
  setViewMode: (mode: 'raw' | 'table') => void;
  handleReanalyze: () => void;
  handleExportReport: () => void;
  markAsResolved: () => void;
  saveReport: () => void;
  analysisHistory: LogAnalysisResult[];
  viewAnalysis: (timestamp: string) => void;
  deleteAnalysis: (timestamp: string) => void;
  apiUsed: string;
  apiIntegrationId?: string;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  isAnalyzing,
  analysisResult,
  analyzeLog,
  viewMode,
  setViewMode,
  handleReanalyze,
  handleExportReport,
  markAsResolved,
  saveReport,
  analysisHistory,
  viewAnalysis,
  deleteAnalysis,
  apiUsed,
  apiIntegrationId,
}) => {
  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="upload" className="flex items-center gap-2">
          <Upload className="h-4 w-4" /> Upload & Analyze
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <Activity className="h-4 w-4" /> Analysis History
        </TabsTrigger>
      </TabsList>
      
      {/* Upload & Analyze Tab */}
      <TabsContent value="upload" className="space-y-6">
        <AnimatePresence mode="wait">
          {!analysisResult && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FileUploadSection 
                isAnalyzing={isAnalyzing} 
                analysisResult={analysisResult}
                onFileUpload={analyzeLog} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {isAnalyzing && <LogAnalyzing />}
        
        {analysisResult && !isAnalyzing && (
          <AnalysisInfo 
            analysisTime={analysisResult.timestamp}
            threatCount={analysisResult.insights.length}
            maxThreatLevel={analysisResult.insights.reduce((max, insight) => {
              const levelOrder = { high: 3, medium: 2, low: 1 };
              return levelOrder[insight.threatLevel] > levelOrder[max] ? insight.threatLevel : max;
            }, ThreatLevel.LOW)}
            apiUsed={apiUsed}
            onReanalyze={handleReanalyze}
            apiIntegrationId={apiIntegrationId}
          />
        )}
        
        <LogViewSection 
          isAnalyzing={isAnalyzing}
          analysisResult={analysisResult}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onReanalyze={handleReanalyze}
          onExportReport={handleExportReport}
          onMarkAsResolved={markAsResolved}
          onSaveReport={saveReport}
        />
      </TabsContent>
      
      {/* Analysis History Tab */}
      <TabsContent value="history" className="space-y-4">
        <HistorySection 
          analysisHistory={analysisHistory}
          onViewAnalysis={viewAnalysis}
          onDeleteAnalysis={deleteAnalysis}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
