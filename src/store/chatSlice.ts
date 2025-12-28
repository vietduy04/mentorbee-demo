import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Conversation, Message, ScheduledSession } from '../types';
import { mockConversations } from '../services/mockData';

interface ChatState {
  conversations: Conversation[];
  activeChatId: string | null;
}

interface ChatActions {
  loadConversations: () => void;
  sendMessage: (chatId: string, text: string, senderId?: string) => void;
  scheduleSession: (chatId: string, datetime: string) => void;
  confirmSession: (chatId: string) => void;
  endMentorship: (chatId: string) => void;
  markAsRead: (chatId: string) => void;
  setActiveChat: (chatId: string | null) => void;
  addConversation: (conversation: Conversation) => void;
}

type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>()(
  devtools((set, get) => ({
    // State
    conversations: [],
    activeChatId: null,

    // Actions
    loadConversations: () => {
      // Load from mock data or localStorage
      set({ conversations: mockConversations });
    },

    sendMessage: (chatId, text, senderId = 'current-user') => {
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        senderId: senderId,
        text,
        timestamp: new Date().toISOString(),
      };

      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === chatId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: text,
                lastMessageTime: newMessage.timestamp,
              }
            : conv
        ),
      }));
    },

    scheduleSession: (chatId, datetime) => {
      const newSession: ScheduledSession = {
        id: Date.now().toString(),
        datetime,
        confirmed: false,
      };

      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === chatId
            ? { ...conv, scheduledSession: newSession }
            : conv
        ),
      }));
    },

    confirmSession: (chatId) => {
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === chatId && conv.scheduledSession
            ? {
                ...conv,
                scheduledSession: { ...conv.scheduledSession, confirmed: true },
              }
            : conv
        ),
      }));
    },

    endMentorship: (chatId) => {
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === chatId ? { ...conv, isArchived: true } : conv
        ),
      }));
    },

    markAsRead: (chatId) => {
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === chatId ? { ...conv, hasUnread: false } : conv
        ),
      }));
    },

    setActiveChat: (chatId) => {
      set({ activeChatId: chatId });
      if (chatId) {
        get().markAsRead(chatId);
      }
    },

    addConversation: (conversation) => {
      set((state) => ({
        conversations: [...state.conversations, conversation],
      }));
    },
  }))
);
