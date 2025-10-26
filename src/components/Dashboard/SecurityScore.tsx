
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, InfoIcon, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSecurityScore } from '@/hooks/useSecurityScore';
import { Skeleton } from '@/components/ui/skeleton';

const SecurityScore: React.FC = () => {
  const { score, loading } = useSecurityScore();

  const getScoreColor = (score: number) => {
    if (score < 40) return "text-cyber-alert";
    if (score < 70) return "text-yellow-400";
    return "text-green-500";
  };
  
  const getScoreBackground = (score: number) => {
    if (score < 40) return "bg-cyber-alert/10";
    if (score < 70) return "bg-yellow-400/10";
    return "bg-green-500/10";
  };
  
  const getScoreText = (score: number) => {
    if (score < 40) return "At Risk";
    if (score < 70) return "Fair";
    return "Secure";
  };

  const getProgressColor = (score: number) => {
    if (score < 40) return "bg-cyber-alert";
    if (score < 70) return "bg-yellow-400";
    return "bg-green-500";
  };

  // Create circular progress visualization
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = score / 100;
  const strokeDasharray = `${circumference * fillPercent} ${circumference * (1 - fillPercent)}`;
  
  if (loading) {
    return (
      <div className="rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl p-6 hover:bg-black/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32 bg-white/10" />
          <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
        </div>
        <div className="flex items-center justify-center mb-6">
          <Skeleton className="h-36 w-36 rounded-full bg-white/10" />
        </div>
        <Skeleton className="h-4 w-full bg-white/10" />
      </div>
    );
  }
  
  return (
    <div className="rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl p-6 hover:bg-black/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-white">Security Score</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex opacity-60 hover:opacity-100 transition-opacity">
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-black/90 backdrop-blur-sm border border-white/10">
                <p className="text-sm">Your security score is calculated based on password strength, breach checks, and security scans performed.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={cn("p-2 rounded-xl backdrop-blur-sm border border-white/10", getScoreBackground(score))}>
          {score < 70 ? (
            <AlertTriangle className={cn("h-5 w-5", getScoreColor(score))} />
          ) : (
            <Shield className="h-5 w-5 text-green-500" />
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="6" 
              className="text-white/10"
            />
            {/* Progress circle */}
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className={cn(getScoreColor(score), "transition-all duration-1000 ease-out")}
              style={{
                strokeDashoffset: 0,
                filter: 'drop-shadow(0 0 8px currentColor)'
              }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <div className={cn("text-4xl font-bold transition-all duration-500", getScoreColor(score))}>
              {score}%
            </div>
            <div className="text-sm text-gray-400 font-medium">
              {getScoreText(score)}
            </div>
            {score > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span className="text-xs text-green-400">Active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className={cn("h-full transition-all duration-1000 ease-out", getProgressColor(score))}
            style={{ width: `${score}%`, filter: 'drop-shadow(0 0 4px currentColor)' }}
          ></div>
        </div>
      </div>
      
      <div className="text-sm text-gray-300 leading-relaxed">
        {score < 40 ? 
          "🔒 Critical: Take immediate action to secure your digital presence." : 
          score < 70 ?
          "⚡ Good progress! Complete more security checks to improve your score." :
          "✨ Excellent! Your security posture is strong and well-maintained."
        }
      </div>
    </div>
  );
};

export default SecurityScore;
