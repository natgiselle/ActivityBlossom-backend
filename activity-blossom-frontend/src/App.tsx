import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Container } from 'semantic-ui-react';
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
        <ScrollToTop />
        <Container fluid>
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
  children: ReactNode;
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
  children: ReactNode;
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
