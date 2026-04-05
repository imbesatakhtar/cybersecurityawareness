const express = require('express');
const { getStats, getLogs, getTips } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, getStats);

router.get('/logs', protect, getLogs);

router.get('/tips', protect, getTips);

module.exports = router;
