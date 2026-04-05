/**
 * App.jsx - Main Application Component
 * 
 * Sets up React Router with all routes:
 * - Public routes: Home, Login, Signup, XSS Simulator, Learn Security
 * - Protected routes: Dashboard (requires JWT token)
 * - 404 catch-all
 * 
 * Uses MainLayout for consistent navigation and page transitions.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import XSSSimulator from './pages/XSSSimulator';
import LearnSecurity from './pages/LearnSecurity';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes wrapped in MainLayout (Navbar + page transitions) */}
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/xss-simulator" element={<XSSSimulator />} />
          <Route path="/learn-security" element={<LearnSecurity />} />

          {/* Protected Routes (requires authentication) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
