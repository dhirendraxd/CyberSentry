
import React from 'react';
import { fetchRssFeed, RssItem } from '@/utils/rssUtils';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// This is a bridge component that provides the same functionality
// as the Dashboard/SecurityNews component but using our new structured components

const SecurityNews = () => {
  const { data: liveNewsItems = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['securityNews'],
    queryFn: async () => {
      try {
        const hackerNewsRss = 'https://thehackernews.com/feeds/posts/default';
        const items = await fetchRssFeed(hackerNewsRss);
        return items.slice(0, 3); // Get only the 3 most recent items for the dashboard
      } catch (err) {
        console.error('Failed to fetch news:', err);
        throw new Error('Failed to load news');
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fallback static news items
  const staticNewsItems = [
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

  // Helper functions from rssUtils
  function timeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    
    return 'just now';
  }
  
  function formatPubDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }
  
  // NewsItem component
  const NewsItem = ({ title, source, time, date, description, link }: any) => {
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
            <Clock className="h-3 w-3 text-cyber-purple" />
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

  return (
    <div className="rounded-xl glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Security News</h3>
        <div className="flex items-center gap-2">
          {isLoading && (
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
