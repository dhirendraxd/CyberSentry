
import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { CommandInput } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center border-b border-cyber-purple/20 px-3">
      <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50 text-cyber-purple" />
      <CommandInput 
        placeholder="Search across Breach Guard..." 
        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 text-white"
        value={value}
        onValueChange={onChange}
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onChange('')}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
