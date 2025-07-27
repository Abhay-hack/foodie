const Order = require('../models/Order');
const Dish = require('../models/Dish');

// @desc    Place an order
exports.placeOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    let totalAmount = 0;

    // Calculate total
    for (const item of items) {
      const dish = await Dish.findById(item.dish);
      if (!dish) return res.status(404).json({ error: 'Dish not found' });
      totalAmount += dish.price * item.quantity;
    }

    const newOrder = new Order({ customerName, items, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Order placement failed' });
  }
};

// @desc    Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.dish');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// @desc    Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = req.body.status || order.status;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

// @desc    Delete order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
