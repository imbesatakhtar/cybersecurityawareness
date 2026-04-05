/**
 * Protected Route Component
 * 
 * SECURITY CONCEPT: Client-side route protection
 * 
 * This component wraps routes that require authentication.
 * If the user doesn't have a valid JWT token, they are
 * redirected to the login page.
 * 
 * NOTE: This is CLIENT-SIDE protection only. The actual security
 * is enforced by the backend middleware that verifies JWT tokens.
 * Client-side route protection just improves user experience.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to login, but save where they were trying to go
    // so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
