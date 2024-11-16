import React from 'react';
import { DollarSign, Users, Lock } from 'lucide-react';

const Stats = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="card">
          <div className="flex items-center gap-4">
            <Lock className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <p className="text-xl sm:text-2xl font-bold text-text-primary">--</p>
              <p className="text-text-secondary">Total Value Locked</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <DollarSign className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <p className="text-xl sm:text-2xl font-bold text-text-primary">--</p>
              <p className="text-text-secondary">Total IDO Value</p>
            </div>
          </div>
        </div>
        <div className="card sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <p className="text-xl sm:text-2xl font-bold text-text-primary">--</p>
              <p className="text-text-secondary">Active Stakers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;