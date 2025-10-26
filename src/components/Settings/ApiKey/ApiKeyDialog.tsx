
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Key, Info } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the API key form schema
const apiKeyFormSchema = z.object({
  key_name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  key_value: z.string().min(10, 'API key must be at least 10 characters'),
});

export type ApiKeyFormValues = z.infer<typeof apiKeyFormSchema>;

interface ApiKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ApiKeyFormValues) => void;
  loading: boolean;
  children: React.ReactNode;
}

const ApiKeyDialog = ({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  loading, 
  children 
}: ApiKeyDialogProps) => {
  const form = useForm<ApiKeyFormValues>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      key_name: '',
      key_value: '',
    },
  });

  const handleSubmit = (values: ApiKeyFormValues) => {
    onSubmit(values);
  };

  const resetForm = () => {
    if (!loading) {
      form.reset({
        key_name: '',
        key_value: '',
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-cyber-purple/40 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-cyber-purple" />
            Add a new API key
          </DialogTitle>
          <DialogDescription>
            Enter a name and value for your API key. The full value will be stored securely.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="key_name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Service Name</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-black/80 border-cyber-purple/30 text-white">
                          <p className="text-xs max-w-[200px]">
                            Enter a descriptive name for the service this API key belongs to (e.g., "Have I Been Pwned", "Dark Web Scanner")
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g. Have I Been Pwned, Security Scanner"
                      className="bg-black/60 border-cyber-purple/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="key_value"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>API Key Value</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-black/80 border-cyber-purple/30 text-white">
                          <p className="text-xs max-w-[200px]">
                            Enter the full API key exactly as provided by the service. We'll mask this value for security.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your API key"
                      className="bg-black/60 border-cyber-purple/30 font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOpenChange(false)}
                className="border-gray-700 hover:bg-gray-800 text-gray-300"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save API Key'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
