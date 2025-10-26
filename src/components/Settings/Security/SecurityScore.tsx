
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Activity, AlertTriangle } from 'lucide-react';

const SecurityScore = () => {
  return (
    <Card className="bg-black/20 border-cyber-purple/20 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-medium text-xl flex items-center gap-2">
          <Shield className="h-5 w-5 text-cyber-purple" />
          Security Score
        </CardTitle>
        <CardDescription>
          Your account security status and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
              style={{ width: '75%' }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-black/30 p-4 rounded-lg border border-cyber-purple/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Two-Factor Auth</p>
                  <p className="text-cyber-alert font-medium">Not Enabled</p>
                </div>
                <AlertTriangle className="h-5 w-5 text-cyber-alert" />
              </div>
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg border border-cyber-purple/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Password Strength</p>
                  <p className="text-yellow-500 font-medium">Moderate</p>
                </div>
                <Shield className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg border border-cyber-purple/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Account Activity</p>
                  <p className="text-green-500 font-medium">Normal</p>
                </div>
                <Activity className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityScore;
