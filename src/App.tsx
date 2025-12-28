import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authSlice';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RoleSelectorPage } from './pages/onboarding/RoleSelectorPage';
import { InterestsPage } from './pages/onboarding/InterestsPage';
import { ProfilePictureUploadPage } from './pages/onboarding/ProfilePictureUploadPage';
import { ProfileFormPage } from './pages/onboarding/ProfileFormPage';
import { OnboardingSuccessPage } from './pages/onboarding/OnboardingSuccessPage';
import { ProfilePage } from './pages/ProfilePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { SwipePage } from './pages/SwipePage';
import { MessagesPage } from './pages/MessagesPage';
import { ChatPage } from './pages/ChatPage';
import { ReviewPage } from './pages/ReviewPage';
import { PremiumPage } from './pages/PremiumPage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding/role" element={<RoleSelectorPage />} />
        <Route path="/onboarding/interests" element={<InterestsPage />} />
        <Route path="/onboarding/picture" element={<ProfilePictureUploadPage />} />
        <Route path="/onboarding/profile" element={<ProfileFormPage />} />
        <Route path="/onboarding/success" element={<OnboardingSuccessPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <DiscoverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/discover/swipe"
          element={
            <ProtectedRoute>
              <SwipePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages/:id"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review/:userId"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/premium"
          element={
            <ProtectedRoute>
              <PremiumPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
