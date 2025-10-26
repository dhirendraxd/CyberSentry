
export enum ThreatLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export interface LogEntry {
  timestamp: string;
  message: string;
  level: string;
  userId?: string;
}

export interface LogInsight {
  id: string;
  summary: string;
  highlightedLines: {
    lineNumber: number;
    content: string;
    reason: string;
  }[];
  suggestedFix: string;
  threatLevel: ThreatLevel;
}

export interface BetterStackIntegrationResult {
  success: boolean;
  status: string;
  timestamp: string;
  message: string;
  responseId?: string | null;
}

export interface LogAnalysisResult {
  timestamp: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  rawLogContent: string;
  logs?: LogEntry[];
  insights: LogInsight[];
  highlightedLines?: {
    lineNumber: number;
    content: string;
    reason: string;
  }[];
  betterStackIntegration?: BetterStackIntegrationResult;
  resolved: boolean;
}

export interface LogAnalysisHistory {
  id: string;
  fileName: string;
  timestamp: string;
  threatCount: number;
  maxThreatLevel: ThreatLevel;
  resolved: boolean;
}
