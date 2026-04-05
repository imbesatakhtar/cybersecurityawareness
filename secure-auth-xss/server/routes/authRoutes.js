/**
 * Authentication Routes
 * 
 * These routes handle user registration, login, and profile access.
 * We use express-validator to validate input data before it reaches
 * the controller, adding an extra layer of security.
 */

const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    // Input validation rules
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password is required').notEmpty()
  ],
  login
);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private (requires JWT token)
router.get('/profile', protect, getProfile);

module.exports = router;
