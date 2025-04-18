import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/home';
import Drills from './pages/drills';
import Practice from './pages/practice';
import Profile from './pages/profile';
import Tournaments from './pages/tournaments';
import Login from './pages/Login';
import Sidebar from './components/common/sidebar';
import { AuthProvider, useAuth } from './context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
    } else {
      // You might want to verify the token here
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div style={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar />
                  <main style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
                    <Container>
                      <Home />
                    </Container>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drills"
            element={
              <ProtectedRoute>
                <div style={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar />
                  <main style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
                    <Container>
                      <Drills />
                    </Container>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <div style={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar />
                  <main style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
                    <Container>
                      <Practice />
                    </Container>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div style={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar />
                  <main style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
                    <Container>
                      <Profile />
                    </Container>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tournaments"
            element={
              <ProtectedRoute>
                <div style={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar />
                  <main style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
                    <Container>
                      <Tournaments />
                    </Container>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
