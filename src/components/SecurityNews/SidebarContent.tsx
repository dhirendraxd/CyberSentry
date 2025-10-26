
import React from 'react';
import AboutSecurityFeed from './AboutSecurityFeed';
import SecurityToolsCard from './SecurityToolsCard';

const SidebarContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <AboutSecurityFeed />
      <SecurityToolsCard />
    </div>
  );
};

export default SidebarContent;
