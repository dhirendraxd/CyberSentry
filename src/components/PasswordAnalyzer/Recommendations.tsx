
import React from 'react';

interface RecommendationsProps {
  strengthResult: {
    score: number;
    hasLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    hasNoCommon: boolean;
  };
  password: string;
  breachCount: number | null;
}

const Recommendations = ({ strengthResult, password, breachCount }: RecommendationsProps) => {
  if (!password || password.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 text-left p-4 rounded-lg bg-black/30">
      <h4 className="text-md font-medium text-white mb-2">Recommendations</h4>
      <ul className="space-y-2">
        {!strengthResult.hasLength && (
          <li className="text-sm text-gray-300">• Make your password at least 8 characters long</li>
        )}
        {!strengthResult.hasUppercase && (
          <li className="text-sm text-gray-300">• Add uppercase letters (A-Z)</li>
        )}
        {!strengthResult.hasLowercase && (
          <li className="text-sm text-gray-300">• Add lowercase letters (a-z)</li>
        )}
        {!strengthResult.hasNumber && (
          <li className="text-sm text-gray-300">• Add numbers (0-9)</li>
        )}
        {!strengthResult.hasSpecial && (
          <li className="text-sm text-gray-300">• Add special characters (!@#$%^&*)</li>
        )}
        {!strengthResult.hasNoCommon && (
          <li className="text-sm text-gray-300">• Avoid common passwords and patterns</li>
        )}
        {breachCount !== null && breachCount > 0 && (
          <li className="text-sm text-cyber-alert">• This password has been compromised in data breaches</li>
        )}
        {strengthResult.score >= 4 && breachCount !== null && breachCount === 0 && (
          <li className="text-sm text-green-500">• Great job! Your password is strong and hasn't been found in any known breaches.</li>
        )}
        {strengthResult.score >= 4 && breachCount === null && (
          <li className="text-sm text-green-500">• Great job! Your password is strong.</li>
        )}
      </ul>
    </div>
  );
};

export default Recommendations;
