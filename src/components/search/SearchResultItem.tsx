
import React from 'react';
import { SearchIcon } from 'lucide-react';
import { CommandItem } from '@/components/ui/command';
import { SearchResult } from '@/types/search';

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onSelect }) => {
  return (
    <CommandItem
      className="flex items-center gap-2 rounded-md p-2 text-gray-200 hover:bg-cyber-purple/10 cursor-pointer"
      onSelect={() => onSelect(result)}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyber-purple/20">
        {result.icon || <SearchIcon className="h-4 w-4 text-cyber-purple" />}
      </div>
      <div>
        <p className="text-sm font-medium text-white">{result.title}</p>
        <p className="text-xs text-gray-400">{result.description}</p>
      </div>
    </CommandItem>
  );
};
