/**
 * Database Configuration - MongoDB Atlas Connection
 * 
 * SECURITY CONCEPT: We use MongoDB Atlas (cloud database) so our data
 * is stored securely with encryption at rest and in transit.
 * The connection string is stored in environment variables (.env)
 * to prevent exposing credentials in source code.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  console.log(process.env.MONGO_URI)
  try {
    // Connect to MongoDB Atlas using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error and exit the process if connection fails
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
