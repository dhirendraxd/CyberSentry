
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useAnonymousSession = () => {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Get or create anonymous session ID
    let storedSessionId = localStorage.getItem('user_session_id');
    
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('user_session_id', storedSessionId);
    }
    
    setSessionId(storedSessionId);
  }, []);

  const clearSession = () => {
    localStorage.removeItem('user_session_id');
    const newSessionId = uuidv4();
    localStorage.setItem('user_session_id', newSessionId);
    setSessionId(newSessionId);
  };

  return { sessionId, clearSession };
};
