import { formatUnits } from '../utils/formatters';

const EXPLORER_API = 'https://api.kaspa.org';

export interface AddressBalance {
  address: string;
  balance: string;
  totalReceived: string;
  totalSent: string;
}

export const getAddressBalance = async (address: string): Promise<string> => {
  try {
    const response = await fetch(`${EXPLORER_API}/addresses/${address}/balance`);
    if (!response.ok) {
      throw new Error('Failed to fetch balance');
    }
    const data = await response.json();
    return data.balance || '0';
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};