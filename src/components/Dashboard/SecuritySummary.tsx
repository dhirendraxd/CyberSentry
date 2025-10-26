
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, InfoIcon, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SecurityItemProps {
  status: 'secure' | 'warning' | 'critical';
  message: string;
  tooltip?: string;
}

const StatusIcon = ({ status }: { status: SecurityItemProps['status'] }) => {
  switch (status) {
    case 'secure':
      return <ShieldCheck className="h-5 w-5 text-green-500" />;
    case 'warning':
      return <ShieldAlert className="h-5 w-5 text-yellow-400" />;
    case 'critical':
      return <ShieldX className="h-5 w-5 text-cyber-alert" />;
    default:
      return <Clock className="h-5 w-5 text-gray-400" />;
  }
};

const StatusText = ({ status }: { status: SecurityItemProps['status'] }) => {
  switch (status) {
    case 'secure':
      return <span className="text-green-500">Secure</span>;
    case 'warning':
      return <span className="text-yellow-400">Warning</span>;
    case 'critical':
      return <span className="text-cyber-alert">Critical</span>;
    default:
      return <span className="text-gray-400">Unknown</span>;
  }
};

const SecurityItem: React.FC<SecurityItemProps> = ({ status, message, tooltip }) => {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-cyber-purple/10 last:border-0">
      <StatusIcon status={status} />
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <p className="text-sm text-white">{message}</p>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="inline-flex">
                    <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="mt-1 text-xs">
          <StatusText status={status} />
        </div>
      </div>
    </div>
  );
};

const SecuritySummary = () => {
  const securityItems: SecurityItemProps[] = [
    {
      status: 'critical',
      message: 'Your password has been found in a data breach.',
      tooltip: 'Change your password immediately to prevent unauthorized access to your account.'
    },
    {
      status: 'warning',
      message: 'You have reused passwords across multiple accounts.',
      tooltip: 'Using unique passwords for each service helps prevent attackers from accessing multiple accounts.'
    },
    {
      status: 'secure',
      message: 'Two-factor authentication (2FA) is enabled.',
      tooltip: '2FA adds an extra layer of security by requiring a second form of verification.'
    },
    {
      status: 'secure',
      message: 'Your email has not been found in recent breaches.',
      tooltip: 'We continuously monitor the dark web for your personal information.'
    },
  ];

  return (
    <div className="rounded-xl glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Security Summary</h3>
        <div className="flex -space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-alert"></div>
        </div>
      </div>
      <div className="space-y-0">
        {securityItems.map((item, index) => (
          <SecurityItem key={index} status={item.status} message={item.message} tooltip={item.tooltip} />
        ))}
      </div>
    </div>
  );
};

export default SecuritySummary;
