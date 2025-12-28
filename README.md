# MentorBee MVP Frontend

A university mentorship matching platform connecting students as mentors and mentees.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Axios** for API calls (mocked for MVP)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Shared components (Button, Input, etc.)
│   ├── onboarding/  # Onboarding flow components
│   ├── profile/     # Profile view/edit components
│   ├── discover/    # Swipe and discovery components
│   ├── chat/        # Messaging components
│   └── premium/     # Premium/stats components
├── pages/           # Route pages
├── store/           # Zustand state management
├── services/        # API and mock data
├── assets/          # Static assets and data
├── App.tsx          # Main app component with routing
└── main.tsx         # Entry point
```

## Features

- 🎯 **Onboarding Flow**: Role selection, interests, profile creation
- 👤 **Dual Profiles**: Switch between Mentor and Mentee modes
- 💫 **Swipe Matching**: Tinder-style discovery by category
- 💬 **In-App Chat**: Messaging with session scheduling
- 📊 **Premium Features**: Stats dashboard and gamification
- 📱 **Mobile-First**: Optimized for mobile viewport

## MVP Notes

This is a frontend-only prototype with mocked API responses for demonstration purposes. Backend integration will be added in future iterations.
