/**
 * Dashboard Routes
 * 
 * All dashboard routes are protected — they require a valid JWT token.
 * The 'protect' middleware verifies the token before allowing access.
 */

const express = require('express');
const { getStats, getLogs, getTips } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get security statistics
// @access  Private
router.get('/stats', protect, getStats);

// @route   GET /api/dashboard/logs
// @desc    Get login attempt logs
// @access  Private
router.get('/logs', protect, getLogs);

// @route   GET /api/dashboard/tips
// @desc    Get security tips
// @access  Private
router.get('/tips', protect, getTips);

module.exports = router;
