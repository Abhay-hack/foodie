const express = require('express');
const router = express.Router();
const {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Public Route
router.get('/', getAllDishes);

// Admin-only Routes
router.post('/',  createDish);
router.put('/:id', protect, adminOnly, updateDish);
router.delete('/:id', protect, adminOnly, deleteDish);

module.exports = router;
  