
import React, { useState } from 'react';
import { analyzePasswordStrength } from '@/utils/passwordUtils';
import PasswordInput from './PasswordInput';
import PasswordStrengthBar from './PasswordStrengthBar';
import BreachChecker from './BreachChecker';
import PasswordRequirements from './PasswordRequirements';
import Recommendations from './Recommendations';
import { usePasswordBreach } from './usePasswordBreach';

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const strengthResult = analyzePasswordStrength(password);
  const { 
    breachCount, 
    setBreachCount, 
    isCheckingBreach, 
    checkPasswordBreach 
  } = usePasswordBreach(password);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="rounded-xl glass-card p-6">
      <div className="flex flex-col items-center text-center max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-2">Password Strength Analyzer</h2>
        <p className="text-gray-400 mb-6">
          Enter a password to instantly check its strength and security.
        </p>
        
        <div className="w-full">
          <PasswordInput 
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          
          <PasswordStrengthBar
            score={strengthResult.score}
            password={password}
          />
          
          <BreachChecker
            password={password}
            breachCount={breachCount}
            isCheckingBreach={isCheckingBreach}
            checkPasswordBreach={checkPasswordBreach}
            setBreachCount={setBreachCount}
          />

          <PasswordRequirements
            strengthResult={strengthResult}
            breachCount={breachCount}
          />
          
          <Recommendations
            strengthResult={strengthResult}
            password={password}
            breachCount={breachCount}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
