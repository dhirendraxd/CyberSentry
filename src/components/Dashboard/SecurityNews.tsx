
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchRssFeed, formatPubDate, timeAgo, RssItem } from '@/utils/rssUtils';

interface NewsItemProps {
  title: string;
  source: string;
  time: string;
  date: string;
  description: string;
  link?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, source, time, date, description, link }) => {
  return (
    <div className="rounded-lg bg-black/20 p-4 hover:bg-black/30 transition-colors">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-white">{title}</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => link && window.open(link, '_blank')}
        >
          <ExternalLink className="h-4 w-4 text-cyber-purple" />
        </Button>
      </div>
      
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
        <div>{source}</div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-cyber-purple" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-cyber-purple" />
          <span>{time}</span>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-gray-300">{description}</p>
    </div>
  );
};

const SecurityNews = () => {
  const [liveNewsItems, setLiveNewsItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback static news items
  const staticNewsItems: NewsItemProps[] = [
    {
      title: 'Major Vulnerability Found in Popular Software',
      source: 'The Hacker News',
      time: '2 hours ago',
      date: 'Today',
      description: 'Security researchers discovered a critical vulnerability affecting millions of users. Patch updates are being released.',
    },
    {
      title: 'New Phishing Campaign Targets Banking Customers',
      source: 'Krebs on Security',
      time: '5 hours ago',
      date: 'Today',
      description: 'Sophisticated phishing emails impersonating major banks are circulating. Learn how to protect yourself.',
    },
    {
      title: 'Data Breach Exposes Information of 1.2M Users',
      source: 'Dark Reading',
      time: '1 day ago',
      date: 'Yesterday',
      description: 'A popular online service has confirmed a data breach affecting user accounts. Steps to secure your information.',
    },
  ];

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const hackerNewsRss = 'https://thehackernews.com/feeds/posts/default';
      const items = await fetchRssFeed(hackerNewsRss);
      setLiveNewsItems(items.slice(0, 3)); // Get only the 3 most recent items for the dashboard
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNews();
  }, []);

  const displayItems = liveNewsItems.length > 0 ? 
    liveNewsItems.map(item => ({
      title: item.title,
      source: 'The Hacker News',
      time: timeAgo(item.pubDate),
      date: formatPubDate(item.pubDate),
      description: item.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...',
      link: item.link
    })) : 
    staticNewsItems;

  return (
    <div className="rounded-xl glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Security News</h3>
        <div className="flex items-center gap-2">
          {loading && (
            <RefreshCw className="h-3.5 w-3.5 text-gray-400 animate-spin" />
          )}
          <Button 
            variant="link" 
            className="text-cyber-purple p-0 h-auto text-sm"
            onClick={() => window.location.href = '/security-news'}
          >
            View all
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayItems.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SecurityNews;
