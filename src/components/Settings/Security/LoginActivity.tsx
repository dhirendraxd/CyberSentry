
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginActivity = () => {
  // Mock login history
  const recentLogins = [
    { id: 1, device: "Windows PC", location: "New York, US", ip: "192.168.1.1", time: "Today, 10:30 AM" },
    { id: 2, device: "iPhone 13", location: "Austin, TX", ip: "172.16.254.1", time: "Yesterday, 8:45 PM" },
    { id: 3, device: "MacBook Pro", location: "San Francisco, CA", ip: "10.0.0.1", time: "May 10, 2025, 3:20 PM" }
  ];

  return (
    <Card className="bg-black/20 border-cyber-purple/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-medium text-xl">Recent Login Activity</CardTitle>
        <CardDescription>
          Review your recent account logins for suspicious activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLogins.map(login => (
            <div key={login.id} className="flex justify-between items-center p-3 bg-black/40 rounded-md border border-cyber-purple/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{login.device}</p>
                  {login.id === 1 && (
                    <span className="text-xs bg-cyber-purple/20 text-cyber-purple px-1.5 py-0.5 rounded-full">Current</span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{login.location} • {login.ip}</p>
                <p className="text-xs text-gray-500">{login.time}</p>
              </div>
              {login.id !== 1 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-cyber-alert hover:bg-cyber-alert/10 text-xs h-7 px-2"
                >
                  Logout Device
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginActivity;
