
import React from 'react';
import TopNavbar from './TopNavbar';
import Breadcrumbs from './SEO/Breadcrumbs';
import ChatbotButton from './Chatbot/ChatbotButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark-purple via-cyber-dark-purple/95 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-bg opacity-30"></div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <TopNavbar />
        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      {/* Floating Chatbot */}
      <ChatbotButton />
    </div>
  );
};

export default Layout;
