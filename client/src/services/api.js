/**
 * API Service - Axios Instance Configuration
 * 
 * This creates a pre-configured Axios instance that:
 * 1. Uses the backend base URL from environment variables
 * 2. Automatically attaches the JWT token to every request
 * 3. Handles authentication errors globally
 */

import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request Interceptor
 * 
 * SECURITY: Before every request, we check if there's a JWT token
 * stored in localStorage and attach it to the Authorization header.
 * This way, protected API routes can verify the user's identity.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * 
 * SECURITY: If the server returns a 401 (Unauthorized) error,
 * it means the token is invalid or expired. We automatically
 * clear the stored data and redirect to the login page.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page (only if not already there)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
