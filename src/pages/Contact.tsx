
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <>
      <SEOHead
        title="Contact CyberSentry - Get Security Support & Feedback"
        description="Contact CyberSentry for support, feature requests, or security questions. We're here to help you protect your digital assets with our free cybersecurity tools."
        keywords="contact breachguard, security support, cybersecurity help, feature requests"
        canonical="/contact"
      />
      
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
                <Mail className="h-12 w-12 text-cyber-purple" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions, suggestions, or need help with our security tools? 
              We'd love to hear from you.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="bg-black/20 border border-cyber-purple/20 rounded-lg p-6">
                  <MessageSquare className="h-8 w-8 text-cyber-purple mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                  <p className="text-gray-400 mb-4">
                    Questions about our tools, feature requests, or general feedback.
                  </p>
                  <a 
                    href="mailto:hello@breachguard.com" 
                    className="text-cyber-purple hover:text-cyber-purple/80"
                  >
                    hello@breachguard.com
                  </a>
                </div>

                <div className="bg-black/20 border border-cyber-purple/20 rounded-lg p-6">
                  <Mail className="h-8 w-8 text-cyber-purple mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Technical Support</h3>
                  <p className="text-gray-400 mb-4">
                    Having trouble with a tool or found a bug? Let us know.
                  </p>
                  <a 
                    href="mailto:support@breachguard.com" 
                    className="text-cyber-purple hover:text-cyber-purple/80"
                  >
                    support@breachguard.com
                  </a>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="bg-black/20 border border-cyber-purple/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-black/30 border-cyber-purple/20 text-white focus:border-cyber-purple"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-black/30 border-cyber-purple/20 text-white focus:border-cyber-purple"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-black/30 border-cyber-purple/20 text-white focus:border-cyber-purple"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-black/30 border-cyber-purple/20 text-white focus:border-cyber-purple resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
