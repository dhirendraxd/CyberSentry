
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Key, RefreshCw, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  description: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, path, description }) => {
  return (
    <Link to={path} className="flex-1">
      <Button
        variant="outline"
        className="w-full h-full flex flex-col items-center justify-center space-y-2 py-6 px-3 rounded-xl border-cyber-purple/20 bg-cyber-purple/5 hover:bg-cyber-purple/10 transition-colors"
      >
        <div className="rounded-full bg-cyber-purple/10 p-3">{icon}</div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-gray-400 text-center">{description}</div>
      </Button>
    </Link>
  );
};

const QuickActions = () => {
  return (
    <div className="rounded-xl glass-card p-6">
      <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton
          icon={<Mail className="h-5 w-5 text-cyber-purple" />}
          label="Check Breach"
          path="/breach-checker"
          description="Scan email for breaches"
        />
        <ActionButton
          icon={<Lock className="h-5 w-5 text-cyber-purple" />}
          label="Analyze Password"
          path="/password-analyzer"
          description="Test password strength"
        />
        <ActionButton
          icon={<Key className="h-5 w-5 text-cyber-purple" />}
          label="Generate Password"
          path="/password-generator"
          description="Create strong passwords"
        />
        <ActionButton
          icon={<RefreshCw className="h-5 w-5 text-cyber-purple" />}
          label="Dark Web Scan"
          path="/dark-web"
          description="Check for leaked credentials"
        />
      </div>
    </div>
  );
};

export default QuickActions;
