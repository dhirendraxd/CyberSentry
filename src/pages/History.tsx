
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { History as HistoryIcon, Search, Trash2, Filter } from 'lucide-react';
import { useAnonymousData } from '@/hooks/useAnonymousData';

const History = () => {
  const { data, loading, clearAllData } = useAnonymousData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const dataTypes = ['all', ...Array.from(new Set(data.map(item => item.data_type)))];

  const filteredData = data.filter(item => {
    const matchesSearch = JSON.stringify(item.data_payload).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.data_type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.data_type === selectedType;
    return matchesSearch && matchesType;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (dataType: string) => {
    switch (dataType) {
      case 'scan': return '🔍';
      case 'log': return '📝';
      case 'form': return '📋';
      case 'breach': return '🛡️';
      case 'password': return '🔐';
      default: return '📊';
    }
  };

  return (
    <>
      <SEOHead
        title="History - CyberSentry"
        description="View your anonymous activity history and data stored locally"
        keywords="history, activity, anonymous data, privacy"
        canonical="/history"
      />
      
      <Layout>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Activity <span className="text-cyber-purple">History</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your anonymous activity history. All data is stored without personal identification and can be cleared anytime.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-cyber-purple/30 text-white"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {dataTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? 
                      "bg-cyber-purple hover:bg-cyber-purple/90" : 
                      "border-cyber-purple/30 text-gray-300 hover:bg-cyber-purple/10"
                    }
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {type}
                  </Button>
                ))}
              </div>
              
              {data.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearAllData}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="text-gray-400">
            Showing {filteredData.length} of {data.length} entries
          </div>

          {/* History Items */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="bg-black/20 border-cyber-purple/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : filteredData.length === 0 ? (
            <Card className="bg-black/20 border-cyber-purple/30">
              <CardContent className="text-center py-12">
                <HistoryIcon className="h-16 w-16 mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-medium text-white mb-2">No History Found</h3>
                <p className="text-gray-400">
                  {data.length === 0 
                    ? "Start using our tools to build your activity history."
                    : "No entries match your search criteria."
                  }
                </p>
                {searchQuery || selectedType !== 'all' ? (
                  <Button 
                    onClick={() => { setSearchQuery(''); setSelectedType('all'); }}
                    variant="outline"
                    className="mt-4 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                  >
                    Clear Filters
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredData.map((item) => (
                <Card key={item.id} className="bg-black/20 border-cyber-purple/30 hover:border-cyber-purple/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">
                          {getActivityIcon(item.data_type)}
                        </div>
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            <Badge variant="secondary">
                              {item.data_type}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {formatTimestamp(item.timestamp)}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/30 p-4 rounded-lg border border-cyber-purple/10">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(item.data_payload, null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default History;
