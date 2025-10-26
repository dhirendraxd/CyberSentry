
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export const usePasswordBreach = (password: string) => {
  const [breachCount, setBreachCount] = useState<number | null>(null);
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);

  // Reset breach count when password changes
  useEffect(() => {
    setBreachCount(null);
  }, [password]);

  // Check if password has been breached using HIBP API
  const checkPasswordBreach = async () => {
    if (!password || password.length < 5) {
      return;
    }

    try {
      setIsCheckingBreach(true);
      // Convert password to SHA-1 hash
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      
      // Convert hash to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Get first 5 characters of hash for the API call
      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);
      
      // Make API call to Have I Been Pwned
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!response.ok) {
        throw new Error('Failed to check password breach');
      }
      
      const text = await response.text();
      
      // Parse response to find if our password hash suffix is in the list
      const breaches = text.split('\r\n');
      const foundBreach = breaches.find(breach => {
        const [hashSuffix, count] = breach.split(':');
        return hashSuffix.toLowerCase() === suffix.toLowerCase();
      });
      
      if (foundBreach) {
        const count = parseInt(foundBreach.split(':')[1]);
        setBreachCount(count);
        
        if (count > 0) {
          toast({
            title: "Password Breach Alert",
            description: `This password has been exposed in ${count.toLocaleString()} data breaches.`,
            variant: "destructive",
          });
        }
      } else {
        setBreachCount(0);
        toast({
          title: "Good News",
          description: "This password hasn't been found in any known data breaches.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error checking password breach:', error);
      toast({
        title: "Error",
        description: "Couldn't check if this password has been breached.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingBreach(false);
    }
  };

  return {
    breachCount,
    setBreachCount,
    isCheckingBreach,
    checkPasswordBreach
  };
};
