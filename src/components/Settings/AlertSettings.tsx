
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, X, Info, AlertTriangle, Shield, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AlertSettings = () => {
  const [emailBreachAlerts, setEmailBreachAlerts] = useState(true);
  const [securityNews, setSecurityNews] = useState(true);
  const [darkWebAlerts, setDarkWebAlerts] = useState(false);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [securityTips, setSecurityTips] = useState(false);
  
  // Mock past alerts
  const [pastAlerts, setPastAlerts] = useState([
    {
      id: 1,
      title: "Critical: Password Exposed",
      description: "Your password for account test@example.com was found in a data breach.",
      date: "May 12, 2025",
      severity: "high"
    },
    {
      id: 2,
      title: "Medium: Suspicious Login Attempt",
      description: "A login attempt from an unusual location was detected and blocked.",
      date: "Apr 30, 2025",
      severity: "medium"
    },
    {
      id: 3,
      title: "Low: Security Patch Available",
      description: "A security update is available for your account settings.",
      date: "Apr 15, 2025",
      severity: "low"
    }
  ]);

  const dismissAlert = (id: number) => {
    setPastAlerts(pastAlerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert dismissed",
      description: "The alert has been removed from your history.",
    });
  };

  const savePreferences = () => {
    toast({
      title: "Alert preferences saved",
      description: "Your notification settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-cyber-purple/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-medium text-xl flex items-center gap-2">
            <Bell className="h-5 w-5 text-cyber-purple" />
            Alert Preferences
          </CardTitle>
          <CardDescription>
            Manage how and when you receive security alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyber-purple" />
              Email Notifications
            </h3>
            
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/30 border border-cyber-purple/10">
              <div className="space-y-0.5">
                <Label className="text-white flex items-center gap-2">
                  Data Breach Alerts
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs bg-cyber-alert/20 text-cyber-alert">Critical</span>
                </Label>
                <p className="text-xs text-gray-400">Receive alerts when your credentials appear in new breaches</p>
              </div>
              <Switch 
                checked={emailBreachAlerts} 
                onCheckedChange={setEmailBreachAlerts}
                className="data-[state=checked]:bg-cyber-purple" 
              />
            </div>
            
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/30 border border-cyber-purple/10">
              <div className="space-y-0.5">
                <Label className="text-white">Security News</Label>
                <p className="text-xs text-gray-400">Weekly digest of important security news</p>
              </div>
              <Switch 
                checked={securityNews} 
                onCheckedChange={setSecurityNews}
                className="data-[state=checked]:bg-cyber-purple" 
              />
            </div>
            
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/30 border border-cyber-purple/10">
              <div className="space-y-0.5">
                <Label className="text-white flex items-center gap-2">
                  Dark Web Monitoring Alerts
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-500">Premium</span>
                </Label>
                <p className="text-xs text-gray-400">Receive alerts if your data is found on the dark web</p>
              </div>
              <Switch 
                checked={darkWebAlerts} 
                onCheckedChange={setDarkWebAlerts}
                className="data-[state=checked]:bg-cyber-purple" 
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-cyber-purple" />
              Push Notifications
            </h3>
            
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/30 border border-cyber-purple/10">
              <div className="space-y-0.5">
                <Label className="text-white">Critical Security Alerts</Label>
                <p className="text-xs text-gray-400">Immediate notification for critical security issues</p>
              </div>
              <Switch 
                checked={criticalAlerts} 
                onCheckedChange={setCriticalAlerts}
                className="data-[state=checked]:bg-cyber-purple" 
              />
            </div>
            
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/30 border border-cyber-purple/10">
              <div className="space-y-0.5">
                <Label className="text-white">Security Tips</Label>
                <p className="text-xs text-gray-400">Occasional security tips and recommendations</p>
              </div>
              <Switch 
                checked={securityTips} 
                onCheckedChange={setSecurityTips}
                className="data-[state=checked]:bg-cyber-purple" 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="bg-cyber-purple hover:bg-cyber-purple/90 text-white"
            onClick={savePreferences}
          >
            Save Preferences
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-black/20 border-cyber-purple/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-medium text-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-cyber-purple" />
            Recent Alerts
          </CardTitle>
          <CardDescription>
            Review and manage your recent security alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastAlerts.length > 0 ? (
              pastAlerts.map((alert) => (
                <div key={alert.id} className={`
                  relative rounded-lg border p-4 
                  ${alert.severity === 'high' ? 'threat-high border-cyber-alert/30' : ''}
                  ${alert.severity === 'medium' ? 'threat-medium border-yellow-500/30' : ''}
                  ${alert.severity === 'low' ? 'threat-low border-green-500/30' : ''}
                `}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {alert.severity === 'high' && <AlertTriangle className="h-5 w-5 text-cyber-alert mt-0.5" />}
                      {alert.severity === 'medium' && <Info className="h-5 w-5 text-yellow-500 mt-0.5" />}
                      {alert.severity === 'low' && <Shield className="h-5 w-5 text-green-500 mt-0.5" />}
                      
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">{alert.title}</h4>
                        <p className="text-xs text-gray-400">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="bg-black/30 rounded-full p-3 inline-flex mb-3">
                  <Shield className="h-6 w-6 text-cyber-purple/60" />
                </div>
                <h4 className="text-white mb-1">No active alerts</h4>
                <p className="text-sm text-gray-400">You're all caught up! No security alerts at this time.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertSettings;
