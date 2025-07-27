// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

exports.protect = async (req, res, next) => {
  let token;

  // --- CRITICAL DEBUGGING LOGS ---
  console.log('\n--- PROTECT MIDDLEWARE START ---');
  console.log('Request Headers:', req.headers); // Check if Authorization header is present
  console.log('Received Cookies:', req.cookies); // Check if the 'token' cookie is present
  // --- END DEBUGGING LOGS ---

  if (req.cookies && req.cookies.token) { // Check if req.cookies exists and has 'token'
    try {
      token = req.cookies.token;

      // Log the token value that was read from the cookie
      console.log('Token from cookie found:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Log the decoded payload
      console.log('Decoded Token Payload:', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        console.log('User not found in DB for decoded ID:', decoded.id);
        return res.status(401).json({ error: 'Not authorized, user not found' });
      }

      console.log('User authenticated:', req.user.email);
      console.log('--- PROTECT MIDDLEWARE END (SUCCESS) ---\n');
      next();
    } catch (error) {
      console.error('Token verification or DB lookup failed:', error.message); // Log the specific error message
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    console.log('No token cookie found in req.cookies.'); // Log if no token cookie
    console.log('--- PROTECT MIDDLEWARE END (NO TOKEN) ---\n');
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

// Admin-only middleware (rest of the file remains the same)
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};