# MentorBee MVP Frontend - Development Guide

## 🎯 Project Overview

MentorBee is a mobile-first university mentorship matching platform built with React, TypeScript, and Tailwind CSS. This is a fully functional MVP prototype with mocked backend data, ready for showcase and user testing.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will run on `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/common/     # Reusable UI components
│   ├── Button.tsx        # Primary, secondary, outline, danger variants
│   ├── Card.tsx          # Container component with hover effects
│   ├── Input.tsx         # Form input with validation
│   ├── TopBar.tsx        # Navigation header with back button
│   ├── BottomTabBar.tsx  # Bottom navigation (Profile, Discover, Chats, Premium)
│   └── InterestChip.tsx  # Selectable interest tags
│
├── pages/                # Route pages
│   ├── WelcomePage.tsx          # Landing page
│   ├── LoginPage.tsx            # Sign in
│   ├── ProfilePage.tsx          # User profile with role toggle
│   ├── DiscoverPage.tsx         # Category selection
│   ├── SwipePage.tsx            # Swipe matching interface
│   ├── MessagesPage.tsx         # Conversation inbox
│   ├── ChatPage.tsx             # Individual chat with scheduling
│   ├── ReviewPage.tsx           # Leave review after ending mentorship
│   ├── PremiumPage.tsx          # Premium upsell / Stats dashboard
│   └── onboarding/              # Multi-step onboarding
│       ├── RoleSelectorPage.tsx
│       ├── InterestsPage.tsx
│       ├── ProfileFormPage.tsx
│       └── OnboardingSuccessPage.tsx
│
├── store/                # Zustand state management
│   ├── authSlice.ts      # Authentication & user state
│   ├── profileSlice.ts   # Profile data (mentor/mentee)
│   ├── matchSlice.ts     # Discovery & matching logic
│   └── chatSlice.ts      # Messaging & conversations
│
├── services/             # API & data layer
│   ├── api.ts           # Axios configuration & API functions
│   └── mockData.ts      # Dummy profiles & conversations
│
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css            # Global styles & Tailwind imports
```

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client (configured for future backend)

## 🔑 Key Features Implemented

### 1. Authentication & Onboarding
- Welcome screen with Get Started flow
- Role selection (Mentor/Mentee)
- Multi-interest selection (minimum 3 required)
- Profile creation form with validation
- Success screen with auto-redirect

### 2. Profile Management
- View profile with role toggle (Mentor ↔ Mentee)
- Display user info, interests, badges, posts
- Edit mode toggle
- Profile images support
- Achievements display

### 3. Discovery & Matching
- Category-based browsing (11 categories + "For You")
- Swipe interface with Like/Pass actions
- Match detection with celebration modal
- Real-time conversation creation on match
- Progress indicator (X/Y profiles)

### 4. Messaging System
- Conversation inbox (Active/Archived tabs)
- Real-time chat interface
- Session scheduling feature
- Auto-reply simulation (for demo)
- End mentorship flow with confirmation
- Unread message indicators

### 5. Premium Features
- Non-premium: Upsell with feature list and pricing
- Premium: Stats dashboard with metrics
- Leaderboard display
- Achievement badges
- Automatic premium toggle (for testing)

### 6. Additional Features
- Protected routes (redirect to login if not authenticated)
- Persistent auth state (localStorage)
- Mobile-first responsive design
- Smooth animations and transitions
- Review/rating system after ending mentorship

## 🧩 State Management

### Auth Slice (`authSlice.ts`)
```typescript
- user: User | null
- isAuthenticated: boolean
- currentRole: 'mentor' | 'mentee'
- login(email, password)
- register(data)
- logout()
- switchRole(role)
```

### Profile Slice (`profileSlice.ts`)
```typescript
- mentorProfile: Profile | null
- menteeProfile: Profile | null
- updateProfile(role, updates)
- addInterest(role, interest)
- removeInterest(role, interest)
```

### Match Slice (`matchSlice.ts`)
```typescript
- categories: Category[]
- recommendations: DiscoverProfile[]
- currentIndex: number
- matches: Match[]
- fetchRecommendations(category)
- swipeRight(profile) -> creates match if willMatch=true
- swipeLeft(profile)
```

### Chat Slice (`chatSlice.ts`)
```typescript
- conversations: Conversation[]
- activeChatId: string | null
- sendMessage(chatId, text) -> auto-replies after 2s
- scheduleSession(chatId, datetime)
- endMentorship(chatId) -> archives conversation
- markAsRead(chatId)
```

## 🎭 Mock Data

Located in `src/services/mockData.ts`:

- **8 sample profiles** with different categories
- **2 pre-loaded conversations** with message history
- Realistic data: universities, majors, interests, bio
- Profile images from pravatar.cc
- `willMatch` property controls match simulation

