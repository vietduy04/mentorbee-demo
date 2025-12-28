import axios from 'axios';

// Create Axios instance with base configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions (mocked for MVP)
export const api = {
  // Auth
  login: async (email: string, password: string) => {
    // Mock implementation - replace with real API call
    return Promise.resolve({ token: 'mock-token', user: {} });
  },

  register: async (data: any) => {
    // Mock implementation
    return Promise.resolve({ token: 'mock-token', user: data });
  },

  // Profile
  getProfile: async (userId: string) => {
    // Mock implementation
    return Promise.resolve({});
  },

  updateProfile: async (userId: string, data: any) => {
    // Mock implementation
    return Promise.resolve(data);
  },

  // Discovery
  getRecommendations: async (category?: string) => {
    // Mock implementation
    return Promise.resolve([]);
  },

  swipe: async (profileId: string, action: 'like' | 'pass') => {
    // Mock implementation
    return Promise.resolve({ match: Math.random() > 0.7 });
  },

  // Chat
  getConversations: async () => {
    // Mock implementation
    return Promise.resolve([]);
  },

  sendMessage: async (conversationId: string, message: string) => {
    // Mock implementation
    return Promise.resolve({ id: Date.now(), message });
  },

  // Premium
  subscribe: async (plan: string) => {
    // Mock implementation
    return Promise.resolve({ success: true });
  },
};
