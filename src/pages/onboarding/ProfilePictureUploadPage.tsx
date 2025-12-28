import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useProfileStore } from '../../store/profileSlice';
import { Profile } from '../../types';

export const ProfilePictureUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setProfile } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const role = location.state?.role;
  const interests = location.state?.interests || [];
  const formData = location.state?.formData || {};

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    // Create profile with uploaded image
    const profile: Profile = {
      userId: 'current-user',
      role: role,
      bio: formData.bio || '',
      interests: interests,
      images: [profileImage || 'https://i.pravatar.cc/300?img=50'],
      badges: [],
      posts: [],
    };

    setProfile(role, profile);
    navigate('/onboarding/success');
  };

  const handleSkip = () => {
    // Create profile with default image
    const profile: Profile = {
      userId: 'current-user',
      role: role,
      bio: formData.bio || '',
      interests: interests,
      images: ['https://i.pravatar.cc/300?img=50'],
      badges: [],
      posts: [],
    };

    setProfile(role, profile);
    navigate('/onboarding/success');
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
          <h1 className="ml-4 text-xl font-bold">Add Profile Picture</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl mb-4">📸</div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Add Your Photo
            </h2>
            <p className="text-gray-600">
              A profile picture helps others recognize you and builds trust
            </p>
          </div>

          {/* Image Preview */}
          <div className="flex justify-center my-8">
            <div className="relative">
              <img
                src={profileImage || 'https://i.pravatar.cc/300?img=50'}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            fullWidth
          >
            {profileImage ? 'Change Photo' : 'Upload Photo'}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 space-y-3">
        <Button
          onClick={handleContinue}
          variant="primary"
          size="lg"
          fullWidth
          disabled={!profileImage}
        >
          Continue
        </Button>
        <Button
          onClick={handleSkip}
          variant="secondary"
          size="lg"
          fullWidth
        >
          Skip for Now
        </Button>
      </div>
    </div>
  );
};
