
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Bug, Globe, Lock } from 'lucide-react';
import MalwareScanner from '@/components/SecurityScanner/MalwareScanner';
import VulnerabilityScanner from '@/components/SecurityScanner/VulnerabilityScanner';
import ThreatIntelligence from '@/components/SecurityScanner/ThreatIntelligence';
import SSLCertificateChecker from '@/components/SecurityScanner/SSLCertificateChecker';

const SecurityScanner = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Security Scanner</h1>
        <p className="text-gray-400">Use these tools to scan for security issues and threats.</p>
        
        <Tabs defaultValue="malware" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="malware" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Malware Scanner
            </TabsTrigger>
            <TabsTrigger value="vulnerability" className="flex items-center gap-2">
              <Bug className="h-4 w-4" /> Vulnerability Database
            </TabsTrigger>
            <TabsTrigger value="threat" className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Threat Intelligence
            </TabsTrigger>
            <TabsTrigger value="ssl" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> SSL Certificate
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="malware">
            <MalwareScanner />
          </TabsContent>
          
          <TabsContent value="vulnerability">
            <VulnerabilityScanner />
          </TabsContent>
          
          <TabsContent value="threat">
            <ThreatIntelligence />
          </TabsContent>
          
          <TabsContent value="ssl">
            <SSLCertificateChecker />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SecurityScanner;
