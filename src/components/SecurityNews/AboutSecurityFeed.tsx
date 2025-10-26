
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Rss, AlertCircle, Newspaper, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AboutSecurityFeed: React.FC = () => {
  return (
    <Card className="glass-card border-cyber-purple/20">
      <CardHeader className="bg-black/30 border-b border-cyber-purple/10">
        <CardTitle className="text-lg flex items-center">
          <Shield className="mr-2 h-5 w-5 text-cyber-purple" />
          About This Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-300 mb-4">
          This security news feed is powered by The Hacker News, one of the leading sources for cybersecurity news and information.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Rss className="h-4 w-4 text-cyber-purple" />
            <span className="text-sm">Updated in real-time</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-cyber-purple" />
            <span className="text-sm">Critical security alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-cyber-purple" />
            <span className="text-sm">Industry best practices</span>
          </div>
        </div>
        <Separator className="my-4 bg-cyber-purple/10" />
        <p className="text-xs text-gray-400">
          Content provided by The Hacker News. Visit their website for more cybersecurity resources.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
          onClick={() => window.open('https://thehackernews.com', '_blank')}
        >
          <span>Visit Source</span>
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AboutSecurityFeed;
