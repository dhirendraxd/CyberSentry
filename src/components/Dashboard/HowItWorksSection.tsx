
import React from 'react';
import { Shield, Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const HowItWorksSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="bg-black/20 rounded-lg border border-cyber-purple/10 p-6 md:p-8"
      aria-labelledby="how-it-works-title"
    >
      <motion.h2 id="how-it-works-title" variants={fadeInUp} className="text-2xl font-bold text-white mb-8">
        How CyberSentry Works
      </motion.h2>
      
      <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
        <motion.article variants={fadeInUp} className="bg-black/30 border border-cyber-purple/20 rounded-lg p-5 transition-all hover:border-cyber-purple/40">
          <div className="h-12 w-12 bg-cyber-purple/20 rounded-lg flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-cyber-purple" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">1. Upload Logs</h3>
          <p className="text-gray-400">
            Upload your system logs directly through our secure interface or connect to log management services.
          </p>
        </motion.article>
        
        <motion.article variants={fadeInUp} className="bg-black/30 border border-cyber-purple/20 rounded-lg p-5 transition-all hover:border-cyber-purple/40">
          <div className="h-12 w-12 bg-cyber-purple/20 rounded-lg flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-cyber-purple" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">2. Analyze Threats</h3>
          <p className="text-gray-400">
            Our advanced algorithms scan your logs for patterns indicating security breaches or vulnerabilities.
          </p>
        </motion.article>
        
        <motion.article variants={fadeInUp} className="bg-black/30 border border-cyber-purple/20 rounded-lg p-5 transition-all hover:border-cyber-purple/40">
          <div className="h-12 w-12 bg-cyber-purple/20 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-cyber-purple" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">3. Secure Systems</h3>
          <p className="text-gray-400">
            Receive detailed reports and actionable recommendations to protect your systems from detected threats.
          </p>
        </motion.article>
      </motion.div>
    </motion.section>
  );
};

export default HowItWorksSection;
