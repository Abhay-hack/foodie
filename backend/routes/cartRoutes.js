const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cartController');

const { protect } = require('../middlewares/authMiddleware');

// All routes are protected
router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/', protect, updateCartItem);
router.delete('/:dishId', protect, removeCartItem);
router.delete('/', protect, clearCart);

module.exports = router;
