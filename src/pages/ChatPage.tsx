import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/chatSlice';
import { useMatchStore } from '../store/matchSlice';
import { TopBar } from '../components/common/TopBar';
import { Button } from '../components/common/Button';
import { generateAIResponse } from '../services/aiService';
import { mockProfiles } from '../services/mockData';

export const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { conversations, sendMessage, scheduleSession, endMentorship, setActiveChat } = useChatStore();
  const { recommendations } = useMatchStore();
  const [messageText, setMessageText] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.id === id);

  useEffect(() => {
    if (id) {
      setActiveChat(id);
    }
    return () => setActiveChat(null);
  }, [id, setActiveChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, []);

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Conversation not found</p>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (messageText.trim() && id) {
      const userMsg = messageText;
      sendMessage(id, userMsg);
      setMessageText('');
      
      // Get AI response
      setIsAITyping(true);
      
      // Find the partner's profile from recommendations or mock data
      let partnerProfile = recommendations.find(p => p.id === conversation.partnerId);
      
      // If not in recommendations, look in mockProfiles
      if (!partnerProfile) {
        partnerProfile = mockProfiles.find(p => p.id === conversation.partnerId);
      }
      
      if (partnerProfile) {
        try {
          // Simulate typing delay
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
          
          const aiResponse = await generateAIResponse(
            userMsg,
            partnerProfile,
            conversation.messages
          );
          
          sendMessage(id, aiResponse, conversation.partnerId);
        } catch (error) {
          console.error('Failed to get AI response:', error);
        }
      } else {
        console.warn('Partner profile not found:', conversation.partnerId);
      }
      
      setIsAITyping(false);
    }
  };

  const handleSchedule = () => {
    if (id && selectedDate && selectedTime) {
      const [year, month, day] = selectedDate.split('-').map(Number);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      
      const scheduledDateTime = new Date(year, month - 1, day, hours, minutes);
      scheduleSession(id, scheduledDateTime.toISOString());
      setShowScheduleModal(false);
    }
  };

  const handleEndMentorship = () => {
    if (id) {
      endMentorship(id);
      setShowEndModal(false);
      navigate('/review/' + conversation.partnerId);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar
        title={conversation.partnerName}
        showBack
        rightAction={
          <button
            onClick={() => setShowEndModal(true)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        }
      />

      {/* Scheduled Session Banner */}
      {conversation.scheduledSession && (
        <div className="bg-primary-50 border-b border-primary-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-primary-900">
                  Session {conversation.scheduledSession.confirmed ? 'Confirmed' : 'Pending'}
                </p>
                <p className="text-xs text-primary-700">
                  {new Date(conversation.scheduledSession.datetime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {conversation.messages.map((message) => {
          const isCurrentUser = message.senderId === 'current-user';
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  isCurrentUser
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-primary-100' : 'text-gray-500'
                  }`}
                >
                  {formatMessageTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        {isAITyping && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl px-4 py-2 bg-white text-gray-900 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className={`p-2 rounded-full transition-colors ${
              messageText.trim()
                ? 'bg-primary-600 hover:bg-primary-700'
                : 'bg-gray-300'
            }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule Session</h2>
            <p className="text-gray-600 mb-6">
              Choose a date and time for your mentoring session
            </p>
            
            {/* Date Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Time Picker */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Time slot suggestions */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-2">Quick select:</p>
              <div className="grid grid-cols-3 gap-2">
                {['09:00', '10:00', '14:00', '15:00', '16:00', '20:00'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      selectedTime === time
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleSchedule} variant="primary" fullWidth>
                Confirm Schedule
              </Button>
              <Button onClick={() => setShowScheduleModal(false)} variant="secondary" fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* End Mentorship Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">End Mentorship?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end this mentorship with {conversation.partnerName}? This will move the conversation to archived.
            </p>
            <div className="space-y-3">
              <Button onClick={handleEndMentorship} variant="danger" fullWidth>
                End Mentorship
              </Button>
              <Button onClick={() => setShowEndModal(false)} variant="secondary" fullWidth>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
