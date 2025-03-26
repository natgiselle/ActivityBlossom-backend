import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import AvatarSelection from './pages/AvatarSelection';

// Create HTTP link
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

// Add authentication to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} to="/" content="Activity Blossom" />
        <Menu.Item as={Link} to="/tasks" content="Tasks" />
        <Menu.Item as={Link} to="/settings" content="Settings" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Button inverted onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navigation />
        <Container style={{ marginTop: '4em' }}>
          <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/avatar-selection" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/avatar-selection" />} />
            <Route path="/avatar-selection" element={token ? <AvatarSelection /> : <Navigate to="/login" />} />
            <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
            <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