## 🎯 User Flows

### Complete Onboarding Flow
1. Welcome → Get Started
2. Choose Role (Mentor/Mentee)
3. Select Interests (min 3)
4. Fill Profile Form
5. Success → Redirect to Discover

### Discovery & Matching Flow
1. Select Category or "For You"
2. Swipe through profiles (Like/Pass)
3. Match modal appears on mutual like
4. "Send Message" creates new conversation
5. Continue browsing or chat immediately

### Messaging Flow
1. View inbox (Active/Archived)
2. Open conversation
3. Send messages (auto-reply simulated)
4. Schedule session (tomorrow 10 AM)
5. End mentorship → Leave review
6. Conversation moves to Archived

### Premium Upgrade Flow
1. Visit Premium tab
2. View feature list
3. Choose plan (Plus/Pro)
4. Instant upgrade (for demo)
5. Premium tab becomes Stats dashboard

## 🎨 Design System

### Colors
- Primary: Indigo (`primary-500` to `primary-700`)
- Success: Green
- Danger: Red
- Gray scale for text and backgrounds

### Components
- Buttons: 4 variants (primary, secondary, outline, danger)
- Cards: White background, shadow, rounded corners
- Inputs: Border focus states with primary color ring
- Chips: Pill-shaped with selection states

### Typography
- System font stack
- Bold headings (text-xl to text-3xl)
- Body text (text-sm to text-base)
- Gray text for secondary info

## 🔧 Configuration Files

### Vite Config
- React plugin
- Path aliases (`@/*` → `./src/*`)
- Dev server on port 3000

### Tailwind Config
- Custom primary color palette (indigo)
- Mobile-first breakpoints
- Extended theme configuration

### TypeScript Config
- Strict mode enabled
- ES2020 target
- Path mapping for imports

## 🚦 Routing

```typescript
Public Routes:
  / → WelcomePage
  /login → LoginPage
  /onboarding/* → Onboarding flow

Protected Routes (requires auth):
  /profile → ProfilePage
  /discover → DiscoverPage
  /discover/swipe → SwipePage
  /messages → MessagesPage
  /messages/:id → ChatPage
  /review/:userId → ReviewPage
  /premium → PremiumPage
```

## 🧪 Testing the App

### Quick Test Scenarios

**1. Complete Onboarding**
- Start at `/`
- Click "Get Started"
- Select Mentee
- Choose 3+ interests
- Fill form and submit
- Should redirect to Discover

**2. Test Matching**
- Go to Discover
- Select "For You"
- Swipe right until match (2 profiles have `willMatch: true`)
- Match modal should appear
- New conversation should be created

**3. Test Messaging**
- Open Messages tab
- Select conversation
- Send message → receives auto-reply after 2s
- Schedule session → banner appears
- End mentorship → review screen

**4. Test Premium**
- Go to Premium tab
- Click "Upgrade to Pro"
- Tab should switch to Stats
- See leaderboard and achievements

**5. Test Role Switching**
- Go to Profile
- Toggle Mentor/Mentee
- Different profile data should display

## 🔄 Backend Integration (Future)

When backend is ready:

1. **Update API base URL** in `src/services/api.ts`
2. **Replace mock functions** with real API calls
3. **Remove mock data imports** from components
4. **Update Zustand actions** to call API instead of local state
5. **Add proper error handling** and loading states
6. **Implement real-time messaging** (WebSocket/Socket.io)

The app is structured to make this transition smooth - all API calls are centralized in the services layer.

## 📱 Mobile Optimization

- Viewport meta tag configured for mobile
- Touch-friendly button sizes (min 44x44px)
- Fixed bottom navigation bar
- Scroll behavior optimized
- No horizontal scroll
- Responsive image sizing

## 🎉 Demo Tips

- Use dummy email for quick login (any email works)
- Pre-loaded conversations show chat interface
- Swipe through 3-5 profiles to demo matching
- Toggle premium to show both views
- Role switch demonstrates dual profile feature

## 🐛 Known Limitations (MVP)

- No real backend connection
- Mock auto-replies only (not real-time)
- Match algorithm is random/predetermined
- No image upload (uses placeholder avatars)
- No email verification
- Scheduled sessions are static (not calendar integrated)
- Reviews are not persisted/displayed

## 📦 Production Deployment

```bash
# Build for production
npm run build

# Output in dist/ folder
# Deploy dist/ to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Any static hosting
```

## 🔐 Environment Variables

Create `.env` file for future backend:

```env
VITE_API_URL=http://localhost:8000/api
```

## 📄 License

This is an MVP prototype for showcase purposes.

---

**Built with ❤️ for MentorBee**
