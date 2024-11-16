import React from 'react';
import PoolCard from './PoolCard';

const mockPools = [
  {
    id: 'kaspaswap',
    name: 'KaspaSwap',
    description: 'Decentralized exchange built on Kaspa blockchain',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400&h=400',
    progress: 75,
    target: '1,000,000 KAS',
    startTime: 'Mar 20, 2024',
    status: 'Active',
    totalRaised: '750,000 KAS',
    participants: 1250,
    minAllocation: '500 KAS',
    maxAllocation: '10,000 KAS',
    tokenPrice: '0.15 USD'
  },
  {
    id: 'kaspalend',
    name: 'KaspaLend',
    description: 'Lending and borrowing protocol for Kaspa',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=400&h=400',
    progress: 45,
    target: '800,000 KAS',
    startTime: 'Mar 25, 2024',
    status: 'Upcoming',
    totalRaised: '360,000 KAS',
    participants: 820,
    minAllocation: '400 KAS',
    maxAllocation: '8,000 KAS',
    tokenPrice: '0.12 USD'
  }
];

const ActivePools = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-12">Active Pools</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {mockPools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
    </div>
  );
};

export default ActivePools;