
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAnonymousSession } from './useAnonymousSession';
import { toast } from '@/hooks/use-toast';

export interface AnonymousDataEntry {
  id: string;
  user_id: string;
  timestamp: string;
  data_type: string;
  data_payload: any;
}

export const useAnonymousData = () => {
  const { sessionId, clearSession } = useAnonymousSession();
  const [data, setData] = useState<AnonymousDataEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (!sessionId) return;
    
    setLoading(true);
    try {
      const { data: userData, error } = await supabase
        .from('anonymous_user_data')
        .select('*')
        .eq('user_id', sessionId)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      setData(userData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (dataType: string, payload: any) => {
    if (!sessionId) return;

    try {
      // Check for duplicate entries
      const { data: existing } = await supabase
        .from('anonymous_user_data')
        .select('id')
        .eq('user_id', sessionId)
        .eq('data_type', dataType)
        .eq('data_payload', JSON.stringify(payload))
        .limit(1);

      if (existing && existing.length > 0) {
        toast({
          title: "Data already exists",
          description: "This entry has already been saved.",
        });
        return;
      }

      const { error } = await supabase
        .from('anonymous_user_data')
        .insert({
          user_id: sessionId,
          data_type: dataType,
          data_payload: payload
        });

      if (error) throw error;

      toast({
        title: "Data saved",
        description: "Your data has been saved successfully.",
      });

      // Refresh data
      fetchUserData();
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Error",
        description: "Failed to save data.",
        variant: "destructive"
      });
    }
  };

  const clearAllData = async () => {
    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from('anonymous_user_data')
        .delete()
        .eq('user_id', sessionId);

      if (error) throw error;

      setData([]);
      toast({
        title: "History cleared",
        description: "All your data has been cleared.",
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      toast({
        title: "Error",
        description: "Failed to clear data.",
        variant: "destructive"
      });
    }
  };

  const deleteAllUserData = async () => {
    if (!sessionId) return;

    try {
      // Clear all data from database
      const { error } = await supabase
        .from('anonymous_user_data')
        .delete()
        .eq('user_id', sessionId);

      if (error) throw error;

      // Clear local session
      clearSession();
      setData([]);

      toast({
        title: "All data deleted",
        description: "Your entire history and session have been permanently deleted.",
      });
    } catch (error) {
      console.error('Error deleting all user data:', error);
      toast({
        title: "Error",
        description: "Failed to delete data.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchUserData();
    }
  }, [sessionId]);

  return {
    data,
    loading,
    saveData,
    clearAllData,
    deleteAllUserData,
    refetch: fetchUserData
  };
};
