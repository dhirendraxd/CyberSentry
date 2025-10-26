
import { useEffect } from 'react';

export function useSearchHotkey(callback: (open: boolean | ((prevOpen: boolean) => boolean)) => void) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        callback(prevOpen => !prevOpen);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [callback]);
}
