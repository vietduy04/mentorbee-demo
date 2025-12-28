import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authSlice';
import { useProfileStore } from '../store/profileSlice';
import { TopBar } from '../components/common/TopBar';
import { BottomTabBar } from '../components/common/BottomTabBar';
import { Button } from '../components/common/Button';
import { InterestChip } from '../components/common/InterestChip';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, currentRole, switchRole } = useAuthStore();
  const { getActiveProfile } = useProfileStore();
  const [isEditMode, setIsEditMode] = useState(false);

  const profile = getActiveProfile(currentRole);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleRoleToggle = (newRole: 'mentor' | 'mentee') => {
    switchRole(newRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar
        title="Profile"
        rightAction={
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        }
      />

      <div className="px-6 py-6 space-y-6">
        {/* Role Toggle */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleRoleToggle('mentee')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                currentRole === 'mentee'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mentee
            </button>
            <button
              onClick={() => handleRoleToggle('mentor')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                currentRole === 'mentor'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mentor
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={profile?.images[0] || 'https://i.pravatar.cc/300?img=50'}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isEditMode && (
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">
            {user.year}{user.year === 1 ? 'st' : user.year === 2 ? 'nd' : user.year === 3 ? 'rd' : 'th'} Year
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {user.university} · {user.major}
          </p>
        </div>

        {/* About Me */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
          <p className="text-gray-700 text-sm">
            {profile?.bio || 'No bio yet. Tell others about yourself!'}
          </p>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile?.interests.length ? (
              profile.interests.map((interest) => (
                <InterestChip key={interest} label={interest} />
              ))
            ) : (
              <p className="text-sm text-gray-500">No interests added yet</p>
            )}
          </div>
        </div>

        {/* Badges */}
        {profile?.badges && profile.badges.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Achievements</h3>
            <div className="flex flex-wrap gap-3">
              {profile.badges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {isEditMode && (
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/profile/edit')}
              variant="primary"
              fullWidth
            >
              Edit Profile Details
            </Button>
            <Button
              onClick={() => setIsEditMode(false)}
              variant="secondary"
              fullWidth
            >
              Done
            </Button>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
};
