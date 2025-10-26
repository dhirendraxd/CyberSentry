
import React, { useState, useEffect } from 'react';
import { SearchResult } from '@/types/search';
import { navLinks } from '@/config/navigation';

export function useGlobalSearch(query: string) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  // Mock search functionality - replace with actual search logic
  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Search through navigation links
    const pageResults = navLinks
      .filter(link => 
        link.name.toLowerCase().includes(lowerQuery) || 
        link.description.toLowerCase().includes(lowerQuery)
      )
      .map(link => ({
        type: 'page' as const,
        title: link.name,
        description: link.description,
        icon: link.icon ? React.createElement(link.icon) : undefined,
        href: link.path
      }));

    // Add some mock security settings results
    const settingsResults = [
      { name: 'API Keys', path: '/settings', description: 'Manage your API integrations' },
      { name: 'Security Settings', path: '/settings', description: 'Configure account security' },
      { name: 'Notifications', path: '/settings', description: 'Set up breach alerts' }
    ]
      .filter(setting => 
        setting.name.toLowerCase().includes(lowerQuery) || 
        setting.description.toLowerCase().includes(lowerQuery)
      )
      .map(setting => ({
        type: 'setting' as const,
        title: setting.name,
        description: setting.description,
        href: setting.path
      }));

    // Combine all results
    setSearchResults([...pageResults, ...settingsResults]);
  }, [query]);

  return searchResults;
}
