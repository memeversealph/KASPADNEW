import { create } from 'zustand';

interface WalletState {
  address: string | null;
  balance: {
    kas: string;
    kpad: string;
  };
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  updateBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  address: null,
  balance: {
    kas: '0',
    kpad: '0'
  },
  isConnecting: false,
  isConnected: false,
  error: null,

  connect: async () => {
    try {
      set({ isConnecting: true, error: null });

      // Check if KasWare wallet is available
      if (typeof window.kasware === 'undefined') {
        throw new Error('Please install KasWare wallet');
      }

      // Request account access
      const accounts = await window.kasware.request({ 
        method: 'kas_requestAccounts'
      });

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        set({
          address,
          isConnected: true,
          isConnecting: false
        });

        // Get initial balance
        try {
          const balance = await window.kasware.request({
            method: 'kas_getBalance',
            params: [address]
          });

          set(state => ({
            balance: {
              ...state.balance,
              kas: balance ? (parseInt(balance) / 100000000).toFixed(8) : '0'
            }
          }));
        } catch (balanceError) {
          console.error('Failed to fetch balance:', balanceError);
        }
      } else {
        throw new Error('No accounts found');
      }

    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
        isConnecting: false,
        isConnected: false,
        address: null
      });
      console.error('Wallet connection error:', error);
    }
  },

  disconnect: () => {
    try {
      window.kasware.request({
        method: 'kas_disconnect'
      }).catch(console.error);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
    
    set({
      address: null,
      balance: { kas: '0', kpad: '0' },
      isConnected: false,
      error: null
    });
  },

  updateBalance: async () => {
    const { address } = get();
    if (!address || typeof window.kasware === 'undefined') return;

    try {
      const balance = await window.kasware.request({
        method: 'kas_getBalance',
        params: [address]
      });
      
      set(state => ({
        balance: {
          ...state.balance,
          kas: balance ? (parseInt(balance) / 100000000).toFixed(8) : state.balance.kas
        }
      }));
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  }
}));