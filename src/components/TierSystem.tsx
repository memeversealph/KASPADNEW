import React, { useState, useEffect } from 'react';
import { Shield, Info } from 'lucide-react';

const initialTiers = [
  {
    name: 'Diamond',
    requirement: '1M KPAD',
    points: 30000,
    minAddresses: 0,
    maxAddresses: 1000,
    addresses: 0,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Platinum',
    requirement: '400K KPAD',
    points: 11150,
    minAddresses: 0,
    maxAddresses: 2000,
    addresses: 0,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Gold',
    requirement: '150K KPAD',
    points: 3850,
    minAddresses: 0,
    maxAddresses: 5000,
    addresses: 0,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Silver',
    requirement: '40K KPAD',
    points: 950,
    minAddresses: 0,
    maxAddresses: 10000,
    addresses: 0,
    color: 'from-[#70C7BA] to-[#49EACB]'
  },
  {
    name: 'Bronze',
    requirement: '10K KPAD',
    points: 200,
    minAddresses: 0,
    maxAddresses: 20000,
    addresses: 0,
    color: 'from-[#70C7BA] to-[#49EACB]'
  }
];

const TierSystem = () => {
  const [raiseAmount, setRaiseAmount] = useState(30000);
  const [tiers, setTiers] = useState(initialTiers);
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(num);
  };

  const handleAddressChange = (tierName: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setTiers(prevTiers => 
      prevTiers.map(tier => 
        tier.name === tierName 
          ? { 
              ...tier, 
              addresses: Math.min(Math.max(numValue, tier.minAddresses), tier.maxAddresses) 
            }
          : tier
      )
    );
  };

  const calculateAllocations = () => {
    const totalPoints = tiers.reduce((sum, tier) => sum + (tier.points * tier.addresses), 0);
    
    if (totalPoints === 0) {
      setAllocations({});
      return;
    }

    const newAllocations: Record<string, number> = {};
    tiers.forEach(tier => {
      if (tier.addresses > 0) {
        const tierPoints = tier.points * tier.addresses;
        const tierAllocation = (tierPoints / totalPoints) * raiseAmount;
        const perAddressAllocation = tierAllocation / tier.addresses;
        newAllocations[tier.name] = perAddressAllocation;
      }
    });

    setAllocations(newAllocations);
  };

  useEffect(() => {
    calculateAllocations();
  }, [tiers, raiseAmount]);

  const getTotalAllocation = () => {
    return tiers.reduce((total, tier) => {
      const allocation = allocations[tier.name] || 0;
      return total + (allocation * tier.addresses);
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="text-center mb-8 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Tier Allocation Calculator</h2>
        <p className="text-text-secondary text-base sm:text-lg">Calculate your potential IDO allocation based on tier distribution</p>
      </div>

      <div className="card mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-6 h-6 text-primary flex-shrink-0" />
          <p className="text-text-secondary text-sm sm:text-base">
            Adjust the number of active stakers in each tier to see allocation changes
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Sample Raise Amount (KAS)
            </label>
            <select 
              value={raiseAmount}
              onChange={(e) => setRaiseAmount(Number(e.target.value))}
              className="input-primary w-full"
            >
              <option value={30000}>30,000 KAS</option>
              <option value={100000}>100,000 KAS</option>
              <option value={500000}>500,000 KAS</option>
              <option value={1000000}>1,000,000 KAS</option>
            </select>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">
              Total Weighted Points
            </p>
            <p className="text-xl font-semibold text-primary">
              {formatNumber(tiers.reduce((sum, t) => sum + (t.points * t.addresses), 0))}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">
              Total Allocation
            </p>
            <p className="text-xl font-semibold text-primary">
              {formatNumber(getTotalAllocation())} / {formatNumber(raiseAmount)} KAS
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className="tier-card">
            <div className="flex items-center gap-3 mb-6">
              <Shield className={`w-8 h-8 bg-gradient-to-r ${tier.color} rounded-lg p-1.5`} />
              <h3 className="text-xl font-bold gradient-text">{tier.name}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary">Required Lock</p>
                <p className="font-semibold text-text-primary">{tier.requirement}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Tier Points</p>
                <p className="font-semibold text-primary">{formatNumber(tier.points)}</p>
              </div>
              <div>
                <label className="block text-sm text-text-secondary">Active Stakers</label>
                <input
                  type="number"
                  min={tier.minAddresses}
                  max={tier.maxAddresses}
                  value={tier.addresses}
                  onChange={(e) => handleAddressChange(tier.name, e.target.value)}
                  className="input-primary w-full"
                  placeholder="Enter number"
                />
                <p className="text-xs text-text-secondary mt-1">Max: {formatNumber(tier.maxAddresses)}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Per Address Allocation</p>
                <p className="font-semibold text-primary">
                  {formatNumber(allocations[tier.name] || 0)} KAS
                </p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Tier Allocation</p>
                <p className="font-semibold text-primary">
                  {formatNumber((allocations[tier.name] || 0) * tier.addresses)} KAS
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-16 card">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 gradient-text">Dynamic Allocation System</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h4 className="font-semibold mb-2 text-primary">Real-time Calculations</h4>
            <p className="text-text-secondary">Allocations update instantly as you adjust the number of stakers in each tier</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-primary">Fair Distribution</h4>
            <p className="text-text-secondary">Higher tiers receive larger allocations based on their points and number of participants</p>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-2 text-primary">Balanced Allocation</h4>
            <p className="text-text-secondary">Total allocations automatically adjust to match the raise amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierSystem;