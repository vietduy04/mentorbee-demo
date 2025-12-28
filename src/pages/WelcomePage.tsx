import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-8">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-5xl">🐝</span>
          </div>
        </div>

        {/* App Name */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">MentorBee</h1>
          <p className="text-lg text-primary-100">Connect & Grow Together</p>
        </div>

        {/* Description */}
        <p className="text-white text-opacity-90 max-w-sm">
          Find your perfect mentor or mentee match. Build meaningful connections with students who share your interests.
        </p>

        {/* Actions */}
        <div className="space-y-4 pt-8">
          <Button
            onClick={() => navigate('/onboarding/role')}
            variant="secondary"
            size="lg"
            fullWidth
            className="!bg-white !text-primary-600 hover:!bg-gray-100"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            size="lg"
            fullWidth
            className="border-white text-white hover:bg-white hover:bg-opacity-10"
          >
            I Have an Account
          </Button>
        </div>
      </div>
    </div>
  );
};
