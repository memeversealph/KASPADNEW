import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const featuredIdo = {
  id: 'kaspad',
  name: 'KasPad',
  description: 'The premier IDO launchpad for the Kaspa ecosystem',
  image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&q=80&w=2000&h=500',
  logo: <Rocket className="w-24 h-24 text-white" />,
  progress: 0,
  target: '1,000,000 KAS',
  startTime: '2025-01-01 14:00 UTC',
  endTime: '2025-01-08 14:00 UTC',
  status: 'Upcoming',
  totalRaised: '0 KAS',
  participants: 0,
  minAllocation: '100 KAS',
  maxAllocation: '3,000 KAS',
  tokenPrice: '0.0167 KAS'
};

const ExploreIDOs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">Featured IDO</h1>
        <p className="text-text-secondary">Participate in the latest IDO launches</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Link to={`/dapp/projects/${featuredIdo.id}`} className="block">
          <div className="card hover:scale-[1.02] transition-transform">
            <div className="relative">
              <div 
                className="w-full h-64 rounded-lg mb-6 bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: `url(${featuredIdo.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80 flex items-center justify-center">
                  <Rocket className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold gradient-text">{featuredIdo.name}</h3>
                <p className="text-text-secondary">{featuredIdo.description}</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {featuredIdo.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-text-secondary">Target Raise</p>
                <p className="font-semibold text-text-primary">{featuredIdo.target}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Start Date</p>
                <p className="font-semibold text-text-primary">{featuredIdo.startTime}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Min Allocation</p>
                <p className="font-semibold text-text-primary">{featuredIdo.minAllocation}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Max Allocation</p>
                <p className="font-semibold text-text-primary">{featuredIdo.maxAllocation}</p>
              </div>
            </div>
            <button className="btn-primary w-full">
              View Details
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExploreIDOs;