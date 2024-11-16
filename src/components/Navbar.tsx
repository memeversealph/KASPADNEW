import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import WalletConnect from './WalletConnect';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isDapp = location.pathname.startsWith('/dapp');

  return (
    <nav className="bg-card-bg/50 backdrop-blur-sm sticky top-0 z-50 border-b border-border-color/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Rocket className="w-8 h-8 text-primary" />
            <span className="ml-2 text-xl font-bold gradient-text">KasPad</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 ml-auto mr-6">
            <Link to="/" className="text-text-secondary hover:text-primary transition-colors">Home</Link>
            <Link to="/docs" className="text-text-secondary hover:text-primary transition-colors">Docs</Link>
            <Link to="/krc20" className="text-text-secondary hover:text-primary transition-colors">KRC20</Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            {isDapp ? (
              <WalletConnect />
            ) : (
              <Link to="/dapp" className="btn-primary">
                Enter Dapp
              </Link>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center gap-2">
            {isDapp && <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />}
            {isDapp && <WalletConnect />}
            <button 
              className="text-text-primary p-2 hover:bg-primary/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {!isDapp && (
              <>
                <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
                <Link to="/dapp" className="btn-primary text-sm whitespace-nowrap">
                  Enter Dapp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-card-bg/95 backdrop-blur-lg border-b border-border-color/20">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link 
              to="/" 
              className="block text-text-secondary hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/docs" 
              className="block text-text-secondary hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
            <Link 
              to="/krc20" 
              className="block text-text-secondary hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              KRC20
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;