const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() { return !this.googleAuth; }, // Password is required ONLY if not googleAuth
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  googleAuth: { // <--- NEW FIELD
    type: Boolean,
    default: false,
  },
  firebaseUid: { // <--- NEW FIELD to store Firebase's unique user ID
    type: String,
    unique: true,
    sparse: true // Allows null values, but still enforces uniqueness if present
  }
}, { timestamps: true });

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  // Only hash password if it's modified AND it's not a Google Auth user
  if (this.isModified('password') && !this.googleAuth) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  // If it's a Google Auth user without a password, consider this always true for login flow
  // (You might want more robust logic here, e.g., checking firebaseUid matches)
  if (this.googleAuth && !this.password) {
      return true; // Or handle this based on your specific login logic for Google users
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);