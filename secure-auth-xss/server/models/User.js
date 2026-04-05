/**
 * User Model - Mongoose Schema
 * 
 * SECURITY CONCEPTS:
 * 1. Password Hashing: We NEVER store passwords as plain text.
 *    Before saving, bcrypt hashes the password with a salt (10 rounds).
 *    This means even if the database is compromised, attackers can't
 *    read the actual passwords.
 * 
 * 2. Role-Based Access: Each user has a role (user/admin).
 *    This allows us to restrict certain actions to admin users only.
 * 
 * 3. Schema Validation: Mongoose validates data before saving,
 *    preventing malformed data from entering the database.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,       // Remove whitespace from both ends
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,      // Prevent duplicate accounts
    lowercase: true,   // Store emails in lowercase for consistency
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false      // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Only allow these two roles
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Pre-save Middleware - Hash Password Before Saving
 * 
 * SECURITY: This runs BEFORE every save operation.
 * If the password hasn't been modified, we skip hashing.
 * bcrypt.genSalt(10) creates a random salt with 10 rounds of processing.
 * More rounds = more secure but slower. 10 is a good balance.
 */
userSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return;

  // Generate a salt (random data added to password before hashing)
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Instance Method - Compare Entered Password with Hashed Password
 * 
 * SECURITY: bcrypt.compare() hashes the entered password with the
 * same salt and checks if it matches the stored hash.
 * We never decrypt the password — we only compare hashes.
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
