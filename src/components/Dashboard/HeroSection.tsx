
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, AlertTriangle, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleRunSecurityScan = () => {
    navigate('/breach-checker');
  };

  return (
    <div className="rounded-xl glass-card security-gradient p-6 md:p-8 relative overflow-hidden border border-cyber-purple/20 group hover:border-cyber-purple/40 transition-all duration-300">
      {/* Animated decorative elements */}
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full border border-cyber-purple/20 opacity-50 group-hover:border-cyber-purple/40 transition-all"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full border border-cyber-blue/20 opacity-50 group-hover:border-cyber-blue/40 transition-all"></div>
      <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-cyber-purple/30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-cyber-blue/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30">
            <Terminal className="w-3 h-3 mr-1" /> Personal Cybersecurity Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient leading-tight">
            Protect Your Digital Identity with CyberSentry
          </h1>
          <p className="text-gray-300 text-lg">
            Stay one step ahead of hackers with our comprehensive security monitoring tools.
            Check for data breaches, analyze your passwords, and get real-time security alerts.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button 
              className="bg-cyber-purple hover:bg-cyber-purple/90 text-white relative group overflow-hidden"
              onClick={handleRunSecurityScan}
            >
              <span className="relative z-10 flex items-center">
                Run Security Scan 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
            <Button 
              variant="outline" 
              className="border-cyber-purple/30 text-white hover:bg-cyber-purple/10 relative overflow-hidden group"
              onClick={() => setShowLearnMore(true)}
            >
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 bg-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </div>
        </div>
        <div className="flex-shrink-0 flex justify-center relative">
          <div className="w-64 h-64 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 via-cyber-blue/20 to-cyber-purple/10 rounded-full opacity-80 blur-xl animate-pulse-slow"></div>
            <div className="absolute inset-0 border-2 border-cyber-purple/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-0 border border-cyber-blue/20 rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 bg-gradient-to-br from-cyber-purple/30 to-cyber-blue/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Shield className="h-24 w-24 text-white" />
            </div>
            <div className="absolute h-16 w-16 -bottom-2 -right-2 bg-gradient-to-br from-cyber-purple/30 to-cyber-blue/10 rounded-full flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '1.5s' }}>
              <AlertTriangle className="h-8 w-8 text-cyber-alert" />
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Dialog */}
      <Dialog open={showLearnMore} onOpenChange={setShowLearnMore}>
        <DialogContent className="bg-cyber-dark-purple/90 backdrop-blur-xl border border-cyber-purple/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-gradient font-bold">About CyberSentry</DialogTitle>
            <DialogDescription className="text-gray-300">
              Your personal cybersecurity assistant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              CyberSentry helps you monitor and protect your digital identity with advanced tools and real-time alerts.
            </p>
            <h3 className="font-medium text-cyber-purple">Key Features:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Data breach monitoring and alerts</li>
              <li>Password strength analysis</li>
              <li>Dark web monitoring</li>
              <li>Security score tracking</li>
              <li>Vulnerability assessment</li>
              <li>Cryptocurrency security monitoring</li>
            </ul>
            <p className="text-sm text-gray-400">
              Stay protected in an ever-evolving digital landscape with our comprehensive security tools.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSection;
