
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogDisplayProps {
  content: string;
  highlightedLines?: {
    lineNumber: number;
    content: string;
    reason: string;
  }[];
}

const LogDisplay: React.FC<LogDisplayProps> = ({ 
  content, 
  highlightedLines = [] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Split content into lines
  const lines = content.split('\n');
  
  // Create a Set of highlighted line numbers for efficient lookup
  const highlightedLineNumbers = new Set(
    highlightedLines.map(hl => hl.lineNumber)
  );
  
  // Function to get reason for highlighted line
  const getReasonForLine = (lineNumber: number) => {
    const highlightedLine = highlightedLines.find(
      hl => hl.lineNumber === lineNumber
    );
    return highlightedLine?.reason || '';
  };
  
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center py-2 px-4 rounded-t-lg hover:bg-white/5"
          >
            <span>Raw Log Data</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-[300px] relative">
            <div className="p-4 font-mono text-xs">
              {lines.map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = highlightedLineNumbers.has(lineNumber);
                const reason = isHighlighted ? getReasonForLine(lineNumber) : '';
                
                return (
                  <div 
                    key={lineNumber}
                    className={cn(
                      "py-1 pl-8 pr-4 relative flex",
                      isHighlighted && "bg-red-500/20 text-white"
                    )}
                  >
                    <span className="absolute left-2 text-gray-500 select-none w-4 text-right">
                      {lineNumber}
                    </span>
                    <span className={cn(
                      "flex-grow",
                      isHighlighted && "font-medium"
                    )}>
                      {line || " "}
                    </span>
                    {isHighlighted && reason && (
                      <div className="ml-4 text-xs italic text-yellow-400">
                        {reason}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default LogDisplay;
