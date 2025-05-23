// Alternative simpler App.js using Layout component
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardProvider } from './context/DashBoardContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardProvider>
              <Home />
            </DashboardProvider>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <DashboardProvider>
              <ProfilePage />
            </DashboardProvider>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/signin" 
        element={user ? <Navigate to="/" replace /> : <SignIn />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}