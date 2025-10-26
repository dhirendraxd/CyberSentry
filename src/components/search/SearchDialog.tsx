
import React from 'react';
import { 
  Command, 
  CommandDialog
} from '@/components/ui/command';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { SearchResult } from '@/types/search';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  results: SearchResult[];
  onSelectItem: (result: SearchResult) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  open,
  onOpenChange,
  query,
  onQueryChange,
  results,
  onSelectItem
}) => {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border-cyber-purple/30 bg-cyber-dark-purple/95 backdrop-blur-xl">
        <SearchInput value={query} onChange={onQueryChange} />
        <SearchResults 
          results={results} 
          query={query} 
          onSelect={onSelectItem} 
        />
      </Command>
    </CommandDialog>
  );
};
