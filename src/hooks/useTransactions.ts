import { useState, useEffect } from 'react';
import { getAddressTransactions, Transaction } from '../services/explorer';
import { useWalletStore } from '../store/useWalletStore';

export const useTransactions = (limit = 10) => {
  const { address } = useWalletStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;

      setLoading(true);
      setError(null);

      try {
        const txs = await getAddressTransactions(address, limit);
        setTransactions(txs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address, limit]);

  return { transactions, loading, error };
};