
import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Zap } from 'lucide-react';
import { seoConfig } from '@/config/seo';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const About = () => {
  return (
    <>
      <SEOHead
        title="About CyberSentry - Free Security Analytics Platform"
        description="Learn about CyberSentry's mission to provide free, accessible cybersecurity tools for everyone. No registration required - instant access to powerful security analytics."
        keywords="about breachguard, free security tools, cybersecurity platform, open access security"
        canonical="/about"
      />
      
      <StructuredData type="Organization" data={seoConfig.structuredData.organization} />
      
      <Layout>
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.header
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-cyber-purple/20 border border-cyber-purple/30">
                <Shield className="h-12 w-12 text-cyber-purple" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About CyberSentry
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Free, powerful cybersecurity tools accessible to everyone, everywhere. 
              No barriers, no sign-ups, just instant protection.
            </p>
          </motion.header>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-black/20 border border-cyber-purple/20 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              CyberSentry was created with a simple belief: cybersecurity should be accessible to everyone, 
              not just those with enterprise budgets or technical expertise.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We provide professional-grade security analysis tools completely free, with no registration 
              barriers, making digital protection available to individuals, small businesses, and organizations worldwide.
            </p>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Choose CyberSentry?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Instant Access",
                  description: "No sign-ups, no downloads, no waiting. Click and start using powerful security tools immediately."
                },
                {
                  icon: Users,
                  title: "Built for Everyone",
                  description: "From cybersecurity professionals to everyday users, our tools are designed to be powerful yet accessible."
                },
                {
                  icon: Globe,
                  title: "Always Free",
                  description: "Core security features will always remain free. We believe everyone deserves access to digital protection."
                },
                {
                  icon: Shield,
                  title: "Privacy First",
                  description: "Your data stays yours. We don't track, store, or sell your information. Complete privacy by design."
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 border border-cyber-purple/20 rounded-lg p-6"
                  >
                    <Icon className="h-8 w-8 text-cyber-purple mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-r from-cyber-dark-purple to-cyber-purple/30 rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Secure Your Digital Life?</h2>
            <p className="text-gray-300 mb-6">
              Explore our comprehensive suite of security tools. No commitment required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/log-analyzer" className="text-cyber-purple hover:text-cyber-purple/80 font-medium">
                Log Analyzer
              </a>
              <a href="/breach-checker" className="text-cyber-purple hover:text-cyber-purple/80 font-medium">
                Breach Checker
              </a>
              <a href="/password-analyzer" className="text-cyber-purple hover:text-cyber-purple/80 font-medium">
                Password Analyzer
              </a>
              <a href="/security-scanner" className="text-cyber-purple hover:text-cyber-purple/80 font-medium">
                Security Scanner
              </a>
            </div>
          </motion.section>
        </div>
      </Layout>
    </>
  );
};

export default About;
