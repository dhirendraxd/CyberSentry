
import React from 'react';
import { Clock, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SecurityScore from '@/components/Dashboard/SecurityScore';
import SecuritySummary from '@/components/Dashboard/SecuritySummary';
import { useState } from 'react';

const ActivityTimeline = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const activities = [
    {
      event: "Security scan completed",
      time: "Today, 10:45 AM",
      color: "bg-cyber-purple",
      icon: "🔍"
    },
    {
      event: "Password strength analyzed",
      time: "Yesterday, 3:30 PM",
      color: "bg-cyber-blue",
      icon: "🔐"
    },
    {
      event: "Breach alert received",
      time: "Feb 12, 2:15 PM",
      color: "bg-cyber-alert",
      icon: "⚠️"
    },
    {
      event: "Dark web scan initiated",
      time: "Feb 10, 9:20 AM",
      color: "bg-cyber-purple",
      icon: "🕸️"
    },
    {
      event: "Security score improved +5%",
      time: "Feb 8, 4:55 PM",
      color: "bg-green-500",
      icon: "📈"
    },
    {
      event: "New device login detected",
      time: "Feb 5, 11:30 AM",
      color: "bg-cyber-blue",
      icon: "📱"
    }
  ];

  const visibleActivities = isExpanded ? activities : activities.slice(0, 3);

  return (
    <div className="lg:col-span-4 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl p-6 hover:bg-black/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <div className="p-1.5 rounded-lg bg-cyber-blue/20 backdrop-blur-sm">
            <Activity className="h-4 w-4 text-cyber-blue" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {visibleActivities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all duration-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">{activity.icon}</span>
              <div className={`h-2 w-2 rounded-full ${activity.color} shadow-lg`} style={{
                filter: 'drop-shadow(0 0 4px currentColor)'
              }}></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{activity.event}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className="w-full text-cyber-blue hover:text-white hover:bg-cyber-blue/20 transition-all duration-200 group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "View all activity"}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

const StatsOverviewSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Security Score Widget */}
      <div className="lg:col-span-3">
        <SecurityScore />
      </div>
      
      {/* Security Summary Widget */}
      <div className="lg:col-span-5">
        <SecuritySummary />
      </div>
      
      {/* Activity Timeline */}
      <ActivityTimeline />
    </div>
  );
};

export default StatsOverviewSection;
