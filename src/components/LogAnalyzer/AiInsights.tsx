
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogInsight, ThreatLevel } from '@/types/logs';
import { 
  ShieldAlert, 
  ShieldCheck, 
  ShieldX, 
  Save, 
  Check,
  AlertTriangle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface AiInsightsProps {
  insights: LogInsight[];
  onMarkAsResolved: () => void;
  onSaveReport: () => void;
  isResolved: boolean;
}

const ThreatBadge: React.FC<{ level: ThreatLevel }> = ({ level }) => {
  const getLevelDetails = () => {
    switch (level) {
      case ThreatLevel.HIGH:
        return {
          icon: <ShieldX className="h-4 w-4" />,
          text: "High",
          className: "bg-red-600 text-white"
        };
      case ThreatLevel.MEDIUM:
        return {
          icon: <ShieldAlert className="h-4 w-4" />,
          text: "Medium",
          className: "bg-yellow-600 text-white"
        };
      case ThreatLevel.LOW:
      default:
        return {
          icon: <ShieldCheck className="h-4 w-4" />,
          text: "Low",
          className: "bg-green-600 text-white"
        };
    }
  };
  
  const { icon, text, className } = getLevelDetails();
  
  return (
    <Badge variant="outline" className={cn("flex items-center gap-1", className)}>
      {icon}
      {text}
    </Badge>
  );
};

const AiInsights: React.FC<AiInsightsProps> = ({ 
  insights, 
  onMarkAsResolved, 
  onSaveReport, 
  isResolved 
}) => {
  // Get highest threat level
  const getHighestThreatLevel = () => {
    const levels = {
      [ThreatLevel.LOW]: 1,
      [ThreatLevel.MEDIUM]: 2,
      [ThreatLevel.HIGH]: 3
    };
    
    return insights.reduce(
      (highest, insight) => {
        return levels[insight.threatLevel] > levels[highest] 
          ? insight.threatLevel 
          : highest;
      },
      ThreatLevel.LOW
    );
  };
  
  const highestThreatLevel = getHighestThreatLevel();
  
  return (
    <Card className="border-white/10 bg-black/30 backdrop-blur-sm">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4">
          <ThreatBadge level={highestThreatLevel} />
        </div>
        <CardTitle className="text-xl font-medium">
          AI Security Insights
        </CardTitle>
        <CardDescription>
          {insights.length === 0 
            ? "No security issues detected in your logs."
            : `${insights.length} potential security ${insights.length === 1 ? 'issue' : 'issues'} identified`}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {insights.map((insight, index) => (
          <div 
            key={insight.id}
            className={cn(
              "p-4 rounded-xl border",
              insight.threatLevel === ThreatLevel.HIGH 
                ? "border-red-500/30 bg-red-500/5"
                : insight.threatLevel === ThreatLevel.MEDIUM
                  ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-green-500/30 bg-green-500/5"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium">Issue #{index + 1}</h4>
              <ThreatBadge level={insight.threatLevel} />
            </div>
            
            <p className="mb-4 text-gray-300">{insight.summary}</p>
            
            {insight.highlightedLines.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2 text-gray-400">Affected Lines:</h5>
                <div className="bg-black/50 rounded-lg p-2 space-y-1 font-mono text-xs max-h-[150px] overflow-auto">
                  {insight.highlightedLines.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-gray-500 w-8 text-right mr-2">
                        {line.lineNumber}:
                      </span>
                      <span className="text-white">{line.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {insight.suggestedFix && (
              <div>
                <h5 className="text-sm font-medium mb-1 text-gray-400 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                  Recommended Action:
                </h5>
                <p className="text-sm text-gray-300">{insight.suggestedFix}</p>
              </div>
            )}
          </div>
        ))}
        
        {insights.length === 0 && (
          <div className="text-center py-6">
            <ShieldCheck className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">All Clear!</h3>
            <p className="text-gray-400">
              No security issues were detected in your log file. 
              Continue monitoring your systems regularly.
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={onSaveReport}
                className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Report
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save this analysis to your security records</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={isResolved ? "outline" : "default"}
                onClick={onMarkAsResolved}
                disabled={isResolved}
                className={isResolved 
                  ? "border-green-500 text-green-500" 
                  : "bg-green-600 hover:bg-green-700 text-white"
                }
              >
                <Check className="mr-2 h-4 w-4" />
                {isResolved ? "Resolved" : "Mark as Resolved"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark these issues as addressed and resolved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default AiInsights;
