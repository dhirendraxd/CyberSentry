
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Download, Trash2, Shield } from 'lucide-react';
import { useAnonymousData } from '@/hooks/useAnonymousData';
import DeleteDataDialog from './DeleteDataDialog';
import { Badge } from '@/components/ui/badge';

const DataManagement: React.FC = () => {
  const { data, clearAllData } = useAnonymousData();

  const dataStats = {
    totalEntries: data.length,
    emails: data.filter(item => item.data_type === 'breach').length,
    scans: data.filter(item => item.data_type === 'scan').length,
    passwords: data.filter(item => item.data_type === 'password').length,
  };

  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalEntries: data.length,
      data: data.map(item => ({
        type: item.data_type,
        timestamp: item.timestamp,
        data: item.data_payload
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cybersentry-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Data Overview */}
      <Card className="bg-black/20 border-cyber-purple/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyber-purple/20">
              <Database className="h-5 w-5 text-cyber-purple" />
            </div>
            Your Data Overview
          </CardTitle>
          <CardDescription>
            Manage your stored data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 p-4 rounded-lg border border-cyber-purple/10">
              <div className="text-2xl font-bold text-white">{dataStats.totalEntries}</div>
              <div className="text-sm text-gray-400">Total Entries</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-cyber-blue/10">
              <div className="text-2xl font-bold text-cyber-blue">{dataStats.emails}</div>
              <div className="text-sm text-gray-400">Email Checks</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-green-500/10">
              <div className="text-2xl font-bold text-green-500">{dataStats.scans}</div>
              <div className="text-sm text-gray-400">Security Scans</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/10">
              <div className="text-2xl font-bold text-yellow-500">{dataStats.passwords}</div>
              <div className="text-sm text-gray-400">Password Checks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Information */}
      <Card className="bg-black/20 border-cyber-purple/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Shield className="h-5 w-5 text-green-500" />
            </div>
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Anonymous
              </Badge>
              <span className="text-sm text-gray-300">
                All data is stored anonymously without personal identification
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                Local Session
              </Badge>
              <span className="text-sm text-gray-300">
                Your session is stored locally in your browser
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                Encrypted
              </Badge>
              <span className="text-sm text-gray-300">
                All data is encrypted in transit and at rest
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Actions */}
      <Card className="bg-black/20 border-cyber-purple/20">
        <CardHeader>
          <CardTitle className="text-white">Data Management Actions</CardTitle>
          <CardDescription>
            Export, clear, or delete your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="w-full border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              disabled={data.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export My Data (JSON)
            </Button>
            
            <Button
              onClick={clearAllData}
              variant="outline"
              className="w-full border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
              disabled={data.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear History (Keep Session)
            </Button>
            
            <DeleteDataDialog />
          </div>
          
          {data.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">
              No data to manage. Start using our tools to build your history.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManagement;
