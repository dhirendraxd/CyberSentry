
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatbotModal from './ChatbotModal';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-cyber-purple hover:bg-cyber-purple/90 shadow-2xl border-2 border-cyber-blue/30 backdrop-blur-xl group transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
        
        {/* Floating pulse effect */}
        <div className="absolute inset-0 rounded-full bg-cyber-purple/30 animate-ping"></div>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
