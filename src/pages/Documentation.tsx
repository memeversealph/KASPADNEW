import React from 'react';
import { BookOpen, Rocket, Coins, Users, Shield, Target, Code, Globe, MessageCircle, Lock } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4 gradient-text">KasPad Documentation</h1>
        <p className="text-xl text-text-secondary">Complete guide to the KaspaPad launchpad platform</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Introduction</h2>
            </div>
            <p className="text-text-primary mb-4">
              KasPad is a decentralized fundraising platform built on the Kaspa network, designed to provide secure and efficient fundraising solutions for projects and investors. By leveraging Kaspa's high performance and low-cost characteristics, KasPad simplifies the project launch process within the Kaspa ecosystem.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Mission</h3>
                <p className="text-text-secondary">To provide a convenient and secure project launch platform for the Kaspa ecosystem, fostering trust between projects and investors while promoting innovation.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Vision</h3>
                <p className="text-text-secondary">To become the leading project launch platform on the Kaspa network, reimagining the project launch process with advanced, flexible, and accessible technology.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Globe className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Market Opportunity</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Current Challenges</h3>
                <p className="text-text-secondary">Traditional fundraising methods in blockchain and DAG networks face issues of high fees, low liquidity, and lack of transparency. Both investors and projects need a more efficient and secure fundraising platform.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">KasPad Solution</h3>
                <p className="text-text-secondary">Leveraging Kaspa network's high performance and low fees, KasPad provides a scalable, decentralized fundraising platform that attracts developers and investors, driving continuous growth of the Kaspa ecosystem.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Rocket className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Core Features</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Token Launchpad</h3>
                <p className="text-text-secondary">Secure and transparent IDO platform for emerging projects on the Kaspa network.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Reward Distribution</h3>
                <p className="text-text-secondary">Rewards are accumulated in a pool and distributed over 100 days to ensure liquidity.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Vault System</h3>
                <p className="text-text-secondary">Tiered system providing incentives and exclusive early access based on participation level.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Revenue Sharing</h3>
                <p className="text-text-secondary">Vault participants receive 5% of successful fundraising total, with 95% allocated to IDO projects. All listing fees are distributed to Vault participants.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Governance</h3>
                <p className="text-text-secondary">14-day protocol change delay mechanism ensures community has sufficient time for feedback and governance participation.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Coins className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Tokenomics</h2>
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-primary">Token Symbol:</span>
                <span className="text-text-primary">$KPAD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Total Supply:</span>
                <span className="text-text-primary">100,000,000 KPAD</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Token Sale (60%)</h3>
                <p className="text-text-secondary">60M KPAD allocated for public sale to support initial platform development. Unsold tokens will be burned.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Team (15%)</h3>
                <p className="text-text-secondary">15M KPAD with 4-year linear vesting to ensure long-term commitment.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Marketing (5%)</h3>
                <p className="text-text-secondary">5M KPAD for strategic marketing initiatives.</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-primary">Liquidity Strategy</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-text-secondary">20M KPAD (20%) allocated for liquidity. One-third of funds raised from public sale will be paired with 20M KPAD at 1 KPAD = 0.0167 KAS.</p>
                </div>
                <div>
                  <p className="text-text-secondary">Unused liquidity tokens will be burned if maximum fundraising target is not reached, ensuring $KPAD stability and scarcity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Platform Features</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Project Funding</h3>
                <p className="text-text-secondary">Flexible funding options with whitelist and staking conditions.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Staking & Rewards</h3>
                <p className="text-text-secondary">Stake $KPAD for rewards and governance voting rights.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Governance</h3>
                <p className="text-text-secondary">Community-driven platform with voting rights for $KPAD holders.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Flat Price IDO</h3>
                <p className="text-text-secondary">Fixed price IDOs with flexible customization options for projects.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Refundable Sales</h3>
                <p className="text-text-secondary">Full refund mechanism for projects that don't reach funding goals.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Code className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Technical Architecture</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Inscription Contracts</h3>
                <p className="text-text-secondary">KaspaPad utilizes Kaspa's inscription system for permanent record-keeping of all transactions, data, and project launches.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Frontend Technology</h3>
                <p className="text-text-secondary">Built with ReactJS and NextJS for fast, smooth user experience with easy access to inscription information.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">User Interface</h3>
                <p className="text-text-secondary">Clean, intuitive design emphasizing transparent information display and seamless interaction.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <MessageCircle className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Community</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Community Participation</h3>
                <p className="text-text-secondary">Regular updates, voting, and interactive feedback ensure platform features meet user needs.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Community Governance</h3>
                <p className="text-text-secondary">All $KPAD holders can participate in platform governance, ensuring alignment with community interests.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <MessageCircle className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold gradient-text">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">How is KaspaPad different from other launchpads?</h3>
                <p className="text-text-secondary">KaspaPad is specifically designed for the Kaspa network, leveraging its unique inscription system and efficient architecture to provide transparent, traceable decentralized fundraising solutions.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">How can I participate in KaspaPad IDOs?</h3>
                <p className="text-text-secondary">Users can stake $KPAD tokens to obtain Vault tier status, gaining priority access and exclusive incentives for IDO participation.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Does KaspaPad support cross-chain functionality?</h3>
                <p className="text-text-secondary">Cross-chain support is planned for Q3-Q4 2025, enabling interoperability with other blockchain projects joining the Kaspa ecosystem.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">What are the uses of $KPAD token?</h3>
                <p className="text-text-secondary">$KPAD is used for project participation, platform governance, staking rewards, and fee payments. Staking $KPAD increases user tier levels for higher rewards and participation eligibility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;