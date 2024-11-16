import React, { useState } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { KRC20Token } from '../../services/krc20';
import { formatNumber, formatUnits, formatPercentage, getProgressColor } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface TokenListProps {
  tokens: KRC20Token[];
  isLoading: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: 'name' | 'supply' | 'minted') => void;
}

const TokenList = ({ tokens, isLoading, sortBy, sortOrder, onSort }: TokenListProps) => {
  const [expandedToken, setExpandedToken] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 30;

  const renderSortIcon = (field: string) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3 opacity-50" />;
    return sortOrder === 'asc' ? 
      <TrendingUp className="w-3 h-3" /> : 
      <TrendingDown className="w-3 h-3" />;
  };

  const renderProgressBar = (current: number, max: number) => {
    const progress = max > 0 ? (current / max) * 100 : 0;
    const progressColor = getProgressColor(progress);
    
    return (
      <div className="space-y-0.5">
        <div className="flex justify-between text-[10px]">
          <span className="text-text-secondary">Progress</span>
          <span className="text-primary">{formatPercentage(progress)}</span>
        </div>
        <div className="relative h-1 bg-background/50 rounded-full overflow-hidden">
          <div 
            className={cn(
              "absolute h-full rounded-full bg-gradient-to-r transition-all duration-300",
              progressColor
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  const renderMobileCard = (token: KRC20Token) => {
    const isExpanded = expandedToken === token.tick;
    const maxSupply = Number(token.max);
    const minted = Number(token.minted || '0');
    const progress = maxSupply > 0 ? (minted / maxSupply) * 100 : 0;
    
    return (
      <div key={token.tick} className="card p-2 mb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">
                {token.tick[0]}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="text-xs font-bold text-text-primary truncate">{token.tick}</h3>
                <span className={cn(
                  "text-[9px] px-1 rounded-full",
                  token.state === 'deployed' 
                    ? "bg-green-400/10 text-green-400" 
                    : "bg-yellow-400/10 text-yellow-400"
                )}>
                  {token.state || 'Pending'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                <span>{formatUnits(token.max, Number(token.dec))}</span>
                <span>·</span>
                <span>{token.minted ? formatUnits(token.minted, Number(token.dec)) : '0'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setExpandedToken(isExpanded ? null : token.tick)}
            className="p-0.5 hover:bg-primary/10 rounded-md transition-colors ml-2"
          >
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-1">
          {renderProgressBar(minted, maxSupply)}
        </div>

        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-border-color/10">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <div className="text-[10px] text-text-secondary">Holders</div>
                <div className="text-xs font-medium text-text-primary">
                  {formatNumber(token.holderTotal || 0)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-secondary">Transfers</div>
                <div className="text-xs font-medium text-text-primary">
                  {formatNumber(token.transferTotal || 0)}
                </div>
              </div>
            </div>

            {token.hashRev && (
              <a
                href={`https://explorer.kaspa.org/txs/${token.hashRev}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-0.5 text-[10px] inline-flex items-center gap-0.5 hover:text-primary w-full justify-center"
              >
                View on Explorer <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDesktopTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-color/20">
            <th className="text-left py-2 px-3 text-text-secondary font-medium text-sm w-1/4">
              <button 
                onClick={() => onSort('name')}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                Token {renderSortIcon('name')}
              </button>
            </th>
            <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm w-1/5">
              <button 
                onClick={() => onSort('supply')}
                className="flex items-center justify-end gap-1 hover:text-primary transition-colors ml-auto"
              >
                Supply {renderSortIcon('supply')}
              </button>
            </th>
            <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm w-1/5">
              <button 
                onClick={() => onSort('minted')}
                className="flex items-center justify-end gap-1 hover:text-primary transition-colors ml-auto"
              >
                Minted {renderSortIcon('minted')}
              </button>
            </th>
            <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm w-1/4">Progress</th>
            <th className="text-right py-2 px-3 text-text-secondary font-medium text-sm w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-color/10">
          {tokens.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((token) => {
            const isExpanded = expandedToken === token.tick;
            const maxSupply = Number(token.max);
            const minted = Number(token.minted || '0');
            
            return (
              <React.Fragment key={token.tick}>
                <tr className={cn(
                  "hover:bg-primary/5 transition-colors text-sm",
                  isExpanded && "bg-primary/5"
                )}>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
                        <span className="text-base font-semibold text-primary">
                          {token.tick[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{token.tick}</div>
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-full",
                          token.state === 'deployed' 
                            ? "bg-green-400/10 text-green-400" 
                            : "bg-yellow-400/10 text-yellow-400"
                        )}>
                          {token.state || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <div className="font-medium text-text-primary">
                      {formatUnits(token.max, Number(token.dec))}
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <div className="font-medium text-text-primary">
                      {token.minted ? formatUnits(token.minted, Number(token.dec)) : '0'}
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    {renderProgressBar(minted, maxSupply)}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button
                      onClick={() => setExpandedToken(isExpanded ? null : token.tick)}
                      className="btn-secondary p-1.5"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr className="bg-primary/5">
                    <td colSpan={5} className="py-2 px-3">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-primary mb-1">Token Info</h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-text-secondary">Decimals:</span>
                              <span className="text-text-primary">{token.dec}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-text-secondary">Pre-mint:</span>
                              <span className="text-text-primary">
                                {formatUnits(token.pre, Number(token.dec))}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-1">Holders</h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-text-secondary">Total:</span>
                              <span className="text-text-primary">
                                {formatNumber(token.holderTotal || 0)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-text-secondary">Transfers:</span>
                              <span className="text-text-primary">
                                {formatNumber(token.transferTotal || 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-1">Activity</h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-text-secondary">Mints:</span>
                              <span className="text-text-primary">
                                {formatNumber(token.mintTotal || 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-1">Links</h4>
                          {token.hashRev && (
                            <a
                              href={`https://explorer.kaspa.org/txs/${token.hashRev}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary py-1 text-xs inline-flex items-center gap-1 hover:text-primary"
                            >
                              View on Explorer <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-primary/5 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!tokens.length) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No tokens found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="md:hidden space-y-1">
        {tokens
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(renderMobileCard)}
      </div>

      <div className="hidden md:block">
        {renderDesktopTable()}
      </div>

      {Math.ceil(tokens.length / itemsPerPage) > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-text-secondary">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, tokens.length)} of {tokens.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-secondary py-0.5 px-2 text-xs disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(Math.ceil(tokens.length / itemsPerPage), p + 1))}
              disabled={page === Math.ceil(tokens.length / itemsPerPage)}
              className="btn-secondary py-0.5 px-2 text-xs disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenList;