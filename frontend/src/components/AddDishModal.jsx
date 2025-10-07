import React from 'react';
import { motion } from 'framer-motion';

const AddDishModal = ({ children, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 mx-4 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-3xl font-bold leading-none focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Close Modal"
        >
          &times;
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AddDishModal;