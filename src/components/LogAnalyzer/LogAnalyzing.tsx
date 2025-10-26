
import React from 'react';
import { Loader } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LogAnalyzing: React.FC = () => {
  return (
    <Card className="border-white/10 bg-black/30 backdrop-blur-sm">
      <CardContent className="flex flex-col items-center justify-center p-10">
        <Loader className="h-12 w-12 text-cyber-purple animate-spin mb-4" />
        <h3 className="text-xl font-medium mb-2 text-white">
          Analyzing Log File
        </h3>
        <p className="text-gray-400 text-center">
          Our AI is scanning your logs for security threats, anomalies, and suspicious patterns...
        </p>
      </CardContent>
    </Card>
  );
};

export default LogAnalyzing;
