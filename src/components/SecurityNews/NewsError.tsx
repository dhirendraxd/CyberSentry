
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface NewsErrorProps {
  error: string;
}

const NewsError: React.FC<NewsErrorProps> = ({ error }) => {
  return (
    <Alert variant="destructive" className="bg-black/30 border-red-500/30">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default NewsError;
