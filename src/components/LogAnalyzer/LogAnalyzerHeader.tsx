
import React from 'react';
import { Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogAnalyzerHeaderProps {
  onOpenNewLogModal: () => void;
  onOpenApiModal: () => void;
  isAnalyzing: boolean;
  isLogResolved: boolean;
}

const LogAnalyzerHeader: React.FC<LogAnalyzerHeaderProps> = ({
  onOpenNewLogModal,
  onOpenApiModal,
  isAnalyzing,
  isLogResolved
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">Log Analyzer</h1>
        <p className="text-gray-400">
          Upload your system logs to analyze them for potential security threats, 
          anomalies, and suspicious patterns with AI-powered insights.
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenApiModal}
          className="border-cyber-purple/30 hover:bg-cyber-purple/10"
        >
          <Settings className="mr-2 h-4 w-4" />
          API Settings
        </Button>
        
        <Button 
          onClick={onOpenNewLogModal}
          className="bg-cyber-purple hover:bg-cyber-purple/90"
          disabled={isAnalyzing || !isLogResolved}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Log
        </Button>
      </div>
    </div>
  );
};

export default LogAnalyzerHeader;
