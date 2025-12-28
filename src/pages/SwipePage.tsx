import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '../store/matchSlice';
import { useChatStore } from '../store/chatSlice';
import { useAuthStore } from '../store/authSlice';
import { TopBar } from '../components/common/TopBar';
import { Button } from '../components/common/Button';
import { DiscoverProfile, Conversation, Message } from '../types';

export const SwipePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentRole } = useAuthStore();
  const { recommendations, currentIndex, swipeRight, swipeLeft } = useMatchStore();
  const { addConversation } = useChatStore();
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<DiscoverProfile | null>(null);
  
  // Swipe animation states
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentProfile = recommendations[currentIndex];

  useEffect(() => {
    if (!recommendations.length) {
      navigate('/discover');
    }
  }, [recommendations, navigate]);

  const animateSwipe = (direction: 'left' | 'right') => {
    setIsAnimating(true);
    const targetX = direction === 'right' ? window.innerWidth : -window.innerWidth;
    setDragOffset({ x: targetX, y: 0 });

    setTimeout(() => {
      if (direction === 'right') {
        handleLike();
      } else {
        handlePass();
      }
      setDragOffset({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 300);
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    if (isAnimating) return;
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging || !dragStart || isAnimating) return;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    setDragStart(null);

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      animateSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleLike = () => {
    if (!currentProfile) return;

    const isMatch = swipeRight(currentProfile);

    if (isMatch) {
      // Create new conversation
      const newConversation: Conversation = {
        id: Date.now().toString(),
        partnerId: currentProfile.id,
        partnerName: currentProfile.name,
        partnerRole: currentProfile.role,
        partnerImage: currentProfile.images[0],
        category: currentProfile.category,
        messages: [],
        hasUnread: false,
        isArchived: false,
      };

      addConversation(newConversation);
      setMatchedProfile(currentProfile);
      setShowMatchModal(true);
    }
  };

  const handlePass = () => {
    if (!currentProfile || isAnimating) return;
    swipeLeft(currentProfile);
  };

  const handleButtonLike = () => {
    if (isAnimating) return;
    animateSwipe('right');
  };

  const handleButtonPass = () => {
    if (isAnimating) return;
    animateSwipe('left');
  };

  const handleCloseModal = () => {
    setShowMatchModal(false);
    setMatchedProfile(null);
  };

  const handleSendMessage = () => {
    if (matchedProfile) {
      const conversation = recommendations.find(p => p.id === matchedProfile.id);
      navigate(`/messages/${Date.now()}`);
      handleCloseModal();
    }
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TopBar title="Discovery" showBack />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No More Profiles
            </h2>
            <p className="text-gray-600 mb-6">
              You've seen everyone in this category. Try exploring other categories!
            </p>
            <Button onClick={() => navigate('/discover')} variant="primary">
              Back to Categories
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar title="Discovery" showBack />

      {/* Profile Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-6">
        <div className="w-full max-w-md relative">
          {/* Stack effect - show cards behind */}
          {recommendations[currentIndex + 1] && (
            <div className="absolute inset-0 transform scale-95 opacity-50">
              <img
                src={recommendations[currentIndex + 1].images[0]}
                alt="Next"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          )}
          
          {/* Main draggable card */}
          <div
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            style={{
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
              transition: isDragging ? 'none' : isAnimating ? 'transform 0.3s ease-out' : 'transform 0.3s ease-out',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            className="relative select-none touch-none"
          >
            {/* Like/Nope overlay */}
            {dragOffset.x > 30 && (
              <div className="absolute top-8 left-8 z-10">
                <div className="px-4 py-2 border-4 border-green-500 text-green-500 font-bold text-2xl rounded-lg transform rotate-12">
                  LIKE
                </div>
              </div>
            )}
            {dragOffset.x < -30 && (
              <div className="absolute top-8 right-8 z-10">
                <div className="px-4 py-2 border-4 border-red-500 text-red-500 font-bold text-2xl rounded-lg transform -rotate-12">
                  NOPE
                </div>
              </div>
            )}
            
            {/* Image */}
            <div className="relative mb-4">
              <img
                src={currentProfile.images[0]}
                alt={currentProfile.name}
                className="w-full h-96 object-cover rounded-2xl shadow-xl pointer-events-none"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-2xl">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {currentProfile.name}, {currentProfile.year}
                </h2>
                <p className="text-white text-sm opacity-90">
                  {currentProfile.university}
                </p>
                <p className="text-white text-sm opacity-90">
                  {currentProfile.major}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-lg p-4 shadow-md mb-4">
              <p className="text-gray-700 text-sm mb-3">{currentProfile.bio}</p>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.slice(0, 4).map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={handleButtonPass}
              disabled={isAnimating}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
            >
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={handleButtonLike}
              disabled={isAnimating}
              className="w-20 h-20 bg-primary-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
            >
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          <p className="text-center text-sm text-gray-500 mt-4">
            {currentIndex + 1} / {recommendations.length}
          </p>
        </div>
      </div>

      {/* Match Modal */}
      {showMatchModal && matchedProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">It's a Match!</h2>
            <p className="text-gray-600 mb-6">
              You and {matchedProfile.name} have matched!
            </p>
            <div className="space-y-3">
              <Button onClick={handleSendMessage} variant="primary" fullWidth>
                Send a Message
              </Button>
              <Button onClick={handleCloseModal} variant="secondary" fullWidth>
                Keep Browsing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
