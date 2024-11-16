import { KRC20Token } from './krc20';

interface DeployParams {
  tick: string;
  max: string;
  lim: string;
  dec: string;
  pre: string;
  to?: string;
}

export const krc20Service = (isTestnet: boolean = false) => {
  const API_BASE = isTestnet 
    ? 'https://api.testnet.kaspa.org/krc20'
    : 'https://api.kaspa.org/krc20';

  const checkNetworkStatus = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/info`);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const deployToken = async (params: DeployParams): Promise<string> => {
    if (!window.kasware) {
      throw new Error('KasWare wallet not found');
    }

    const inscribeJsonString = JSON.stringify({
      p: "KRC-20",
      op: "deploy",
      ...params
    });

    try {
      const txid = await window.kasware.signKRC20Transaction(
        inscribeJsonString,
        1, // type 1 for deploy
        params.to, // destination address
        0.00002 // priority fee in KAS
      );

      return txid;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to deploy token');
    }
  };

  const mintToken = async (tick: string, amount: string, to?: string): Promise<string> => {
    if (!window.kasware) {
      throw new Error('KasWare wallet not found');
    }

    const inscribeJsonString = JSON.stringify({
      p: "KRC-20",
      op: "mint",
      tick,
      amt: amount
    });

    try {
      const txid = await window.kasware.signKRC20Transaction(
        inscribeJsonString,
        3, // type 3 for mint
        to, // destination address
        0.00002 // priority fee in KAS
      );

      return txid;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to mint token');
    }
  };

  return {
    checkNetworkStatus,
    deployToken,
    mintToken
  };
};

export type KRC20Service = ReturnType<typeof krc20Service>;