import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, ArrowUpDown, Clock, DollarSign, Activity, Upload, Rocket } from 'lucide-react';
import TokenList from '../components/krc20/TokenList';
import NetworkStatus from '../components/NetworkStatus';
import MarketPanel from '../components/krc20/MarketPanel';
import { getKRC20TokenList, getIndexerStatus, KRC20Token, IndexerStatus, LoadingProgress as ProgressType } from '../services/krc20';
import { useWalletStore } from '../store/useWalletStore';
import { formatNumber } from '../utils/formatters';
import toast from 'react-hot-toast';

const KRC20Dashboard = () => {
  const { address, isConnected, connect } = useWalletStore();
  const [tokens, setTokens] = useState<KRC20Token[]>([]);
  const [indexerStatus, setIndexerStatus] = useState<IndexerStatus | null>(null);
  const [isLoadingTokens, setIsLoadingTokens] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'supply' | 'minted'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<ProgressType>({
    loaded: 0,
    total: 0,
    isComplete: false
  });

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoadingTokens(true);
    }
    setError(null);

    try {
      const [tokenList, status] = await Promise.all([
        getKRC20TokenList((progress) => {
          setLoadingProgress(progress);
        }),
        getIndexerStatus()
      ]);

      setTokens(tokenList);
      setIndexerStatus(status);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoadingTokens(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to connect wallet');
    }
  };

  const handleDeploy = async () => {
    if (!isConnected) {
      handleConnectWallet();
      return;
    }

    try {
      setIsProcessing(true);
      const inscribeJsonString = JSON.stringify({
        p: "KRC-20",
        op: "deploy",
        tick: "LKAT",
        max: "2100000000",
        lim: "100000",
        dec: "18"
      });

      if (!window.kasware) {
        throw new Error('Please install KasWare wallet');
      }

      const txid = await window.kasware.signKRC20Transaction(
        inscribeJsonString,
        1, // type 1 for deploy
        undefined, // no destination address needed for deploy
        0.00002 // priority fee in KAS
      );

      toast.success(`Successfully deployed! Transaction ID: ${txid}`);
      fetchData(); // Refresh the list
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to deploy token');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMint = async (ticker: string) => {
    if (!isConnected) {
      handleConnectWallet();
      return;
    }

    try {
      setIsProcessing(true);
      const inscribeJsonString = JSON.stringify({
        p: "KRC-20",
        op: "mint",
        tick: ticker,
        amt: "100000"
      });

      if (!window.kasware) {
        throw new Error('Please install KasWare wallet');
      }

      const txid = await window.kasware.signKRC20Transaction(
        inscribeJsonString,
        3, // type 3 for mint
        undefined, // no destination address needed for minting
        0.00002 // priority fee in KAS
      );

      toast.success(`Successfully minted! Transaction ID: ${txid}`);
      fetchData(); // Refresh the list
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to mint token');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSort = (field: 'name' | 'supply' | 'minted') => {
    if (sortBy === field) {
      setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedTokens = tokens
    .filter(token => 
      token.tick.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.tick.localeCompare(b.tick);
          break;
        case 'supply':
          comparison = Number(a.max) - Number(b.max);
          break;
        case 'minted':
          comparison = Number(a.minted || 0) - Number(b.minted || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">KRC-20 Dashboard</h1>
        <p className="text-text-secondary">Track and analyze KRC20 tokens on the Kaspa network</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={handleDeploy}
          disabled={isProcessing}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          {isProcessing ? 'Processing...' : 'Deploy Token'}
        </button>
        <button 
          onClick={() => handleMint('LKAT')}
          disabled={isProcessing}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Rocket className="w-4 h-4" />
          {isProcessing ? 'Processing...' : 'Quick Mint LKAT'}
        </button>
      </div>

      {/* Loading Progress */}
      {isLoadingTokens && (
        <div className="card mb-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Loading tokens...</span>
              <span className="text-primary font-medium">
                {loadingProgress.loaded} tokens
              </span>
            </div>
            <div className="relative h-2 bg-background/50 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-dark animate-pulse w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h3 className="text-sm sm:text-lg font-medium text-text-primary">Total Tokens</h3>
          </div>
          <p className="text-lg sm:text-2xl font-bold gradient-text">
            {isLoadingTokens ? '--' : formatNumber(tokens.length)}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h3 className="text-sm sm:text-lg font-medium text-text-primary">Total Operations</h3>
          </div>
          <p className="text-lg sm:text-2xl font-bold gradient-text">
            {indexerStatus ? formatNumber(Number(indexerStatus.result.opTotal)) : '--'}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h3 className="text-sm sm:text-lg font-medium text-text-primary">Total Fees</h3>
          </div>
          <p className="text-lg sm:text-2xl font-bold gradient-text">
            {indexerStatus ? `${formatNumber(Number(indexerStatus.result.feeTotal) / 1e8)} KAS` : '--'}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <h3 className="text-sm sm:text-lg font-medium text-text-primary">Last Update</h3>
          </div>
          <p className="text-lg sm:text-2xl font-bold gradient-text">
            {lastUpdate ? '2 mins ago' : '--'}
          </p>
        </div>
      </div>

      {/* Market Panel */}
      <div className="mb-8">
        <MarketPanel />
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by token name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-primary w-full pl-10"
            />
          </div>
          <div className="flex gap-4">
            <select className="input-primary min-w-[150px]">
              <option value="all">All Chains</option>
              <option value="kaspa">Kaspa</option>
            </select>
            <select className="input-primary min-w-[150px]">
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="30d">30d</option>
            </select>
          </div>
        </div>
      </div>

      {/* Token List */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold gradient-text">KRC-20 Tokens</h2>
          {!isLoadingTokens && (
            <span className="text-text-secondary text-sm">
              Showing {filteredAndSortedTokens.length} of {tokens.length} tokens
            </span>
          )}
        </div>

        {error ? (
          <div className="text-red-400 bg-red-400/10 p-4 rounded-lg mb-4">
            <p>{error}</p>
            <button 
              onClick={() => fetchData()} 
              className="text-sm text-primary hover:text-primary-dark mt-2"
            >
              Try Again
            </button>
          </div>
        ) : (
          <TokenList 
            tokens={filteredAndSortedTokens} 
            isLoading={isLoadingTokens}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        )}
      </div>

      {/* Network Status */}
      <NetworkStatus blockHeight={indexerStatus?.result.daaScore} />
    </div>
  );
};

export default KRC20Dashboard;