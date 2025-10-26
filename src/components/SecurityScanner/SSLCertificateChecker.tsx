
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, AlertTriangle, Search, Loader2, ShieldCheck, Shield, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CertificateInfo {
  host: string;
  status: string;
  endpoints: Endpoint[];
}

interface Endpoint {
  ipAddress: string;
  serverName: string;
  statusMessage: string;
  grade: string;
  hasWarnings: boolean;
  isExceptional: boolean;
  details: {
    hostStartTime: number;
    certChains: any[];
    protocols: Protocol[];
    suites: any;
    vulnBeast: boolean;
    heartbleed: boolean;
    heartbeat: boolean;
    poodle: boolean;
    freak: boolean;
    logjam: boolean;
    drownVulnerable: boolean;
  };
}

interface Protocol {
  id: number;
  name: string;
  version: string;
}

const SSLCertificateChecker = () => {
  const [domain, setDomain] = useState('');
  const [searchDomain, setSearchDomain] = useState('');
  
  const { data: certInfo, isLoading, isError } = useQuery({
    queryKey: ['ssllabs', searchDomain],
    queryFn: async () => {
      if (!searchDomain) return null;
      
      // First, start the analysis
      const startUrl = `https://api.ssllabs.com/api/v3/analyze?host=${encodeURIComponent(searchDomain)}&startNew=on`;
      let response = await fetch(startUrl);
      if (!response.ok) {
        throw new Error('Failed to start SSL analysis');
      }
      
      let result = await response.json();
      
      // Poll until the analysis is complete
      while (result.status !== 'READY' && result.status !== 'ERROR') {
        // Wait for 2 seconds before polling again
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const pollUrl = `https://api.ssllabs.com/api/v3/analyze?host=${encodeURIComponent(searchDomain)}`;
        response = await fetch(pollUrl);
        if (!response.ok) {
          throw new Error('Failed to check SSL analysis status');
        }
        
        result = await response.json();
      }
      
      return result as CertificateInfo;
    },
    enabled: !!searchDomain,
    retry: 1
  });
  
  const handleSearch = () => {
    if (!domain) {
      toast({
        title: "Domain Required",
        description: "Please enter a domain to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      toast({
        title: "Invalid Domain",
        description: "Please enter a valid domain (e.g., example.com).",
        variant: "destructive",
      });
      return;
    }
    
    setSearchDomain(domain);
  };

  const getGradeColor = (grade: string) => {
    if (!grade) return 'bg-gray-500';
    if (grade.startsWith('A')) return 'bg-green-500';
    if (grade.startsWith('B')) return 'bg-blue-500';
    if (grade.startsWith('C')) return 'bg-yellow-500';
    if (grade.startsWith('D') || grade.startsWith('E')) return 'bg-orange-500';
    if (grade.startsWith('F') || grade === 'T' || grade === 'M') return 'bg-cyber-alert';
    return 'bg-gray-500';
  };
  
  const getGradeScore = (grade: string): number => {
    if (!grade) return 0;
    if (grade === 'A+') return 100;
    if (grade === 'A') return 95;
    if (grade === 'A-') return 90;
    if (grade === 'B') return 80;
    if (grade === 'C') return 70;
    if (grade === 'D') return 60;
    if (grade === 'E') return 50;
    if (grade === 'F') return 40;
    if (grade === 'T' || grade === 'M') return 20;
    return 0;
  };
  
  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="rounded-xl glass-card p-6 border border-cyber-purple/20">
      <div className="flex flex-col text-left max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
          <div className="rounded-full bg-cyber-purple/10 p-3">
            <Lock className="h-6 w-6 text-cyber-purple" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">SSL/TLS Certificate Checker</h2>
            <p className="text-gray-400">
              Analyze SSL/TLS certificates and security configurations for websites.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="Enter domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="bg-black/30 border-cyber-purple/20 focus:border-cyber-purple/50 flex-grow"
          />
          <Button 
            onClick={handleSearch}
            disabled={isLoading || !domain}
            className="bg-cyber-purple hover:bg-cyber-purple/90 whitespace-nowrap"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Check SSL/TLS
              </>
            )}
          </Button>
        </div>
        
        {searchDomain && !isLoading && certInfo && certInfo.endpoints && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg flex items-start gap-3 bg-black/20">
              <div className="flex-shrink-0 mt-1">
                {certInfo.endpoints[0]?.grade && certInfo.endpoints[0]?.grade.startsWith('A') ? (
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                ) : (
                  <Shield className="h-6 w-6 text-cyber-alert" />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="text-lg font-medium text-white">{certInfo.host}</h3>
                  <Badge className={getGradeColor(certInfo.endpoints[0]?.grade)}>
                    Grade: {certInfo.endpoints[0]?.grade || 'Unknown'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {certInfo.endpoints[0]?.statusMessage || 'Analysis completed'}
                </p>
              </div>
            </div>
            
            {certInfo.endpoints.map((endpoint, index) => (
              <Card key={index} className="bg-black/20 border-cyber-purple/20">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm text-gray-400">
                      Server: {endpoint.serverName || endpoint.ipAddress || 'Unknown'}
                    </CardTitle>
                    <Badge className={getGradeColor(endpoint.grade)}>
                      {endpoint.grade || 'No Grade'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white">Security Rating</span>
                        <span className="text-sm font-medium text-white">{endpoint.grade || 'N/A'}</span>
                      </div>
                      <Progress value={getGradeScore(endpoint.grade)} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="bg-black/30 border-cyber-purple/10">
                        <CardHeader className="p-3 pb-1">
                          <CardTitle className="text-xs text-gray-400">Security Features</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-white">Heartbleed</span>
                              {endpoint.details?.heartbleed ? (
                                <X className="text-cyber-alert h-4 w-4" />
                              ) : (
                                <Check className="text-green-500 h-4 w-4" />
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white">POODLE</span>
                              {endpoint.details?.poodle ? (
                                <X className="text-cyber-alert h-4 w-4" />
                              ) : (
                                <Check className="text-green-500 h-4 w-4" />
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white">DROWN</span>
                              {endpoint.details?.drownVulnerable ? (
                                <X className="text-cyber-alert h-4 w-4" />
                              ) : (
                                <Check className="text-green-500 h-4 w-4" />
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white">BEAST</span>
                              {endpoint.details?.vulnBeast ? (
                                <X className="text-cyber-alert h-4 w-4" />
                              ) : (
                                <Check className="text-green-500 h-4 w-4" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-black/30 border-cyber-purple/10">
                        <CardHeader className="p-3 pb-1">
                          <CardTitle className="text-xs text-gray-400">Protocol Support</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3">
                          <div className="space-y-2 text-sm">
                            {endpoint.details?.protocols?.map((protocol, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <span className="text-white">{protocol.name} {protocol.version}</span>
                                <Check className="text-green-500 h-4 w-4" />
                              </div>
                            ))}
                            {!endpoint.details?.protocols?.length && (
                              <div className="text-gray-400">No protocol information available</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Analysis time: {formatDate(endpoint.details?.hostStartTime)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {searchDomain && isLoading && (
          <div className="p-8 text-center">
            <Loader2 className="h-8 w-8 text-cyber-purple animate-spin mx-auto mb-4" />
            <p className="text-white">Analyzing SSL/TLS configuration...</p>
            <p className="text-gray-400 text-sm mt-2">This may take up to a minute to complete</p>
          </div>
        )}
        
        {searchDomain && isError && (
          <div className="p-6 text-center bg-cyber-alert/10 rounded-lg">
            <AlertTriangle className="h-12 w-12 text-cyber-alert mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white">Analysis Failed</h3>
            <p className="text-gray-400 mt-2">
              Could not complete the SSL/TLS analysis. Please check the domain and try again.
            </p>
          </div>
        )}
        
        {!searchDomain && (
          <div className="p-6 text-center border border-dashed border-cyber-purple/20 rounded-xl">
            <Lock className="h-12 w-12 text-cyber-purple mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white">SSL/TLS Certificate Checker</h3>
            <p className="text-gray-400 mt-2 max-w-md mx-auto">
              Enter a domain to check its SSL/TLS configuration, certificate validity, and security vulnerabilities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SSLCertificateChecker;
