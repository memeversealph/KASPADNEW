import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Calendar, CheckCircle2, Shield, Zap, Lock, Users } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: 'Secure Platform',
    description: 'Built on Kaspa blockchain with advanced security measures'
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Lightning Fast',
    description: 'Instant transactions with near-zero fees'
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: 'Fair Launch',
    description: 'Tiered system ensuring fair token distribution'
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Community Driven',
    description: 'Governed by the community through KPAD token'
  }
];

const roadmapItems = [
  {
    quarter: 'Q1 2025',
    title: 'Platform Launch',
    items: [
      'KasPad Platform Launch',
      'Initial Token Distribution',
      'First IDO Launch',
      'Community Building'
    ]
  },
  {
    quarter: 'Q2 2025',
    title: 'Ecosystem Expansion',
    items: [
      'Enhanced Staking Features',
      'Advanced Analytics Dashboard',
      'Project Incubation Program',
      'Strategic Partnerships'
    ]
  },
  {
    quarter: 'Q3 2025',
    title: 'Advanced Features',
    items: [
      'Cross-chain Integration',
      'Automated KYC System',
      'Enhanced Security Features',
      'Mobile App Beta'
    ]
  },
  {
    quarter: 'Q4 2025',
    title: 'Global Scaling',
    items: [
      'Mobile App Launch',
      'Additional Chain Support',
      'Institutional Features',
      'Global Marketing Campaign'
    ]
  }
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-dark/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-primary to-primary-dark p-3 rounded-2xl">
                <Rocket className="w-12 h-12 text-background" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 gradient-text">
              Launch on Kaspa Network
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              The premier IDO platform for the Kaspa ecosystem. Secure, fair, and community-driven token launches.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dapp/projects/kaspad" className="btn-primary flex items-center justify-center">
                Launch App <Rocket className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/docs" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-4">Why Choose KasPad?</h2>
          <p className="text-text-secondary">Built for the future of decentralized fundraising</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:scale-[1.02] transition-all duration-300">
              <div className="bg-gradient-to-br from-primary/10 to-primary-dark/10 rounded-xl p-3 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 gradient-text">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-4">Platform Roadmap</h2>
          <p className="text-text-secondary">Our journey to build the premier IDO platform for Kaspa</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapItems.map((item) => (
            <div key={item.quarter} className="card">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold gradient-text">{item.quarter}</h3>
                  <p className="text-text-secondary">{item.title}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {item.items.map((milestone, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card bg-gradient-to-br from-primary/10 to-primary-dark/10 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-6">Ready to Launch?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join the future of decentralized fundraising on the Kaspa network. Launch your project with KasPad today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dapp/explore" className="btn-primary">
              Explore IDOs
            </Link>
            <Link to="/dapp/create" className="btn-secondary">
              Create IDO
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;