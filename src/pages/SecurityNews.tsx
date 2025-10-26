
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { fetchRssFeed, RssItem } from '@/utils/rssUtils';
import { Newspaper } from 'lucide-react';
import SecurityNewsHeader from '@/components/SecurityNews/SecurityNewsHeader';
import NewsError from '@/components/SecurityNews/NewsError'; 
import NewsArticleList from '@/components/SecurityNews/NewsArticleList';
import SidebarContent from '@/components/SecurityNews/SidebarContent';

const SecurityNews = () => {
  const [newsItems, setNewsItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const hackerNewsRss = 'https://thehackernews.com/feeds/posts/default';
      const items = await fetchRssFeed(hackerNewsRss);
      setNewsItems(items);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError('Failed to load the latest security news');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <SecurityNewsHeader loading={loading} onRefresh={fetchNews} />
        
        {error && <NewsError error={error} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NewsArticleList 
            newsItems={newsItems} 
            loading={loading} 
            onRefresh={fetchNews}
          />
          
          <SidebarContent />
        </div>
      </div>
    </Layout>
  );
};

export default SecurityNews;
