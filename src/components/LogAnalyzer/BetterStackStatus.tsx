
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BetterStackIntegrationModal } from './BetterStackIntegration';
import { toast } from '@/hooks/use-toast';

interface BetterStackStatusProps {
  isConnected: boolean;
  lastSync?: string;
  logsProcessed?: number;
  onConfigureSaved?: (token: string) => Promise<void>;
}

const BetterStackStatus: React.FC<BetterStackStatusProps> = ({ 
  isConnected, 
  lastSync,
  logsProcessed = 0,
  onConfigureSaved
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSaveConfig = async (token: string): Promise<void> => {
    if (onConfigureSaved) {
      await onConfigureSaved(token);
    } else {
      // Fallback if no handler is provided
      localStorage.setItem('BETTERSTACK_TOKEN', token);
      toast({
        title: "Settings Saved",
        description: "Your BetterStack token has been saved locally",
      });
    }
  };

  const openDashboard = () => {
    window.open('https://betterstack.com/logs', '_blank');
  };

  return (
    <>
      <Card className="border-white/10 bg-black/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyber-purple" />
              BetterStack Integration
            </CardTitle>
            <Badge variant={isConnected ? "default" : "destructive"} className={isConnected ? "bg-green-500 hover:bg-green-600" : ""}>
              {isConnected ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>
          <CardDescription>
            Advanced log monitoring and threat detection
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isConnected ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Last Sync</p>
                  <p className="text-sm font-medium">{lastSync || 'Never'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Logs Processed</p>
                  <p className="text-sm font-medium">{logsProcessed}</p>
                </div>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Active monitoring</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={openDashboard}
                  className="text-xs border-cyber-purple/30 hover:bg-cyber-purple/10"
                >
                  <span>View Dashboard</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-yellow-500 mb-4">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Integration not configured</span>
              </div>
              
              <p className="text-xs text-gray-400 mb-4">
                Connect to BetterStack for advanced log analysis and real-time threat detection.
                Your API key is already configured in the system.
              </p>
              
              <Button 
                variant="default" 
                size="sm"
                className="w-full bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Configure Integration
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      
      <BetterStackIntegrationModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        isConnected={isConnected}
        currentToken={import.meta.env.VITE_BETTERSTACK_TOKEN || ''}
        onSave={handleSaveConfig}
      />
    </>
  );
};

export default BetterStackStatus;
