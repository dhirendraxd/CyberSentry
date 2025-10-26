
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface SecurityNewsHeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

const SecurityNewsHeader: React.FC<SecurityNewsHeaderProps> = ({ loading, onRefresh }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gradient">Security News & Alerts</h1>
        <p className="text-muted-foreground mt-2">Stay informed with the latest cybersecurity news and threat alerts</p>
      </div>
      
      <Button 
        variant="outline"
        className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10 self-start md:self-auto"
        onClick={onRefresh}
        disabled={loading}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
        Refresh Feed
      </Button>
    </div>
  );
};

export default SecurityNewsHeader;
