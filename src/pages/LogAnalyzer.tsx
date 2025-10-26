
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import BetterStackStatus from '@/components/LogAnalyzer/BetterStackStatus';
import NewLogModal from '@/components/LogAnalyzer/NewLogModal';
import ApiIntegrationModal from '@/components/LogAnalyzer/ApiIntegrationModal';
import LogAnalyzerHeader from '@/components/LogAnalyzer/LogAnalyzerHeader';
import TabsContainer from '@/components/LogAnalyzer/TabsContainer';
import { useLogAnalyzer, useApiIntegrations } from '@/hooks/log-analyzer';
import { useBetterStackConnection } from '@/components/LogAnalyzer/useBetterStackConnection';
import { toast } from '@/hooks/use-toast';

const LogAnalyzer: React.FC = () => {
  const { 
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
  } = useLogAnalyzer();
  
  const {
    integrations,
    isLoading: isApiLoading,
    addIntegration,
    updateIntegration,
    deleteIntegration,
    testIntegration
  } = useApiIntegrations();
  
  const {
    betterStackConnected,
    lastSyncTime,
    handleBetterStackConfigSave
  } = useBetterStackConnection(analysisResult);
  
  const [viewMode, setViewMode] = useState<'raw' | 'table'>('raw');
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  
  const handleFileUpload = async (file: File) => {
    await analyzeLog(file);
  };
  
  const handleExportReport = () => {
    if (!analysisResult) return;
    
    // Create a JSON file with the analysis result
    const jsonData = JSON.stringify(analysisResult, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and click it to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `log-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleReanalyze = () => {
    if (!analysisResult) return;
    
    analyzeLog(new File(
      [analysisResult.rawLogContent], 
      analysisResult.fileName,
      { type: 'text/plain' }
    ), apiIntegrationId);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <LogAnalyzerHeader 
          onOpenNewLogModal={openNewLogModal}
          onOpenApiModal={() => setIsApiModalOpen(true)}
          isAnalyzing={isAnalyzing}
          isLogResolved={!analysisResult || !!analysisResult.resolved}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TabsContainer 
              isAnalyzing={isAnalyzing}
              analysisResult={analysisResult}
              analyzeLog={analyzeLog}
              viewMode={viewMode}
              setViewMode={setViewMode}
              handleReanalyze={handleReanalyze}
              handleExportReport={handleExportReport}
              markAsResolved={markAsResolved}
              saveReport={saveReport}
              analysisHistory={analysisHistory}
              viewAnalysis={viewAnalysis}
              deleteAnalysis={deleteAnalysis}
              apiUsed={apiUsed}
              apiIntegrationId={apiIntegrationId}
            />
          </div>
          
          {/* Right sidebar with BetterStack status */}
          <div className="space-y-6">
            <BetterStackStatus 
              isConnected={betterStackConnected} 
              lastSync={lastSyncTime || undefined}
              logsProcessed={analysisHistory.length}
              onConfigureSaved={handleBetterStackConfigSave}
            />
          </div>
        </div>
      </div>
      
      <NewLogModal
        open={isNewLogModalOpen}
        onOpenChange={closeNewLogModal}
        onUploadLog={analyzeLog}
        isResolved={!analysisResult || analysisResult.resolved}
        onMarkAsResolved={markAsResolved}
        isAnalyzing={isAnalyzing}
        integrations={integrations}
      />
      
      <ApiIntegrationModal
        open={isApiModalOpen}
        onOpenChange={setIsApiModalOpen}
        integrations={integrations}
        isLoading={isApiLoading}
        onAdd={addIntegration}
        onUpdate={updateIntegration}
        onDelete={deleteIntegration}
        onTest={testIntegration}
      />
    </Layout>
  );
};

export default LogAnalyzer;
