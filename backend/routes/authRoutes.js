// backend/routes/authRoutes.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  logout,
  googleAuthWithFirebase
} = require('../controllers/authController');


router.post('/signup', registerUser);
router.post('/login', loginUser);

// REMOVE 'protect' middleware from these routes for temporary testing
router.get('/profile',protect, getProfile);
router.post('/logout', logout);  

router.post('/google-auth', googleAuthWithFirebase);

module.exports = router;