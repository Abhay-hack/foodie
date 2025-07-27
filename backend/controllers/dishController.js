const Dish = require('../models/Dish');

// @desc    Get all dishes
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create new dish
exports.createDish = async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// @desc    Update dish
exports.updateDish = async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDish);
  } catch (error) {
    res.status(400).json({ error: 'Invalid update' });
  }
};

// @desc    Delete dish
exports.deleteDish = async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dish deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid delete' });
  }
};
