
import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-gray-300 hover:bg-cyber-purple/10 hover:text-cyber-purple hidden md:flex"
      onClick={onClick}
    >
      <SearchIcon className="h-5 w-5" />
    </Button>
  );
};
