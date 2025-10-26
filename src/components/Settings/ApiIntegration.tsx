
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { Lock, Loader2, AlertTriangle, Shield, Database } from 'lucide-react';
import ApiKeyForm from './ApiKey/ApiKeyForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Get the site URL dynamically based on environment
const getSiteUrl = () => {
  return window.location.origin;
};

const ApiIntegration = ({ user }: { user: User | null }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      
      // Clean up existing auth state
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
      setIsAuthenticating(false);
    }
  };

  return (
    <Card className="bg-black/20 border-cyber-purple/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-medium text-xl flex items-center gap-2">
          <Database className="h-5 w-5 text-cyber-purple" />
          API Integration
        </CardTitle>
        <CardDescription>
          Manage API keys for external service integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!user ? (
          <div className="p-6 rounded-lg bg-black/30 text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="rounded-full bg-cyber-purple/10 p-4">
                <Lock className="h-8 w-8 text-cyber-purple" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Sign in to Use API Features</h3>
                <p className="text-sm text-gray-400">
                  You need to be signed in to manage your API keys and integrations.
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full md:w-auto bg-cyber-purple hover:bg-cyber-purple/90 text-white"
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>Sign in with Google</>
              )}
            </Button>
          </div>
        ) : (
          <ApiKeyForm user={user} />
        )}
        
        {user && (
          <>
            <div className="rounded-lg bg-black/30 p-5 mt-6 border border-cyber-purple/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-full bg-cyber-purple/10 p-2 mt-1">
                  <AlertTriangle className="h-5 w-5 text-cyber-purple" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-white mb-1">API Security Best Practices</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="block h-2 w-2 rounded-full bg-cyber-purple mt-1.5"></span>
                      <p>Never share your API keys with anyone or expose them in client-side code</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="block h-2 w-2 rounded-full bg-cyber-purple mt-1.5"></span>
                      <p>Rotate your API keys regularly for enhanced security</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="block h-2 w-2 rounded-full bg-cyber-purple mt-1.5"></span>
                      <p>Use different API keys for different services and environments</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="block h-2 w-2 rounded-full bg-cyber-purple mt-1.5"></span>
                      <p>Monitor API usage patterns to detect suspicious activity</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-black/40 rounded-md border border-cyber-purple/10 text-sm text-gray-300">
                <p className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-cyber-purple" />
                  <span>CyberSentry securely encrypts all stored API keys</span>
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiIntegration;
