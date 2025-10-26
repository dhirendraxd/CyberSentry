
import React from 'react';
import { useNavigate } from 'react-router-dom';
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

interface CallToActionSectionProps {
  user: any;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ user }) => {
  const navigate = useNavigate();

  if (user) {
    return null; // Don't show CTA if user is logged in
  }

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
        Start Protecting Your Systems Today
      </h2>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        Sign up for a free account to access advanced log analysis tools and security insights.
      </p>
      <Button 
        onClick={() => navigate('/auth')}
        size="lg" 
        className="bg-cyber-purple hover:bg-cyber-purple/90 text-white"
        aria-label="Create free account"
      >
        Create Free Account
      </Button>
    </motion.section>
  );
};

export default CallToActionSection;
