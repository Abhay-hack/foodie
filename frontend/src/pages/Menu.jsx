
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../contexts/CartContext';
import DishForm from '../components/DishForm';
import AddDishModal from '../components/AddDishModal';
import DishCard from '../components/DishCard';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddDishModal, setShowAddDishModal] = useState(false);

  const { addToCart } = useCart();
  const isAdmin = true; // Temporary for development

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
    toast.success(`${dish.name} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
    });
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
    toast.success('Dish added successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
    setShowAddDishModal(false);
    fetchDishes();
  };

  const handleCloseModal = () => {
    setShowAddDishModal(false);
  };

  return (
    <div className="min-h-screen bg-cream-50 font-poppins py-12 px-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-12 text-orange-800">
        Our Menu
      </h1>

      {/* Filter and Add Dish */}
      <div className="container mx-auto mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center justify-center sm:justify-start">
          <label
            htmlFor="category-filter"
            className="mr-3 font-medium text-gray-700"
          >
            Filter by Category:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Filter by category"
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddDishModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Add New Dish"
          >
            Add New Dish
          </button>
        )}
      </div>

      {/* Add Dish Modal */}
      {isAdmin && showAddDishModal && (
        <AddDishModal onClose={handleCloseModal}>
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-800">
            Add New Dish
          </h2>
          <DishForm onDishAdded={handleDishAdded} />
        </AddDishModal>
      )}

      {/* Dishes Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.map((dish) => (
          <DishCard
            key={dish._id}
            dish={dish}
            onAddToCart={() => handleAddToCart(dish)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
