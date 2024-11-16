import React from 'react';
import { Calendar, Target, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PoolCardProps {
  pool: {
    id: string;
    name: string;
    description: string;
    image: string;
    progress: number;
    target: string;
    startTime: string;
    status: string;
    totalRaised: string;
    participants: number;
    minAllocation: string;
    maxAllocation: string;
    tokenPrice: string;
  };
}

const PoolCard = ({ pool }: PoolCardProps) => {
  return (
    <Link to={`/projects/${pool.id}`} className="block">
      <div className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur hover:transform hover:scale-[1.02] transition-transform border border-purple-500/20">
        <div className="relative">
          <img src={pool.image} alt={pool.name} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              pool.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {pool.status}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-1">{pool.name}</h3>
            <p className="text-gray-400 text-sm">{pool.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Total Raise</p>
                <p className="text-sm font-semibold">{pool.target}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Participants</p>
                <p className="text-sm font-semibold">{pool.participants}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Start Date</p>
                <p className="text-sm font-semibold">{pool.startTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Token Price</p>
                <p className="text-sm font-semibold">{pool.tokenPrice}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-purple-400">{pool.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                style={{ width: `${pool.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-2 text-gray-400">
              <span>{pool.totalRaised}</span>
              <span>{pool.target}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-4 p-3 bg-gray-900/50 rounded-lg">
            <div>
              <p className="text-gray-400 text-xs">Min Allocation</p>
              <p className="font-semibold">{pool.minAllocation}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Max Allocation</p>
              <p className="font-semibold">{pool.maxAllocation}</p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PoolCard;