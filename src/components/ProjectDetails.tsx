import React from 'react';
import { Calendar, Target, Users, Clock, Globe, MessageCircle, Twitter, Rocket } from 'lucide-react';

interface ProjectDetailsProps {
  project: {
    name: string;
    description: string;
    image: string;
    logo?: React.ReactNode;
    progress: number;
    target: string;
    startTime: string;
    endTime: string;
    status: string;
    totalRaised: string;
    participants: number;
    minAllocation: string;
    maxAllocation: string;
    tokenPrice: string;
    tokenSymbol: string;
    totalSupply: string;
    website: string;
    twitter: string;
    telegram: string;
    distribution: {
      label: string;
      percentage: number;
    }[];
    schedule: {
      phase: string;
      date: string;
      description: string;
    }[];
  };
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Project Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="card">
            <div className="relative">
              <div 
                className="w-full h-64 rounded-lg mb-6 bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80 flex items-center justify-center">
                  <Rocket className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-4">{project.name}</h1>
            <p className="text-text-secondary mb-6">{project.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">Total Raise</p>
                  <p className="font-semibold text-text-primary">{project.target}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">Token Price</p>
                  <p className="font-semibold text-text-primary">{project.tokenPrice}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">Participants</p>
                  <p className="font-semibold text-text-primary">{project.participants}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={project.website} target="_blank" rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                <Globe className="w-4 h-4" /> Website
              </a>
              <a href={project.twitter} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" /> Twitter
              </a>
              <a href={project.telegram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4" /> Telegram
              </a>
            </div>
          </div>

          {/* Token Distribution */}
          <div className="card">
            <h2 className="text-xl font-bold gradient-text mb-4">Token Distribution</h2>
            <div className="space-y-6">
              {project.distribution.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="text-primary font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="relative w-full h-3 bg-background/50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-dark animate-pulse-slow"
                      style={{ width: `${item.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
                      <div className="h-full w-full bg-gradient-to-b from-white/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="card">
            <h2 className="text-xl font-bold gradient-text mb-4">Launch Schedule</h2>
            <div className="space-y-6">
              {project.schedule.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="sm:w-24 text-sm text-primary font-medium">{item.date}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-text-primary mb-1">{item.phase}</div>
                    <div className="text-sm text-text-secondary">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Participation Info */}
        <div className="space-y-8">
          <div className="card sticky top-24">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Progress</span>
                <span className="text-primary font-semibold">{project.progress}%</span>
              </div>
              <div className="relative w-full h-3 bg-background/50 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-dark animate-pulse-slow"
                  style={{ width: `${project.progress}%` }}
                >
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
                  <div className="h-full w-full bg-gradient-to-b from-white/20 to-transparent"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-text-secondary mt-2">
                <span>{project.totalRaised}</span>
                <span>{project.target}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-text-secondary">Sale Start Time</p>
                <p className="font-semibold text-text-primary">{project.startTime}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Sale End Time</p>
                <p className="font-semibold text-text-primary">{project.endTime}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Min Allocation</p>
                <p className="font-semibold text-text-primary">{project.minAllocation}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Max Allocation</p>
                <p className="font-semibold text-text-primary">{project.maxAllocation}</p>
              </div>
            </div>

            <button className="btn-primary w-full mb-4">
              Participate Now
            </button>
            
            <p className="text-xs text-center text-text-secondary">
              Please make sure you meet the minimum tier requirements before participating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;