
import React from 'react';
import CryptoTracker from '@/components/CryptoTracker';
import ShodanWidget from '@/components/ShodanWidget';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const DataWidgets = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white">Threat Intelligence</h2>
      
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <CryptoTracker />
        <ShodanWidget />
      </div>
      
      {/* Mobile View with Accordion */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="crypto" className="border-0">
            <AccordionTrigger className="py-3 px-4 rounded-lg bg-cyber-purple/10 hover:bg-cyber-purple/20 transition-colors">
              <span className="text-white">Crypto Tracker</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <CryptoTracker />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shodan" className="border-0">
            <AccordionTrigger className="py-3 px-4 rounded-lg bg-cyber-blue/10 hover:bg-cyber-blue/20 transition-colors">
              <span className="text-white">Global Vulnerability Alert</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <ShodanWidget />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default DataWidgets;
