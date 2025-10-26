
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Search } from 'lucide-react';
import BreachResults from './BreachResults';
import { useAnonymousData } from '@/hooks/useAnonymousData';

const EmailChecker = () => {
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { saveData } = useAnonymousData();
  
  const handleEmailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsChecking(true);

    // Save email check activity
    await saveData('breach', {
      email: email,
      action: 'breach_check',
      timestamp: new Date().toISOString()
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      setShowResults(true);
    }, 1500);
  };
  
  return (
    <div className="rounded-xl glass-card p-6">
      <div className="flex flex-col items-center text-center max-w-lg mx-auto">
        <div className="mb-6">
          <div className="rounded-full bg-cyber-purple/10 p-4 mb-4 inline-block">
            <Mail className="h-6 w-6 text-cyber-purple" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Check for Data Breaches</h2>
          <p className="text-gray-400">
            Enter your email address to check if it has been compromised in any known data breaches.
          </p>
        </div>
        
        {!showResults ? (
          <form onSubmit={handleEmailCheck} className="w-full">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-black/30 border-cyber-purple/20 focus:border-cyber-purple/50 h-12"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button 
                type="submit" 
                className="bg-cyber-purple text-white hover:bg-cyber-purple/90 h-12 px-6"
                disabled={isChecking}
              >
                {isChecking ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Checking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Check Now
                  </span>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              We protect your privacy and will never store your email address or any other data.
            </p>
          </form>
        ) : (
          <BreachResults 
            email={email} 
            onBack={() => {
              setShowResults(false);
              setEmail('');
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default EmailChecker;
