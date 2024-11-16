import React, { useState } from 'react';
import { Calendar, DollarSign, Users, Info } from 'lucide-react';
import { useIdoStore } from '../store/useIdoStore';
import { useNavigate } from 'react-router-dom';

const CreateIDO = () => {
  const navigate = useNavigate();
  const { addSubmission } = useIdoStore();
  const [formData, setFormData] = useState({
    projectName: '',
    tokenSymbol: '',
    tokenSupply: '',
    saleAmount: '',
    tokenPrice: '',
    minAllocation: '',
    maxAllocation: '',
    startDate: '',
    endDate: '',
    description: '',
    website: '',
    twitter: '',
    telegram: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addSubmission(formData);
      navigate('/dapp/submission-confirmation');
    } catch (error) {
      console.error('Error submitting IDO:', error);
      alert('Failed to submit IDO. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateUrl = (url: string) => {
    if (!url) return true; // Allow empty URLs
    try {
      new URL(url);
      return true;
    } catch {
      // If URL is not empty and doesn't start with http:// or https://, prepend https://
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
      }
      return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">Create IDO</h1>
        <p className="text-text-secondary">Launch your project on KasPad</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card">
          <h2 className="text-xl font-bold gradient-text mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                name="tokenSymbol"
                value={formData.tokenSymbol}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder="e.g., KPAD"
                required
              />
            </div>
          </div>
        </div>

        {/* Token Details */}
        <div className="card">
          <h2 className="text-xl font-bold gradient-text mb-6">Token Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Total Token Supply
              </label>
              <input
                type="number"
                name="tokenSupply"
                value={formData.tokenSupply}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder="Enter total supply"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Tokens for Sale
              </label>
              <input
                type="number"
                name="saleAmount"
                value={formData.saleAmount}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder="Enter sale amount"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Token Price (KAS)
              </label>
              <input
                type="number"
                name="tokenPrice"
                value={formData.tokenPrice}
                onChange={handleChange}
                className="input-primary w-full"
                placeholder="Enter token price"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Min/Max Allocation
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="minAllocation"
                  value={formData.minAllocation}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="Min"
                  required
                />
                <input
                  type="number"
                  name="maxAllocation"
                  value={formData.maxAllocation}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="Max"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sale Schedule */}
        <div className="card">
          <h2 className="text-xl font-bold gradient-text mb-6">Sale Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Start Date
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-primary w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                End Date
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-primary w-full"
                required
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="card">
          <h2 className="text-xl font-bold gradient-text mb-6">Project Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-primary w-full h-32 resize-none"
                placeholder="Enter project description"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => {
                    const validUrl = validateUrl(e.target.value);
                    if (validUrl === true || typeof validUrl === 'string') {
                      setFormData(prev => ({
                        ...prev,
                        website: typeof validUrl === 'string' ? validUrl : e.target.value
                      }));
                    }
                  }}
                  className="input-primary w-full"
                  placeholder="Enter website URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Twitter
                </label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={(e) => {
                    const validUrl = validateUrl(e.target.value);
                    if (validUrl === true || typeof validUrl === 'string') {
                      setFormData(prev => ({
                        ...prev,
                        twitter: typeof validUrl === 'string' ? validUrl : e.target.value
                      }));
                    }
                  }}
                  className="input-primary w-full"
                  placeholder="Enter Twitter URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Telegram
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={(e) => {
                    const validUrl = validateUrl(e.target.value);
                    if (validUrl === true || typeof validUrl === 'string') {
                      setFormData(prev => ({
                        ...prev,
                        telegram: typeof validUrl === 'string' ? validUrl : e.target.value
                      }));
                    }
                  }}
                  className="input-primary w-full"
                  placeholder="Enter Telegram URL"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="card bg-gradient-to-br from-primary/5 to-primary-dark/5">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-5 h-5 text-primary" />
            <p className="text-text-secondary">
              Please review all information carefully before submitting. Once submitted, some details cannot be modified.
            </p>
          </div>
          <button type="submit" className="btn-primary w-full">
            Create IDO
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIDO;