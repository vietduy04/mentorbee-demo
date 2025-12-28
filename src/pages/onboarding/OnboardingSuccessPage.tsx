import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const OnboardingSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 3 seconds (optional)
    const timer = setTimeout(() => {
      navigate('/discover');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to MentorBee!</h1>
          <p className="text-lg text-primary-100">
            Your account has been created successfully
          </p>
        </div>

        <p className="text-white text-opacity-90 max-w-sm">
          Get ready to discover amazing mentors and mentees who share your interests!
        </p>

        {/* Action Button */}
        <div className="pt-8">
          <Button
            onClick={() => navigate('/discover')}
            variant="primary"
            size="lg"
            fullWidth
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            Start Exploring
          </Button>
        </div>

        <p className="text-sm text-white text-opacity-75">
          Redirecting in a moment...
        </p>
      </div>
    </div>
  );
};
