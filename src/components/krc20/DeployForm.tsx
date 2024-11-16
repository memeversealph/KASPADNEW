import React from 'react';
import { AlertCircle } from 'lucide-react';
import { TokenConfig } from '../../types/krc20';

interface DeployFormProps {
  step: 'ticker' | 'supply' | 'mint' | 'premint' | 'review';
  config: TokenConfig;
  error: string | null;
  onChange: (field: keyof TokenConfig, value: string) => void;
}

export const DeployForm: React.FC<DeployFormProps> = ({
  step,
  config,
  error,
  onChange
}) => {
  const renderStep = () => {
    switch (step) {
      case 'ticker':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">🚀 Ticker</h2>
            <p className="text-purple-300 mb-4">Choose the ticker for your KRC20 token (4-6 characters, letters only)</p>
            <input
              type="text"
              value={config.tick}
              onChange={(e) => onChange('tick', e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Enter ticker (e.g., LKAT)"
              maxLength={6}
            />
          </div>
        );

      case 'supply':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">♾ Supply</h2>
            <p className="text-purple-300 mb-4">What is the max supply for your KRC20 token?</p>
            <input
              type="number"
              value={config.max}
              onChange={(e) => onChange('max', e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Enter max supply"
            />
          </div>
        );

      case 'mint':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">⛏ Mint Limit</h2>
            <p className="text-purple-300 mb-4">How many tokens should be given per mint?</p>
            <input
              type="number"
              value={config.lim}
              onChange={(e) => onChange('lim', e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Enter mint limit"
            />
          </div>
        );

      case 'premint':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">💎 Premint</h2>
            <p className="text-purple-300 mb-4">Would you like to premint tokens to your address? If yes, enter the amount to premint. If no, enter 0.</p>
            <input
              type="number"
              value={config.pre}
              onChange={(e) => onChange('pre', e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Enter premint amount"
            />
          </div>
        );

      case 'review':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">📝 Review</h2>
            <div className="space-y-4 bg-purple-900/30 p-6 rounded-lg">
              <div className="flex justify-between">
                <span className="text-purple-300">Ticker:</span>
                <span className="text-purple-200 font-mono">{config.tick}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Max Supply:</span>
                <span className="text-purple-200 font-mono">{config.max}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Mint Limit:</span>
                <span className="text-purple-200 font-mono">{config.lim}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Premint:</span>
                <span className="text-purple-200 font-mono">{config.pre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Decimals:</span>
                <span className="text-purple-200 font-mono">{config.dec}</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderStep()}
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default DeployForm;