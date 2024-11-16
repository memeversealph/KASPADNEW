import { formatUnits } from '../utils/formatters';
import { fetchKasFyiData, KasFyiToken, KasFyiStats } from './kasfyi';

// Mock data for development and fallback
const MOCK_TOKENS: TokenMarketData[] = [
  {
    symbol: 'KPAD',
    name: 'KasPad Token',
    price: {
      kas: 0.0167,
      usd: 0.0021
    },
    change: {
      '1h': 2.5,
      '24h': -3.8,
      '7d': 15.4
    },
    volume24h: 245789,
    marketCap: 1250000,
    holders: 1234,
    lastTrade: '2 mins ago'
  },
  {
    symbol: 'KASW',
    name: 'KaspaSwap',
    price: {
      kas: 0.0245,
      usd: 0.0031
    },
    change: {
      '1h': -1.2,
      '24h': 5.6,
      '7d': 22.1
    },
    volume24h: 189456,
    marketCap: 980000,
    holders: 856,
    lastTrade: '5 mins ago'
  },
  {
    symbol: 'KLEND',
    name: 'KaspaLend',
    price: {
      kas: 0.0189,
      usd: 0.0024
    },
    change: {
      '1h': 1.8,
      '24h': 8.9,
      '7d': -4.2
    },
    volume24h: 156789,
    marketCap: 750000,
    holders: 645,
    lastTrade: '8 mins ago'
  }
];

const MOCK_STATS: MarketStats = {
  totalValue: 2980000,
  volume24h: 592034,
  activePairs: 12,
  totalTransfers: 45678
};

export interface TokenMarketData {
  symbol: string;
  name: string;
  price: {
    kas: number;
    usd: number;
  };
  change: {
    '1h': number;
    '24h': number;
    '7d': number;
  };
  volume24h: number;
  marketCap: number;
  holders: number;
  lastTrade: string;
}

export interface MarketStats {
  totalValue: number;
  volume24h: number;
  activePairs: number;
  totalTransfers: number;
}

export const fetchTokenMarketData = async (): Promise<TokenMarketData[]> => {
  try {
    const { tokens } = await fetchKasFyiData();
    
    if (!tokens.length) {
      console.warn('No tokens found from KasFyi, using mock data');
      return MOCK_TOKENS;
    }

    return tokens.map(token => ({
      symbol: token.symbol,
      name: token.name,
      price: token.price,
      change: token.change,
      volume24h: token.volume24h,
      marketCap: token.marketCap,
      holders: token.holders,
      lastTrade: token.lastTrade
    }));
  } catch (error) {
    console.warn('Error fetching token data, using mock data:', error);
    return MOCK_TOKENS;
  }
};

export const fetchMarketStats = async (): Promise<MarketStats> => {
  try {
    const { stats } = await fetchKasFyiData();
    
    if (!stats) {
      console.warn('No stats found from KasFyi, using mock data');
      return MOCK_STATS;
    }

    return {
      totalValue: stats.totalMarketCap,
      volume24h: stats.totalVolume24h,
      activePairs: stats.totalTokens,
      totalTransfers: stats.totalHolders
    };
  } catch (error) {
    console.warn('Error fetching market stats, using mock data:', error);
    return MOCK_STATS;
  }
};