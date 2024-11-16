import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { krc20Service } from '../services/krc20Service';
import { TokenConfig } from '../types/krc20';
import DeployForm from '../components/krc20/DeployForm';
import toast from 'react-hot-toast';

interface DeployProps {
  onBack: () => void;
}

type Step = 'ticker' | 'supply' | 'mint' | 'premint' | 'review';

export default function Deploy({ onBack }: DeployProps) {
  const { address, isConnected } = useWalletStore();
  const [currentStep, setCurrentStep] = useState<Step>('ticker');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<TokenConfig>({
    tick: '',
    max: '',
    lim: '',
    dec: '18',
    pre: '0'
  });

  useEffect(() => {
    const checkApi = async () => {
      try {
        const service = krc20Service();
        const status = await service.checkNetworkStatus();
        setApiStatus(status);
      } catch (error) {
        setApiStatus(false);
      }
    };
    checkApi();
  }, []);

  const validateTicker = (ticker: string) => {
    return /^[A-Z]{4,6}$/.test(ticker);
  };

  const handleConfigChange = (field: keyof TokenConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleNextStep = () => {
    setError(null);
    switch (currentStep) {
      case 'ticker':
        if (validateTicker(config.tick)) {
          setCurrentStep('supply');
        } else {
          setError('Ticker must be 4-6 uppercase letters');
        }
        break;
      case 'supply':
        if (parseInt(config.max) > 0) {
          setCurrentStep('mint');
        } else {
          setError('Supply must be greater than 0');
        }
        break;
      case 'mint':
        if (parseInt(config.lim) > 0 && parseInt(config.lim) <= parseInt(config.max)) {
          setCurrentStep('premint');
        } else {
          setError('Mint limit must be greater than 0 and less than max supply');
        }
        break;
      case 'premint':
        if (parseInt(config.pre) >= 0 && parseInt(config.pre) <= parseInt(config.max)) {
          setCurrentStep('review');
        } else {
          setError('Premint amount must be between 0 and max supply');
        }
        break;
    }
  };

  const handleDeploy = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!apiStatus) {
      toast.error('API is currently unavailable. Please try again later.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const service = krc20Service();
      const txid = await service.deployToken({
        ...config,
        to: address
      });
      
      toast.success(`Token ${config.tick} deployed successfully! Transaction ID: ${txid}`);
      onBack();
    } catch (error) {
      console.error('Deployment error:', error);
      toast.error(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Deploy Token
            </h1>
            <div className="flex items-center gap-2">
              {apiStatus === null ? (
                <span className="text-purple-300">Checking API...</span>
              ) : apiStatus ? (
                <>
                  <Wifi className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">API Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">API Offline</span>
                </>
              )}
            </div>
          </div>

          <DeployForm
            step={currentStep}
            config={config}
            error={error}
            onChange={handleConfigChange}
          />

          <div className="flex gap-4 mt-6">
            {currentStep !== 'ticker' && (
              <button
                onClick={() => setCurrentStep(prev => {
                  switch (prev) {
                    case 'supply': return 'ticker';
                    case 'mint': return 'supply';
                    case 'premint': return 'mint';
                    case 'review': return 'premint';
                    default: return 'ticker';
                  }
                })}
                className="flex-1 py-3 bg-purple-900/30 rounded-lg font-semibold hover:bg-purple-900/50 transition-all duration-300"
              >
                Back
              </button>
            )}
            
            {currentStep === 'review' ? (
              <button
                onClick={handleDeploy}
                disabled={loading || !apiStatus}
                className={`flex-1 py-3 rounded-lg font-semibold ${
                  loading || !apiStatus
                    ? 'bg-purple-900/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                } transition-all duration-300`}
              >
                {loading ? 'Deploying...' : 'Deploy Token'}
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}