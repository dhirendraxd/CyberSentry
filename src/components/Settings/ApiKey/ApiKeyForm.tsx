
import React, { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { ApiKey } from '@/types/supabase';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, Key as KeyIcon } from 'lucide-react';
import ApiKeyList from './ApiKeyList';
import ApiKeyDialog, { ApiKeyFormValues } from './ApiKeyDialog';

const ApiKeyForm = ({ user }: { user: User | null }) => {
  const [loading, setLoading] = useState(false);
  const [fetchingKeys, setFetchingKeys] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch user's API keys
  useEffect(() => {
    const fetchApiKeys = async () => {
      if (!user) return;

      try {
        setFetchingKeys(true);
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
        toast({
          title: "Failed to load API keys",
          description: error.message || "Please try again later",
          variant: "destructive"
        });
      } finally {
        setFetchingKeys(false);
      }
    };

    fetchApiKeys();
  }, [user]);

  // Handle form submission
  const onSubmit = async (values: ApiKeyFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add API keys",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Mask the API key for storage (store first 4 and last 4 characters only)
      const maskedKey = `${values.key_value.substring(0, 4)}...${values.key_value.substring(
        values.key_value.length - 4
      )}`;
      
      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          key_name: values.key_name,
          key_value: maskedKey, // Store masked version for display
        })
        .select();

      if (error) throw error;

      // Store the full API key in local storage (more secure methods would be preferred in production)
      localStorage.setItem(`api_key_${values.key_name}`, values.key_value);

      toast({
        title: "API key added",
        description: "Your API key has been added successfully.",
      });
      
      // Close dialog
      setIsDialogOpen(false);
      
      // Add the new key to the state
      if (data && data.length > 0) {
        setApiKeys([...apiKeys, data[0] as ApiKey]);
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
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <KeyIcon className="h-4 w-4 text-cyber-purple" />
          Your API Keys
        </h3>
        
        <ApiKeyDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={onSubmit}
          loading={loading}
        >
          <Button className="bg-cyber-purple hover:bg-cyber-purple/90 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New API Key
          </Button>
        </ApiKeyDialog>
      </div>

      {fetchingKeys ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-cyber-purple animate-spin" />
            <p className="text-sm text-gray-400">Loading your API keys...</p>
          </div>
        </div>
      ) : (
        <ApiKeyList apiKeys={apiKeys} onDelete={deleteApiKey} />
      )}
    </div>
  );
};

export default ApiKeyForm;
