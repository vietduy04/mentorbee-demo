import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/authSlice';
import { useProfileStore } from '../../store/profileSlice';
import { Profile } from '../../types';

export const ProfileFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuthStore();
  const { setProfile } = useProfileStore();

  const role = location.state?.role || 'mentee';
  const interests = location.state?.interests || [];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    major: '',
    year: '1',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Register user
      await register({
        name: formData.name,
        email: formData.email,
        university: formData.university,
        major: formData.major,
        year: parseInt(formData.year),
        role: role,
      });

      // Create profile
      const profile: Profile = {
        userId: 'current-user',
        role: role,
        bio: formData.bio,
        interests: interests,
        images: ['https://i.pravatar.cc/300?img=50'],
        badges: [],
        posts: [],
      };

      setProfile(role, profile);

      // Show success and navigate
      navigate('/onboarding/success');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
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
          <h1 className="ml-4 text-xl font-bold">Create Your Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="John Doe"
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="john.doe@university.edu"
            required
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            placeholder="••••••••"
            required
          />

          <Input
            label="University"
            value={formData.university}
            onChange={(value) => setFormData({ ...formData, university: value })}
            placeholder="Example University"
            required
          />

          <Input
            label="Major"
            value={formData.major}
            onChange={(value) => setFormData({ ...formData, major: value })}
            placeholder="Computer Science"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year of Study <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="5">Graduate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About Me
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell others about yourself, your goals, and what you're passionate about..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
