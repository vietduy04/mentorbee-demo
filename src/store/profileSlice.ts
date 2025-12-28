import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Profile } from '../types';

interface ProfileState {
  mentorProfile: Profile | null;
  menteeProfile: Profile | null;
}

interface ProfileActions {
  updateProfile: (role: 'mentor' | 'mentee', updates: Partial<Profile>) => void;
  addInterest: (role: 'mentor' | 'mentee', interest: string) => void;
  removeInterest: (role: 'mentor' | 'mentee', interest: string) => void;
  setProfile: (role: 'mentor' | 'mentee', profile: Profile) => void;
  getActiveProfile: (role: 'mentor' | 'mentee') => Profile | null;
}

type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>()(
  devtools((set, get) => ({
    // State
    mentorProfile: null,
    menteeProfile: null,

    // Actions
    updateProfile: (role, updates) => {
      set((state) => ({
        [`${role}Profile`]: state[`${role}Profile`]
          ? { ...state[`${role}Profile`], ...updates }
          : null,
      }));
    },

    addInterest: (role, interest) => {
      set((state) => {
        const profile = state[`${role}Profile`];
        if (!profile) return state;

        return {
          [`${role}Profile`]: {
            ...profile,
            interests: [...profile.interests, interest],
          },
        };
      });
    },

    removeInterest: (role, interest) => {
      set((state) => {
        const profile = state[`${role}Profile`];
        if (!profile) return state;

        return {
          [`${role}Profile`]: {
            ...profile,
            interests: profile.interests.filter((i) => i !== interest),
          },
        };
      });
    },

    setProfile: (role, profile) => {
      set({ [`${role}Profile`]: profile });
    },

    getActiveProfile: (role) => {
      const state = get();
      return state[`${role}Profile`];
    },
  }))
);
