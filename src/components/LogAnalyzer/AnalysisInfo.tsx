
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, RefreshCw, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ThreatLevel } from '@/types/logs';

interface AnalysisInfoProps {
  analysisTime: string;
  threatCount: number;
  maxThreatLevel: ThreatLevel;
  apiUsed: string;
  onReanalyze: () => void;
  apiIntegrationId?: string;
}

const AnalysisInfo: React.FC<AnalysisInfoProps> = ({
  analysisTime,
  threatCount,
  maxThreatLevel,
  apiUsed,
  onReanalyze,
  apiIntegrationId
}) => {
  const getTheatLevelColor = (level: ThreatLevel) => {
    switch (level) {
      case ThreatLevel.HIGH:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case ThreatLevel.MEDIUM:
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case ThreatLevel.LOW:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  
  const getTheatLevelIcon = (level: ThreatLevel) => {
    switch (level) {
      case ThreatLevel.HIGH:
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case ThreatLevel.MEDIUM:
        return <AlertCircle className="h-4 w-4 text-amber-400" />;
      case ThreatLevel.LOW:
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-400" />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-white/10 bg-black/30 backdrop-blur-sm mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-cyber-purple" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm font-medium">Analysis Service</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The service used to analyze this log file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="bg-cyber-purple/10 text-cyber-purple border-cyber-purple/30">
                  {apiUsed}
                </Badge>
                {apiIntegrationId && (
                  <span className="text-xs text-gray-500 ml-2">(Custom API)</span>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyber-purple" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm font-medium">Analysis Time</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>When this analysis was performed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-gray-300">
                {new Date(analysisTime).toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-cyber-purple" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm font-medium">Threats Found</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of potential security issues detected</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">{threatCount} issues detected</span>
                <Badge 
                  className={`${getTheatLevelColor(maxThreatLevel)} border ml-1`}
                >
                  {getTheatLevelIcon(maxThreatLevel)}
                  <span className="ml-1 capitalize">{maxThreatLevel}</span>
                </Badge>
              </div>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onReanalyze}
                className="text-xs border-cyber-purple/30 hover:bg-cyber-purple/10"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Re-Analyze
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalysisInfo;
