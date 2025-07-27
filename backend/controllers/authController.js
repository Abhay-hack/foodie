// backend/controllers/authController.js
const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const admin = require('../config/firebaseAdmin'); // <--- IMPORT FIREBASE ADMIN SDK

const setTokenCookie = (res, user) => {
  const token = generateToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None", // needed for cross-origin cookies in production
  });
  return token;
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password'); // Ensure password is selected for comparison
    // console.log('Login attempt for:', email, 'User found:', user ? user.email : 'No'); // Debugging log

    if (!user) {
        // console.log('User not found for email:', email); // Debug
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // console.log('Comparing passwords...'); // Debug
    if (await user.matchPassword(password)) {
      const token = setTokenCookie(res, user);
      // console.log('Login successful for:', user.email); // Debug
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      // console.log('Password mismatch for email:', email); // Debug
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: 'Login failed due to server error.' });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const user = await User.create({ name, email, password, role });
    const token = setTokenCookie(res, user);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

// NEW: Google Authentication Controller
exports.googleAuth = async (req, res) => {
  const { name, email } = req.body; // Firebase sends displayName and email

  try {
    let user = await User.findOne({ email });

    if (user) {
      // User exists, log them in
      // If you want to handle Google-authenticated users differently (e.g., no password)
      // you might add a flag to the User model, like `user.googleAuth = true;`
      // and adjust your login logic to allow password-less login for such users.
      // For now, we'll just log them in and update their name if it changed.
      user.name = name || user.name; // Update name if provided
      await user.save(); // Save any updates

      const token = setTokenCookie(res, user);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      // User does not exist, register them
      // For Google users, you might not have a traditional password.
      // You could set a dummy password or mark them with a `googleAuth: true` flag in your User model.
      // For simplicity, we'll use a placeholder password for now.
      const newUser = await User.create({
        name: name,
        email: email,
        password: Math.random().toString(36).slice(-8), // Dummy password
        role: 'customer', // Default role
        // You might add a 'googleAuth: true' field to your User model here
      });

      const token = setTokenCookie(res, newUser);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token,
      });
    }
  } catch (err) {
    console.error("Google Auth error:", err);
    return res.status(500).json({ error: 'Google authentication failed' });
  }
};


exports.getProfile = async (req, res) => {
  res.json({
    _id: 'temp_profile_id_456',
    name: 'Temp Profile User',
    email: 'profile@example.com',
    role: 'customer',
    message: 'This is temporary profile data from getProfile'
  });
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = req.user; // User object from protect middleware

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
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};

exports.googleAuthWithFirebase = async (req, res) => {
  const { idToken } = req.body; // Expecting the Firebase ID token from the frontend

  if (!idToken) {
    return res.status(400).json({ error: 'Firebase ID token is required' });
  }

  try {
    // 1. Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken; // Extract user info from the decoded token
    const firebaseUid = decodedToken.uid; // Firebase User ID

    // 2. Check if user exists in your MongoDB database
    let user = await User.findOne({ email });

    if (user) {
      // User exists, update their details if needed (e.g., name, profile picture)
      user.name = name || user.name;
      // You might want to update other fields like profile picture URL
      // user.profilePicture = picture;
      await user.save(); // Save any updates

      // 3. Generate your own JWT/cookie for your application's session
      const appToken = setTokenCookie(res, user);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: appToken,
      });
    } else {
      // User does not exist, create a new user in your database
      // For users authenticated via Google, they don't have a traditional password in your system
      const newUser = await User.create({
        name: name,
        email: email,
        password: Math.random().toString(36).slice(-10), // Set a dummy/random password (cannot be null)
        role: 'customer', // Default role for new Google sign-ups
        googleAuth: true, // You might want to add this flag to your User model
        firebaseUid: firebaseUid // Store Firebase UID for future reference
      });

      const appToken = setTokenCookie(res, newUser);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: appToken,
      });
    }
  } catch (err) {
    console.error("Firebase ID Token verification or Google Auth error:", err);
    // Specific error messages for client
    if (err.code === 'auth/id-token-expired') {
        return res.status(401).json({ error: 'Google session expired. Please sign in again.' });
    }
    return res.status(500).json({ error: 'Google authentication failed.' });
  }
};