import { formatUnits } from '../utils/formatters';

const API_BASE = 'https://api.kasplex.org/v1';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const BATCH_SIZE = 50;

// Add cache for tokens and status with timestamp
let tokenCache: {
  data: KRC20Token[];
  timestamp: number;
} | null = null;

let statusCache: {
  data: IndexerStatus;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 30 * 1000; // 30 seconds cache

export interface KRC20Token {
  tick: string;
  max: string;
  lim: string;
  pre: string;
  to?: string;
  dec: string;
  minted?: string;
  opScoreAdd: string;
  opScoreMod: string;
  state: string;
  hashRev?: string;
  mtsAdd: string;
  holderTotal?: number;
  transferTotal?: number;
  mintTotal?: number;
}

export interface IndexerStatus {
  message: string;
  result: {
    daaScore: string;
    opScore: string;
    opTotal: string;
    tokenTotal: string;
    feeTotal: string;
  };
}

export interface TokenListResponse {
  message: string;
  prev?: string;
  next?: string;
  result: KRC20Token | KRC20Token[];
}

export type LoadingProgress = {
  loaded: number;
  total: number;
  isComplete: boolean;
};

export type LoadingCallback = (progress: LoadingProgress) => void;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = MAX_RETRIES): Promise<Response> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
};

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

export const getIndexerStatus = async (): Promise<IndexerStatus> => {
  try {
    // Check cache
    if (statusCache && Date.now() - statusCache.timestamp < CACHE_DURATION) {
      return statusCache.data;
    }

    const response = await fetchWithRetry(`${API_BASE}/info`);
    const status = await handleApiResponse<IndexerStatus>(response);
    
    // Update cache
    statusCache = {
      data: status,
      timestamp: Date.now()
    };
    
    return status;
  } catch (error) {
    console.error('Error fetching indexer status:', error);
    throw new Error('Unable to fetch network status');
  }
};

const deduplicateTokens = (tokens: KRC20Token[]): KRC20Token[] => {
  // Create a map to store the latest version of each token
  const tokenMap = new Map<string, KRC20Token>();

  // Process tokens in reverse order to keep the latest version
  for (const token of tokens.reverse()) {
    if (!tokenMap.has(token.tick) || 
        (token.state === 'deployed' && tokenMap.get(token.tick)?.state !== 'deployed')) {
      tokenMap.set(token.tick, token);
    }
  }

  return Array.from(tokenMap.values());
};

export const getKRC20TokenList = async (onProgress?: LoadingCallback): Promise<KRC20Token[]> => {
  try {
    // Check cache
    if (tokenCache && Date.now() - tokenCache.timestamp < CACHE_DURATION) {
      if (onProgress) {
        onProgress({
          loaded: tokenCache.data.length,
          total: tokenCache.data.length,
          isComplete: true
        });
      }
      return tokenCache.data;
    }

    let allTokens: KRC20Token[] = [];
    let nextCursor: string | null = null;
    let hasMore = true;
    let totalTokens = 0;
    let seenTokens = new Set<string>();

    // Get total count from indexer status
    try {
      const status = await getIndexerStatus();
      totalTokens = parseInt(status.result.tokenTotal);
      
      // Report initial progress
      if (onProgress) {
        onProgress({
          loaded: 0,
          total: totalTokens,
          isComplete: false
        });
      }
    } catch (error) {
      console.warn('Could not fetch total token count:', error);
      totalTokens = 1000;
    }

    const fetchBatch = async () => {
      const url = nextCursor 
        ? `${API_BASE}/krc20/tokenlist?next=${nextCursor}&limit=${BATCH_SIZE}`
        : `${API_BASE}/krc20/tokenlist?limit=${BATCH_SIZE}`;

      const response = await fetchWithRetry(url);
      const data = await handleApiResponse<TokenListResponse>(response);

      let newTokens: KRC20Token[] = [];
      if (Array.isArray(data.result)) {
        newTokens = data.result;
      } else if (data.result) {
        newTokens = [data.result];
      }

      // Deduplicate tokens within the batch
      for (const token of newTokens) {
        if (!seenTokens.has(token.tick)) {
          seenTokens.add(token.tick);
          allTokens.push(token);
        }
      }

      nextCursor = data.next;
      hasMore = !!nextCursor;

      if (onProgress) {
        onProgress({
          loaded: seenTokens.size,
          total: totalTokens,
          isComplete: !hasMore
        });
      }
    };

    await fetchBatch();

    while (hasMore) {
      const batchPromises = [];
      const parallelBatches = 3;
      
      for (let i = 0; i < parallelBatches && hasMore; i++) {
        batchPromises.push(fetchBatch());
      }

      await Promise.all(batchPromises);
      
      if (hasMore) {
        await delay(100);
      }
    }

    // Final deduplication and sorting
    const sortedTokens = deduplicateTokens(allTokens).sort((a, b) => {
      if (a.state === 'deployed' && b.state !== 'deployed') return -1;
      if (a.state !== 'deployed' && b.state === 'deployed') return 1;
      const aMinted = Number(a.minted || 0);
      const bMinted = Number(b.minted || 0);
      return bMinted - aMinted;
    });

    // Update cache
    tokenCache = {
      data: sortedTokens,
      timestamp: Date.now()
    };

    return sortedTokens;
  } catch (error) {
    console.error('Error fetching KRC-20 tokens:', error);
    throw new Error('Unable to load KRC-20 tokens. Please try again in a few moments.');
  }
};