
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface HeroMainSectionProps {
  onViewSecurity?: () => void;
}

const HeroMainSection: React.FC<HeroMainSectionProps> = ({ onViewSecurity }) => {
  const navigate = useNavigate();

  const handleAnalyzeLogs = () => {
    navigate('/log-analyzer');
  };

  const handleViewSecurity = () => {
    if (onViewSecurity) {
      onViewSecurity();
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      className="relative bg-black/30 border border-cyber-purple/20 rounded-2xl overflow-hidden p-8 md:p-12"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-transparent opacity-50"></div>
      <div className="relative z-10 max-w-3xl">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30">
            <Shield className="h-6 w-6 text-cyber-purple" />
          </div>
          <h2 className="text-lg font-medium text-cyber-purple">Free Security Analytics - No Registration Required</h2>
        </motion.div>
        
        <motion.h1 id="hero-title" variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Advanced Security Analytics for Everyone
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-gray-300 mb-8 max-w-2xl">
          CyberSentry provides powerful, free tools for analyzing logs, detecting security threats, and 
          protecting your digital infrastructure. Start using our tools instantly - no sign-up required.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleAnalyzeLogs}
            size="lg" 
            className="bg-cyber-purple hover:bg-cyber-purple/90 text-white px-8 rounded-md relative group overflow-hidden"
            aria-label="Start log analysis"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Try Log Analyzer Free
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
            onClick={handleViewSecurity}
            aria-label="View security status"
          >
            <Search className="h-5 w-5 mr-2" />
            Explore Security Tools
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroMainSection;
