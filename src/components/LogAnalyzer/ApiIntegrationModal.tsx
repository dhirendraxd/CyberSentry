
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ApiIntegration } from '@/hooks/use-api-integrations';
import { Loader2, CheckCircle2, AlertCircle, Link2, Key, Globe, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, "API name is required"),
  endpoint: z.string().url("Must be a valid URL"),
  apiKey: z.string().min(1, "API key is required"),
  isActive: z.boolean().default(true)
});

interface ApiIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integrations: ApiIntegration[];
  isLoading: boolean;
  onAdd: (integration: Omit<ApiIntegration, 'id' | 'lastTested'>) => string;
  onUpdate: (id: string, data: Partial<ApiIntegration>) => void;
  onDelete: (id: string) => void;
  onTest: (id: string) => Promise<boolean>;
}

const ApiIntegrationModal: React.FC<ApiIntegrationModalProps> = ({
  open,
  onOpenChange,
  integrations,
  isLoading,
  onAdd,
  onUpdate,
  onDelete,
  onTest
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('manage');
  const [testingId, setTestingId] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      endpoint: '',
      apiKey: '',
      isActive: true
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (integrations.length >= 4) {
      toast({
        title: "Maximum Integrations Reached",
        description: "You can only have up to 4 custom API integrations.",
        variant: "destructive"
      });
      return;
    }
    
    // Fix: Ensure all required fields are present (name, endpoint, apiKey, isActive)
    const newIntegration = {
      name: values.name,
      endpoint: values.endpoint,
      apiKey: values.apiKey,
      isActive: values.isActive
    };
    
    onAdd(newIntegration);
    form.reset();
    setActiveTab('manage');
  };

  const handleTest = async (id: string) => {
    setTestingId(id);
    await onTest(id);
    setTestingId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background border-cyber-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Custom API Integrations</DialogTitle>
          <DialogDescription>
            Connect your own API endpoints for enhanced log analysis capabilities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'manage' ? 'text-cyber-purple border-b-2 border-cyber-purple' : 'text-gray-400'}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Integrations
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'add' ? 'text-cyber-purple border-b-2 border-cyber-purple' : 'text-gray-400'}`}
            onClick={() => setActiveTab('add')}
          >
            Add New
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {activeTab === 'add' ? (
            <motion.div
              key="add-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center border border-gray-700 rounded-md bg-gray-900 focus-within:border-cyber-purple">
                            <div className="p-2 border-r border-gray-700">
                              <Link2 className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input placeholder="Custom Security API" className="border-0 bg-transparent" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>A descriptive name for this integration</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endpoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Endpoint URL</FormLabel>
                        <FormControl>
                          <div className="flex items-center border border-gray-700 rounded-md bg-gray-900 focus-within:border-cyber-purple">
                            <div className="p-2 border-r border-gray-700">
                              <Globe className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input placeholder="https://api.example.com/analyze" className="border-0 bg-transparent" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>The full URL of your API endpoint</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <div className="flex items-center border border-gray-700 rounded-md bg-gray-900 focus-within:border-cyber-purple">
                            <div className="p-2 border-r border-gray-700">
                              <Key className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input type="password" placeholder="sk_..." className="border-0 bg-transparent" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>Your API authentication key</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active Status</FormLabel>
                          <FormDescription>
                            Enable this integration for use with log analysis
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab('manage')}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-cyber-purple hover:bg-cyber-purple/90"
                      disabled={isLoading}
                    >
                      Add Integration
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="manage-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ScrollArea className="h-[400px] pr-4">
                {integrations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <Globe className="h-12 w-12 text-gray-500 mb-2" />
                    <h3 className="text-lg font-medium text-white">No API Integrations</h3>
                    <p className="text-gray-400 max-w-xs mt-2">
                      Add custom API integrations to enhance your log analysis capabilities.
                    </p>
                    <Button 
                      onClick={() => setActiveTab('add')} 
                      className="mt-4 bg-cyber-purple hover:bg-cyber-purple/90"
                    >
                      Add Your First Integration
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {integrations.map((integration) => (
                      <div key={integration.id} className="border border-gray-700 rounded-lg p-4 bg-black/30 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-white">{integration.name}</h3>
                              <Badge 
                                variant={integration.isActive ? "default" : "outline"} 
                                className={`ml-2 ${integration.isActive ? "bg-green-600" : "text-gray-400 border-gray-600"}`}
                              >
                                {integration.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{integration.endpoint}</p>
                          </div>
                          <div>
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => onDelete(integration.id)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {integration.lastTested 
                              ? `Last tested: ${new Date(integration.lastTested).toLocaleString()}` 
                              : 'Never tested'}
                          </div>
                          <div className="space-x-2">
                            <Switch 
                              checked={integration.isActive} 
                              onCheckedChange={(checked) => onUpdate(integration.id, { isActive: checked })}
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleTest(integration.id)}
                              disabled={testingId === integration.id}
                              className="text-xs"
                            >
                              {testingId === integration.id ? (
                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              ) : integration.isActive ? (
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                              )}
                              Test Connection
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              {integrations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                      {integrations.length} of 4 integrations configured
                    </p>
                    {integrations.length < 4 && (
                      <Button 
                        onClick={() => setActiveTab('add')} 
                        className="bg-cyber-purple hover:bg-cyber-purple/90"
                        disabled={isLoading}
                      >
                        Add New
                      </Button>
                    )}
                  </div>
                </div>
              )}
              
              <DialogFooter className="mt-4">
                <Button 
                  type="button" 
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ApiIntegrationModal;
