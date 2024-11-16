interface Window {
  kasware?: {
    requestAccounts: () => Promise<string[]>;
    getAccounts: () => Promise<string[]>;
    getBalance: () => Promise<string>;
    disconnect: (origin: string) => Promise<void>;
    on: (event: string, handler: (...args: any[]) => void) => void;
    removeListener: (event: string, handler: (...args: any[]) => void) => void;
    isKasware?: boolean;
  };
}