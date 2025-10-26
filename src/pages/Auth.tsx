
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Shield, Mail, Lock, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Get the site URL dynamically based on environment
const getSiteUrl = () => {
  return window.location.origin;
};

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  
  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkUser();
  }, [navigate]);

  const cleanupAuthState = () => {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate inputs
      const result = authSchema.safeParse({ email, password });
      
      if (!result.success) {
        const formattedErrors: {email?: string; password?: string} = {};
        result.error.errors.forEach(err => {
          if (err.path[0] === 'email') formattedErrors.email = err.message;
          if (err.path[0] === 'password') formattedErrors.password = err.message;
        });
        setErrors(formattedErrors);
        return;
      }
      
      setErrors({});
      setLoading(true);
      
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt sign out before signing in to avoid conflicts
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Ignore errors here, continue with sign in/up
      }
      
      if (isSignUp) {
        // Handle sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${getSiteUrl()}/auth`,
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification.",
        });
      } else {
        // Handle sign in
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Sign in successful",
          description: "You have been signed in.",
        });
        
        // Force redirect to ensure clean state
        window.location.href = '/';
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt sign out before signing in to avoid conflicts
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Ignore errors here, continue with sign in
      }

      // Get the current site URL
      const redirectTo = getSiteUrl();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${redirectTo}/auth`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Authentication initiated",
        description: "Complete the Google authentication in the popup window",
      });
      
    } catch (err: any) {
      console.error('Google sign in error:', err);
      toast({
        title: "Authentication error",
        description: "Failed to connect with Google",
        variant: "destructive"
      });
    } finally {
      setGoogleLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-cyber-dark-purple relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-cyber-purple/5 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-cyber-blue/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-cyber-alert/5 blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiM5Yjg3ZjUxMCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPg==')] opacity-30"></div>
      </div>
      
      <div className="p-4 absolute top-0 left-0 z-20">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-black/30 border-cyber-purple/30 text-white hover:bg-cyber-purple/20 hover:text-white transition-all">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center justify-center min-h-screen w-full p-4 relative z-10">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div 
              className="p-3 rounded-xl bg-cyber-purple/20 border border-cyber-purple/30 mb-4 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Shield className="h-10 w-10 text-cyber-purple relative z-10" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2 relative">
              CyberSentry
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent"></span>
            </h1>
            <p className="text-gray-400 text-center max-w-sm">
              Secure your online presence with advanced breach detection and protection.
            </p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm border border-cyber-purple/20 rounded-lg p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h2 className="text-xl font-semibold text-white mb-6 relative z-10">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h2>
            
            <div className="space-y-4 relative z-10">
              {/* Google Auth Button - Updated with official styling */}
              <Button 
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-2 shadow-sm"
              >
                {googleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-4 w-4">
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>
              
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-cyber-purple/20"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-400">OR</span>
                <div className="flex-grow border-t border-cyber-purple/20"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({...errors, email: undefined});
                      }}
                      className={cn(
                        "pl-10 bg-black/30 border-cyber-purple/20 text-white focus:border-cyber-purple focus:ring-cyber-purple/30",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({...errors, password: undefined});
                      }}
                      className={cn(
                        "pl-10 bg-black/30 border-cyber-purple/20 text-white focus:border-cyber-purple focus:ring-cyber-purple/30",
                        errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      )}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full bg-cyber-purple hover:bg-cyber-purple/90 text-white flex items-center justify-center gap-2 relative group overflow-hidden",
                    loading && "opacity-70 pointer-events-none"
                  )}
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center">
                    {loading ? (
                      <span className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </form>
              
              <div className="mt-6 text-center relative z-10">
                <p className="text-sm text-gray-400">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-1 text-cyber-purple hover:text-cyber-purple/80 font-medium transition-colors"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
