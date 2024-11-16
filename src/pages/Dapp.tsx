import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  ArrowRightLeft, 
  PiggyBank, 
  BookOpen, 
  Settings, 
  Calculator, 
  BarChart2,
  Search,
  Lock,
  Users,
  Upload,
  Rocket
} from 'lucide-react';
import { useVisitorStore } from '../store/useVisitorStore';

const menuItems = [
  {
    title: 'Deploy Token',
    icon: <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'Deploy your own KRC-20 token',
    link: '/dapp/deploy',
    isAvailable: true
  },
  {
    title: 'Mint Tokens',
    icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'Mint existing KRC-20 tokens',
    link: '/dapp/mint',
    isAvailable: true
  },
  {
    title: 'Explore IDOs',
    icon: <Search className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'Browse and participate in IDO projects',
    link: '/dapp/explore',
    isAvailable: true
  },
  {
    title: 'Staking',
    icon: <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'Stake tokens to earn rewards',
    link: '/staking',
    isAvailable: false
  },
  {
    title: 'My IDOs',
    icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'View your IDO investments',
    link: '/dapp/my-idos',
    isAvailable: false
  },
  {
    title: 'Manage IDOs',
    icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'Manage your created IDO projects',
    link: '/dapp/manage-idos',
    isAvailable: false
  },
  {
    title: 'Wallet',
    icon: <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'View your wallet balance',
    link: '/dapp/wallet',
    isAvailable: false
  },
  {
    title: 'Trading',
    icon: <ArrowRightLeft className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'Trade tokens on KpadSwap',
    link: '/dapp/trade',
    isAvailable: false
  },
  {
    title: 'Calculator',
    icon: <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'Calculate your tier allocation',
    link: '/calculator',
    isAvailable: false
  },
  {
    title: 'Analytics',
    icon: <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />,
    description: 'View detailed platform analytics',
    link: '/dapp/analytics',
    isAvailable: false
  }
];

const stats = [
  {
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    value: '$0',
    label: 'Total Value Locked',
    soon: false,
    useVisitorCount: false
  },
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    value: '323',
    label: 'Active Users',
    soon: false,
    useVisitorCount: false
  },
  {
    icon: <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    value: '0',
    label: 'Successful IDOs',
    soon: true,
    useVisitorCount: false
  }
];

const Dapp = () => {
  const { visitorCount, incrementVisitor } = useVisitorStore();

  useEffect(() => {
    incrementVisitor();
  }, [incrementVisitor]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 gradient-text">KasPad Dapp</h1>
        <p className="text-sm sm:text-base text-text-secondary">Access all KasPad features and services</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-16">
        {menuItems.map((item, index) => (
          <div key={index} className="card flex flex-col hover:scale-[1.02] transition-all duration-300 p-3 sm:p-6">
            <div className="flex-grow">
              <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                <div className="bg-gradient-to-br from-primary/10 to-primary-dark/10 p-2 sm:p-3 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-xl font-bold gradient-text mb-0.5 sm:mb-1">{item.title}</h3>
                  {!item.isAvailable && (
                    <span className="text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary mb-3 sm:mb-6 line-clamp-2">{item.description}</p>
            </div>
            
            {item.isAvailable ? (
              <Link to={item.link} className="btn-primary w-full block text-center text-sm py-1.5 sm:py-2.5">
                Launch
              </Link>
            ) : (
              <button className="btn-secondary w-full opacity-50 cursor-not-allowed text-sm py-1.5 sm:py-2.5" disabled>
                Soon
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="card bg-gradient-to-br from-primary/5 to-primary-dark/5 p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2 sm:mb-4">
                {stat.icon}
              </div>
              <p className="text-lg sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-text-secondary">
                {stat.label}
                {stat.soon && (
                  <span className="ml-1 text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dapp;