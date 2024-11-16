import React from 'react';
import { useParams } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import ProjectDetails from '../components/ProjectDetails';

const mockProject = {
  name: 'KasPad',
  description: 'KasPad is the premier IDO launchpad built on the Kaspa blockchain, designed to provide secure and efficient fundraising solutions for projects and investors. By leveraging Kaspa\'s high performance and low-cost characteristics, KasPad simplifies the project launch process within the Kaspa ecosystem.',
  image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&q=80&w=2000&h=500',
  logo: <Rocket className="w-24 h-24 text-white" />,
  progress: 0,
  target: '1,000,000 KAS',
  startTime: '2025-01-01 14:00 UTC',
  endTime: '2025-01-08 14:00 UTC',
  status: 'Upcoming',
  totalRaised: '0 KAS',
  participants: 0,
  minAllocation: '100 KAS',
  maxAllocation: '3,000 KAS',
  tokenPrice: '0.0167 KAS',
  tokenSymbol: 'KPAD',
  totalSupply: '100,000,000 KPAD',
  website: 'https://kaspad.app',
  twitter: 'https://x.com/kaspadapp',
  telegram: 'https://t.me/kaspad_apps',
  distribution: [
    { label: 'Public Sale', percentage: 60 },
    { label: 'Liquidity', percentage: 20 },
    { label: 'Team', percentage: 15 },
    { label: 'Marketing', percentage: 5 }
  ],
  schedule: [
    {
      phase: 'Sale Starts',
      date: 'Jan 1, 2025',
      description: 'Public sale begins - No whitelist required'
    },
    {
      phase: 'Sale Ends',
      date: 'Jan 8, 2025',
      description: 'Token sale concludes'
    },
    {
      phase: 'Token Distribution',
      date: 'Jan 10, 2025',
      description: 'Tokens are distributed to participants'
    },
    {
      phase: 'Liquidity Added',
      date: 'Jan 12, 2025',
      description: 'Liquidity added'
    }
  ]
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  return <ProjectDetails project={mockProject} />;
};

export default ProjectDetailsPage;