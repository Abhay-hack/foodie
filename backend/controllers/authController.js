const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const admin = require('../config/firebaseAdmin');

// Utility: Set JWT in HttpOnly cookie
const setTokenCookie = (res, user) => {
  const token = generateToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,  
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};


// Login (email/password)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = setTokenCookie(res, user);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Login failed due to server error.' });
  }
};

// Register (email/password)
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      // Send proper error message
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      googleAuth: false,  // explicitly set
    });

    const token = setTokenCookie(res, user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = req.user;
  if (!user) return res.status(401).json({ error: 'Not authorized' });

  user.name = name || user.name;
  user.email = email || user.email;

  try {
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  }).json({ message: 'Logged out successfully' });
};


// Google Auth with Firebase
exports.googleAuthWithFirebase = async (req, res) => {
  console.log('--- Google Auth Attempt ---');
  const { idToken } = req.body;

  if (!idToken) {
    console.warn('No ID token received in request body');
    return res.status(400).json({ error: 'Firebase ID token is required' });
  }

  console.log('Received ID token:', idToken);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded Firebase token:', decodedToken);

    const { email, name, uid } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) {
      console.log('No user found with email, creating new user:', email);
      user = await User.create({
        name,
        email,
        password: null,
        role: 'customer',
        googleAuth: true,
        firebaseUid: uid,
      });
      console.log('New user created:', user._id);
    } else {
      console.log('Existing user found:', user._id);
    }

    const token = setTokenCookie(res, user);
    console.log('JWT token set in cookie:', token);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });

    console.log('--- Google Auth Success ---');
  } catch (err) {
    console.error('Google Auth error:', err);
    res.status(500).json({ error: 'Google authentication failed.' });
  }
};

