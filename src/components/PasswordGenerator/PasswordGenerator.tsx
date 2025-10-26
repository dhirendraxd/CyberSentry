
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { generatePassword } from '@/utils/passwordUtils';
import { useToast } from '@/components/ui/use-toast';

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    generateNewPassword();
  }, []);
  
  const generateNewPassword = () => {
    // Ensure at least one option is enabled
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast({
        title: "Error",
        description: "Please enable at least one character type",
        variant: "destructive",
      });
      return;
    }
    
    const newPassword = generatePassword(
      length, 
      includeUppercase, 
      includeLowercase, 
      includeNumbers, 
      includeSymbols
    );
    
    setPassword(newPassword);
    setCopied(false);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      toast({
        title: "Password Copied",
        description: "Password has been copied to clipboard",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  
  return (
    <div className="rounded-xl glass-card p-6">
      <div className="flex flex-col items-center text-center max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-2">Secure Password Generator</h2>
        <p className="text-gray-400 mb-6">
          Create strong, unique passwords to enhance your online security.
        </p>
        
        <div className="w-full">
          <div className="relative mb-6">
            <Input
              type="text"
              value={password}
              readOnly
              className="font-mono text-center bg-black/30 border-cyber-purple/20 focus:border-cyber-purple/50 h-12 pr-24"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={generateNewPassword}
              >
                <RefreshCw className="h-4 w-4 text-cyber-purple" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-cyber-purple" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-6 text-left">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-white">Password Length: {length}</Label>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">8</span>
                <Slider
                  value={[length]}
                  min={8}
                  max={32}
                  step={1}
                  onValueChange={(value) => setLength(value[0])}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400">32</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-white">Character Types</h3>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="uppercase" className="text-gray-300 cursor-pointer">
                    Uppercase Letters (A-Z)
                  </Label>
                </div>
                <Switch
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="lowercase" className="text-gray-300 cursor-pointer">
                    Lowercase Letters (a-z)
                  </Label>
                </div>
                <Switch
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="numbers" className="text-gray-300 cursor-pointer">
                    Numbers (0-9)
                  </Label>
                </div>
                <Switch
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="symbols" className="text-gray-300 cursor-pointer">
                    Special Characters (!@#$%^&*)
                  </Label>
                </div>
                <Switch
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
              </div>
            </div>
            
            <Button 
              onClick={generateNewPassword}
              className="w-full bg-cyber-purple hover:bg-cyber-purple/90 text-white"
            >
              Generate New Password
            </Button>
            
            <div className="text-xs text-gray-400 mt-3">
              <p>
                Tip: Use a different password for each of your accounts to maximize your security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
