import React from 'react';
import { Activity } from 'lucide-react';

interface NetworkStatusProps {
  blockHeight?: string;
}

const NetworkStatus = ({ blockHeight }: NetworkStatusProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="card py-2 px-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs text-text-secondary">
            Node Connected
          </span>
        </div>
        {blockHeight && (
          <span className="text-xs text-primary">
            #{blockHeight}
          </span>
        )}
      </div>
    </div>
  );
};

export default NetworkStatus;