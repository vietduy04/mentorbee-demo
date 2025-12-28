import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '../store/matchSlice';
import { TopBar } from '../components/common/TopBar';
import { BottomTabBar } from '../components/common/BottomTabBar';
import { Card } from '../components/common/Card';

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, fetchRecommendations } = useMatchStore();

  const handleCategorySelect = async (categoryId: string) => {
    await fetchRecommendations(categoryId);
    navigate('/discover/swipe');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Discover" />

      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Match</h2>
        <p className="text-gray-600 mb-6">
          Choose a category to start discovering mentors and mentees
        </p>

        {/* For You Card */}
        <Card
          onClick={() => handleCategorySelect('for-you')}
          className="mb-4 bg-gradient-to-r from-primary-500 to-primary-700"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">✨</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">For You</h3>
              <p className="text-sm text-primary-100">
                Personalized recommendations based on your interests
              </p>
            </div>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Card>

        {/* Categories Grid */}
        <h3 className="font-bold text-gray-900 mb-3">Browse by Category</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories
            .filter((cat) => cat.id !== 'for-you')
            .map((category) => (
              <Card
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="hover:bg-primary-50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    {category.name}
                  </h4>
                </div>
              </Card>
            ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
};
