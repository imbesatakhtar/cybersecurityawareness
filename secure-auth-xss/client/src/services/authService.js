/**
 * Auth Service - Authentication Helper Functions
 * 
 * Centralizes all authentication-related API calls and
 * localStorage management for JWT tokens and user data.
 */

import api from './api';

/**
 * Register a new user
 * @param {Object} userData - { name, email, password, role }
 * @returns {Object} - { token, user }
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  if (response.data.token) {
    // Store token and user data in localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

/**
 * Login existing user
 * @param {Object} credentials - { email, password }
 * @returns {Object} - { token, user }
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

/**
 * Get current user profile from server
 * @returns {Object} - user data
 */
export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

/**
 * Logout - Clear stored authentication data
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists
};

/**
 * Get stored user data from localStorage
 * @returns {Object|null}
 */
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Get stored token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

export default {
  register,
  login,
  getProfile,
  logout,
  isAuthenticated,
  getStoredUser,
  getToken
};
