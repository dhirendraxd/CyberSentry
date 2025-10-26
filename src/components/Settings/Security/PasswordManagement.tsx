
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PasswordManagement = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <Card className="bg-black/20 border-cyber-purple/20 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-medium text-xl">Password Management</CardTitle>
        <CardDescription>
          Update your password and manage two-factor authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password" className="text-white">Current Password</Label>
          <Input id="current-password" type="password" className="bg-black/30 border-cyber-purple/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password" className="text-white">New Password</Label>
          <Input id="new-password" type="password" className="bg-black/30 border-cyber-purple/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
          <Input id="confirm-password" type="password" className="bg-black/30 border-cyber-purple/20" />
        </div>
        
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-lg font-medium text-white mb-3">Two-Factor Authentication</h3>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-white">Enable 2FA for your account</p>
              <p className="text-xs text-gray-400">Add an extra layer of security to your account.</p>
            </div>
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled} 
              className="data-[state=checked]:bg-cyber-purple"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-cyber-purple hover:bg-cyber-purple/90 text-white">Update Password</Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordManagement;
