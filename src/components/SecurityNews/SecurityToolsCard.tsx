
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const SecurityToolsCard: React.FC = () => {
  return (
    <Card className="glass-card border-cyber-purple/20">
      <CardHeader className="bg-black/30 border-b border-cyber-purple/10">
        <CardTitle className="text-lg flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-cyber-purple" />
          Stay Protected
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-300 mb-4">
          Stay ahead of emerging threats by using our security tools:
        </p>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
            onClick={() => window.location.href = '/password-generator'}
          >
            Password Generator
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
            onClick={() => window.location.href = '/breach-checker'}
          >
            Breach Checker
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
            onClick={() => window.location.href = '/password-analyzer'}
          >
            Password Analyzer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityToolsCard;
