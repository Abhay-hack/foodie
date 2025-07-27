const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

// Routes
router.post('/', placeOrder);
router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
