import React, { useEffect, useState } from 'react';
import { Wallet, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { getAddressBalance } from '../services/explorer';

interface WalletState {
  address: string | null;
  balance: string;
  isConnecting: boolean;
  error: string | null;
}

const WalletConnect = () => {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: '0',
    isConnecting: false,
    error: null
  });

  const formatBalance = (sompiBalance: string): string => {
    try {
      const sompi = BigInt(sompiBalance);
      const kas = Number(sompi) / 100000000;
      return kas.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      });
    } catch (error) {
      console.error('Error formatting balance:', error);
      return '0.00';
    }
  };

  const updateBalance = async (address: string) => {
    try {
      const balance = await getAddressBalance(address);
      setState(prev => ({
        ...prev,
        balance: formatBalance(balance)
      }));
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.kasware === 'undefined') {
      window.open('https://docs.kasware.xyz/wallet', '_blank');
      return;
    }

    try {
      setState(prev => ({ ...prev, isConnecting: true, error: null }));
      const accounts = await window.kasware.requestAccounts();
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        setState(prev => ({
          ...prev,
          address,
          isConnecting: false
        }));
        await updateBalance(address);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: 'Failed to connect wallet'
      }));
    }
  };

  const disconnect = async () => {
    try {
      if (window.kasware && state.address) {
        await window.kasware.disconnect(window.location.origin);
      }
      setState({
        address: null,
        balance: '0.00',
        isConnecting: false,
        error: null
      });
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.kasware !== 'undefined') {
        try {
          const accounts = await window.kasware.getAccounts();
          if (accounts && accounts.length > 0) {
            const address = accounts[0];
            setState(prev => ({
              ...prev,
              address
            }));
            await updateBalance(address);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();

    // Setup event listeners
    if (window.kasware) {
      window.kasware.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          const newAddress = accounts[0];
          setState(prev => ({ ...prev, address: newAddress }));
          updateBalance(newAddress);
        }
      });

      window.kasware.on('networkChanged', () => {
        checkConnection();
      });
    }

    return () => {
      if (window.kasware) {
        window.kasware.removeListener('accountsChanged', () => {});
        window.kasware.removeListener('networkChanged', () => {});
      }
    };
  }, []);

  // Auto-refresh balance
  useEffect(() => {
    if (!state.address) return;

    const interval = setInterval(() => {
      updateBalance(state.address!);
    }, 10000);

    return () => clearInterval(interval);
  }, [state.address]);

  if (typeof window.kasware === 'undefined') {
    return (
      <a
        href="https://docs.kasware.xyz/wallet"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap py-2"
      >
        <Wallet className="w-4 h-4" />
        <span className="hidden sm:inline">Install Wallet</span>
        <span className="sm:hidden">Install</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    );
  }

  if (state.isConnecting) {
    return (
      <button 
        className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap py-2" 
        disabled
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="hidden sm:inline">Connecting...</span>
        <span className="sm:hidden">...</span>
      </button>
    );
  }

  if (state.address) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:block text-right">
          <div className="text-xs text-text-secondary">Balance</div>
          <div className="text-sm font-medium text-primary">
            {state.balance} <span className="text-xs">KAS</span>
          </div>
        </div>
        <button 
          onClick={disconnect}
          className={cn(
            "btn-secondary flex items-center gap-2 text-sm py-2",
            state.error && "border-red-500/50 text-red-500"
          )}
        >
          {state.error ? (
            <>
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Error</span>
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4" />
              <span className="truncate max-w-[80px]">
                {state.address.slice(0, 6)}...{state.address.slice(-4)}
              </span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap py-2"
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Connect</span>
    </button>
  );
};

export default WalletConnect;