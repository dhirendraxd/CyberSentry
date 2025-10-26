
import React from 'react';
import { 
  CommandEmpty, 
  CommandGroup,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { SearchResult } from '@/types/search';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onSelect: (result: SearchResult) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  query, 
  onSelect 
}) => {
  const pageResults = results.filter(result => result.type === 'page');
  const settingResults = results.filter(result => result.type === 'setting');

  return (
    <CommandList className="max-h-[400px] overflow-y-auto p-2">
      <CommandEmpty className="py-6 text-center text-sm text-gray-400">
        No results found for "{query}"
      </CommandEmpty>
      
      {results.length > 0 && (
        <>
          {pageResults.length > 0 && (
            <CommandGroup heading="Pages">
              {pageResults.map((result, index) => (
                <SearchResultItem 
                  key={`page-${index}`} 
                  result={result} 
                  onSelect={onSelect} 
                />
              ))}
            </CommandGroup>
          )}
          
          {settingResults.length > 0 && (
            <>
              <CommandSeparator className="my-2 bg-cyber-purple/10" />
              <CommandGroup heading="Settings">
                {settingResults.map((result, index) => (
                  <SearchResultItem 
                    key={`setting-${index}`} 
                    result={result} 
                    onSelect={onSelect} 
                  />
                ))}
              </CommandGroup>
            </>
          )}
        </>
      )}

      <div className="mt-4 border-t border-cyber-purple/10 pt-4">
        <div className="flex items-center justify-between px-2 text-xs text-gray-400">
          <p>Search powered by Breach Guard</p>
          <div className="flex items-center">
            <span className="flex items-center rounded border border-cyber-purple/20 px-1.5 text-xs font-medium mr-2">
              ⏎
            </span>
            <span>to select</span>
          </div>
        </div>
      </div>
    </CommandList>
  );
};
