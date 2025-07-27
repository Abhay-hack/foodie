// frontend/src/Menu.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../contexts/CartContext';
// import { useAuth } from '../contexts/AuthContext';

// Import your DishForm, AddDishModal, AND DishCard components
import DishForm from '../components/DishForm'; // Adjust path if needed
import AddDishModal from '../components/AddDishModal'; // Adjust path if needed
import DishCard from '../components/DishCard'; // <--- NEW IMPORT: Import DishCard

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddDishModal, setShowAddDishModal] = useState(false);

  const { addToCart } = useCart();
  // const { user } = useAuth();
  // const isAdmin = user && user.role === 'admin';

  const isAdmin = true; // Temporary for development. REMOVE/REPLACE WITH REAL AUTH CHECK.

  const fetchDishes = async () => {
    try {
      const res = await axios.get('/api/dishes');
      setDishes(res.data);
      setFilteredDishes(res.data);

      const uniqueCategories = ['All', ...new Set(res.data.map(d => d.category || 'Uncategorized'))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Failed to load dishes:', err);
      toast.error('Failed to load dishes');
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleAddToCart = (dish) => {
    addToCart(dish);
    toast.success(`${dish.name} added to cart!`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredDishes(dishes);
    } else {
      setFilteredDishes(dishes.filter(dish => dish.category === category));
    }
  };

  const handleDishAdded = () => {
    toast.success('Dish added successfully!');
    setShowAddDishModal(false);
    fetchDishes();
  };

  const handleCloseModal = () => {
    setShowAddDishModal(false);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>

      {/* --- NEW: Combined Filter and Add Dish button into one line --- */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Category Filter */}
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700 whitespace-nowrap">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Add New Dish Button (only if admin) */}
        {isAdmin && (
          <button
            onClick={() => setShowAddDishModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add New Dish
          </button>
        )}
      </div>
      {/* ----------------------------------------------------------------- */}

      {isAdmin && showAddDishModal && (
        <AddDishModal onClose={handleCloseModal}>
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Dish</h2>
          <DishForm onDishAdded={handleDishAdded} />
        </AddDishModal>
      )}

      {/* Dishes List: NOW USING DISHCARD */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredDishes.map((dish) => (
          <DishCard
            key={dish._id}
            dish={dish}
            onAddToCart={() => handleAddToCart(dish)} // Pass the function to DishCard
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;