import React from 'react';
import { useAuthStore } from '../store/authSlice';
import { TopBar } from '../components/common/TopBar';
import { BottomTabBar } from '../components/common/BottomTabBar';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const PremiumPage: React.FC = () => {
  const { user, setUser } = useAuthStore();

  const handleUpgrade = (plan: 'plus' | 'pro') => {
    if (user) {
      setUser({ ...user, isPremium: true });
    }
  };

  if (user?.isPremium) {
    // Premium Stats View
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <TopBar title="Your Stats" />

        <div className="px-6 py-6 space-y-6">
          {/* Stats Cards */}
          <Card className="bg-gradient-to-r from-primary-500 to-primary-700 text-white">
            <div className="text-center py-4">
              <h2 className="text-4xl font-bold mb-2">🏆</h2>
              <p className="text-lg font-bold mb-1">Premium Member</p>
              <p className="text-primary-100 text-sm">You're in the top 10% of users!</p>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 mb-1">12</p>
                <p className="text-sm text-gray-600">Total Matches</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 mb-1">5</p>
                <p className="text-sm text-gray-600">Active Mentorships</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 mb-1">87</p>
                <p className="text-sm text-gray-600">Messages Sent</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 mb-1">4.8</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">This Week's Top Mentors</h3>
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Alex Chen', points: 1250, avatar: 'https://i.pravatar.cc/300?img=15' },
                { rank: 2, name: 'Maria Garcia', points: 1180, avatar: 'https://i.pravatar.cc/300?img=20' },
                { rank: 3, name: 'James Wilson', points: 1050, avatar: 'https://i.pravatar.cc/300?img=12' },
                { rank: 4, name: 'You', points: 980, avatar: 'https://i.pravatar.cc/300?img=50', isUser: true },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    entry.isUser ? 'bg-primary-50' : ''
                  }`}
                >
                  <span className="font-bold text-gray-500 w-6">#{entry.rank}</span>
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${entry.isUser ? 'text-primary-600' : 'text-gray-900'}`}>
                      {entry.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{entry.points} pts</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Your Achievements</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: '🎓', label: 'First Match' },
                { icon: '💬', label: '10 Messages' },
                { icon: '⭐', label: '5-Star Rating' },
                { icon: '🔥', label: '7 Day Streak' },
              ].map((achievement, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mb-1">
                    {achievement.icon}
                  </div>
                  <p className="text-xs text-gray-600 text-center">{achievement.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <BottomTabBar />
      </div>
    );
  }

  // Premium Upsell View
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Go Premium" />

      <div className="px-6 py-6 space-y-6">
        {/* Hero */}
        <Card className="bg-gradient-to-r from-primary-500 to-primary-700 text-white">
          <div className="text-center py-6">
            <h2 className="text-3xl font-bold mb-2">⭐ MentorBee Premium</h2>
            <p className="text-primary-100">Unlock exclusive features and insights</p>
          </div>
        </Card>

        {/* Features */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Premium Features</h3>
          <div className="space-y-3">
            {[
              { icon: '📊', title: 'Detailed Analytics', desc: 'Track your growth and engagement' },
              { icon: '🏆', title: 'Leaderboards', desc: 'See how you rank among peers' },
              { icon: '⚡', title: 'Priority Matching', desc: 'Get matched faster with top mentors' },
              { icon: '🎯', title: 'Advanced Filters', desc: 'Find exactly who you\'re looking for' },
              { icon: '✨', title: 'Unlimited Swipes', desc: 'No daily limits on discovery' },
              { icon: '🔔', title: 'Smart Notifications', desc: 'Never miss an important message' },
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pricing */}
        <div className="space-y-3">
          <Card className="border-2 border-primary-600">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">MentorBee Pro</h4>
                <p className="text-sm text-gray-600">Best Value</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary-600">$9.99</p>
                <p className="text-sm text-gray-600">/month</p>
              </div>
            </div>
            <Button onClick={() => handleUpgrade('pro')} variant="primary" fullWidth>
              Upgrade to Pro
            </Button>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">MentorBee Plus</h4>
                <p className="text-sm text-gray-600">Essential Features</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary-600">$4.99</p>
                <p className="text-sm text-gray-600">/month</p>
              </div>
            </div>
            <Button onClick={() => handleUpgrade('plus')} variant="outline" fullWidth>
              Upgrade to Plus
            </Button>
          </Card>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Cancel anytime. No commitments. Premium features available on all platforms.
        </p>
      </div>

      <BottomTabBar />
    </div>
  );
};
