
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAnonymousData } from './useAnonymousData';

export const useSecurityScore = () => {
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { data: userData, loading: dataLoading } = useAnonymousData();

  // Calculate score based on user activity
  const calculateUserScore = (activities: any[]) => {
    if (activities.length === 0) return 0;
    
    let baseScore = 30; // Starting score for having any activity
    
    // Bonus points for different types of security activities
    const hasBreachCheck = activities.some(a => a.data_type === 'breach');
    const hasPasswordAnalysis = activities.some(a => a.data_type === 'password');
    const hasScan = activities.some(a => a.data_type === 'scan');
    
    if (hasBreachCheck) baseScore += 25;
    if (hasPasswordAnalysis) baseScore += 20;
    if (hasScan) baseScore += 25;
    
    // Cap at 100
    return Math.min(baseScore, 100);
  };

  useEffect(() => {
    if (dataLoading) return;

    if (userData.length === 0) {
      setScore(0);
      setLoading(false);
      return;
    }

    const userScore = calculateUserScore(userData);
    setScore(userScore);
    setLoading(false);

    // Set up real-time subscription for user data changes
    const channel = supabase
      .channel('user-data-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_data'
        },
        (payload) => {
          console.log('Real-time security score update:', payload);
          // Recalculate score when data changes
          if (payload.new || payload.old) {
            // Since we can't easily get the full dataset here, we'll trigger a recalculation
            // The useAnonymousData hook will refresh and this effect will run again
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userData, dataLoading]);

  return { score, loading };
};
