const Cart = require('../models/Cart');
const Dish = require('../models/Dish');

// @desc Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.dish');
    res.json(cart || { user: req.user._id, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// @desc Add item to cart
exports.addToCart = async (req, res) => {
  const { dishId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.dish.toString() === dishId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ dish: dishId, quantity });
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

// @desc Update item quantity in cart
exports.updateCartItem = async (req, res) => {
  const { dishId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find(item => item.dish.toString() === dishId);
    if (!item) return res.status(404).json({ error: 'Item not in cart' });

    item.quantity = quantity;

    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// @desc Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item => item.dish.toString() !== req.params.dishId);
    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

// @desc Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
