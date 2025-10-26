
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Eye, Server, AlertTriangle } from 'lucide-react';

const SecurityCard = ({ 
  title, 
  description, 
  icon, 
  color, 
  link, 
  status 
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'purple' | 'blue' | 'alert';
  link: string;
  status: React.ReactNode;
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'purple': return {
        border: 'border-cyber-purple/20 hover:border-cyber-purple/40',
        gradient: 'from-cyber-purple/10',
        iconBg: 'bg-cyber-purple/10 group-hover:bg-cyber-purple/20',
        buttonBorder: 'border-cyber-purple/30 hover:bg-cyber-purple/20 group-hover:border-cyber-purple/50',
      };
      case 'blue': return {
        border: 'border-cyber-blue/20 hover:border-cyber-blue/40',
        gradient: 'from-cyber-blue/10',
        iconBg: 'bg-cyber-blue/10 group-hover:bg-cyber-blue/20',
        buttonBorder: 'border-cyber-blue/30 hover:bg-cyber-blue/20 group-hover:border-cyber-blue/50',
      };
      case 'alert': return {
        border: 'border-cyber-alert/20 hover:border-cyber-alert/40',
        gradient: 'from-cyber-alert/10',
        iconBg: 'bg-cyber-alert/10 group-hover:bg-cyber-alert/20',
        buttonBorder: 'border-cyber-alert/30 hover:bg-cyber-alert/20 group-hover:border-cyber-alert/50',
      };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`rounded-xl glass-card p-6 flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-lg ${colors.border}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className={`rounded-full ${colors.iconBg} p-3 w-fit mb-4 relative z-10 transition-all duration-300`}>
        {icon}
      </div>
      <h3 className="text-lg font-medium text-white mb-2 relative z-10">{title}</h3>
      <p className="text-gray-400 mb-4 flex-grow relative z-10">{description}</p>
      <div className="relative z-10">
        {status}
      </div>
      <Button variant="outline" className={`${colors.buttonBorder} text-white w-full relative z-10`} asChild>
        <a href={link}>Improve Security</a>
      </Button>
    </div>
  );
};

const SecurityHighlights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SecurityCard
        title="Password Health"
        description="Analyze and improve your password security with our tools."
        icon={<Lock className="h-6 w-6 text-cyber-purple" />}
        color="purple"
        link="/password-analyzer"
        status={
          <>
            <div className="h-1.5 w-full bg-cyber-purple/10 rounded-full mb-3">
              <div className="h-full bg-cyber-purple rounded-full" style={{ width: '70%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>70% Secure</span>
              <span>5 Issues</span>
            </div>
          </>
        }
      />
      
      <SecurityCard
        title="Data Breach Monitoring"
        description="Check if your accounts have been compromised in data breaches."
        icon={<Eye className="h-6 w-6 text-cyber-blue" />}
        color="blue"
        link="/breach-checker"
        status={
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-cyber-alert" />
            <span className="text-sm text-cyber-alert">3 breaches detected</span>
          </div>
        }
      />
      
      <SecurityCard
        title="Dark Web Monitoring"
        description="Detect if your information is being traded on the dark web."
        icon={<Server className="h-6 w-6 text-cyber-alert" />}
        color="alert"
        link="/dark-web"
        status={
          <div className="flex items-center justify-between text-xs mb-4">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-gray-400">No alerts</span>
            </div>
            <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Protected</div>
          </div>
        }
      />
    </div>
  );
};

export default SecurityHighlights;
