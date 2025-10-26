
import React from 'react';
import { AlertCircle, RefreshCw, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import NewsArticleItem from './NewsArticleItem';
import { RssItem } from '@/utils/rssUtils';

interface NewsArticleListProps {
  newsItems: RssItem[];
  loading: boolean;
  onRefresh: () => void;
}

const NewsArticleList: React.FC<NewsArticleListProps> = ({ newsItems, loading, onRefresh }) => {
  return (
    <Card className="lg:col-span-2 glass-card overflow-hidden border-cyber-purple/20 relative">
      <CardHeader className="bg-black/30 border-b border-cyber-purple/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <Newspaper className="mr-2 h-5 w-5 text-cyber-purple" />
            Latest Security Articles
          </CardTitle>
          <span className="bg-cyber-purple/20 text-cyber-purple px-2 py-1 rounded-full text-xs">
            The Hacker News
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-6 space-y-6">
            {loading && !newsItems.length ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse border border-cyber-purple/10 rounded-lg p-4 bg-black/30">
                  <div className="h-6 bg-black/40 rounded mb-2 w-3/4"></div>
                  <div className="flex space-x-2 mb-2">
                    <div className="h-4 bg-black/40 rounded w-20"></div>
                    <div className="h-4 bg-black/40 rounded w-24"></div>
                  </div>
                  <div className="h-16 bg-black/40 rounded w-full"></div>
                </div>
              ))
            ) : (
              newsItems.map((item) => (
                <NewsArticleItem 
                  key={item.guid} 
                  title={item.title}
                  description={item.description}
                  pubDate={item.pubDate}
                  link={item.link}
                />
              ))
            )}
            
            {!loading && newsItems.length === 0 && (
              <div className="text-center text-gray-400 py-8 flex flex-col items-center">
                <AlertCircle className="h-8 w-8 mb-2 text-cyber-purple/50" />
                <p>No security news available</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                  onClick={onRefresh}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NewsArticleList;
