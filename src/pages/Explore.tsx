
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shuffle, ArrowRight, Star, Clock, TrendingUp } from 'lucide-react';
import { navLinks } from '@/config/navigation';
import { motion } from 'framer-motion';

const Explore = () => {
  const navigate = useNavigate();
  const [randomTool, setRandomTool] = useState<any>(null);
  const [featuredTools, setFeaturedTools] = useState<any[]>([]);

  const tools = navLinks.filter(link => 
    !['/', '/about', '/faq', '/contact', '/tools', '/help', '/feedback', '/explore'].includes(link.path)
  );

  const getRandomTool = () => {
    const randomIndex = Math.floor(Math.random() * tools.length);
    return tools[randomIndex];
  };

  const getFeaturedTools = () => {
    // Simulate popular/trending tools
    const featured = [
      { ...tools.find(t => t.path === '/breach-checker'), popularity: 95, trend: 'up' },
      { ...tools.find(t => t.path === '/password-analyzer'), popularity: 88, trend: 'up' },
      { ...tools.find(t => t.path === '/log-analyzer'), popularity: 82, trend: 'stable' },
    ].filter(Boolean);
    return featured;
  };

  useEffect(() => {
    setRandomTool(getRandomTool());
    setFeaturedTools(getFeaturedTools());
  }, []);

  const handleRandomTool = () => {
    setRandomTool(getRandomTool());
  };

  const handleUseTool = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <SEOHead
        title="Explore Security Tools - Discover New Cybersecurity Features"
        description="Discover new cybersecurity tools and features. Explore our collection of free security analyzers, generators, and monitoring tools."
        keywords="explore security tools, discover cybersecurity, random security tool, featured security tools"
        canonical="/explore"
      />
      
      <Layout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Explore <span className="text-cyber-purple">Security Tools</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover new tools and features to enhance your cybersecurity. Try something new or explore our most popular tools.
            </p>
          </div>

          {/* Random Tool Discovery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Random Discovery</h2>
              <Button
                onClick={handleRandomTool}
                variant="outline"
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Discover New Tool
              </Button>
            </div>

            {randomTool && (
              <Card className="bg-gradient-to-r from-cyber-dark-purple to-cyber-purple/30 border-cyber-purple/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30">
                        <randomTool.icon className="h-8 w-8 text-cyber-purple" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{randomTool.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          <Star className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-200 text-base mb-4">
                    {randomTool.description}
                  </CardDescription>
                  <Button
                    onClick={() => handleUseTool(randomTool.path)}
                    size="lg"
                    className="bg-cyber-purple hover:bg-cyber-purple/90"
                  >
                    Try This Tool
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Featured/Popular Tools */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Most Popular Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/20 border-cyber-purple/30 hover:border-cyber-purple/50 transition-all group h-full">
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
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {tool.popularity}% popular
                                </Badge>
                                {tool.trend === 'up' && (
                                  <TrendingUp className="h-3 w-3 text-green-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <CardDescription className="text-gray-300 mb-4 flex-1">
                          {tool.description}
                        </CardDescription>
                        <Button
                          onClick={() => handleUseTool(tool.path)}
                          className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
                        >
                          Use Tool
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/20 border-cyber-purple/30 hover:border-cyber-purple/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30 w-fit mx-auto mb-3">
                    <Clock className="h-8 w-8 text-cyber-purple" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-cyber-purple transition-colors">
                    Analysis & Scanning
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Deep security analysis tools for comprehensive protection
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-cyber-purple/30 hover:border-cyber-purple/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30 w-fit mx-auto mb-3">
                    <Star className="h-8 w-8 text-cyber-purple" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-cyber-purple transition-colors">
                    Password Security
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Generate and analyze passwords for maximum security
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-cyber-purple/30 hover:border-cyber-purple/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30 w-fit mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-cyber-purple" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-cyber-purple transition-colors">
                    Intelligence & Monitoring
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Stay informed with latest threats and monitoring tools
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Explore;
