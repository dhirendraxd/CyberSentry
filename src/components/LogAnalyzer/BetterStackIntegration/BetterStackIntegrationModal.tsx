
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BetterStackTokenForm from './BetterStackTokenForm';

interface BetterStackIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isConnected: boolean;
  currentToken?: string;
  onSave: (token: string) => Promise<void>;
}

const BetterStackIntegrationModal: React.FC<BetterStackIntegrationModalProps> = ({
  open,
  onOpenChange,
  isConnected,
  currentToken,
  onSave,
}) => {
  const [token, setToken] = useState(currentToken || '');
  const [isSaving, setIsSaving] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (open) {
      // Reset states when modal opens
      setToken(currentToken || '');
      setTestStatus('idle');
    }
  }, [open, currentToken]);

  const handleSave = async () => {
    if (!token.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter a valid BetterStack API token",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(token);
      toast({
        title: "Integration Saved",
        description: "BetterStack integration has been configured successfully",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Configuration Failed",
        description: error instanceof Error ? error.message : "Failed to save integration settings",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const testConnection = async () => {
    if (!token.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter a valid token to test the connection",
        variant: "destructive"
      });
      return;
    }

    setTestStatus('testing');
    
    try {
      const response = await fetch('https://s1309632.eu-nbg-2.betterstackdata.com/ping', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setTestStatus('success');
        toast({
          title: "Connection Successful",
          description: "BetterStack API connection verified",
        });
      } else {
        setTestStatus('error');
        toast({
          title: "Connection Failed",
          description: `Status: ${response.status} - ${response.statusText}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      setTestStatus('error');
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Could not connect to BetterStack",
        variant: "destructive"
      });
    } finally {
      // Reset test status after a delay
      setTimeout(() => setTestStatus('idle'), 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-cyber-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">BetterStack Integration</DialogTitle>
          <DialogDescription>
            Configure your BetterStack integration for enhanced log analysis and threat detection.
          </DialogDescription>
        </DialogHeader>
        
        <BetterStackTokenForm
          token={token}
          setToken={setToken}
          testStatus={testStatus}
          testConnection={testConnection}
        />
        
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-cyber-purple hover:bg-cyber-purple/90"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Configuration'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BetterStackIntegrationModal;
