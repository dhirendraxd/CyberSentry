
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchButton } from './search/SearchButton';
import { SearchDialog } from './search/SearchDialog';
import { useGlobalSearch } from '@/hooks/use-global-search';
import { useSearchHotkey } from '@/hooks/use-search-hotkey';
import { SearchResult } from '@/types/search';

const GlobalSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const searchResults = useGlobalSearch(query);
  
  // Setup hotkey (Command+k or Ctrl+k) to open search
  useSearchHotkey(setOpen);

  const handleSelectItem = (result: SearchResult) => {
    navigate(result.href);
    setOpen(false);
  };

  return (
    <>
      <SearchButton onClick={() => setOpen(true)} />
      
      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        query={query}
        onQueryChange={setQuery}
        results={searchResults}
        onSelectItem={handleSelectItem}
      />
    </>
  );
};

export default GlobalSearch;
