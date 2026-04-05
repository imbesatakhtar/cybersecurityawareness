/**
 * Auth Controller - Handles Registration, Login, and Profile
 * 
 * SECURITY CONCEPTS:
 * 1. Input Validation: We validate user input before processing
 *    to prevent malformed data and potential injection attacks.
 * 
 * 2. JWT Token Generation: After successful auth, we generate a
 *    signed JWT token that the client stores and sends with requests.
 * 
 * 3. Error-Safe Responses: We use generic error messages to prevent
 *    information leakage (e.g., not saying "email exists" vs "wrong password").
 */

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * Generate JWT Token
 * 
 * SECURITY: The token contains only the user's ID (not sensitive data).
 * It's signed with our secret key and expires based on JWT_EXPIRE setting.
 * The client must send this token with every protected request.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'An account with this email already exists'
      });
    }

    // Create new user (password is hashed automatically by the pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'  // Default to 'user' role
    });

    // Generate JWT token for immediate login after registration
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc    Login user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user and explicitly include the password field
    // (it's excluded by default in our schema for security)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      // SECURITY: Generic message - don't reveal if email exists or not
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with hashed password in database
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      // SECURITY: Same generic message for wrong password
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private (requires JWT token)
 */
const getProfile = async (req, res) => {
  try {
    // req.user is set by the protect middleware after token verification
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Profile Error:', error.message);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

module.exports = { register, login, getProfile };
