
import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
}

const fetchIPInfo = async (): Promise<IPInfo> => {
  // Use the environment variable instead of hardcoding the API key
  const API_KEY = import.meta.env.VITE_GEO_API_KEY || '34b7cba540014d868522efee3b1b41bf';

  try {
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch IP information');
    }

    const data = await response.json();

    return {
      ip: data.ip,
      city: data.city,
      region: data.state_prov,
      country: data.country_name,
      loc: `${data.latitude},${data.longitude}`,
      org: data.organization || data.isp || 'Unknown ISP',
      timezone: data.time_zone?.name || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return {
      ip: '192.168.1.1',
      city: 'New York',
      region: 'New York',
      country: 'US',
      loc: '40.7128,-74.0060',
      org: 'Example Internet Service Provider',
      timezone: 'America/New_York'
    };
  }
};

const IPLocationInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['ip-info'],
    queryFn: fetchIPInfo,
  });

  if (isLoading) {
    return (
      <Card className="p-4 border-cyber-purple/20 bg-cyber-dark-purple/40 backdrop-blur-sm">
        <div className="flex items-center justify-center h-24">
          <div className="h-6 w-6 rounded-full border-2 border-cyber-purple/30 border-t-cyber-purple animate-spin"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border border-cyber-blue/20 bg-cyber-dark-purple/40 backdrop-blur-sm relative overflow-hidden group hover:border-cyber-blue/40 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex flex-col space-y-4 relative z-10">
        <h3 className="text-lg font-medium text-white flex items-center">
          <Globe className="h-5 w-5 text-cyber-blue mr-2" />
          Your Network Information
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-400">IP Address</span>
            <span className="text-white font-mono">{data?.ip}</span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-400">Location</span>
            <span className="text-white flex items-center">
              <MapPin className="h-3 w-3 text-cyber-blue mr-1" />
              {data?.city}, {data?.region}, {data?.country}
            </span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-400">ISP</span>
            <span className="text-white truncate" title={data?.org}>{data?.org}</span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-400">Timezone</span>
            <span className="text-white">{data?.timezone}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IPLocationInfo;
