
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, AlertTriangle, Search, Loader2, ShieldAlert, ShieldCheck, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const API_KEY = '3743aef9c0f2f128d9ffd6da5afe6b16b8015abb591689cc7f38bcedb860a2ec';

interface DomainIntelligence {
  pulse_count: number;
  reputation: number;
  malware: boolean;
  indicator: string;
  alexa?: string;
  whois?: string;
  country_code?: string;
  country_name?: string;
  city?: string;
  sections: string[];
  validation: ValidationData[];
}

interface ValidationData {
  source: string;
  message: string;
}

const ThreatIntelligence = () => {
  const [domain, setDomain] = useState('');
  const [searchDomain, setSearchDomain] = useState('');
  
  const { data: intelligence, isLoading } = useQuery({
    queryKey: ['alienvault', searchDomain],
    queryFn: async () => {
      if (!searchDomain) return null;
      
      const apiUrl = `https://otx.alienvault.com/api/v1/indicators/domain/${encodeURIComponent(searchDomain)}/general`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-OTX-API-KEY': API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch domain intelligence');
      }
      
      return await response.json() as DomainIntelligence;
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

  const getDomainRiskLevel = () => {
    if (!intelligence) return 'Unknown';
    
    if (intelligence.malware || intelligence.reputation < -2) {
      return 'High Risk';
    } else if (intelligence.pulse_count > 10 || intelligence.reputation < 0) {
      return 'Medium Risk';
    } else {
      return 'Low Risk';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High Risk':
        return 'bg-cyber-alert text-white';
      case 'Medium Risk':
        return 'bg-yellow-500 text-black';
      case 'Low Risk':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="rounded-xl glass-card p-6 border border-cyber-purple/20">
      <div className="flex flex-col text-left max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
          <div className="rounded-full bg-cyber-purple/10 p-3">
            <Globe className="h-6 w-6 text-cyber-purple" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Domain Threat Intelligence</h2>
            <p className="text-gray-400">
              Analyze domains for potential security threats using AlienVault OTX threat intelligence.
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
                Analyze Domain
              </>
            )}
          </Button>
        </div>
        
        {searchDomain && !isLoading && intelligence && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg flex items-start gap-3 bg-black/20">
              <div className="flex-shrink-0 mt-1">
                {getDomainRiskLevel() === 'Low Risk' ? (
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                ) : (
                  <ShieldAlert className="h-6 w-6 text-cyber-alert" />
                )}
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="text-lg font-medium text-white">{intelligence.indicator}</h3>
                  <Badge className={getRiskColor(getDomainRiskLevel())}>
                    {getDomainRiskLevel()}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {getDomainRiskLevel() === 'Low Risk' 
                    ? 'This domain appears to have a good reputation.' 
                    : 'This domain may be associated with suspicious activity.'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-black/20 border-cyber-purple/20">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm text-gray-400">Risk Indicators</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Reputation Score</span>
                      <span className={`text-sm font-medium ${
                        intelligence.reputation < 0 ? 'text-cyber-alert' : 'text-green-500'
                      }`}>
                        {intelligence.reputation}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Pulse Count</span>
                      <span className={`text-sm font-medium ${
                        intelligence.pulse_count > 10 ? 'text-yellow-500' : 'text-white'
                      }`}>
                        {intelligence.pulse_count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Malware Association</span>
                      <span className={`text-sm font-medium ${
                        intelligence.malware ? 'text-cyber-alert' : 'text-green-500'
                      }`}>
                        {intelligence.malware ? 'Detected' : 'None detected'}
                      </span>
                    </div>
                    {intelligence.alexa && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">Alexa Rank</span>
                        <span className="text-sm font-medium text-white">
                          {intelligence.alexa}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 border-cyber-purple/20">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm text-gray-400">Domain Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {intelligence.country_name && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">Country</span>
                        <span className="text-sm font-medium text-white">
                          {intelligence.country_name} {intelligence.country_code && `(${intelligence.country_code})`}
                        </span>
                      </div>
                    )}
                    {intelligence.city && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">City</span>
                        <span className="text-sm font-medium text-white">{intelligence.city}</span>
                      </div>
                    )}
                    {intelligence.sections && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">Data Sections</span>
                        <span className="text-sm font-medium text-white">
                          {intelligence.sections.length}
                        </span>
                      </div>
                    )}
                    <div className="pt-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-cyber-blue hover:text-cyber-blue/80"
                        onClick={() => window.open(`https://otx.alienvault.com/indicator/domain/${intelligence.indicator}`, '_blank')}
                      >
                        Full Report <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {intelligence.validation && intelligence.validation.length > 0 && (
              <div className="space-y-3">
                <Separator className="bg-cyber-purple/20" />
                <h3 className="text-white font-medium">Validation Messages</h3>
                <div className="space-y-2">
                  {intelligence.validation.map((val, idx) => (
                    <div key={idx} className="bg-black/20 p-3 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-white mr-2">{val.source}</span>
                        <Badge variant="outline" className="text-xs border-cyber-purple/30">
                          Info
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{val.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {searchDomain && isLoading && (
          <div className="p-8 text-center">
            <Loader2 className="h-8 w-8 text-cyber-purple animate-spin mx-auto mb-4" />
            <p className="text-white">Analyzing domain threat intelligence...</p>
          </div>
        )}
        
        {!searchDomain && (
          <div className="p-6 text-center border border-dashed border-cyber-purple/20 rounded-xl">
            <AlertTriangle className="h-12 w-12 text-cyber-purple mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white">Domain Threat Analysis</h3>
            <p className="text-gray-400 mt-2 max-w-md mx-auto">
              Enter a domain to check for known security threats, malware associations, and risk assessment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatIntelligence;
