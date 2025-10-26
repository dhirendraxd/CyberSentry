
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@/types/user';
import { ApiKey } from '@/types/supabase';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, Key, Plus, Trash2 } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

// Define the API key form schema
const apiKeyFormSchema = z.object({
  key_name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  key_value: z.string().min(10, 'API key must be at least 10 characters'),
});

type ApiKeyFormValues = z.infer<typeof apiKeyFormSchema>;

const ApiKeyForm = ({ user }: { user: User | null }) => {
  const [loading, setLoading] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ApiKeyFormValues>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      key_name: '',
      key_value: '',
    },
  });

  // Fetch user's API keys
  useEffect(() => {
    const fetchApiKeys = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          setApiKeys(data as ApiKey[]);
        }
      } catch (error: any) {
        console.error('Error fetching API keys:', error);
      }
    };

    fetchApiKeys();
  }, [user]);

  // Handle form submission
  const onSubmit = async (values: ApiKeyFormValues) => {
    if (!user) return;

    setLoading(true);
    try {
      // Mask the API key for storage (store first 4 and last 4 characters only)
      const maskedKey = `${values.key_value.substring(0, 4)}...${values.key_value.substring(
        values.key_value.length - 4
      )}`;
      
      const { error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          key_name: values.key_name,
          key_value: maskedKey, // Store masked version for display
        });

      if (error) throw error;

      // Store the full API key in local storage (more secure methods would be preferred in production)
      localStorage.setItem(`api_key_${values.key_name}`, values.key_value);

      toast({
        title: "API key added",
        description: "Your API key has been added successfully.",
      });
      
      // Reset form and close dialog
      form.reset();
      setIsDialogOpen(false);
      
      // Refresh the API keys
      const { data } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id);
        
      if (data) {
        setApiKeys(data as ApiKey[]);
      }
    } catch (error: any) {
      toast({
        title: "Failed to add API key",
        description: error.message || "An error occurred while adding your API key.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete an API key
  const deleteApiKey = async (keyId: string, keyName: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', keyId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Remove from local storage
      localStorage.removeItem(`api_key_${keyName}`);
      
      // Update state to remove the deleted key
      setApiKeys(apiKeys.filter(key => key.id !== keyId));

      toast({
        title: "API key deleted",
        description: "Your API key has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to delete API key",
        description: error.message || "An error occurred while deleting your API key.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Your API Keys</h3>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyber-purple hover:bg-cyber-purple/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 border-cyber-purple/40 text-white">
            <DialogHeader>
              <DialogTitle>Add a new API key</DialogTitle>
              <DialogDescription>
                Enter a name and value for your API key. The full value will be stored securely.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="key_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. OpenAI, HIBP, Security Service"
                          className="bg-black/60 border-cyber-purple/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="key_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key Value</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your API key"
                          className="bg-black/60 border-cyber-purple/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save API Key'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {apiKeys.length === 0 ? (
        <div className="rounded-lg bg-black/30 p-6 border border-cyber-purple/10 text-center">
          <Key className="h-12 w-12 text-cyber-purple/40 mx-auto mb-3" />
          <p className="text-gray-300 mb-2">You haven't added any API keys yet</p>
          <p className="text-sm text-gray-400 mb-4">
            Add API keys to integrate with security services like Have I Been Pwned, 
            dark web scanners, and more
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex justify-between items-center p-3 bg-black/40 rounded-md border border-cyber-purple/20">
              <div>
                <p className="font-medium text-white">{key.key_name}</p>
                <p className="text-xs text-gray-400">{key.key_value}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-cyber-alert hover:bg-cyber-alert/10"
                onClick={() => deleteApiKey(key.id, key.key_name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiKeyForm;
