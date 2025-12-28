import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const RoleSelectorPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'mentor' | 'mentee' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      navigate('/onboarding/interests', { state: { role: selectedRole } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-bold">Choose Your Role</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <p className="text-gray-600 text-center mb-8">
          Select how you'd like to get started. You can add the other role later.
        </p>

        <div className="space-y-4 max-w-md mx-auto">
          <Card
            onClick={() => setSelectedRole('mentee')}
            className={`border-2 transition-all ${
              selectedRole === 'mentee'
                ? 'border-primary-600 bg-primary-50'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">I'm a Mentee</h3>
                <p className="text-sm text-gray-600">
                  Looking for guidance and mentorship from experienced students in areas I want to grow.
                </p>
              </div>
              {selectedRole === 'mentee' && (
                <div className="text-primary-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </Card>

          <Card
            onClick={() => setSelectedRole('mentor')}
            className={`border-2 transition-all ${
              selectedRole === 'mentor'
                ? 'border-primary-600 bg-primary-50'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">👨‍🏫</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">I'm a Mentor</h3>
                <p className="text-sm text-gray-600">
                  Ready to share my knowledge and experience to help other students succeed.
                </p>
              </div>
              {selectedRole === 'mentor' && (
                <div className="text-primary-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <Button
          onClick={handleContinue}
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedRole}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
