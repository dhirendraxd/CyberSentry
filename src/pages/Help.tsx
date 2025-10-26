
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Zap, Shield, Key, FileText, Globe, Bell } from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const toolGuides = [
    {
      icon: Shield,
      name: "Breach Checker",
      description: "Check if your email has been compromised in data breaches",
      steps: [
        "Enter your email address in the search field",
        "Click 'Check Breach Status' to scan our database",
        "Review the results showing any breaches found",
        "Follow recommended actions if breaches are detected"
      ],
      tips: ["Use this tool regularly", "Check multiple email addresses", "Take action on any breaches found"]
    },
    {
      icon: Key,
      name: "Password Analyzer",
      description: "Test the strength and security of your passwords",
      steps: [
        "Type or paste your password into the analyzer",
        "Review the strength score and breakdown",
        "Check which security requirements are met",
        "Follow suggestions to improve password strength"
      ],
      tips: ["Use long, complex passwords", "Avoid common patterns", "Consider using a password manager"]
    },
    {
      icon: Key,
      name: "Password Generator",
      description: "Create cryptographically secure passwords",
      steps: [
        "Adjust length and character options",
        "Click 'Generate Password' for a new password",
        "Copy the password to your clipboard",
        "Store it securely in a password manager"
      ],
      tips: ["Use maximum length when possible", "Include all character types", "Generate unique passwords for each account"]
    },
    {
      icon: FileText,
      name: "Log Analyzer",
      description: "Analyze security logs for threats and anomalies",
      steps: [
        "Upload your log file using the file picker",
        "Wait for the analysis to complete",
        "Review detected threats and anomalies",
        "Download the detailed analysis report"
      ],
      tips: ["Use recent log files", "Check logs regularly", "Follow up on detected threats"]
    }
  ];

  const faqData = [
    {
      question: "Is CyberSentry really free to use?",
      answer: "Yes! All our security tools are completely free with no hidden costs, subscriptions, or premium tiers. We believe cybersecurity should be accessible to everyone."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! You can use all tools immediately without any registration. We've designed the platform to be completely frictionless."
    },
    {
      question: "Is my data stored or tracked?",
      answer: "We process your data only to provide the requested analysis and don't store personal information. We use minimal analytics to improve the platform while respecting your privacy."
    },
    {
      question: "How accurate are the breach detection results?",
      answer: "Our breach database is updated regularly from verified sources. However, it may not include every breach, so always practice good security hygiene regardless of results."
    },
    {
      question: "Can I use these tools for commercial purposes?",
      answer: "Yes! Our tools can be used for both personal and commercial security assessments. They're designed to provide professional-grade analysis."
    },
    {
      question: "What file formats does the Log Analyzer support?",
      answer: "The Log Analyzer supports common log formats including .log, .txt, .csv, and JSON files. Maximum file size is 10MB per upload."
    }
  ];

  const filteredGuides = toolGuides.filter(guide =>
    guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Help & Documentation - CyberSentry Security Tools"
        description="Complete guide to using CyberSentry's free cybersecurity tools. Learn how to check breaches, analyze passwords, scan vulnerabilities, and more."
        keywords="cybersecurity help, security tools guide, breach checker help, password analyzer guide, security documentation"
        canonical="/help"
      />
      
      <StructuredData 
        type="HowTo" 
        data={{
          name: "How to Use CyberSentry Security Tools",
          description: "Step-by-step guide to using free cybersecurity tools",
          steps: toolGuides.map(guide => ({
            name: guide.name,
            text: guide.description
          }))
        }} 
      />
      
      <Layout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Help & <span className="text-cyber-purple">Documentation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn how to use our security tools effectively and get the most out of your cybersecurity analysis.
            </p>
          </div>

          <Tabs defaultValue="guides" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Tool Guides
              </TabsTrigger>
              <TabsTrigger value="quickstart" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Quick Start
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                FAQ
              </TabsTrigger>
            </TabsList>

            {/* Tool Guides */}
            <TabsContent value="guides" className="space-y-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/20 border-cyber-purple/30 text-white"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGuides.map((guide) => {
                  const Icon = guide.icon;
                  return (
                    <Card key={guide.name} className="bg-black/20 border-cyber-purple/30">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30">
                            <Icon className="h-5 w-5 text-cyber-purple" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{guide.name}</CardTitle>
                            <CardDescription>{guide.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">How to use:</h4>
                          <ol className="space-y-1 text-gray-300 text-sm">
                            {guide.steps.map((step, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-cyber-purple font-medium">{index + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-medium mb-2">Pro Tips:</h4>
                          <ul className="space-y-1 text-gray-300 text-sm">
                            {guide.tips.map((tip, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-cyber-purple">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Quick Start */}
            <TabsContent value="quickstart" className="space-y-6">
              <Card className="bg-black/20 border-cyber-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">Getting Started with CyberSentry</CardTitle>
                  <CardDescription>
                    New to cybersecurity? Start here for a quick overview of our most essential tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Badge variant="secondary" className="w-fit">Step 1</Badge>
                      <h3 className="text-white font-medium">Check Your Email Security</h3>
                      <p className="text-gray-300 text-sm">
                        Start with our Breach Checker to see if your email has been compromised in any known data breaches.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Badge variant="secondary" className="w-fit">Step 2</Badge>
                      <h3 className="text-white font-medium">Analyze Password Strength</h3>
                      <p className="text-gray-300 text-sm">
                        Use our Password Analyzer to check if your current passwords are strong enough to resist attacks.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Badge variant="secondary" className="w-fit">Step 3</Badge>
                      <h3 className="text-white font-medium">Generate Secure Passwords</h3>
                      <p className="text-gray-300 text-sm">
                        Create new, cryptographically secure passwords for any accounts that need stronger protection.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Badge variant="secondary" className="w-fit">Step 4</Badge>
                      <h3 className="text-white font-medium">Stay Informed</h3>
                      <p className="text-gray-300 text-sm">
                        Check our Security News feed regularly to stay updated on the latest threats and security best practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq" className="space-y-6">
              <Card className="bg-black/20 border-cyber-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Common questions about CyberSentry and our security tools.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqData.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-cyber-purple/20">
                        <AccordionTrigger className="text-white hover:text-cyber-purple text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default Help;
