
import React from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import StructuredData from '@/components/SEO/StructuredData';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const faqData = [
  {
    question: "Is CyberSentry really free to use?",
    answer: "Yes! All our core security tools are completely free to use with no hidden costs, time limits, or feature restrictions. We believe cybersecurity should be accessible to everyone."
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer: "No account required! You can access and use all our security analysis tools instantly. Just visit the tool page and start analyzing - no sign-up, no personal information needed."
  },
  {
    question: "How secure is my data when using CyberSentry?",
    answer: "Your privacy is our priority. We don't store, track, or share your data. All analysis happens in real-time and your information is not retained on our servers after your session ends."
  },
  {
    question: "What types of log files can I analyze?",
    answer: "Our log analyzer supports common formats including Apache, Nginx, IIS, system logs, firewall logs, and custom formats. You can upload files in text, CSV, or JSON formats."
  },
  {
    question: "How accurate is the breach checker?",
    answer: "Our breach checker uses multiple reliable databases of known breaches and is updated regularly. While we strive for accuracy, we recommend using it as one part of your overall security strategy."
  },
  {
    question: "Can I use CyberSentry for commercial purposes?",
    answer: "Yes! CyberSentry is free for both personal and commercial use. Small businesses, enterprises, and individuals can all benefit from our security tools without licensing fees."
  },
  {
    question: "What browsers are supported?",
    answer: "CyberSentry works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best security and performance."
  },
  {
    question: "How often are the threat databases updated?",
    answer: "Our security databases are updated regularly with the latest threat intelligence, vulnerability data, and breach information to ensure you have access to current security insights."
  }
];

const FAQ = () => {
  const structuredFAQData = {
    questions: faqData.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions - CyberSentry Security Tools"
        description="Get answers to common questions about CyberSentry's free cybersecurity tools. Learn about our privacy policy, supported formats, and how to use our security analyzers."
        keywords="breachguard faq, security tools questions, free cybersecurity help, log analyzer help"
        canonical="/faq"
      />
      
      <StructuredData type="FAQPage" data={structuredFAQData} />
      
      <Layout>
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.header
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-cyber-purple/20 border border-cyber-purple/30">
                <HelpCircle className="h-12 w-12 text-cyber-purple" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about using CyberSentry's free security tools.
            </p>
          </motion.header>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-black/20 border border-cyber-purple/20 rounded-xl p-8"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-black/30 border border-cyber-purple/20 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-white hover:text-cyber-purple text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-r from-cyber-dark-purple to-cyber-purple/30 rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-cyber-purple hover:bg-cyber-purple/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
          </motion.section>
        </div>
      </Layout>
    </>
  );
};

export default FAQ;
