
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreachCheckerProps {
  password: string;
  breachCount: number | null;
  isCheckingBreach: boolean;
  checkPasswordBreach: () => void;
  setBreachCount: (count: number | null) => void;
}

const BreachChecker = ({ 
  password, 
  breachCount, 
  isCheckingBreach, 
  checkPasswordBreach,
  setBreachCount
}: BreachCheckerProps) => {
  if (password.length < 5) {
    return null;
  }

  if (breachCount === null) {
    return (
      <div className="mb-6">
        <Button
          onClick={checkPasswordBreach}
          disabled={isCheckingBreach}
          variant="outline" 
          className="w-full border-cyber-purple/30 hover:bg-cyber-purple/10"
        >
          {isCheckingBreach ? (
            <>
              <div className="mr-2 h-4 w-4 rounded-full border-2 border-cyber-purple/30 border-t-cyber-purple animate-spin"></div>
              Checking for breaches...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Check if password has been breached
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "mb-6 p-4 rounded-lg flex items-start gap-3",
      breachCount > 0 ? "bg-cyber-alert/10" : "bg-green-500/10"
    )}>
      {breachCount > 0 ? (
        <AlertTriangle className="h-5 w-5 text-cyber-alert flex-shrink-0 mt-0.5" />
      ) : (
        <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
      )}
      <div className="text-left">
        <p className={cn(
          "text-sm font-medium",
          breachCount > 0 ? "text-cyber-alert" : "text-green-500"
        )}>
          {breachCount > 0 ? "Password breach detected!" : "No breaches found"}
        </p>
        <p className="text-xs text-gray-400">
          {breachCount > 0 
            ? `This password has appeared in ${breachCount.toLocaleString()} data breaches. You should NOT use it.` 
            : "This password doesn't appear in known data breaches."}
        </p>
        {breachCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 p-0 h-auto text-xs text-cyber-alert hover:text-cyber-alert/80 hover:bg-transparent"
            onClick={() => setBreachCount(null)}
          >
            Check another password
          </Button>
        )}
      </div>
    </div>
  );
};

export default BreachChecker;
