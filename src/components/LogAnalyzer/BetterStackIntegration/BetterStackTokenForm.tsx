
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

interface BetterStackTokenFormProps {
  token: string;
  setToken: (token: string) => void;
  testStatus: 'idle' | 'testing' | 'success' | 'error';
  testConnection: () => Promise<void>;
}

const BetterStackTokenForm: React.FC<BetterStackTokenFormProps> = ({
  token,
  setToken,
  testStatus,
  testConnection,
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="betterstack-token" className="text-right col-span-1">
          API Token
        </Label>
        <Input
          id="betterstack-token"
          type="password"
          placeholder="Enter your BetterStack API token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="col-span-3 bg-black/20 border-cyber-purple/20"
        />
      </div>
      
      <div className="flex justify-end mt-2">
        <Button
          variant="outline" 
          onClick={testConnection}
          disabled={testStatus === 'testing'}
          className="text-xs border-cyber-purple/30 hover:bg-cyber-purple/10"
        >
          {testStatus === 'testing' && (
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          )}
          {testStatus === 'success' && (
            <CheckCircle2 className="mr-2 h-3 w-3 text-green-500" />
          )}
          Test Connection
        </Button>
      </div>
      
      <div className="bg-black/20 rounded-md p-3 mt-2 border border-cyber-purple/10">
        <p className="text-xs text-gray-400">
          Need a token? Visit your BetterStack dashboard to generate an API token with the 
          appropriate permissions for log analysis integration.
        </p>
      </div>
    </div>
  );
};

export default BetterStackTokenForm;
