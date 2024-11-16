import React, { useState, useEffect } from 'react';
import { Activity, ExternalLink, X, DollarSign, BarChart2, Coins } from 'lucide-react';
import StatItem from './StatItem';
import { formatHashrate, formatSupply, formatPrice, formatMarketCap } from '../utils/formatters';

interface NetworkStatsProps {
  onClose: () => void;
}

interface NetworkData {
  hashrate: number;
  blockCount: number;
  difficulty: number;
  supply: {
    total: number;
    max: number;
    mined: number;
  };
  price: {
    usd: number;
    change1h: number;
    change24h: number;
    change7d: number;
    volume: number;
    marketCap: number;
  };
}

const NetworkStats = ({ onClose }: NetworkStatsProps) => {
  const [stats, setStats] = useState<NetworkData>({
    hashrate: 1.29,
    blockCount: 95250530,
    difficulty: 608098.12,
    supply: {
      total: 25149940717,
      max: 28700000000,
      mined: 87.63
    },
    price: {
      usd: 0.1282,
      change1h: 1.0,
      change24h: -7.1,
      change7d: 6.7,
      volume: 140143804,
      marketCap: 3220000000
    }
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.kaspa.org/info/network?t=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch network stats');
        const data = await response.json();
        
        setStats(prev => ({
          ...prev,
          hashrate: Number(data.networkHashrate) || prev.hashrate,
          blockCount: Number(data.blockCount) || prev.blockCount,
          difficulty: Number(data.difficulty) || prev.difficulty,
        }));
        setError(null);
      } catch (error) {
        console.error('Error fetching network stats:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch stats');
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card-bg/50 backdrop-blur-sm border-b border-border-color/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center divide-x divide-border-color/20">
            <div className="flex items-center space-x-8 pr-8">
              <StatItem
                icon={<Activity className="w-4 h-4 text-primary" />}
                label="Network Hashrate"
                value={formatHashrate(stats.hashrate)}
                isAnimated
              />
              <StatItem
                icon={<Coins className="w-4 h-4 text-primary" />}
                label="Total Supply"
                value={formatSupply(stats.supply.total)}
                subValue={`${stats.supply.mined}% Mined`}
              />
              <StatItem
                icon={<DollarSign className="w-4 h-4 text-primary" />}
                label="Price"
                value={formatPrice(stats.price.usd)}
                subValue={`${stats.price.change24h > 0 ? '+' : ''}${stats.price.change24h}% (24h)`}
              />
            </div>
            <div className="flex items-center space-x-8 pl-8">
              <StatItem
                icon={<BarChart2 className="w-4 h-4 text-primary" />}
                label="Market Cap"
                value={formatMarketCap(stats.price.marketCap)}
                subValue={`Vol: $${(stats.price.volume / 1e6).toFixed(1)}M`}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            {error && (
              <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">
                Error loading stats
              </span>
            )}
            <a 
              href="https://explorer.kaspa.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
            >
              Explorer <ExternalLink className="w-3 h-3" />
            </a>
            <button 
              onClick={onClose}
              className="text-text-secondary hover:text-primary transition-colors p-1"
              aria-label="Close stats"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStats;