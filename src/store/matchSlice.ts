import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Category, DiscoverProfile, Match } from '../types';
import { mockProfiles } from '../services/mockData';

interface MatchState {
  categories: Category[];
  selectedCategory: string | null;
  recommendations: DiscoverProfile[];
  currentIndex: number;
  matches: Match[];
  swipeHistory: Array<{ profile: DiscoverProfile; action: 'like' | 'pass' }>;
}

interface MatchActions {
  fetchRecommendations: (category?: string) => Promise<void>;
  swipeRight: (profile: DiscoverProfile) => void;
  swipeLeft: (profile: DiscoverProfile) => void;
  resetSwipes: () => void;
  setSelectedCategory: (category: string | null) => void;
}

type MatchStore = MatchState & MatchActions;

export const useMatchStore = create<MatchStore>()(
  devtools((set, get) => ({
    // State
    categories: [
      { id: 'for-you', name: 'For You', icon: '✨' },
      { id: 'school-clubs', name: 'School Clubs', icon: '🎓' },
      { id: 'finance', name: 'Finance', icon: '💰' },
      { id: 'philosophy', name: 'Philosophy', icon: '💭' },
      { id: 'media', name: 'Media', icon: '📱' },
      { id: 'law', name: 'Law', icon: '⚖️' },
      { id: 'technology', name: 'Technology', icon: '💻' },
      { id: 'arts', name: 'Arts', icon: '🎨' },
      { id: 'science', name: 'Science', icon: '🔬' },
      { id: 'business', name: 'Business', icon: '💼' },
      { id: 'health', name: 'Health & Wellness', icon: '🏥' },
    ],
    selectedCategory: null,
    recommendations: [],
    currentIndex: 0,
    matches: [],
    swipeHistory: [],

    // Actions
    fetchRecommendations: async (category) => {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      let profiles = [...mockProfiles];

      // Filter by category if specified
      if (category && category !== 'for-you') {
        profiles = profiles.filter((p) => p.category === category);
      }

      set({
        recommendations: profiles,
        currentIndex: 0,
        selectedCategory: category || 'for-you',
      });
    },

    swipeRight: (profile) => {
      const { currentIndex, recommendations, swipeHistory } = get();

      // Check if it's a match (for demo, randomly decide or check willMatch property)
      const isMatch = profile.willMatch || Math.random() > 0.7;

      if (isMatch) {
        const newMatch: Match = {
          id: Date.now().toString(),
          profile,
          matchedAt: new Date().toISOString(),
        };

        set((state) => ({
          matches: [...state.matches, newMatch],
        }));

        // Trigger match notification (handled by UI)
        return true;
      }

      set({
        currentIndex: currentIndex + 1,
        swipeHistory: [...swipeHistory, { profile, action: 'like' }],
      });

      return isMatch;
    },

    swipeLeft: (profile) => {
      const { currentIndex, swipeHistory } = get();

      set({
        currentIndex: currentIndex + 1,
        swipeHistory: [...swipeHistory, { profile, action: 'pass' }],
      });
    },

    resetSwipes: () => {
      set({
        currentIndex: 0,
        recommendations: [],
        selectedCategory: null,
      });
    },

    setSelectedCategory: (category) => {
      set({ selectedCategory: category });
    },
  }))
);
