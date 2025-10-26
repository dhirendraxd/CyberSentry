
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI security assistant. I can help you with cybersecurity questions, explain security concepts, and provide guidance on protecting your digital assets. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual ChatGPT API call
      // For now, simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm ready to help with your cybersecurity questions! However, I need the ChatGPT API to be configured to provide intelligent responses. Please ask the developer to set up the OpenAI API key.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI assistant.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] bg-black/40 backdrop-blur-xl border border-cyber-purple/30 shadow-2xl">
        <DialogHeader className="border-b border-cyber-purple/20 pb-4">
          <DialogTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyber-purple/20">
              <Bot className="h-5 w-5 text-cyber-purple" />
            </div>
            AI Security Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Chat Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!message.isUser && (
                    <div className="p-2 rounded-full bg-cyber-purple/20 backdrop-blur-sm">
                      <Bot className="h-4 w-4 text-cyber-purple" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-3 rounded-lg backdrop-blur-sm ${
                      message.isUser
                        ? 'bg-cyber-purple/20 text-white border border-cyber-purple/30'
                        : 'bg-black/20 text-gray-200 border border-white/10'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  {message.isUser && (
                    <div className="p-2 rounded-full bg-cyber-blue/20 backdrop-blur-sm">
                      <User className="h-4 w-4 text-cyber-blue" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-cyber-purple/20 backdrop-blur-sm">
                    <Bot className="h-4 w-4 text-cyber-purple" />
                  </div>
                  <div className="bg-black/20 text-gray-200 border border-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-cyber-purple/20 pt-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about cybersecurity..."
                className="flex-1 bg-black/20 border-cyber-purple/30 text-white placeholder:text-gray-400 focus:border-cyber-purple/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-cyber-purple hover:bg-cyber-purple/90 text-white"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;
