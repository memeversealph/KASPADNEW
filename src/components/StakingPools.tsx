import React, { useState } from 'react';
import { Lock, Info } from 'lucide-react';

const tiers = [
  {
    name: 'Diamond',
    requirement: '1,000,000 KPAD',
    points: 30000,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Platinum',
    requirement: '400,000 KPAD',
    points: 11150,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Gold',
    requirement: '150,000 KPAD',
    points: 3850,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Silver',
    requirement: '40,000 KPAD',
    points: 950,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Bronze',
    requirement: '10,000 KPAD',
    points: 200,
    color: 'from-[#70C7BA] to-[#49EACB]'
  }
];

const StakingPools = () => {
  const [amount, setAmount] = useState('');

  const handleStake = () => {
    // Implement staking logic here
    console.log('Staking amount:', amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Lock KPAD Tokens</h1>
        <p className="text-text-secondary">Lock your KPAD tokens to participate in IDOs with higher allocations</p>
      </div>

      {/* Staking Input */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <p className="text-sm text-text-secondary">
              Enter the amount of KPAD you want to lock
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-2">
                Lock Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-primary w-full"
                  placeholder="Enter KPAD amount"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
                  KPAD
                </span>
              </div>
            </div>

            <button
              onClick={handleStake}
              className="btn-primary w-full"
            >
              Lock KPAD
            </button>
          </div>
        </div>
      </div>

      {/* Tier Information */}
      <div className="grid md:grid-cols-5 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className="tier-card">
            <div className="flex items-center gap-3 mb-6">
              <Lock className={`w-8 h-8 bg-gradient-to-r ${tier.color} rounded-lg p-1.5`} />
              <h3 className="text-xl font-bold gradient-text">{tier.name}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary">Required Lock</p>
                <p className="font-semibold text-text-primary">{tier.requirement}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Tier Points</p>
                <p className="font-semibold text-primary">{tier.points.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 card">
        <h3 className="text-xl font-bold mb-4 gradient-text">Locking Benefits</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-2 text-primary">Higher Allocations</h4>
            <p className="text-text-secondary">Lock more KPAD to access higher tier allocations in IDO sales</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-primary">Guaranteed Access</h4>
            <p className="text-text-secondary">Higher tiers receive guaranteed allocation based on their points</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-primary">Dynamic System</h4>
            <p className="text-text-secondary">Allocation size scales with the project's raise amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingPools;