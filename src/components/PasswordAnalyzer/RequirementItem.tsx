
import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RequirementItemProps {
  isMet: boolean;
  title: string;
  description: string;
}

const RequirementItem = ({ isMet, title, description }: RequirementItemProps) => {
  return (
    <div className={cn(
      "flex items-start gap-2 rounded-lg p-3",
      isMet ? "bg-green-500/10" : "bg-cyber-alert/10"
    )}>
      {isMet ? (
        <Check className="h-5 w-5 text-green-500 mt-0.5" />
      ) : (
        <X className="h-5 w-5 text-cyber-alert mt-0.5" />
      )}
      <div className="text-left">
        <p className={cn(
          "text-sm font-medium",
          isMet ? "text-green-500" : "text-white"
        )}>
          {title}
        </p>
        <p className="text-xs text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default RequirementItem;
