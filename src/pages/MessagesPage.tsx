import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/chatSlice';
import { TopBar } from '../components/common/TopBar';
import { BottomTabBar } from '../components/common/BottomTabBar';
import { Card } from '../components/common/Card';

export const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { conversations, loadConversations } = useChatStore();
  const [filter, setFilter] = useState<'active' | 'archived'>('active');

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const filteredConversations = conversations.filter((conv) =>
    filter === 'active' ? !conv.isArchived : conv.isArchived
  );

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Messages" />

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              filter === 'active'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              filter === 'archived'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="px-6 py-4 space-y-3">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {filter === 'active' ? 'No Active Chats' : 'No Archived Chats'}
            </h3>
            <p className="text-gray-600">
              {filter === 'active'
                ? 'Start swiping to match and chat with mentors or mentees!'
                : 'Ended mentorships will appear here'}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <Card
              key={conversation.id}
              onClick={() => navigate(`/messages/${conversation.id}`)}
              className="hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={conversation.partnerImage}
                    alt={conversation.partnerName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conversation.hasUnread && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 truncate">
                      {conversation.partnerName}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {conversation.category} · {conversation.partnerRole}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage || 'No messages yet'}
                  </p>
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Scheduled Session Badge */}
              {conversation.scheduledSession && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-primary-600 font-medium">
                      Session {conversation.scheduledSession.confirmed ? 'confirmed' : 'pending'}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      <BottomTabBar />
    </div>
  );
};
