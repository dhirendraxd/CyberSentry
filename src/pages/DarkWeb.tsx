import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  Mail, 
  User, 
  Smartphone, 
  CreditCard, 
  Eye, 
  Search, 
  CheckCircle, 
  RefreshCw,
  Bell,
  KeyRound,
  ShieldCheck,
  BookOpen,
  FileCheck,
  ArrowRight,
  Trash2,
  AlertCircle,
  Workflow,
  CheckCircle2,
  Timer,
  ListTodo,
  BellRing,
  Fingerprint
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Switch } from '@/components/ui/switch';

const resolveBreachSchema = z.object({
  action: z.string().min(1, { message: "Please select an action" }),
  notes: z.string().optional(),
});

const notificationPrefsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  notificationSeverity: z.enum(["all", "high", "medium"]).default("all"),
  notificationFrequency: z.enum(["immediate", "daily", "weekly"]).default("immediate"),
});

const DarkWeb = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [selectedBreach, setSelectedBreach] = useState<any>(null);
  const [resolutionStep, setResolutionStep] = useState(1);
  const [showTestNotification, setShowTestNotification] = useState(false);
  
  const resolveForm = useForm({
    resolver: zodResolver(resolveBreachSchema),
    defaultValues: {
      action: '',
      notes: '',
    },
  });
  
  const notificationPrefsForm = useForm({
    resolver: zodResolver(notificationPrefsSchema),
    defaultValues: {
      emailNotifications: true,
      notificationSeverity: "all",
      notificationFrequency: "immediate",
    },
  });
  
  const mockBreaches = [
    {
      id: 1,
      service: 'LinkedOut',
      breachDate: '2023-11-15',
      dataTypes: ['email', 'password', 'name'],
      severity: 'high',
      status: 'active',
      serviceUrl: 'https://linkedout.com',
      description: 'A data breach affecting LinkedOut users exposed email addresses, passwords, and user names. This breach was reported on November 15, 2023.',
      impactedAccounts: '42.3 million',
      recommendedActions: [
        'Change your password on LinkedOut immediately',
        'Change passwords on other sites where you used the same password',
        'Enable two-factor authentication',
        'Monitor your account for suspicious activity'
      ]
    },
    {
      id: 2,
      service: 'BookSpace',
      breachDate: '2023-09-03',
      dataTypes: ['email', 'phone'],
      severity: 'medium',
      status: 'resolved',
      serviceUrl: 'https://bookspace.com',
      description: 'BookSpace experienced a security incident where email addresses and phone numbers were exposed. This breach occurred on September 3, 2023.',
      impactedAccounts: '18.7 million',
      recommendedActions: [
        'Remain alert for phishing attempts',
        'Consider changing your email for this service',
        'Verify your contact information is up to date',
        'Review privacy settings on your account'
      ]
    }
  ];
  
  const handleScan = () => {
    if (!email) return;
    
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2500);
  };
  
  const toggleMonitoring = async () => {
    const newStatus = !monitoringActive;
    setMonitoringActive(newStatus);
    
    if (newStatus && email) {
      toast({
        title: "Monitoring Activated",
        description: "We'll alert you if your data appears in new breaches.",
        variant: "default",
      });
      
      if (notificationPrefsForm.getValues().emailNotifications) {
        toast({
          title: "Email Notifications Enabled",
          description: "You'll receive email alerts when new breaches are detected.",
          variant: "default",
        });
      }
      
      if (showTestNotification) {
        try {
          const response = await supabase.functions.invoke('send-breach-notification', {
            body: {
              userEmail: email,
              userName: name,
              breachDetails: {
                service: "Test Service",
                breachDate: new Date().toISOString().split('T')[0],
                dataTypes: ["email", "password"],
                severity: "medium"
              }
            }
          });
          
          if (response.error) throw new Error(response.error.message);
          
          toast({
            title: "Test Notification Sent",
            description: "Check your email inbox for the test notification.",
            variant: "default",
          });
        } catch (error) {
          console.error("Error sending test notification:", error);
          toast({
            title: "Error Sending Test Notification",
            description: "There was a problem sending the test email. Please try again.",
            variant: "destructive",
          });
        }
      }
    } else {
      toast({
        title: "Monitoring Deactivated",
        description: "We've stopped monitoring your data on the dark web.",
        variant: "destructive",
      });
    }
  };
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };
  
  const handleResolveStart = (breach) => {
    setSelectedBreach(breach);
    setResolutionStep(1);
  };
  
  const handleResolveSubmit = (data) => {
    console.log('Resolution data:', data);
    
    const updatedBreaches = mockBreaches.map(breach => 
      breach.id === selectedBreach.id 
        ? { ...breach, status: 'resolved' } 
        : breach
    );
    
    toast({
      title: "Breach Marked as Resolved",
      description: `You've successfully addressed the ${selectedBreach.service} breach.`,
      variant: "default",
    });
    
    setSelectedBreach(null);
    setResolutionStep(1);
    resolveForm.reset();
  };
  
  const handleNextStep = () => {
    setResolutionStep(resolutionStep + 1);
  };
  
  const handlePreviousStep = () => {
    setResolutionStep(resolutionStep - 1);
  };
  
  const handleNotificationPrefsSubmit = (data) => {
    console.log("Notification preferences saved:", data);
    
    toast({
      title: "Notification Preferences Saved",
      description: "Your email notification settings have been updated.",
      variant: "default",
    });
  };
  
  const getResolutionStepContent = () => {
    if (!selectedBreach) return null;
    
    switch(resolutionStep) {
      case 1:
        return (
          <div className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Resolve {selectedBreach.service} Breach</AlertDialogTitle>
              <AlertDialogDescription>
                We'll guide you through the process of addressing this data breach.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-amber-500">Breach Details</h3>
                  <p className="mt-1 text-sm text-gray-300">{selectedBreach.description}</p>
                  <p className="mt-2 text-sm text-gray-300">
                    <span className="font-medium">Impacted accounts:</span> {selectedBreach.impactedAccounts}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Exposed Data:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedBreach.dataTypes.map((type, idx) => (
                  <Badge key={idx} variant="outline" className={`
                    ${type === 'email' ? 'bg-blue-500/10 text-blue-400' : ''}
                    ${type === 'password' ? 'bg-red-500/10 text-red-400' : ''}
                    ${type === 'name' ? 'bg-green-500/10 text-green-400' : ''}
                    ${type === 'phone' ? 'bg-amber-500/10 text-amber-400' : ''}
                  `}>
                    {type === 'email' && <Mail className="h-3 w-3 mr-1" />}
                    {type === 'password' && <Lock className="h-3 w-3 mr-1" />}
                    {type === 'name' && <User className="h-3 w-3 mr-1" />}
                    {type === 'phone' && <Smartphone className="h-3 w-3 mr-1" />}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
            
            <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleNextStep} className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </AlertDialogFooter>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle>Recommended Actions</AlertDialogTitle>
              <AlertDialogDescription>
                Follow these steps to secure your account and personal information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-black/40 border border-cyber-purple/20 p-4">
                <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                  <ShieldCheck className="h-4 w-4 text-cyber-purple mr-2" />
                  Steps to take:
                </h4>
                <ol className="space-y-3 text-sm text-gray-300 list-decimal pl-5">
                  {selectedBreach.recommendedActions.map((action, idx) => (
                    <li key={idx} className="pl-1">{action}</li>
                  ))}
                </ol>
              </div>
              
              {selectedBreach.dataTypes.includes('password') && (
                <div className="rounded-lg bg-black/40 border border-cyber-purple/20 p-4">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                    <KeyRound className="h-4 w-4 text-cyber-purple mr-2" />
                    Important Password Security Tips:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
                    <li>Use a unique, strong password that is at least 12 characters long.</li>
                    <li>Include uppercase letters, lowercase letters, numbers, and special characters.</li>
                    <li>Avoid using personal information in your passwords.</li>
                    <li>Consider using a password manager to generate and store complex passwords.</li>
                  </ul>
                </div>
              )}
              
              <div className="rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 p-4">
                <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 text-cyber-blue mr-2" />
                  Service Provider Contact:
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  You may want to contact {selectedBreach.service} directly to:
                </p>
                <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
                  <li>Verify if your account was affected</li>
                  <li>Ask what specific data was compromised</li>
                  <li>Inquire about compensations or additional security measures</li>
                </ul>
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/10"
                    onClick={() => window.open(selectedBreach.serviceUrl, '_blank')}
                  >
                    Visit {selectedBreach.service}
                  </Button>
                </div>
              </div>
            </div>
            
            <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
                className="border-cyber-purple/20 hover:bg-cyber-purple/10"
              >
                Back
              </Button>
              <Button onClick={handleNextStep} className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </AlertDialogFooter>
          </div>
        );
        
      case 3:
        return (
          <Form {...resolveForm}>
            <form onSubmit={resolveForm.handleSubmit(handleResolveSubmit)} className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>Mark Breach as Resolved</AlertDialogTitle>
                <AlertDialogDescription>
                  After taking action, you can mark this breach as resolved.
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <FormField
                control={resolveForm.control}
                name="action"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>What actions did you take?</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="action-password"
                            className="rounded border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                            onChange={() => field.onChange('changed-password')}
                            checked={field.value === 'changed-password'}
                          />
                          <label htmlFor="action-password" className="text-sm text-gray-300">
                            I changed my password
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="action-2fa"
                            className="rounded border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                            onChange={() => field.onChange('enabled-2fa')}
                            checked={field.value === 'enabled-2fa'}
                          />
                          <label htmlFor="action-2fa" className="text-sm text-gray-300">
                            I enabled two-factor authentication
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="action-delete"
                            className="rounded border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                            onChange={() => field.onChange('deleted-account')}
                            checked={field.value === 'deleted-account'}
                          />
                          <label htmlFor="action-delete" className="text-sm text-gray-300">
                            I deleted my account with this service
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="action-other"
                            className="rounded border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                            onChange={() => field.onChange('other')}
                            checked={field.value === 'other'}
                          />
                          <label htmlFor="action-other" className="text-sm text-gray-300">
                            I took other actions (please specify below)
                          </label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={resolveForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional details about how you resolved this breach..."
                        className="bg-black/40 border-cyber-purple/20 resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      This information will help you keep track of your security actions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  className="border-cyber-purple/20 hover:bg-cyber-purple/10"
                  type="button"
                >
                  Back
                </Button>
                <Button type="submit" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Mark as Resolved
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">Dark Web Monitoring</h1>
          {monitoringActive && (
            <Badge variant="outline" className="bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20 px-3 py-1">
              <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin-slow" />
              Active Monitoring
            </Badge>
          )}
        </div>
        
        <Tabs defaultValue="scanner" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6 bg-cyber-purple/10">
            <TabsTrigger value="scanner">Scan Now</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="monitoring">Continuous Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scanner">
            <div className="rounded-xl glass-card security-gradient p-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="inline-flex rounded-full bg-cyber-purple/20 p-4 mb-4">
                    <Shield className="h-8 w-8 text-cyber-purple" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Check if Your Data Has Been Compromised
                  </h2>
                  
                  <p className="text-gray-300 mb-6 max-w-2xl">
                    Our Dark Web scanner searches through known data breaches and dark web marketplaces for your personal information. Discover if your data has been exposed in a breach.
                  </p>
                  
                  <div className="w-full max-w-md">
                    <div className="flex space-x-2">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/30 border-cyber-purple/20"
                      />
                      <Button 
                        onClick={handleScan}
                        disabled={isScanning || !email}
                        className="bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                      >
                        {isScanning ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Scan Now
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {scanComplete && (
                  <div className="space-y-4 mt-8">
                    <h3 className="text-lg font-medium text-white mb-3">Scan Results</h3>
                    
                    {mockBreaches.length > 0 ? (
                      <div className="space-y-4">
                        {mockBreaches.map((breach) => (
                          <Card key={breach.id} className="bg-black/40 border-cyber-purple/20 text-white">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-white flex items-center">
                                    {breach.service}
                                    {breach.severity === 'high' && (
                                      <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                                    )}
                                  </CardTitle>
                                  <CardDescription className="text-gray-400">
                                    Breach Date: {breach.breachDate}
                                  </CardDescription>
                                </div>
                                <Badge 
                                  className={getSeverityColor(breach.severity)}
                                >
                                  {breach.severity.charAt(0).toUpperCase() + breach.severity.slice(1)} Risk
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm text-gray-300">
                                <p className="mb-2">Exposed data:</p>
                                <div className="flex flex-wrap gap-2">
                                  {breach.dataTypes.includes('email') && (
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400">
                                      <Mail className="h-3 w-3 mr-1" /> Email
                                    </Badge>
                                  )}
                                  {breach.dataTypes.includes('password') && (
                                    <Badge variant="outline" className="bg-red-500/10 text-red-400">
                                      <Lock className="h-3 w-3 mr-1" /> Password
                                    </Badge>
                                  )}
                                  {breach.dataTypes.includes('name') && (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-400">
                                      <User className="h-3 w-3 mr-1" /> Full Name
                                    </Badge>
                                  )}
                                  {breach.dataTypes.includes('phone') && (
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400">
                                      <Smartphone className="h-3 w-3 mr-1" /> Phone
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t border-cyber-purple/10 pt-4">
                              <div className="flex justify-between items-center w-full">
                                <div className="flex items-center">
                                  <Badge 
                                    variant="outline" 
                                    className={breach.status === 'active' 
                                      ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                      : 'bg-green-500/10 text-green-400 border-green-500/20'}
                                  >
                                    {breach.status === 'active' ? 'Active Threat' : 'Resolved'}
                                  </Badge>
                                </div>
                                
                                <div className="flex gap-2">
                                  {breach.status === 'active' ? (
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="border-green-500/20 hover:bg-green-500/10 text-green-400"
                                          onClick={() => handleResolveStart(breach)}
                                        >
                                          <ShieldCheck className="h-4 w-4 mr-1" />
                                          Resolve Breach
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent className="bg-cyber-dark-purple border-cyber-purple/20 text-white">
                                        {getResolutionStepContent()}
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                                      disabled
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Resolved
                                    </Button>
                                  )}
                                  
                                  <Button variant="outline" size="sm" className="border-cyber-purple/20 hover:bg-cyber-purple/10">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                        
                        <div className="rounded-md bg-amber-500/10 border border-amber-500/20 p-4 mt-6">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-amber-500" />
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-amber-500">Recommended Actions</h3>
                              <div className="mt-2 text-sm text-gray-300">
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>Change your password for the affected services immediately</li>
                                  <li>Enable two-factor authentication where available</li>
                                  <li>Do not reuse passwords across multiple services</li>
                                  <li>Consider using a password manager for better security</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-md bg-green-500/10 border border-green-500/20 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-500">Good News!</h3>
                            <div className="mt-2 text-sm text-gray-300">
                              <p>Your email wasn't found in any known data breaches.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-400 mb-4">
                        Want to be automatically notified about future breaches?
                      </p>
                      <Button 
                        onClick={toggleMonitoring}
                        className="bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                      >
                        Enable Continuous Monitoring
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prevention">
            <div className="rounded-xl glass-card security-gradient p-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="inline-flex rounded-full bg-green-500/20 p-4 mb-4">
                    <ShieldCheck className="h-8 w-8 text-green-500" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Prevent Data Breaches Before They Happen
                  </h2>
                  
                  <p className="text-gray-300 mb-6 max-w-2xl">
                    Take proactive steps to protect your personal information from appearing in data breaches and being sold on the dark web.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-card border-cyber-purple/20">
                    <CardHeader>
                      <div className="rounded-full bg-cyber-purple/10 p-2 w-fit mb-2">
                        <KeyRound className="h-5 w-5 text-cyber-purple" />
                      </div>
                      <CardTitle className="text-white">Create Strong, Unique Passwords</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-300 space-y-4">
                      <p>Use a different password for each of your accounts. This ensures that if one service is breached, your other accounts remain secure.</p>
                      
                      <div className="rounded-md bg-black/40 p-4 space-y-2">
                        <h4 className="font-medium text-white">Password Best Practices:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Use at least 12 characters</li>
                          <li>Combine uppercase, lowercase, numbers, and symbols</li>
                          <li>Avoid using personal information</li>
                          <li>Don't use common words or phrases</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-center mt-2">
                        <Button 
                          variant="outline" 
                          className="border-cyber-purple/20 hover:bg-cyber-purple/10"
                          onClick={() => window.location.href = '/password-generator'}
                        >
                          Use Our Password Generator
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-cyber-blue/20">
                    <CardHeader>
                      <div className="rounded-full bg-cyber-blue/10 p-2 w-fit mb-2">
                        <ShieldCheck className="h-5 w-5 text-cyber-blue" />
                      </div>
                      <CardTitle className="text-white">Enable Two-Factor Authentication</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-300 space-y-4">
                      <p>Two-factor authentication adds an extra layer of security by requiring a second form of verification beyond your password</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monitoring">
            <div className="rounded-xl glass-card security-gradient p-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="inline-flex rounded-full bg-cyber-blue/20 p-4 mb-4">
                    <BellRing className="h-8 w-8 text-cyber-blue" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Stay Informed About Dark Web Activity
                  </h2>
                  
                  <p className="text-gray-300 mb-6 max-w-2xl">
                    Receive alerts when new breaches are detected and your data appears in dark web marketplaces.
                  </p>
                  
                  <div className="w-full max-w-md mb-6">
                    <div className="flex flex-col space-y-3">
                      <Input
                        type="email"
                        placeholder="Your email address for notifications"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/30 border-cyber-purple/20"
                      />
                      <Input
                        type="text"
                        placeholder="Your name (for personalized notifications)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-black/30 border-cyber-purple/20"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-card border-cyber-purple/20">
                    <CardHeader>
                      <div className="rounded-full bg-cyber-purple/10 p-2 w-fit mb-2">
                        <Bell className="h-5 w-5 text-cyber-purple" />
                      </div>
                      <CardTitle className="text-white">Email Notification Settings</CardTitle>
                      <CardDescription className="text-gray-400">
                        Configure how and when you receive breach notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-300 space-y-4">
                      <Form {...notificationPrefsForm}>
                        <form onSubmit={notificationPrefsForm.handleSubmit(handleNotificationPrefsSubmit)} className="space-y-4">
                          <FormField
                            control={notificationPrefsForm.control}
                            name="emailNotifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-cyber-purple/20 p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-white">Enable Email Notifications</FormLabel>
                                  <FormDescription className="text-gray-400">
                                    Receive alerts about new breaches via email
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-cyber-purple"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationPrefsForm.control}
                            name="notificationSeverity"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-white">Alert Severity Level</FormLabel>
                                <FormDescription className="text-gray-400">
                                  Choose which breach severity levels trigger notifications
                                </FormDescription>
                                <div className="flex flex-col space-y-2">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      className="rounded-full border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                                      checked={field.value === "all"}
                                      onChange={() => field.onChange("all")}
                                    />
                                    <span className="text-sm text-gray-300">All breach levels</span>
                                  </label>
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      className="rounded-full border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                                      checked={field.value === "high"}
                                      onChange={() => field.onChange("high")}
                                    />
                                    <span className="text-sm text-gray-300">High-risk breaches only</span>
                                  </label>
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      className="rounded-full border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                                      checked={field.value === "medium"}
                                      onChange={() => field.onChange("medium")}
                                    />
                                    <span className="text-sm text-gray-300">Medium and high-risk breaches</span>
                                  </label>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationPrefsForm.control}
                            name="notificationFrequency"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-white">Notification Frequency</FormLabel>
                                <FormDescription className="text-gray-400">
                                  Choose how often you'd like to receive notifications
                                </FormDescription>
                                <div className="flex flex-col space-y-2">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      className="rounded-full border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                                      checked={field.value === "immediate"}
                                      onChange={() => field.onChange("immediate")}
                                    />
                                    <span className="text-sm text-gray-300">Immediate (as soon as detected)</span>
                                  </label>
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      className="rounded-full border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                                      checked={field.value === "daily"}
                                      onChange={() => field.onChange("daily")}
                                    />
                                    <span className="text-sm text-gray-300">Daily digest</span>
                                  </label>
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      className="rounded-full border-gray-600 bg-black/30 text-cyber-purple focus:ring-cyber-purple"
                                      checked={field.value === "weekly"}
                                      onChange={() => field.onChange("weekly")}
                                    />
                                    <span className="text-sm text-gray-300">Weekly summary</span>
                                  </label>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex items-center space-x-2 p-3 rounded-lg border border-cyber-purple/20">
                            <Switch
                              id="test-notification"
                              checked={showTestNotification}
                              onCheckedChange={setShowTestNotification}
                              className="data-[state=checked]:bg-cyber-purple"
                            />
                            <label
                              htmlFor="test-notification"
                              className="text-sm text-gray-300 cursor-pointer"
                            >
                              Send test notification when activating monitoring
                            </label>
                          </div>
                          
                          <div className="flex justify-end pt-2">
                            <Button
                              type="submit"
                              className="bg-cyber-purple hover:bg-cyber-purple/90"
                            >
                              Save Preferences
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card className="glass-card border-cyber-blue/20">
                      <CardHeader>
                        <div className="rounded-full bg-cyber-blue/10 p-2 w-fit mb-2">
                          <Eye className="h-5 w-5 text-cyber-blue" />
                        </div>
                        <CardTitle className="text-white">Real-time Breach Monitoring</CardTitle>
                        <CardDescription className="text-gray-400">
                          Continuously scan the dark web for your personal data
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300 space-y-4">
                        <p>Our advanced monitoring system continuously scans dark web forums, marketplaces, and data breach collections for your personal information.</p>
                        
                        <div className="rounded-lg bg-black/40 p-4 space-y-2">
                          <h4 className="font-medium text-white">What we monitor:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Email addresses</li>
                            <li>Passwords</li>
                            <li>Social security numbers</li>
                            <li>Credit card information</li>
                            <li>Phone numbers</li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={toggleMonitoring}
                          className={monitoringActive ? 
                            "bg-red-600 hover:bg-red-700 w-full" : 
                            "bg-cyber-purple hover:bg-cyber-purple/90 w-full"}
                        >
                          {monitoringActive ? (
                            <>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Deactivate Monitoring
                            </>
                          ) : (
                            <>
                              <Shield className="mr-2 h-4 w-4" />
                              Activate Monitoring
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="glass-card border-green-500/20">
                      <CardHeader>
                        <div className="rounded-full bg-green-500/10 p-2 w-fit mb-2">
                          <Workflow className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle className="text-white">How It Works</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-300">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="bg-cyber-purple/10 rounded-full p-1 mt-0.5">
                              <CheckCircle2 className="h-4 w-4 text-cyber-purple" />
                            </div>
                            <div>
                              <h5 className="font-medium text-white">Continuous Scanning</h5>
                              <p className="text-gray-400">Our system scans millions of data points across the dark web 24/7.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="bg-cyber-purple/10 rounded-full p-1 mt-0.5">
                              <Timer className="h-4 w-4 text-cyber-purple" />
                            </div>
                            <div>
                              <h5 className="font-medium text-white">Instant Detection</h5>
                              <p className="text-gray-400">When your information appears in a new breach, we detect it immediately.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="bg-cyber-purple/10 rounded-full p-1 mt-0.5">
                              <Mail className="h-4 w-4 text-cyber-purple" />
                            </div>
                            <div>
                              <h5 className="font-medium text-white">Email Alerts</h5>
                              <p className="text-gray-400">Receive detailed email notifications about the breach and recommended actions.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="bg-cyber-purple/10 rounded-full p-1 mt-0.5">
                              <ListTodo className="h-4 w-4 text-cyber-purple" />
                            </div>
                            <div>
                              <h5 className="font-medium text-white">Guided Resolution</h5>
                              <p className="text-gray-400">Follow step-by-step instructions to secure your accounts and protect your identity.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DarkWeb;
