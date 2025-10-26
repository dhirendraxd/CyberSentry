
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Activity, Trash2 } from 'lucide-react';
import { useAnonymousData } from '@/hooks/useAnonymousData';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const LastActivity: React.FC = () => {
  const { data, loading, clearAllData } = useAnonymousData();

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

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="bg-black/20 border-cyber-purple/30">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentActivity = data.slice(0, 5);

  return (
    <Card className="bg-black/20 border-cyber-purple/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyber-purple" />
              Your Last Activity
            </CardTitle>
            <CardDescription>
              Recent interactions stored anonymously
            </CardDescription>
          </div>
          {data.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllData}
              className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {recentActivity.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No activity yet</p>
            <p className="text-sm">Start using tools to see your history here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-cyber-purple/10 hover:border-cyber-purple/30 transition-colors"
              >
                <div className="text-2xl">
                  {getActivityIcon(activity.data_type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {activity.data_type}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    {activity.data_type === 'scan' && 'Security scan completed'}
                    {activity.data_type === 'log' && 'Log analysis performed'}
                    {activity.data_type === 'form' && 'Form submitted'}
                    {activity.data_type === 'breach' && 'Breach check completed'}
                    {activity.data_type === 'password' && 'Password analyzed'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LastActivity;
