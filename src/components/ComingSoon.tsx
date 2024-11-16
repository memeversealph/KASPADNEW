import React from 'react';
import { Clock } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  feature: string;
}

const ComingSoon = ({ title = 'Coming Soon', feature }: ComingSoonProps) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] p-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 p-4 rounded-2xl">
            <Clock className="w-16 h-16 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 gradient-text">{title}</h1>
        <p className="text-text-secondary text-lg">
          The {feature} feature is currently under development. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;