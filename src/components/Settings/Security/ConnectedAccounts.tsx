
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
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

// Get the site URL dynamically based on environment
const getSiteUrl = () => {
  return window.location.origin;
};

interface ConnectedAccountsProps {
  user: User | null;
}

const ConnectedAccounts = ({ user }: ConnectedAccountsProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsConnecting(true);
      
      // Clean up existing auth state first
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Get the current site URL
      const redirectTo = getSiteUrl();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${redirectTo}/settings`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      
      if (error) {
        console.error('OAuth error:', error);
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Authentication initiated",
          description: "Complete the Google authentication in the popup window",
        });
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      toast({
        title: "Authentication error",
        description: "Failed to connect with Google",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectGoogle = async () => {
    try {
      setIsDisconnecting(true);
      // In a real app, you would disconnect the Google account 
      // Here we'll just show a success message for the demo
      setTimeout(() => {
        toast({
          title: "Account disconnected",
          description: "Your Google account has been disconnected",
        });
        setIsDisconnecting(false);
      }, 1000);
    } catch (error: any) {
      console.error('Error disconnecting Google:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect Google account",
        variant: "destructive"
      });
      setIsDisconnecting(false);
    }
  };

  return (
    <Card className="bg-black/20 border-cyber-purple/20 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-medium text-xl">Connected Accounts</CardTitle>
        <CardDescription>
          Manage your linked authentication methods.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-600/10 p-2">
              <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Google</p>
              <p className="text-xs text-gray-400">
                {user?.app_metadata?.provider === 'google' 
                  ? 'Connected' 
                  : 'Connect your Google account for enhanced security'}
              </p>
            </div>
          </div>
          
          {user?.app_metadata?.provider === 'google' ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-cyber-alert/20 text-cyber-alert hover:bg-cyber-alert/10"
                  disabled={isDisconnecting}
                >
                  {isDisconnecting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Disconnect
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-black/90 border-cyber-purple/30">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Disconnect Google Account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You won't be able to use Google login after disconnecting. You might need to create a password if you don't have one.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-cyber-alert hover:bg-cyber-alert/90"
                    onClick={handleDisconnectGoogle}
                  >
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button 
              variant="outline" 
              className="border-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/10"
              onClick={handleGoogleSignIn}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Connect
            </Button>
          )}
        </div>
        
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-600/10 p-2">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">GitHub</p>
              <p className="text-xs text-gray-400">Not connected</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-cyber-purple/20 text-cyber-purple"
          >
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccounts;
