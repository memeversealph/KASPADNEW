import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SubmissionConfirmation = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <div className="card text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 p-4 rounded-2xl">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-4">Application Submitted</h1>
        <p className="text-text-secondary text-lg mb-8">
          Your IDO application has been successfully submitted and is now under review. We'll notify you once there's an update.
        </p>
        <Link to="/dapp" className="btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;