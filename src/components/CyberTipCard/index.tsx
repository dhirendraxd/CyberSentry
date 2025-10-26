
import React, { useEffect, useState } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CyberTip {
  id: number;
  tip: string;
  category: string;
}

const tips: CyberTip[] = [
  {
    id: 1,
    tip: "Use a password manager to generate and store strong, unique passwords for all your accounts.",
    category: "Password Security"
  },
  {
    id: 2,
    tip: "Enable two-factor authentication (2FA) on all services that support it, especially email and financial accounts.",
    category: "Access Security"
  },
  {
    id: 3,
    tip: "Keep your operating system and software updated to protect against known vulnerabilities.",
    category: "System Security"
  },
  {
    id: 4,
    tip: "Be cautious with email attachments and links, even if they appear to come from someone you know.",
    category: "Phishing Prevention"
  },
  {
    id: 5,
    tip: "Use a VPN when connecting to public Wi-Fi to encrypt your internet traffic.",
    category: "Network Security"
  },
  {
    id: 6,
    tip: "Regularly back up your important data following the 3-2-1 rule: 3 copies, 2 different media types, 1 off-site.",
    category: "Data Protection"
  },
  {
    id: 7,
    tip: "Review app permissions on your mobile devices and limit access to only what's necessary.",
    category: "Mobile Security"
  },
  {
    id: 8,
    tip: "Use encrypted messaging apps for sensitive communications.",
    category: "Communication Security"
  },
  {
    id: 9,
    tip: "Regularly check for data breaches involving your email addresses at haveibeenpwned.com.",
    category: "Identity Protection"
  },
  {
    id: 10,
    tip: "Be mindful of what you share on social media—cybercriminals can use this information against you.",
    category: "Privacy"
  }
];

const CyberTipCard = () => {
  const [currentTip, setCurrentTip] = useState<CyberTip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRandomTip = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    // Check if we should load a new tip or use a cached one
    const lastTipDate = localStorage.getItem('lastTipDate');
    const cachedTip = localStorage.getItem('currentTip');
    
    const today = new Date().toDateString();
    
    if (lastTipDate !== today || !cachedTip) {
      // New day or no cached tip, load a new one
      loadRandomTip();
      localStorage.setItem('lastTipDate', today);
    } else {
      // Use cached tip from today
      setCurrentTip(JSON.parse(cachedTip));
      setIsLoading(false);
    }
  }, []);

  // Cache the current tip
  useEffect(() => {
    if (currentTip) {
      localStorage.setItem('currentTip', JSON.stringify(currentTip));
    }
  }, [currentTip]);

  return (
    <Card className="rounded-xl glass-card border-cyber-alert/20 hover:border-cyber-alert/40 transition-all duration-300 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-white">Cyber Tip of the Day</CardTitle>
          {isLoading ? (
            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
            <Lightbulb className="h-5 w-5 text-cyber-alert" />
          )}
        </div>
        {currentTip && (
          <CardDescription className="text-gray-400">
            {currentTip.category}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-24">
            <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        ) : currentTip ? (
          <div className="p-4 rounded-lg bg-black/20 text-center">
            <p className="text-sm text-white">{currentTip.tip}</p>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-black/20 text-center">
            <p className="text-sm text-gray-400">No tip available</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="link" 
          className="text-cyber-alert p-0 h-auto text-sm"
          onClick={loadRandomTip}
        >
          New Tip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CyberTipCard;
