
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import StatsOverviewSection from '@/components/Dashboard/StatsOverviewSection';
import SecurityHighlights from '@/components/Dashboard/SecurityHighlights';
import EnhancedQuickActions from '@/components/Dashboard/EnhancedQuickActions';
import HeroMainSection from '@/components/Dashboard/HeroMainSection';
import HowItWorksSection from '@/components/Dashboard/HowItWorksSection';
import PublicCallToAction from '@/components/Dashboard/PublicCallToAction';
import LastActivity from '@/components/Dashboard/LastActivity';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Search } from 'lucide-react';
import { seoConfig } from '@/config/seo';
import { useUserActivity } from '@/hooks/useUserActivity';

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { hasActivity, loading } = useUserActivity();

  const handleViewSecurity = () => {
    setActiveTab("security");
  };
  
  return (
    <>
      <SEOHead
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        keywords={seoConfig.pages.home.keywords}
        canonical="/"
        ogType="website"
      />
      
      <StructuredData type="WebSite" data={{}} />
      <StructuredData type="Organization" data={seoConfig.structuredData.organization} />
      <StructuredData type="SoftwareApplication" data={{}} />
      
      <Layout>
        <main className="space-y-8">
          {/* Hero Section */}
          <HeroMainSection onViewSecurity={handleViewSecurity} />
          
          {/* Main Dashboard Content - Only show if user has activity */}
          {!loading && hasActivity && (
            <section aria-labelledby="dashboard-title">
              <h2 id="dashboard-title" className="sr-only">Security Dashboard</h2>
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-6 w-full md:w-auto">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Search className="h-4 w-4" /> Security
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <StatsOverviewSection />
                    </div>
                    <div>
                      <LastActivity />
                    </div>
                  </div>
                  <EnhancedQuickActions />
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <SecurityHighlights />
                </TabsContent>
              </Tabs>
            </section>
          )}
          
          {/* Always show these sections */}
          <HowItWorksSection />
          <PublicCallToAction />
        </main>
      </Layout>
    </>
  );
};

export default Index;
