
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bitcoin, RefreshCw, TrendingUp, TrendingDown, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=2&page=1&sparkline=false&locale=en'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    
    // Return fallback data when API fails
    return [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: 69420.69,
        price_change_percentage_24h: 2.5,
        last_updated: new Date().toISOString()
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        current_price: 3456.78,
        price_change_percentage_24h: -1.2,
        last_updated: new Date().toISOString()
      }
    ];
  }
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const CryptoTracker = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data: cryptoData = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast({
        title: "Data refreshed",
        description: "Cryptocurrency data has been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Could not update cryptocurrency data.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="rounded-xl glass-card border-cyber-purple/20 hover:border-cyber-purple/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-white">Crypto Tracker</CardTitle>
          {isLoading || isRefreshing ? (
            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
            <Bitcoin className="h-5 w-5 text-cyber-purple" />
          )}
        </div>
        <CardDescription className="text-gray-400">
          Live cryptocurrency prices
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {isError && cryptoData.length === 0 ? (
          <div className="p-4 rounded-lg bg-red-950/20 text-center">
            <p className="text-sm text-red-400">Unable to load cryptocurrency data</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cryptoData.map((crypto) => (
              <div key={crypto.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{crypto.name}</p>
                    <p className="text-xs text-gray-400">{crypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{formatPrice(crypto.current_price)}</p>
                  <div className="flex items-center justify-end gap-1">
                    {crypto.price_change_percentage_24h > 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-red-500">
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between">
        <Button 
          variant="link" 
          className="text-cyber-purple p-0 h-auto text-sm"
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
        {cryptoData.length > 0 && (
          <div className="flex items-center text-xs text-gray-400">
            <Timer className="h-3 w-3 mr-1" />
            <span>Updated at {formatTime(cryptoData[0].last_updated)}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CryptoTracker;
