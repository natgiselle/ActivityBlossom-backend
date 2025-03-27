import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Container, Image } from 'semantic-ui-react';
import client from './apolloClient';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AvatarSelection from './pages/AvatarSelection';
import Tasks from './pages/Tasks';
import Events from './pages/Events';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import TaskManagement from './pages/TaskManagement';

// Header component that shows user info
const UserHeader = () => {
  const [username, setUsername] = useState('');
  const [avatarColor, setAvatarColor] = useState('');
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // Function to update user info
  const updateUserInfo = () => {
    const savedUsername = localStorage.getItem('username');
    const savedAvatarColor = localStorage.getItem('userAvatarColor');
    if (savedUsername) setUsername(savedUsername);
    if (savedAvatarColor) setAvatarColor(savedAvatarColor);
  };

  // Initial load
  useEffect(() => {
    updateUserInfo();
  }, []);

  // Listen for storage changes and custom events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userAvatarColor') {
        setAvatarColor(e.newValue || '');
      }
      if (e.key === 'username') {
        setUsername(e.newValue || '');
      }
    };

    const handleAvatarColorChange = (e: CustomEvent) => {
      setAvatarColor(e.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('avatarColorChange', handleAvatarColorChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('avatarColorChange', handleAvatarColorChange as EventListener);
    };
  }, []);

  if (isLoginPage) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      padding: '1em',
      display: 'flex',
      alignItems: 'center',
      gap: '1em',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '0 0 0 1em',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontWeight: 'bold',
          color: '#666',
          fontSize: '1.1em',
          marginBottom: '0.5em'
        }}>
          {username}
        </div>
        <div style={{
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out'
        }}>
          <Image
            src="/bee-avatar.png"
            size="small"
            style={{
              backgroundColor: avatarColor,
              borderRadius: '50%',
              padding: '0.8em',
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              transition: 'all 0.3s ease-in-out'
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ScrollToTop component to handle route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <UserHeader />
        <ScrollToTop />
        <Container style={{ paddingTop: '4em' }}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Avatar Selection route - only requires token */}
            <Route
              path="/avatar-selection"
              element={
                <TokenProtectedRoute>
                  <AvatarSelection />
                </TokenProtectedRoute>
              }
            />

            {/* Protected routes - require both token and avatar */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task-management"
              element={
                <ProtectedRoute>
                  <TaskManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Default route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

// Protected Route component - requires both token and avatar
interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const avatarColor = localStorage.getItem('userAvatarColor');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!avatarColor) {
    return <Navigate to="/avatar-selection" replace />;
  }

  return <>{children}</>;
}

// Token Protected Route component - only requires token
interface TokenProtectedRouteProps {
  children: React.ReactNode;
}

function TokenProtectedRoute({ children }: TokenProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const avatarColor = localStorage.getItem('userAvatarColor');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If we already have an avatar color, redirect to home
  if (avatarColor) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export default App;
