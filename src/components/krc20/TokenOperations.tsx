import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { KRC20Operation } from '../../services/krc20';
import { formatNumber, formatUnits } from '../../utils/formatters';

interface TokenOperationsProps {
  operations: KRC20Operation[];
  isLoading: boolean;
}

const TokenOperations = ({ operations, isLoading }: TokenOperationsProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-primary/5 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!operations.length) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No recent operations found
      </div>
    );
  }

  const getOperationColor = (op: string) => {
    switch (op.toLowerCase()) {
      case 'deploy': return 'bg-blue-400/10 text-blue-400';
      case 'mint': return 'bg-green-400/10 text-green-400';
      case 'transfer': return 'bg-purple-400/10 text-purple-400';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="space-y-4 max-h-[800px] overflow-y-auto">
      {operations.map((op, index) => (
        <div key={index} className="card hover:scale-[1.01] transition-transform">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getOperationColor(op.op)}`}>
                <span className="font-semibold">{op.op[0].toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getOperationColor(op.op)}`}>
                    {op.op}
                  </span>
                  <span className="text-primary font-medium">{op.tick}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-text-secondary truncate">
                    {op.from ? `${op.from.slice(0, 8)}...` : 'N/A'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-text-secondary truncate">
                    {op.to ? `${op.to.slice(0, 8)}...` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-medium text-text-primary mb-1">
                {op.amt ? formatNumber(Number(op.amt)) : 'N/A'}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span>{new Date(Number(op.mtsAdd)).toLocaleTimeString()}</span>
                <a
                  href={`https://explorer.kaspa.org/txs/${op.hashRev}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenOperations;