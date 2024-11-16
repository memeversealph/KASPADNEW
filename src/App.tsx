import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import DappMenu from './pages/Dapp';
import CreateIDO from './pages/CreateIDO';
import ProjectDetails from './pages/ProjectDetailsPage';
import MyIDOs from './pages/MyIDOs';
import ManageIDOs from './pages/ManageIDOs';
import ExploreIDOs from './pages/ExploreIDOs';
import WalletPage from './pages/Wallet';
import SubmissionConfirmation from './pages/SubmissionConfirmation';
import KRC20Dashboard from './pages/KRC20Dashboard';
import { useVisitorStore } from './store/useVisitorStore';
import { getKRC20TokenList, getIndexerStatus } from './services/krc20';

const App = () => {
  const { incrementVisitor } = useVisitorStore();

  useEffect(() => {
    incrementVisitor();
    
    // Pre-fetch KRC20 data
    const prefetchData = async () => {
      try {
        await Promise.all([
          getKRC20TokenList(() => {}),
          getIndexerStatus()
        ]);
      } catch (error) {
        console.error('Error pre-fetching data:', error);
      }
    };
    
    prefetchData();
  }, [incrementVisitor]);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    
    // Check current time
    const currentHour = new Date().getHours();
    return currentHour < 6 || currentHour >= 18; // Dark mode between 6 PM and 6 AM
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-200">
        <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/krc20" element={<KRC20Dashboard />} />
          <Route path="/dapp" element={<DappMenu />} />
          <Route path="/dapp/explore" element={<ExploreIDOs />} />
          <Route path="/dapp/create" element={<CreateIDO />} />
          <Route path="/dapp/projects/:id" element={<ProjectDetails />} />
          <Route path="/dapp/my-idos" element={<MyIDOs />} />
          <Route path="/dapp/manage-idos" element={<ManageIDOs />} />
          <Route path="/dapp/wallet" element={<WalletPage />} />
          <Route path="/dapp/submission-confirmation" element={<SubmissionConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;