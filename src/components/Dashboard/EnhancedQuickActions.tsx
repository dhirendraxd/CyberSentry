
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Key, 
  RefreshCw, 
  ShieldAlert,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LogAnalyzerCard from './LogAnalyzerCard';

const EnhancedQuickActions = () => {
  const actions = [
    {
      title: 'Check for Breaches',
      description: 'Check if your accounts have been compromised',
      path: '/breach-checker',
      icon: <Mail className="h-8 w-8 text-cyber-purple" />
    },
    {
      title: 'Analyze Password',
      description: 'Test the strength of your passwords',
      path: '/password-analyzer',
      icon: <Lock className="h-8 w-8 text-cyber-blue" />
    },
    {
      title: 'Generate Password',
      description: 'Create strong, secure passwords',
      path: '/password-generator',
      icon: <Key className="h-8 w-8 text-cyber-light-purple" />
    },
    {
      title: 'Dark Web Monitor',
      description: 'Scan the dark web for your data',
      path: '/dark-web',
      icon: <RefreshCw className="h-8 w-8 text-cyber-alert" />
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-white">Quick Actions & Tools</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link key={action.path} to={action.path} className="block">
            <Card className="security-gradient hover:shadow-lg transition-shadow card-glow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-md font-medium">{action.title}</CardTitle>
                {action.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{action.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
        
        <LogAnalyzerCard />
        
        <Link to="/security-scanner" className="block">
          <Card className="security-gradient card-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-md font-medium">Security Scanner</CardTitle>
              <ShieldAlert className="h-8 w-8 text-cyber-blue" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Scan for vulnerabilities and security threats
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default EnhancedQuickActions;
