import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  currentRole: 'mentor' | 'mentee';
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  switchRole: (role: 'mentor' | 'mentee') => void;
  setUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        // State
        user: null,
        isAuthenticated: false,
        token: null,
        currentRole: 'mentee',

        // Actions
        login: async (email: string, password: string) => {
          // Mock login - simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          // For demo, accept any credentials
          const mockUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            university: 'Example University',
            major: 'Computer Science',
            year: 3,
            role: 'mentee',
            activeRole: 'mentee',
            isPremium: false,
          };

          const mockToken = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('token', mockToken);
          set({
            user: mockUser,
            isAuthenticated: true,
            token: mockToken,
            currentRole: mockUser.activeRole,
          });
        },

        register: async (data: Partial<User>) => {
          // Mock registration
          await new Promise((resolve) => setTimeout(resolve, 800));
          
          const newUser: User = {
            id: Date.now().toString(),
            email: data.email || '',
            name: data.name || '',
            university: data.university || '',
            major: data.major || '',
            year: data.year || 1,
            role: data.role || 'mentee',
            activeRole: data.role || 'mentee',
            isPremium: false,
          };

          const mockToken = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('token', mockToken);
          set({
            user: newUser,
            isAuthenticated: true,
            token: mockToken,
            currentRole: newUser.activeRole,
          });
        },

        logout: () => {
          localStorage.removeItem('token');
          set({
            user: null,
            isAuthenticated: false,
            token: null,
          });
        },

        switchRole: (role: 'mentor' | 'mentee') => {
          set((state) => ({
            currentRole: role,
            user: state.user ? { ...state.user, activeRole: role } : null,
          }));
        },

        setUser: (user: User) => {
          set({ user });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          token: state.token,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          currentRole: state.currentRole,
        }),
      }
    )
  )
);
