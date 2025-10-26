
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PasswordStrengthBarProps {
  score: number;
  password: string;
}

const PasswordStrengthBar = ({ score, password }: PasswordStrengthBarProps) => {
  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-gray-400";
    if (score < 2) return "bg-cyber-alert";
    if (score < 3) return "bg-yellow-500";
    if (score < 4) return "bg-yellow-400";
    return "bg-green-500";
  };
  
  const getStrengthText = (score: number) => {
    if (password.length === 0) return "Enter a password";
    if (score === 0) return "Very Weak";
    if (score < 2) return "Weak";
    if (score < 3) return "Fair";
    if (score < 4) return "Good";
    return "Strong";
  };
  
  const getTextColor = (score: number) => {
    if (password.length === 0) return "text-gray-400";
    if (score < 2) return "text-cyber-alert";
    if (score < 4) return "text-yellow-400";
    return "text-green-500";
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Strength:</span>
        <span className={cn("text-sm font-medium", getTextColor(score))}>
          {getStrengthText(score)}
        </span>
      </div>
      <Progress value={score * 25} className="h-2">
        <div 
          className={cn("h-full rounded-full", getStrengthColor(score))} 
          style={{ width: `${score * 25}%` }} 
        />
      </Progress>
    </div>
  );
};

export default PasswordStrengthBar;
