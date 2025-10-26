
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Grid, List } from 'lucide-react';
import { navLinks } from '@/config/navigation';
import { seoConfig } from '@/config/seo';

const ToolsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter out non-tool pages
  const tools = navLinks.filter(link => 
    !['/', '/about', '/faq', '/contact'].includes(link.path)
  );

  // Categorize tools
  const categories = {
    'all': 'All Tools',
    'analysis': 'Analysis & Scanning',
    'password': 'Password Security',
    'monitoring': 'Intelligence & Monitoring'
  };

  const getToolCategory = (path: string) => {
    if (path.includes('password')) return 'password';
    if (path.includes('scanner') || path.includes('analyzer') || path.includes('checker')) return 'analysis';
    if (path.includes('news') || path.includes('dark-web')) return 'monitoring';
    return 'analysis';
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || getToolCategory(tool.path) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="Free Security Tools Dashboard - CyberSentry"
        description="Comprehensive collection of free cybersecurity tools. Analyze passwords, check breaches, scan vulnerabilities, and monitor security threats - all without registration."
        keywords="free security tools, cybersecurity dashboard, password analyzer, breach checker, vulnerability scanner, security monitoring"
        canonical="/tools"
      />
      
      <StructuredData 
        type="SoftwareApplication" 
        data={{
          name: "CyberSentry Security Tools",
          applicationCategory: "SecurityApplication",
          description: "Free cybersecurity tools for everyone"
        }} 
      />
      
      <Layout>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Security Tools <span className="text-cyber-purple">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade cybersecurity tools, completely free. No registration, no barriers - just click and protect your digital life.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-cyber-purple/30 text-white"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {Object.entries(categories).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(key)}
                    className={selectedCategory === key ? 
                      "bg-cyber-purple hover:bg-cyber-purple/90" : 
                      "border-cyber-purple/30 text-gray-300 hover:bg-cyber-purple/10"
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
              
              <div className="flex border border-cyber-purple/30 rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-cyber-purple/20' : ''}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-cyber-purple/20' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-400">
            Showing {filteredTools.length} of {tools.length} tools
          </div>

          {/* Tools Grid/List */}
          <div className={viewMode === 'grid' ? 
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
            "space-y-4"
          }>
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const category = getToolCategory(tool.path);
              
              return (
                <Card 
                  key={tool.path}
                  className="bg-black/20 border-cyber-purple/30 hover:border-cyber-purple/50 transition-all group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30">
                          <Icon className="h-6 w-6 text-cyber-purple" />
                        </div>
                        <div>
                          <CardTitle className="text-white group-hover:text-cyber-purple transition-colors">
                            {tool.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {categories[category as keyof typeof categories]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4">
                      {tool.description}
                    </CardDescription>
                    <Link to={tool.path}>
                      <Button className="w-full bg-cyber-purple hover:bg-cyber-purple/90">
                        Use Tool →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
              <Button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                variant="outline"
                className="mt-4 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ToolsDashboard;
