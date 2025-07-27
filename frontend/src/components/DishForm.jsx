// frontend/src/DishForm.jsx (adjust path as needed)
import React, { useState } from 'react';
import axios from 'axios';
// If you want to use toast notifications directly in DishForm
// import { toast } from 'react-toastify';

const DishForm = ({ onDishAdded }) => { // Accept onDishAdded callback
  const [dish, setDish] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // Matches your Mongoose schema
    category: '',
  });

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNaN(dish.price) || parseFloat(dish.price) <= 0) {
        // Use toast.error if you've imported toast here
        console.error('Price must be a positive number.');
        // alert('Price must be a positive number.'); // Fallback alert
        return;
      }

      const dishDataToSend = {
        name: dish.name,
        description: dish.description,
        price: parseFloat(dish.price),
        image: dish.image,
        category: dish.category || 'Uncategorized',
      };

      // Use relative path for API calls if your frontend/backend are on the same domain or proxied
      // e.g., '/api/dishes' if Vite is proxying. Otherwise, use 'http://localhost:5000/api/dishes'.
      await axios.post('/api/dishes', dishDataToSend);

      if (onDishAdded) {
        onDishAdded(); // Call callback to notify parent (Menu.jsx)
      }

      // Reset form fields
      setDish({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
      });

    } catch (error) {
      console.error('Error adding dish:', error.response ? error.response.data : error.message);
      // Use toast.error if imported, otherwise keep console.error/alert
      // toast.error(`Failed to add dish: ${error.response?.data?.error || 'Server error'}`);
      alert(`Error adding dish: ${error.response?.data?.error || error.message}`); // Fallback alert
    }
  };

  return (
    // Only return the form. The modal component provides the outer styling and heading.
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Dish Name"
        value={dish.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={dish.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={dish.price}
        onChange={handleChange}
        required
        step="0.01" // Allows decimal prices
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={dish.image}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="category"
        placeholder="Category (e.g., Main, Starter)"
        value={dish.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Add Dish
      </button>
    </form>
  );
};

export default DishForm;