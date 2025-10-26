
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Search, Key } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const PublicCallToAction: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Log Analyzer",
      description: "Upload and analyze security logs instantly",
      path: "/log-analyzer"
    },
    {
      icon: Shield,
      title: "Breach Checker", 
      description: "Check if your email was compromised",
      path: "/breach-checker"
    },
    {
      icon: Search,
      title: "Security Scanner",
      description: "Scan websites for vulnerabilities",
      path: "/security-scanner"
    },
    {
      icon: Key,
      title: "Password Tools",
      description: "Generate & analyze secure passwords",
      path: "/password-generator"
    }
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-gradient-to-r from-cyber-dark-purple to-cyber-purple/30 rounded-lg p-8 text-center"
      aria-labelledby="cta-title"
    >
      <h2 id="cta-title" className="text-2xl font-bold text-white mb-4">
        Start Using Our Security Tools - No Sign Up Required
      </h2>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
        Access all our powerful security analysis tools instantly. No registration, no barriers - just click and start protecting your systems.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 border border-cyber-purple/20 rounded-lg p-4 hover:border-cyber-purple/40 transition-all"
            >
              <Icon className="h-8 w-8 text-cyber-purple mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{feature.description}</p>
              <Button 
                onClick={() => navigate(feature.path)}
                size="sm" 
                className="w-full bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple border border-cyber-purple/30"
                variant="outline"
              >
                Try Now
              </Button>
            </motion.div>
          );
        })}
      </div>
      
      <Button 
        onClick={() => navigate('/about')}
        size="lg" 
        variant="outline"
        className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
      >
        Learn More About Our Platform
      </Button>
    </motion.section>
  );
};

export default PublicCallToAction;
