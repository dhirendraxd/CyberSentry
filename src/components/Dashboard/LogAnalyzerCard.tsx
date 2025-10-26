
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LogAnalyzerCard = () => {
  return (
    <Link to="/log-analyzer" className="block">
      <Card className={cn(
        "security-gradient hover:shadow-lg transition-shadow card-glow border-cyber-purple/30",
        "group hover:border-cyber-purple/60"
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-md font-medium">Log Analyzer</CardTitle>
          <div className="p-1.5 rounded-full bg-cyber-purple/20 group-hover:bg-cyber-purple/30 transition-colors">
            <FileText className="h-6 w-6 text-cyber-purple" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-3">
            Upload and analyze system logs for security threats and vulnerabilities
          </p>
          <Button 
            variant="default" 
            size="sm"
            className="bg-cyber-purple/80 hover:bg-cyber-purple text-white w-full group"
          >
            <span>Run Analysis</span>
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LogAnalyzerCard;
