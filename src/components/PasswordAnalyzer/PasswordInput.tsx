
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordInput = ({ 
  password, 
  setPassword, 
  showPassword, 
  togglePasswordVisibility 
}: PasswordInputProps) => {
  return (
    <div className="relative mb-6">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password to analyze"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-black/30 border-cyber-purple/20 focus:border-cyber-purple/50 h-12 pr-12"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-400" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
