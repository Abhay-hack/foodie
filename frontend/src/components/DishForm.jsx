import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const DishForm = ({ onDishAdded }) => {
  const [dish, setDish] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNaN(dish.price) || parseFloat(dish.price) <= 0) {
        toast.error('Price must be a positive number.', { position: 'top-right', autoClose: 3000 });
        return;
      }

      const dishDataToSend = {
        name: dish.name,
        description: dish.description,
        price: parseFloat(dish.price),
        image: dish.image,
        category: dish.category || 'Uncategorized',
      };

      await axios.post('/api/dishes', dishDataToSend);
      toast.success('Dish added successfully!', { position: 'top-right', autoClose: 3000 });

      if (onDishAdded) {
        onDishAdded();
      }

      setDish({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding dish:', error.response ? error.response.data : error.message);
      toast.error(`Failed to add dish: ${error.response?.data?.error || 'Server error'}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Dish Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={dish.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Dish Name"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={dish.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y"
          aria-label="Description"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={dish.price}
          onChange={handleChange}
          required
          step="0.01"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Price"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={dish.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Image URL"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Main, Starter)"
          value={dish.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Category"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-label="Add Dish"
      >
        Add Dish
      </button>
    </motion.form>
  );
};

export default DishForm;