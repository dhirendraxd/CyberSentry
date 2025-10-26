
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import RequirementItem from './RequirementItem';
import { cn } from '@/lib/utils';

interface PasswordRequirementsProps {
  strengthResult: {
    score: number;
    hasLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    hasNoCommon: boolean;
  };
  breachCount: number | null;
}

const PasswordRequirements = ({ strengthResult, breachCount }: PasswordRequirementsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white text-left">Password Requirements</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RequirementItem 
          isMet={strengthResult.hasLength} 
          title="Minimum Length" 
          description="At least 8 characters"
        />
        
        <RequirementItem 
          isMet={strengthResult.hasUppercase} 
          title="Uppercase Letters" 
          description="At least one uppercase letter"
        />
        
        <RequirementItem 
          isMet={strengthResult.hasLowercase} 
          title="Lowercase Letters" 
          description="At least one lowercase letter"
        />
        
        <RequirementItem 
          isMet={strengthResult.hasNumber} 
          title="Numbers" 
          description="At least one number"
        />
        
        <RequirementItem 
          isMet={strengthResult.hasSpecial} 
          title="Special Characters" 
          description="At least one special character"
        />
        
        <RequirementItem 
          isMet={strengthResult.hasNoCommon} 
          title="Not Common" 
          description="Not a commonly used password"
        />
        
        {breachCount !== null && breachCount > 0 && (
          <div className="col-span-1 md:col-span-2 flex items-start gap-2 rounded-lg p-3 bg-cyber-alert/10">
            <AlertTriangle className="h-5 w-5 text-cyber-alert mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-cyber-alert">
                Compromised Password
              </p>
              <p className="text-xs text-gray-400">
                This password has been exposed in {breachCount.toLocaleString()} data breaches
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRequirements;
