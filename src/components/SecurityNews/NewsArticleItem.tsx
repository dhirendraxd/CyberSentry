
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { formatPubDate, timeAgo } from '@/utils/rssUtils';

interface NewsArticleItemProps {
  title: string;
  description: string;
  pubDate: string;
  link: string;
}

const NewsArticleItem: React.FC<NewsArticleItemProps> = ({ title, description, pubDate, link }) => {
  return (
    <div className="border border-cyber-purple/10 rounded-lg p-4 bg-black/30 hover:border-cyber-purple/30 transition-all hover:bg-black/40">
      <h3 className="font-semibold text-lg text-white mb-3">{title}</h3>
      
      <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-cyber-purple" />
          <span>{formatPubDate(pubDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-cyber-purple" />
          <span>{timeAgo(pubDate)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-300">
          {description.replace(/<[^>]*>?/gm, '').substring(0, 250)}...
        </p>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
        onClick={() => window.open(link, '_blank')}
      >
        <span>Read Full Article</span>
        <ExternalLink className="ml-2 h-3 w-3" />
      </Button>
    </div>
  );
};

export default NewsArticleItem;
