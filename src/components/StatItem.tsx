import React from 'react';
import { cn } from '../utils/cn';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  isAnimated?: boolean;
  className?: string;
}

const StatItem = ({ icon, label, value, subValue, isAnimated, className }: StatItemProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "p-1.5 rounded-lg bg-primary/10",
        isAnimated && "animate-pulse"
      )}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-text-secondary">{label}</p>
        <p className="text-sm font-medium text-primary">{value}</p>
        {subValue && (
          <p className={cn(
            "text-xs mt-0.5",
            subValue.includes('-') ? "text-red-400" : 
            subValue.includes('+') ? "text-green-400" : 
            "text-text-secondary"
          )}>
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatItem;