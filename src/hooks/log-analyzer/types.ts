
import { LogAnalysisResult } from '@/types/logs';

export interface UseLogAnalyzerReturn {
  analyzeLog: (file: File, customApiId?: string) => Promise<void>;
  isAnalyzing: boolean;
  analysisResult: LogAnalysisResult | null;
  analysisHistory: LogAnalysisResult[];
  markAsResolved: () => void;
  saveReport: () => void;
  deleteAnalysis: (timestamp: string) => void;
  viewAnalysis: (timestamp: string) => void;
  isNewLogModalOpen: boolean;
  openNewLogModal: () => void;
  closeNewLogModal: () => void;
  apiUsed: string;
  apiIntegrationId?: string;
}
