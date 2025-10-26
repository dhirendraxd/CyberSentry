
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { MessageCircle, Send, Lightbulb, Bug, Heart } from 'lucide-react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    type: 'general',
    message: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypes = [
    { value: 'general', label: 'General Feedback', icon: MessageCircle },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'appreciation', label: 'Appreciation', icon: Heart }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual implementation)
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback. We'll review it and get back to you if needed."
    });

    setFormData({ type: 'general', message: '', email: '' });
    setIsSubmitting(false);
  };

  return (
    <>
      <SEOHead
        title="Feedback - Help Us Improve CyberSentry"
        description="Share your thoughts, report bugs, or suggest new features for CyberSentry's free security tools. Your feedback helps us build better cybersecurity tools for everyone."
        keywords="feedback, bug report, feature request, cybersecurity feedback, security tools improvement"
        canonical="/feedback"
      />
      
      <Layout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Share Your <span className="text-cyber-purple">Feedback</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Help us improve CyberSentry by sharing your thoughts, reporting issues, or suggesting new features. 
              Your input shapes the future of our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feedback Form */}
            <div className="lg:col-span-2">
              <Card className="bg-black/20 border-cyber-purple/30">
                <CardHeader>
                  <CardTitle className="text-white">Send Feedback</CardTitle>
                  <CardDescription>
                    All feedback is anonymous unless you choose to provide your email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Feedback Type */}
                    <div className="space-y-3">
                      <label className="text-white font-medium">Feedback Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {feedbackTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <Button
                              key={type.value}
                              type="button"
                              variant={formData.type === type.value ? "default" : "outline"}
                              className={`justify-start ${
                                formData.type === type.value 
                                  ? "bg-cyber-purple hover:bg-cyber-purple/90" 
                                  : "border-cyber-purple/30 text-gray-300 hover:bg-cyber-purple/10"
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                            >
                              <Icon className="h-4 w-4 mr-2" />
                              {type.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-white font-medium">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us what's on your mind..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="min-h-[120px] bg-black/20 border-cyber-purple/30 text-white resize-none"
                        required
                      />
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-white font-medium">
                        Email (Optional)
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-black/20 border-cyber-purple/30 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Only provide if you'd like a response. We won't spam you.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.message}
                      className="w-full bg-cyber-purple hover:bg-cyber-purple/90"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Feedback
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card className="bg-black/20 border-cyber-purple/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Why Your Feedback Matters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <p>🚀 <strong>Feature Requests:</strong> Help prioritize new tools and improvements</p>
                  <p>🐛 <strong>Bug Reports:</strong> Keep our platform running smoothly</p>
                  <p>💡 <strong>Ideas:</strong> Shape the future of cybersecurity tools</p>
                  <p>❤️ <strong>Appreciation:</strong> Motivate our development team</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-cyber-purple/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Tools Available:</span>
                    <span className="text-cyber-purple font-medium">8+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Always Free:</span>
                    <span className="text-green-400 font-medium">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No Registration:</span>
                    <span className="text-green-400 font-medium">Never</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Feedback;
