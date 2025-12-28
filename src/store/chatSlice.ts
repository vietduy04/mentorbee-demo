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
  sendMessage: (chatId: string, text: string) => void;
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

    sendMessage: (chatId, text) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'current-user',
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

      // Simulate partner reply after delay (for demo)
      setTimeout(() => {
        const replies = [
          'That sounds great!',
          'Thanks for your message!',
          'I appreciate your help!',
          'When would be a good time to meet?',
          'Looking forward to learning from you!',
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'partner',
          text: randomReply,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === chatId
              ? {
                  ...conv,
                  messages: [...conv.messages, replyMessage],
                  hasUnread: conv.id !== get().activeChatId,
                  lastMessage: randomReply,
                  lastMessageTime: replyMessage.timestamp,
                }
              : conv
          ),
        }));
      }, 2000);
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
