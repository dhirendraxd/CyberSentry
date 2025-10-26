
import React, { useState } from 'react';
import { ApiKey } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { 
  Trash2, 
  Key, 
  Copy, 
  Check, 
  Database,
  Globe,
  Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  onDelete: (keyId: string, keyName: string) => void;
}

const ApiKeyList = ({ apiKeys, onDelete }: ApiKeyListProps) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyKeyToClipboard = (keyName: string) => {
    // In a real app, you would retrieve the key from somewhere secure
    const fullKey = localStorage.getItem(`api_key_${keyName}`);
    
    if (fullKey) {
      navigator.clipboard.writeText(fullKey).then(() => {
        setCopiedKey(keyName);
        toast({
          title: "Copied to clipboard",
          description: "API key has been copied to your clipboard.",
        });
        
        // Reset copied state after 3 seconds
        setTimeout(() => {
          setCopiedKey(null);
        }, 3000);
      });
    } else {
      toast({
        title: "Error",
        description: "Could not retrieve the full API key.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (keyId: string, keyName: string) => {
    onDelete(keyId, keyName);
    setConfirmDeleteId(null);
  };

  if (apiKeys.length === 0) {
    return (
      <div className="rounded-lg bg-black/30 p-6 border border-cyber-purple/10 text-center">
        <Key className="h-12 w-12 text-cyber-purple/40 mx-auto mb-3" />
        <p className="text-gray-300 mb-2">You haven't added any API keys yet</p>
        <p className="text-sm text-gray-400 mb-4">
          Add API keys to integrate with security services like Have I Been Pwned, 
          dark web scanners, and more
        </p>
      </div>
    );
  }

  // API service information
  const apiServices = [
    {
      id: 'hibp',
      name: 'Have I Been Pwned',
      icon: <Database className="h-5 w-5 text-cyber-purple" />,
      description: 'Check for compromised accounts and passwords in data breaches',
      url: 'https://haveibeenpwned.com/API/v3'
    },
    {
      id: 'darkweb',
      name: 'Dark Web Scanner',
      icon: <Globe className="h-5 w-5 text-cyber-electric-lime" />,
      description: 'Scan the dark web for compromised credentials and personal information',
      url: '#'
    },
    {
      id: 'security',
      name: 'Security News API',
      icon: <Shield className="h-5 w-5 text-cyber-crimson" />,
      description: 'Get the latest security news and vulnerability alerts',
      url: '#'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {apiKeys.map((key) => (
          <div key={key.id} className="flex justify-between items-center p-4 bg-black/40 rounded-md border border-cyber-purple/20 hover:border-cyber-purple/40 transition-colors group">
            <div>
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-cyber-purple" />
                <p className="font-medium text-white">{key.key_name}</p>
              </div>
              <p className="text-xs text-gray-400 mt-1 font-mono">{key.key_value}</p>
              <p className="text-xs text-gray-500 mt-0.5">Created: {new Date(key.created_at).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-cyber-purple hover:bg-cyber-purple/10 h-8 w-8"
                onClick={() => copyKeyToClipboard(key.key_name)}
              >
                {copiedKey === key.key_name ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-400 hover:text-cyber-alert hover:bg-cyber-alert/10 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-black/90 border-cyber-purple/30">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete API Key</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this API key? This action cannot be undone and any services using this key will stop working.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-cyber-alert hover:bg-cyber-alert/90"
                      onClick={() => handleDelete(key.id, key.key_name)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-black/20 p-4 mt-6 border border-cyber-purple/10">
        <h3 className="text-md font-medium text-white mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-cyber-purple" />
          Available API Integrations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiServices.map(service => (
            <div 
              key={service.id} 
              className="bg-black/30 p-4 rounded-lg border border-cyber-purple/10 hover:border-cyber-purple/30 transition-all hover:translate-y-[-2px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-black/40 p-2 rounded-full">
                  {service.icon}
                </div>
                <h4 className="text-white font-medium">{service.name}</h4>
              </div>
              <p className="text-xs text-gray-400 mb-3">{service.description}</p>
              <a 
                href={service.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-cyber-purple hover:text-cyber-purple/80 underline underline-offset-2"
              >
                View Documentation
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyList;
