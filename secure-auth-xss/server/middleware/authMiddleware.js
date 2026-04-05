/**
 * Authentication Middleware - JWT Token Verification
 * 
 * SECURITY CONCEPTS:
 * 1. Bearer Token: The client sends the JWT in the Authorization header
 *    as "Bearer <token>". This is the industry standard for API auth.
 * 
 * 2. Token Verification: jwt.verify() checks if the token is valid
 *    and hasn't been tampered with using our secret key.
 * 
 * 3. Protected Routes: Any route using this middleware will require
 *    a valid JWT token to access. Without it, the request is rejected.
 * 
 * 4. Error-Safe Responses: We don't reveal specific error details
 *    to prevent attackers from gaining information about our system.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes - requires valid JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      // If the token is invalid or expired, this will throw an error
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user data to the request object (excluding password)
      // This makes user info available in the route handler
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continue to the next middleware/route handler
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // SECURITY: Generic error message - don't reveal why token failed
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Middleware to restrict access to admin users only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

module.exports = { protect, adminOnly };
