// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile, // This controller will now get temporary data directly
  logout,
  googleAuthWithFirebase
} = require('../controllers/authController');
// const { protect } = require('../middlewares/authMiddleware'); // <--- COMMENT OUT OR REMOVE THIS LINE

router.post('/signup', registerUser);
router.post('/login', loginUser);

// REMOVE 'protect' middleware from these routes for temporary testing
router.get('/profile', getProfile); // No 'protect' middleware
router.get('/logout', logout);     // No 'protect' middleware


router.get('/me', (req, res) => {
  res.json({
    _id: 'temp_id_123',
    name: 'Temporary User',
    email: 'temp@example.com',
    role: 'customer',
    message: 'This is temporary data, auth middleware bypassed'
  });
});

router.post('/google-auth', googleAuthWithFirebase);

module.exports = router;