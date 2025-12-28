export interface User {
  id: string;
  email: string;
  name: string;
  university: string;
  major: string;
  year: number;
  role: 'mentor' | 'mentee';
  activeRole: 'mentor' | 'mentee';
  isPremium: boolean;
}

export interface Profile {
  userId: string;
  role: 'mentor' | 'mentee';
  bio: string;
  interests: string[];
  images: string[];
  badges: string[];
  posts: Post[];
}

export interface Post {
  id: string;
  date: string;
  content: string;
  images: string[];
  taggedUsers?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface DiscoverProfile {
  id: string;
  name: string;
  university: string;
  major: string;
  year: number;
  role: 'mentor' | 'mentee';
  bio: string;
  interests: string[];
  images: string[];
  category: string;
  willMatch?: boolean;
}

export interface Match {
  id: string;
  profile: DiscoverProfile;
  matchedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ScheduledSession {
  id: string;
  datetime: string;
  confirmed: boolean;
}

export interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerRole: 'mentor' | 'mentee';
  partnerImage: string;
  category: string;
  messages: Message[];
  scheduledSession?: ScheduledSession;
  hasUnread: boolean;
  isArchived: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
