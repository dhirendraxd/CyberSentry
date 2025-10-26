
import React from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldAlert, 
  ShieldCheck, 
  ShieldX,
  Activity
} from 'lucide-react';
import { LogAnalysisHistory, ThreatLevel } from '@/types/logs';
import { cn } from '@/lib/utils';

interface HistoryItemProps {
  analysis: LogAnalysisHistory;
  onClick: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ analysis, onClick }) => {
  // Format date
  const formattedDate = new Date(analysis.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Get icon based on threat level
  const getThreatIcon = () => {
    switch (analysis.maxThreatLevel) {
      case ThreatLevel.HIGH:
        return <ShieldX className="h-5 w-5 text-red-500" />;
      case ThreatLevel.MEDIUM:
        return <ShieldAlert className="h-5 w-5 text-yellow-500" />;
      case ThreatLevel.LOW:
      default:
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
    }
  };
  
  // Get status badge
  const getStatusBadge = () => {
    if (analysis.resolved) {
      return (
        <Badge 
          variant="outline" 
          className="bg-green-500/10 text-green-500 border-green-500/30"
        >
          Resolved
        </Badge>
      );
    }
    
    return (
      <Badge 
        variant="outline" 
        className={cn(
          analysis.maxThreatLevel === ThreatLevel.HIGH 
            ? "bg-red-500/10 text-red-500 border-red-500/30"
            : analysis.maxThreatLevel === ThreatLevel.MEDIUM
              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
              : "bg-white/10 text-white border-white/30"
        )}
      >
        {analysis.threatCount} {analysis.threatCount === 1 ? 'Issue' : 'Issues'}
      </Badge>
    );
  };
  
  return (
    <Card 
      className="border-white/10 bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/5">
            {getThreatIcon()}
          </div>
          <div>
            <h4 className="font-medium text-white">{analysis.fileName}</h4>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Activity className="h-3 w-3" />
              <span>Analyzed on {formattedDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryItem;
