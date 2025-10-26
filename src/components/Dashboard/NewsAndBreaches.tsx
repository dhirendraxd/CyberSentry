
import React from 'react';
import RecentBreaches from '@/components/Dashboard/RecentBreaches';
import SecurityNews from '@/components/SecurityNews';

const NewsAndBreaches = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl glass-card p-6 border border-white/10 relative overflow-hidden group hover:border-cyber-alert/30 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-alert/5 to-transparent group-hover:from-cyber-alert/10 transition-all duration-500"></div>
        <RecentBreaches />
      </div>
      <div className="rounded-xl glass-card p-6 border border-white/10 relative overflow-hidden group hover:border-cyber-blue/30 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-transparent group-hover:from-cyber-blue/10 transition-all duration-500"></div>
        <SecurityNews />
      </div>
    </div>
  );
};

export default NewsAndBreaches;
