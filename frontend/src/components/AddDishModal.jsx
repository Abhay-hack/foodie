import React from 'react';
import '../index.css'; // make sure this file contains the animate-fade-in-up CSS

const AddDishModal = ({ children, onClose }) => {
  return (
    // Fixed overlay covering the entire viewport
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg">
      {/* Modal content container with animation */}
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 mx-4 relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        {children} {/* This is where your DishForm will be rendered */}
      </div>
    </div>
  );
};

export default AddDishModal;
