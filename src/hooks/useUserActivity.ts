
import { useState, useEffect } from 'react';
import { useAnonymousData } from './useAnonymousData';

export const useUserActivity = () => {
  const { data, loading } = useAnonymousData();
  const [hasActivity, setHasActivity] = useState(false);

  useEffect(() => {
    // Check if user has any meaningful activity (email entries, scans, etc.)
    const meaningfulActivity = data.filter(item => 
      ['breach', 'scan', 'password', 'email'].includes(item.data_type)
    );
    
    setHasActivity(meaningfulActivity.length > 0);
  }, [data]);

  return {
    hasActivity,
    activityCount: data.length,
    loading
  };
};
