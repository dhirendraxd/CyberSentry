
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreachProps {
  name: string;
  domain: string;
  date: string;
  affectedAccounts: string;
  compromisedData: string[];
}

const RecentBreaches = () => {
  const breaches: BreachProps[] = [
    {
      name: 'Example Service',
      domain: 'example.com',
      date: 'May 15, 2023',
      affectedAccounts: '3.5 million',
      compromisedData: ['Email addresses', 'Passwords', 'Names'],
    },
    {
      name: 'Demo Platform',
      domain: 'demo-platform.com',
      date: 'April 3, 2023',
      affectedAccounts: '1.2 million',
      compromisedData: ['Email addresses', 'Usernames', 'IP addresses'],
    },
    {
      name: 'Sample App',
      domain: 'sampleapp.io',
      date: 'March 28, 2023',
      affectedAccounts: '800,000',
      compromisedData: ['Email addresses', 'Phone numbers', 'Passwords'],
    },
  ];

  return (
    <div className="rounded-xl glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Recent Data Breaches</h3>
        <Button variant="link" className="text-cyber-purple p-0 h-auto text-sm">
          View all
        </Button>
      </div>
      
      <div className="space-y-4">
        {breaches.map((breach, index) => (
          <div key={index} className="rounded-lg bg-black/20 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-white">{breach.name}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-400">{breach.domain}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{breach.date}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                <ExternalLink className="h-4 w-4 text-cyber-purple" />
              </Button>
            </div>
            
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1">Affected accounts:</div>
              <div className="text-sm text-cyber-alert font-medium">{breach.affectedAccounts}</div>
            </div>
            
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1">Compromised data:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {breach.compromisedData.map((data, dataIndex) => (
                  <span 
                    key={dataIndex}
                    className="text-xs py-1 px-2 rounded-full bg-cyber-alert/10 text-cyber-alert"
                  >
                    {data}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBreaches;
