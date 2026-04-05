/**
 * ==============================================
 * SECURE AUTH + XSS SIMULATOR — Express Server
 * ==============================================
 * 
 * BCA Final Year Cybersecurity Project
 * 
 * This is the main server file that:
 * 1. Loads environment variables
 * 2. Connects to MongoDB Atlas
 * 3. Sets up CORS for frontend communication
 * 4. Mounts API routes
 * 5. Handles errors globally
 * 
 * SECURITY CONCEPTS DEMONSTRATED:
 * - CORS: Controls which origins can access our API
 * - Environment Variables: Keeps secrets out of source code
 * - Error Handling: Prevents leaking server details to attackers
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// ==========================================
// MIDDLEWARE SETUP
// ==========================================

/**
 * CORS (Cross-Origin Resource Sharing)
 * 
 * SECURITY: CORS controls which websites can make requests to our API.
 * Without CORS, any website could make requests to our server.
 * We only allow requests from our frontend URL (CLIENT_URL in .env).
 */
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies (allows us to read req.body)
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// ==========================================
// API ROUTES
// ==========================================

// Mount authentication routes
app.use('/api/auth', require('./routes/authRoutes'));

// Mount dashboard routes
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Root route - API health check
app.get('/api', (req, res) => {
  res.json({
    message: '🔐 Secure Auth + XSS Simulator API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard'
    }
  });
});

// ==========================================
// ERROR HANDLING
// ==========================================

/**
 * 404 Handler - Route not found
 * SECURITY: Don't reveal server structure in error messages
 */
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

/**
 * Global Error Handler
 * SECURITY: In production, we don't send stack traces to the client.
 * Stack traces can reveal file paths and code structure to attackers.
 */
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    // Only show error details in development mode
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
  });
});
