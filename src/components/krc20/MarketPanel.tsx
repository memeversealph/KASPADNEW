import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, ArrowRight, Clock, Loader2 } from 'lucide-react';
import { formatNumber, formatPercentage } from '../../utils/formatters';
import { fetchTokenMarketData, fetchMarketStats, TokenMarketData, MarketStats } from '../../services/market';

const MarketPanel = () => {
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d'>('24h');
  const [tokens, setTokens] = useState<TokenMarketData[]>([]);
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [tokenData, marketStats] = await Promise.all([
          fetchTokenMarketData(),
          fetchMarketStats()
        ]);
        
        // Sort tokens by market cap
        const sortedTokens = tokenData.sort((a, b) => b.marketCap - a.marketCap);
        setTokens(sortedTokens);
        setStats(marketStats);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to fetch market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-secondary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold gradient-text">Market Overview</h2>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border border-border-color/20">
            {(['1h', '24h', '7d'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-primary text-background'
                    : 'hover:bg-primary/10'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color/20">
              <th className="text-left py-2 px-3 text-text-secondary font-medium text-sm">Token</th>
              <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm">Price (KAS)</th>
              <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm">Price (USD)</th>
              <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm">Change</th>
              <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm">Volume (24h)</th>
              <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm">Market Cap</th>
              <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm">Holders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/10">
            {tokens.map((token) => (
              <tr key={token.symbol} className="hover:bg-primary/5 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {token.symbol[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{token.symbol}</div>
                      <div className="text-xs text-text-secondary">{token.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="font-medium text-text-primary">
                    {token.price.kas.toFixed(8)}
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="font-medium text-text-primary">
                    ${token.price.usd.toFixed(6)}
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className={`flex items-center justify-end gap-1 ${
                    token.change[timeframe] >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {token.change[timeframe] >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-medium">
                      {formatPercentage(Math.abs(token.change[timeframe]))}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="font-medium text-text-primary">
                    ${formatNumber(token.volume24h)}
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="font-medium text-text-primary">
                    ${formatNumber(token.marketCap)}
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="font-medium text-text-primary">
                    {formatNumber(token.holders)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Market Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 p-4 bg-gradient-to-br from-primary/5 to-primary-dark/5 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-text-secondary">Total Value</div>
              <div className="font-medium text-text-primary">
                ${formatNumber(stats.totalValue)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-text-secondary">24h Volume</div>
              <div className="font-medium text-text-primary">
                ${formatNumber(stats.volume24h)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-text-secondary">Active Pairs</div>
              <div className="font-medium text-text-primary">
                {formatNumber(stats.activePairs)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-text-secondary">Total Transfers</div>
              <div className="font-medium text-text-primary">
                {formatNumber(stats.totalTransfers)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPanel;