
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';

interface BreachResultsProps {
  email: string;
  onBack: () => void;
}

// Mock data for demonstration
const mockBreaches = [
  {
    service: 'Example Service',
    breachDate: 'May 15, 2023',
    compromisedData: ['Email addresses', 'Passwords', 'Names'],
    description: 'This breach affected 3.5 million users. User accounts were compromised, exposing email addresses, hashed passwords, and names.',
  },
  {
    service: 'Demo Platform',
    breachDate: 'April 3, 2023',
    compromisedData: ['Email addresses', 'Usernames', 'IP addresses'],
    description: 'A security incident at Demo Platform resulted in unauthorized access to 1.2 million user accounts, revealing email addresses, usernames, and IP addresses.',
  },
];

const BreachResults: React.FC<BreachResultsProps> = ({ email, onBack }) => {
  // For demo purposes, we'll assume the email is found in breaches
  const breachFound = true;
  
  return (
    <div className="w-full">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-gray-400 hover:text-white mb-6 p-0 h-auto"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Check another email
      </Button>
      
      <div className="text-left mb-8">
        <div className="flex items-start gap-4">
          {breachFound ? (
            <div className="rounded-full bg-cyber-alert/10 p-2 mt-1">
              <AlertTriangle className="h-5 w-5 text-cyber-alert" />
            </div>
          ) : (
            <div className="rounded-full bg-green-500/10 p-2 mt-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {breachFound ? "Oh no! Your email was found in data breaches" : "Good news! No breaches found"}
            </h3>
            <p className="text-gray-400">
              {breachFound
                ? `The email address ${email} appears in ${mockBreaches.length} known data breaches. It's recommended that you change your passwords immediately.`
                : `The email address ${email} hasn't been found in any known data breaches. However, it's still good practice to use strong unique passwords and enable two-factor authentication.`
              }
            </p>
          </div>
        </div>
      </div>
      
      {breachFound && (
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Affected Services</h4>
          <div className="space-y-4">
            {mockBreaches.map((breach, index) => (
              <div key={index} className="rounded-lg bg-black/20 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-white">{breach.service}</h5>
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    <ExternalLink className="h-4 w-4 text-cyber-purple" />
                  </Button>
                </div>
                
                <div className="text-xs text-gray-400 mb-2">Breach date: {breach.breachDate}</div>
                
                <p className="text-sm text-gray-300 mb-3">
                  {breach.description}
                </p>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Compromised data:</div>
                  <div className="flex flex-wrap gap-1">
                    {breach.compromisedData.map((data, dataIndex) => (
                      <span 
                        key={dataIndex}
                        className="text-xs py-1 px-2 rounded-full bg-cyber-alert/10 text-cyber-alert"
                      >
                        {data}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="text-lg font-medium text-white mb-4">Recommended Actions</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-cyber-purple/10 p-1 mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-cyber-purple"></span>
                </div>
                <span className="text-sm text-gray-300">Change your password on the affected services immediately.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-cyber-purple/10 p-1 mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-cyber-purple"></span>
                </div>
                <span className="text-sm text-gray-300">Use our Password Generator to create strong, unique passwords.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-cyber-purple/10 p-1 mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-cyber-purple"></span>
                </div>
                <span className="text-sm text-gray-300">Enable two-factor authentication on all your accounts.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-cyber-purple/10 p-1 mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-cyber-purple"></span>
                </div>
                <span className="text-sm text-gray-300">Regularly monitor your accounts for suspicious activity.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreachResults;
