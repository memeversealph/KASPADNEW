import React from 'react';
import { LoadingProgress as ProgressType } from '../../services/krc20';

interface LoadingProgressProps {
  progress: ProgressType;
}

const LoadingProgress = ({ progress }: LoadingProgressProps) => {
  const percentage = progress.total > 0 
    ? Math.min(Math.round((progress.loaded / progress.total) * 100), 100)
    : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">Loading tokens...</span>
        <span className="text-primary font-medium">{percentage}%</span>
      </div>
      <div className="relative h-2 bg-background/50 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"></div>
        </div>
      </div>
      <div className="text-xs text-text-secondary">
        Loaded {progress.loaded} of {progress.total} tokens
      </div>
    </div>
  );
}

export default LoadingProgress;