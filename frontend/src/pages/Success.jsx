import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Success = () => {
  return (
    <div className="min-h-screen bg-cream-50 font-poppins flex items-center justify-center px-6 py-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-orange-800 mb-6">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for ordering with QuickServe.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Back to Menu"
        >
          Back to Menu
        </Link>
      </motion.div>
    </div>
  );
};

export default Success;