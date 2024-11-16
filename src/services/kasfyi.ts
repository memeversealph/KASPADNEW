import { formatUnits } from '../utils/formatters';

export interface KasFyiToken {
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
  supply: {
    total: string;
    minted: string;
    burned: string;
  };
  lastTrade: string;
}

export interface KasFyiStats {
  totalTokens: number;
  totalHolders: number;
  totalVolume24h: number;
  totalMarketCap: number;
}

// KasFyi API endpoints
const API_BASE = 'https://api.kas.fyi/v1';
const ENDPOINTS = {
  tokens: '/tokens',
  stats: '/stats',
  markets: '/markets'
};

export const fetchKasFyiData = async (): Promise<{
  tokens: KasFyiToken[];
  stats: KasFyiStats;
}> => {
  try {
    // Fetch both tokens and market data
    const [tokensResponse, marketsResponse] = await Promise.all([
      fetch(`${API_BASE}${ENDPOINTS.tokens}`),
      fetch(`${API_BASE}${ENDPOINTS.markets}`)
    ]);

    if (!tokensResponse.ok || !marketsResponse.ok) {
      throw new Error('Failed to fetch data from KasFyi API');
    }

    const tokensData = await tokensResponse.json();
    const marketsData = await marketsResponse.json();

    // Transform API data to our format
    const tokens: KasFyiToken[] = tokensData.map((token: any) => {
      const market = marketsData.find((m: any) => m.token === token.symbol) || {};
      const kasPrice = market.price || 0;
      const usdPrice = kasPrice * 0.127; // Approximate KAS/USD rate

      return {
        symbol: token.symbol,
        name: token.name || token.symbol,
        price: {
          kas: kasPrice,
          usd: usdPrice
        },
        change: {
          '1h': market.change_1h || 0,
          '24h': market.change_24h || 0,
          '7d': market.change_7d || 0
        },
        volume24h: market.volume_24h || 0,
        marketCap: market.market_cap || 0,
        holders: token.holders || 0,
        supply: {
          total: token.max_supply || '0',
          minted: token.current_supply || '0',
          burned: token.burned_supply || '0'
        },
        lastTrade: market.last_trade_time ? new Date(market.last_trade_time).toRelative() : 'Recently'
      };
    });

    // Calculate overall stats
    const stats: KasFyiStats = {
      totalTokens: tokens.length,
      totalHolders: tokens.reduce((sum, token) => sum + token.holders, 0),
      totalVolume24h: tokens.reduce((sum, token) => sum + token.volume24h, 0),
      totalMarketCap: tokens.reduce((sum, token) => sum + token.marketCap, 0)
    };

    return { tokens, stats };
  } catch (error) {
    console.error('Error fetching KasFyi data:', error);
    throw error;
  }
};