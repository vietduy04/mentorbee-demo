import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { InterestChip } from '../../components/common/InterestChip';

const AVAILABLE_INTERESTS = [
  'Finance', 'Technology', 'Philosophy', 'Media', 'Law',
  'Business', 'Arts', 'Science', 'Health & Wellness', 'School Clubs',
  'Career Advice', 'Coding', 'Design', 'Marketing', 'Research',
  'Entrepreneurship', 'Public Speaking', 'Leadership', 'Writing', 'Sports',
];

export const InterestsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'mentee';
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleContinue = () => {
    navigate('/onboarding/profile', { state: { role, interests: selectedInterests } });
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
          <h1 className="ml-4 text-xl font-bold">Choose Your Interests</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <p className="text-gray-600 text-center mb-6">
          Select at least 3 areas you're interested in. This helps us match you with the right people.
        </p>

        <div className="flex flex-wrap gap-2 max-w-2xl mx-auto">
          {AVAILABLE_INTERESTS.map((interest) => (
            <InterestChip
              key={interest}
              label={interest}
              selected={selectedInterests.includes(interest)}
              onClick={() => toggleInterest(interest)}
            />
          ))}
        </div>

        {selectedInterests.length > 0 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 mb-2">
              Selected ({selectedInterests.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <InterestChip
                  key={interest}
                  label={interest}
                  selected
                  onRemove={() => toggleInterest(interest)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <Button
          onClick={handleContinue}
          variant="primary"
          size="lg"
          fullWidth
          disabled={selectedInterests.length < 3}
        >
          Continue ({selectedInterests.length}/3 minimum)
        </Button>
      </div>
    </div>
  );
};
